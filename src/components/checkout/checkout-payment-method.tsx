import { useRef, useState } from "react";
// import usePrice from "@framework/product/use-price";
// import { useCart } from "@contexts/cart/cart.context";
import { RadioBox } from "@components/ui/radiobox";
import { CheckBox } from "@components/ui/checkbox";
import { MdSecurity } from "react-icons/md";
import Button from "@components/ui/button";
import cn from "classnames";
import { useCheckoutMutation } from "@framework/checkout/use-checkout";
import { useCheckoutSuccessMutation } from "@framework/checkout/use-checkout-success";
import { useCheckoutFailureMutation } from "@framework/checkout/use-checkout-failure";
import { useUI } from "@contexts/ui.context";
import { getToken } from "@framework/utils/get-token";
import { useCheckoutListQuery } from '@framework/checkout/get-checkout-list';
import { useCartQuery } from "@framework/cart/get-all-cart";

export const paymentMethod = [
	{
		key: 'upi',
		label: 'UPI',
		value: 1
	},
	{
		key: 'card',
		label: 'Credit / Debit Card',
		value: 2
	},
	{
		key: 'netbanking',
		label: 'Netbanking',
		value: 3
	},
	{
		key: 'cod',
		label: 'COD',
		value: 4
	},
]

interface CheckoutPaymentMethodProps {
	handlePaymentMethod?: any,
	checkoutDetails?: any,
}

