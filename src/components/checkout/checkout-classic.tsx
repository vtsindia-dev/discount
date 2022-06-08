import { useState, useEffect } from "react";
import { MdLocalShipping } from "react-icons/md";
import { FaShippingFast } from "react-icons/fa";
import { TiEdit } from "react-icons/ti";
import { BsArrowRight } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import { RadioBox } from "@components/ui/radiobox";
import cn from "classnames";
// import { useCart } from "@contexts/cart/cart.context";
import { CheckoutDetailedItem } from "@components/checkout/checkout-detailed-card-item";
import { useUI } from "@contexts/ui.context";
import CheckoutCard from "@components/checkout/checkout-card";
import { useAddressQuery } from '@framework/address/get-all-address';
import { useCheckoutListQuery } from '@framework/checkout/get-checkout-list';
import { getToken } from "@framework/utils/get-token";
import Button from "@components/ui/button";
import { BiLoaderCircle } from 'react-icons/bi';
import { cloneDeep } from "lodash";

const deliveryTypes = [
	{
		key: 'free',
		title: 'Assured Delivery in 24 Hrs',
		label: 'Free Delivery',
	},
	{
		key: 'premium',
		title: 'Premium Delivery in 4 Hrs',
		label: '₹199 will be applied at the doorstep',
	},
];

type PromocodeType = {
	promocode: string;
	promocodePrice: any;
	promocodeValue: any;
	type: string
}