const CheckoutPaymentMethod: React.FC<CheckoutPaymentMethodProps> = (props) => {
	// const { items, total, isEmpty } = useCart();
	// const { price: subtotal } = usePrice({
	// 	amount: total,
	// 	currencyCode: "INR",
	// });
	const { handlePaymentMethod, checkoutDetails } = props;
	const { mutate: placeOrder, isLoading } = useCheckoutMutation();
	const { mutate: checkoutSuccess } = useCheckoutSuccessMutation();
	const { mutate: checkoutFailure } = useCheckoutFailureMutation();
	const { setModalView, openModal, accountDetails, setModalData, buyNowProductId } = useUI();
	const [ selectedPaymentMethod, setSelectedPaymentMethod ] = useState(paymentMethod[0].key);
	const checkoutProps = {
		userId: accountDetails.user_id,
		userToken: getToken() || "",
		checkoutType: buyNowProductId ? '0' : '1',
		...(buyNowProductId && { productdataId: buyNowProductId })
	}
	const { refetch: checkoutListRefetch } = useCheckoutListQuery(checkoutProps);
	const { refetch: cartRefetch } = useCartQuery();
	const [ isTCChecked, setTCChecked ] = useState(false);
	const OrderDataRef = useRef();
	const [ orderData, setOrderData ] = useState<any>({});

	const handlePaymentSuccessFailure = (response: any) => {
		const OrderCurrentData:any = OrderDataRef.current;
		const props = {
			payment_id: response.razorpay_payment_id || '',
			order_id: OrderCurrentData.orderId,
			checkoutType: buyNowProductId ? '0' : '1',
			successCbk: () => {
				checkoutListRefetch();
				cartRefetch();
			},
		}
		if (typeof response.razorpay_payment_id == 'undefined' ||  response.razorpay_payment_id < 1) {
			checkoutFailure(props);
			handleShowOrderFailurePopup();
		} else {
			checkoutSuccess(props);
			handleShowOrderSuccessPopup(response.razorpay_payment_id, orderData.orderId);
		}
	}

	const getOptions = () => {
		
		return {
			// key: 'rzp_test_vF07pGnblMAKLn',
			key:'rzp_live_mhq3z1TkZXv85y',
			amount: checkoutDetails.total_price * 100,
			name: 'Discount IT',
			description: '365 days 365 offers',
			image: '/assets/images/logo.png',
			handler: (response: any) => handlePaymentSuccessFailure(response),
			prefill: {
					name: accountDetails.display_name,
					contact: accountDetails.phone_number,
					email: accountDetails.email
			},
			notify: {
				sms: true,
				email: true
			},
			notes: {
					address: 'some address'
			},
			theme: {
				color: 'orangered',
				hide_topbar: false
			},
			modal: {
				backdropclose: false
			},
			method:{
				netbanking: selectedPaymentMethod === 'netbanking',
				card: selectedPaymentMethod === 'card',
				upi: selectedPaymentMethod === 'upi',
				wallet: selectedPaymentMethod === 'wallet'
			}
		}
	};
	
	const openPayModal = () => {
		var rzp1 = new (window as any).Razorpay(getOptions());
		rzp1.open();
	};

	const handlePlaceOrder = () => {
		placeOrder({
			...checkoutDetails,
			onSuccess: orderSetSuccess
		})
	}

	const orderSetSuccess = (data: any) => {
		OrderDataRef.current = data;
		setOrderData(data);
		if (selectedPaymentMethod === 'cod') {
			const props = {
				payment_id: '',
				order_id: data.orderId,
				checkoutType: buyNowProductId ? '0' : '1',
				successCbk: () => {
					checkoutListRefetch();
					cartRefetch();
				},
			}
			checkoutSuccess(props);
			handleShowOrderSuccessPopup('', data.orderId);
		} else {
			openPayModal();
		}
	}

	const handleShowOrderSuccessPopup = (transactionId: any, orderId: any) => {
		setModalData({ data: { orderId, transactionId } });
		setModalView('SET_ORDER_SUCCESS');
		return openModal();
	}

	const handleShowOrderFailurePopup = () => {
		setModalData({ data: { orderId: orderData.orderId } });
		setModalView('SET_ORDER_FAILURE');
		return openModal();
	}

	const handleCodConfirmation = () => {
		setModalData({ data: { handlePlaceOrder, totalPrice: checkoutDetails.total_price } });
		setModalView('SET_COD_CONFIRMATION');
		return openModal();
	}

	const handlePaymentMethodChange = (key: any, value: any) => {
		setSelectedPaymentMethod(key);
		handlePaymentMethod(value);
	}

	return (
		<div className="mt-10 mb-4">
			<div className="text-lg p-4 rounded-md md:text-xl xl:text-2xl bg-gray-150 text-heading mb-6 xl:mb-8">
				<h2 className="font-bold">Payment Method</h2>
				<div className="mt-4 grid grid-cols-1 sm:grid-cols-2 items-center space-s-6">
					{paymentMethod.map((method: any) => {
						const { key, label, value } = method;
						return (
							<RadioBox
								labelKey={label}
								value={key}
								checked={key === selectedPaymentMethod}
								onChange={() => handlePaymentMethodChange(key, value)}
								labelClassName="text-base"
								className="!ml-0 my-2"
							/>
						)
					})}
				</div>
				<div className="flex items-center mt-5">
					<MdSecurity size="20" className="mr-2 text-green-600" />
					<span className="text-green-600 text-sm">Pay securely with razorpay</span>
				</div>
			</div>
			<div className="flex items-center mt-8">
				<CheckBox checked={isTCChecked} onChange={() => setTCChecked(!isTCChecked)} label={<span>I agree to the <a className="text-blue-600" href="/terms">{"Terms and Conditions"}</a> {"&"} <a className="text-blue-600" href="/return-policy">{"Return and Cancellation policy"}</a> of the product </span>} />
			</div>
			<div className="flex w-full justify-end mt-8">
				<Button
					className={cn("w-full sm:w-auto !text-base", { "opacity-50": !isTCChecked})}
					disabled={!isTCChecked}
					onClick={selectedPaymentMethod === 'cod' ? handleCodConfirmation : handlePlaceOrder}
					loading={isLoading}
				>
					Checkout
				</Button>
			</div>
		</div>
	);
};

export default CheckoutPaymentMethod;