const CheckoutClassic: React.FC = () => {
	const [ selectedDeliveryMethod, setSelectedDeliveryMethod ] = useState(deliveryTypes[0].key);
	const [ expandShippingIndex, setExpandShippingIndex ] = useState(0);
	const [ selectedShippingAddress, setSelectedShippingAddress ] = useState('');
	const [ isViewMore, setSetViewMore ] = useState(false);
	const [ promocodeData, setPromocodeData ] = useState<PromocodeType>({ promocodePrice: 0, promocode: '', promocodeValue: 0, type: '' });
	// const { items, total, isEmpty } = useCart();
	const { setModalView, openModal, accountDetails, setModalData, addedAddressId, setAddedAddress, buyNowProductId } = useUI();
	const [ checkoutDetails, setCheckoutDetails ] = useState({
		shipping_address_id: "",
		delivery_charge: 0,
		delivery_type: "free",
		promocode: "",
		payment_method: 1,
		subTotal_price: "",
		total_price:"",
		discount: 0,
		product: [],
		checkoutType: buyNowProductId ? '0' : '1',
	});
	const props = { 
		userId: accountDetails.user_id,
		userToken: getToken() || "",
		checkoutType: buyNowProductId ? '0' : '1',
		...(buyNowProductId && { productdataId: buyNowProductId })
	}
	const { data: addressList, refetch, isLoading: addressListLoading } = useAddressQuery({ userId: accountDetails.user_id, userToken: getToken() || "" });
	const { data: checkoutList, isLoading: checkoutListLoading, refetch: checkoutListRefetch } = useCheckoutListQuery(props);
	const isEmpty: boolean = !Boolean(checkoutList?.totalUniqueItems);
	const [ total, setTotal ] = useState<any>(checkoutList?.overallSalePrice || 0);
	const [ subTotal, setSubTotal ] = useState<any>(checkoutList?.total || 0);
	const items: any = checkoutList?.item;
	const saving: any = checkoutList?.saving;
	const cityList: any = addressList?.cityList ? addressList?.cityList : [];
	const shippingAddress: any = addressList?.userAddress ? addressList?.userAddress : [];
	const recentlyUsed: any = addressList?.recentlyUsed ? addressList?.recentlyUsed : [];
	const recentlyUsedIds = recentlyUsed.length ? recentlyUsed.map((used:any) => used.address_id) : []
	let modifiedShippingAddress = shippingAddress;
	if (recentlyUsedIds.length && shippingAddress.length) {
		let matchedAddress: any = [];
		let notMatchedAddress: any = [];
		shippingAddress.forEach((address: any) => {
			if (recentlyUsedIds.includes(address.id)) {
				matchedAddress = [ ...matchedAddress, address ];
			} else {
				notMatchedAddress = [ ...notMatchedAddress, address ];
			}
		})
		modifiedShippingAddress = [ ...matchedAddress, ...notMatchedAddress ]
	}
	const defaultShippingAddress: any = modifiedShippingAddress.length ? modifiedShippingAddress.slice(0,3) : [];
	const shippingAddressToShow = isViewMore ? modifiedShippingAddress: defaultShippingAddress;

	useEffect(() => {
		checkoutListRefetch();
	}, [ buyNowProductId ])

	useEffect(() => {
		if (checkoutList?.overallSalePrice !== total) {
			setTotal(checkoutList?.overallSalePrice);
		}
	}, [ checkoutList?.overallSalePrice ])

	useEffect(() => {
		if (checkoutList?.total !== subTotal) {
			setSubTotal(checkoutList?.total);
		}
	}, [ checkoutList?.total ])
	
	useEffect(() => {
		if (addedAddressId || (addressList && expandShippingIndex === -1)) {
			const newIndex = modifiedShippingAddress.findIndex((address: any) => address.id === addedAddressId);
			setExpandShippingIndex(newIndex);
			setSelectedShippingAddress(addedAddressId);
			refetch();
		}
	}, [ addedAddressId, addressList ])

	useEffect(() => {
		let details: any = cloneDeep(checkoutDetails);
		details = {
			...details,
			subTotal_price: subTotal,
			total_price: total + details.delivery_charge - details.discount
		}
		setCheckoutDetails({ ...details });
	}, [ total ])

	useEffect(() => {
		if (promocodeData.promocode) {
			const value = promocodeData.type === 'amount' ? promocodeData.promocodeValue : promocodeData.type === 'percentage' ? subTotal * promocodeData.promocodeValue / 100 : "";
			let details: any = cloneDeep(checkoutDetails);
			const promocodePrice = parseInt(value, 10);
			details = {
				...details,
				discount: promocodePrice,
				subTotal_price: subTotal,
				total_price: total + details.delivery_charge - promocodePrice
			}
			setCheckoutDetails(details);
			setPromocodeData({ ...promocodeData, promocodePrice });
		}
	}, [ subTotal ])

	useEffect(() => {
		let details: any = cloneDeep(checkoutDetails);
		let productDetails: any = cloneDeep(details.product);
		const items: any = checkoutList?.item || [];
		const productIndexToRemove: any = [];
		items.forEach((item: any) => {
			const { discount: product_discount, quantity, unique_id: productdataId, sale_price: product_price, itemTotal: product_total_price } = item;
			const productProps: any = {
				product_discount,
				quantity,
				productdataId,
				product_price,
				product_total_price
			}
			const matchedIndex = productDetails.findIndex((product: any) => product.productdataId === productdataId);
			if (matchedIndex >= 0) {
				productDetails[matchedIndex] = {
					...productDetails[matchedIndex],
					...productProps
				};
			} else {
				productDetails.push({ ...productProps, extended_warranty: [], add_ons: []});
			}
		})
		productDetails.forEach((product: any, index: number) => {
			const matchedIndex = items.findIndex((item: any) => item.unique_id === product.productdataId);
			if (matchedIndex < 0) {
				productIndexToRemove.push(index);
			}
		})
		productIndexToRemove.length && productIndexToRemove.forEach((productIndex: number) => {
			productDetails.splice(productIndex, 1);
		})
		details = {
			...details,
			subTotal_price: subTotal,
			total_price: total + details.delivery_charge - details.discount,
			checkoutType: buyNowProductId ? '0' : '1',
			product: [ ...productDetails ]
		}
		setCheckoutDetails({ ...details });
	}, [ checkoutList, buyNowProductId ])

	const handleAddressPopup = (address: any) => {
		if (address) {
			const { name, ...remianingAddress } = address
			const firstName = name.split(' ')[0];
			const lastName = name.split(' ')[1];
			setModalData({ data: { firstName, lastName, ...remianingAddress } });
		} else {
			setModalData({ data: {} });
		}
		setModalView('ADD_EDIT_ADDRESS_VIEW');
		return openModal();
	}

	const handleResetData = () => {
		setAddedAddress('');
		setSelectedShippingAddress('');
	}

	if (isEmpty && !checkoutListLoading) {
		return (
			<div className="flex m-auto flex-col">
				<div className="text-red-500 text-xl lg:px-3 py-4">Your cart is empty!</div>
				<div className="relative flex flex-col sm:flex-row mt-5 w-full">
					<Button
						onClick={() => window.location.replace(window.location.origin)}
						className="h-11 md:h-12 w-full max-w-xs flex m-auto"
					>
						Continue shopping
					</Button>
				</div>
			</div>
		);
	}

	const handleSelectDeliveryMethod = (key: any) => {
		let details: any = cloneDeep(checkoutDetails);
		const deliveryCharge = key === 'free' ? 0 : 199
		details = {
			...details,
			delivery_type: key,
			delivery_charge: deliveryCharge,
			total_price: total + deliveryCharge - details.discount
		}
		setCheckoutDetails({ ...details });
		setSelectedDeliveryMethod(key);
	}

	const handleSelectShippingAddress = (id: any) => {
		let details = cloneDeep(checkoutDetails);
		details = {
			...details,
			shipping_address_id: id
		}
		setCheckoutDetails({ ...details });
		setSelectedShippingAddress(id)
	}

	const handlePromocodeChange = ({
		promocode,
		promocodePrice,
		promocodeValue,
		type
	}: PromocodeType) => {
		let details: any = cloneDeep(checkoutDetails);
		details = {
			...details,
			promocode,
			discount: promocodePrice,
			total_price: total + details.delivery_charge - promocodePrice
		}
		setCheckoutDetails(details);
		setPromocodeData({ promocode, promocodePrice, promocodeValue, type });
	}

	const handlePaymentMethod = (value: any) => {
		let details = cloneDeep(checkoutDetails);
		details = {
			...details,
			payment_method: value
		}
		setCheckoutDetails({ ...details });
	}
	
	const handleExtendedWarrantyChange = (selected: boolean, extendedProps: any, productIndex: number) => {
		let details: any = cloneDeep(checkoutDetails);
		let productDetails: any = cloneDeep(details.product);
		let extendedWarranty: any = cloneDeep(productDetails[productIndex].extended_warranty);
		if (selected) {
			setTotal(total + parseInt(extendedProps.extended_sale_price, 10));
			setSubTotal(subTotal + parseInt(extendedProps.extended_sale_price, 10));
			extendedWarranty.push({ ...extendedProps })
		} else {
			setTotal(total - parseInt(extendedProps.extended_sale_price, 10));
			setSubTotal(subTotal - parseInt(extendedProps.extended_sale_price, 10));
			const matchedIndex = extendedWarranty.findIndex((warranty: any) => warranty.extended_id === extendedProps.extended_id);
			extendedWarranty.splice(matchedIndex, 1);
		}
		productDetails[productIndex] = {
			...productDetails[productIndex],
			extended_warranty: [ ...extendedWarranty ]
		}
		details = {
			...details,
			product: [ ...productDetails ]
		}
		setCheckoutDetails({ ...details });
	}

	const handleAddonsChange = (selected: boolean, addonsProps: any, productIndex: number) => {
		let details: any = cloneDeep(checkoutDetails);
		let productDetails: any = cloneDeep(details.product);
		let addOns: any = cloneDeep(productDetails[productIndex].add_ons);
		if (selected) {
			setTotal(total + parseInt(addonsProps.combo_sale_price, 10));
			setSubTotal(subTotal + parseInt(addonsProps.combo_sale_price, 10));
			addOns.push({ ...addonsProps })
		} else {
			setTotal(total - parseInt(addonsProps.combo_sale_price, 10));
			setSubTotal(subTotal - parseInt(addonsProps.combo_sale_price, 10));
			const matchedIndex = addOns.findIndex((item: any) => item.combo_id === addonsProps.combo_id);
			addOns.splice(matchedIndex, 1);
		}
		productDetails[productIndex] = {
			...productDetails[productIndex],
			add_ons: [ ...addOns ]
		}
		details = {
			...details,
			product: [ ...productDetails ]
		}
		setCheckoutDetails({ ...details });
	}

	return (
		<>
			<div className="md:w-full lg:w-3/5 flex  h-full flex-col -mt-1.5">
				<div className="flex flex-col xl:flex-row gap-5">
					{deliveryTypes.map((delivery, index) => {
						const { title, label, key } = delivery;
						return (
							<div key={index} onClick={() => handleSelectDeliveryMethod(key)} className={cn("flex items-center pt-3 pb-3 pr-5 pl-5 cursor-pointer rounded-md border-2 border-gray-500", {
								"border-primary": key === selectedDeliveryMethod
							})}>
								<RadioBox
									labelKey={""}
									value={key}
									checked={key === selectedDeliveryMethod}
									onChange={() => {}}
									/>
								{key === 'free' ? <MdLocalShipping size={40} className="text-primary mr-3 ml-1" /> : <FaShippingFast size={40} className="text-primary mr-3 ml-1" />}
								<div className="flex flex-col">
									<span className="font-bold">{title}</span>
									<span className="text-green-600 text-xs">{label}</span>
								</div>
							</div>
						)
					})}
				</div>
				<div className="mt-7">
					<div className="flex items-center justify-between">
						<h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading">
							Shipping Address
						</h2>						
						{selectedShippingAddress
							? <div className="text-primary text-base cursor-pointer" onClick={handleResetData}>Change Address</div>
							: <div className="text-primary text-base cursor-pointer" onClick={() => handleAddressPopup("")}>Add New Address</div>
						}
					</div>
					{!selectedShippingAddress && <div className="mt-3 mb-5 font-bold">Select shipping address to proceed</div>}
					{shippingAddressToShow && shippingAddressToShow.length
						? shippingAddressToShow.map((address: any, index: number) => {
							const { name, address1, address2, city, state, zipCode, phone, id, optionalPhone } = address;
							const selectCity = cityList.find((list: any) => list.id === city);
							const selectState = state === "1" ? "tamil nadu" : ""
							const addressField = [address1, address2, selectCity.name, selectState, zipCode].filter(value => value && value).join(', ');
							const phoneNumber = [ phone, optionalPhone ].filter(value => value && value).join(', ');
							if (selectedShippingAddress && selectedShippingAddress !== id) {
								return null;
							}
							const isShippingAddressSelected = expandShippingIndex === index && selectedShippingAddress;
							const isShippingAddressExpanded = expandShippingIndex === index && !selectedShippingAddress;
							return (
								<div
									key={index}
									className={`mt-4 mb-4 p-5 rounded-md cursor-pointer ${expandShippingIndex === index ? 'bg-green' : 'bg-gray-100'}`}
									onMouseEnter={() => setExpandShippingIndex(index)}
									onClick={() => setExpandShippingIndex(index)}
								>
									<div className="flex justify-between">
										<div>
											<div className="flex items-center capitalize">
												<div className="font-bold text-xl">{name}</div>
												<div className="ml-5">{phoneNumber}</div>
											</div>
											<div className="mt-1 capitalize">{addressField}</div>
										</div>
										{isShippingAddressExpanded && <TiEdit size={25} className="text-primary" onClick={() => handleAddressPopup(address)} />}
										{isShippingAddressSelected && <GoVerified size={25} className="text-green-600" />}
									</div>
									<div
										className={cn("max-h-0 overflow-hidden useAddressCard", {
											"open": isShippingAddressExpanded
										})}
										onClick={() => handleSelectShippingAddress(id)}
									>
										<div className="flex items-center justify-end border-2 border-primary rounded-md p-2 max-w-max ml-auto mt-4">
											<span className="text-primary font-bold">Use this address</span>
											<BsArrowRight size={25} className="text-primary"/>
										</div>
									</div>
								</div>
							)})
						: (	<div className="text-base cursor-pointer flex flex-col items-center mt-10">
								<span className="text-lg">Add address to proceed further</span>
								<Button className="w-6/12 min-w-max mt-5 h-10 " onClick={() => handleAddressPopup("")}>Add address</Button>
							</div>
						)
					}
					{!selectedShippingAddress && <div className="cursor-pointer flex justify-center text-primary" onClick={() => setSetViewMore(!isViewMore)}>{isViewMore ? 'View less address' : 'View more address'}</div>}
				</div>
				{selectedShippingAddress && <div className="mt-5">
					<h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading">
						Summary
					</h2>
					{items && items.map((item: any, index: number) => <CheckoutDetailedItem checkoutDetails={checkoutDetails} item={item} key={item.id} index={index} handleExtendedWarrantyChange={handleExtendedWarrantyChange} handleAddonsChange={handleAddonsChange} />)}
				</div>}
			</div>
			<div className={cn("md:w-full lg:w-2/5 md:ms-0 lg:ms-7 xl:ms-10 flex flex-col h-full -mt-1.5 top-32", { 'sticky': Boolean(selectedShippingAddress) })}>
				<CheckoutCard
					isAddressSelected={Boolean(selectedShippingAddress)}
					items={items}
					isEmpty={isEmpty}
					total={total}
					subTotal={subTotal}
					saving={saving}
					deliveryMethod={selectedDeliveryMethod}
					handlePromocodeChange={handlePromocodeChange}
					promocodeData={promocodeData}
					handlePaymentMethod={handlePaymentMethod}
					checkoutDetails={checkoutDetails}
				/>
			</div>
			{(addressListLoading || checkoutListLoading) && <div className="bg-gray-200 bg-opacity-50 absolute w-full h-full top-0 right-0 bottom-0 left-0">
				<BiLoaderCircle color="#FF3D00" size="60" className="animate-spin flex m-auto absolute top-0 right-0 bottom-0 left-0" />
			</div>}
		</>
	);
};

export default CheckoutClassic;