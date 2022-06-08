import { Item } from "@contexts/cart/cart.utils";
import { generateCartItemName } from "@utils/generate-cart-item-name";
import usePrice from "@framework/product/use-price";
import Counter from "@components/common/counter";
import { MdClose } from "react-icons/md";
import cn from "classnames";
import { useAddToCartMutation } from '@framework/cart/use-cart'
import { useUI } from "@contexts/ui.context";
import { getToken } from "@framework/utils/get-token";
import { useCheckoutListQuery } from '@framework/checkout/get-checkout-list';
import { BiLoaderCircle } from 'react-icons/bi';
import { ExtendedWarranty } from '@components/checkout/checkout-extended-warranty';
import { AddOns } from '@components/checkout/checkout-add-ons';
import { useCartQuery } from '@framework/cart/get-all-cart';
import { useWindowSize } from "@utils/use-window-size";

export const CheckoutDetailedItem: React.FC<{ 
	item: Item,
	index: number,
	handleExtendedWarrantyChange: any,
	handleAddonsChange: any
	checkoutDetails: any
}> = ({ item, index, handleExtendedWarrantyChange, handleAddonsChange, checkoutDetails }) => {
	const matchedCheckoutDetail = checkoutDetails.product.find((product: any) => product.productdataId === item.unique_id)
	const { price: mrpItemTotal } = usePrice({
		amount: item.mrpitemTotal,
		currencyCode: "INR",
	});
	const { price: itemTotal } = usePrice({
		amount: item.itemTotal,
		currencyCode: "INR",
	});
	const { width } = useWindowSize();
	const { mutate: addRemoveToCart, isLoading } = useAddToCartMutation();
	const { accountDetails, buyNowProductId } = useUI();
	const props = { 
		userId: accountDetails.user_id,
		userToken: getToken() || "",
		checkoutType: buyNowProductId ? '0' : '1',
		...(buyNowProductId && { productdataId: buyNowProductId })
	}
	const { refetch, isLoading: checkoutListLoading } = useCheckoutListQuery(props);
	const { refetch: cartRefetch } = useCartQuery();
	let quantity: any = item?.quantity || 0;
	quantity = parseInt(quantity, 10);
	const addOns = item?.add_ons || [];
	const extendedWarranty = item?.extended_warranty || [];

	function handleIncrementDecrement(isIncrement = false, removeItem = false) {
		const addRemoveItemToCart = (quantity: any) => {
			addRemoveToCart({ 
				userId: accountDetails?.user_id,
				productdataId: item?.unique_id ? item.unique_id : "",
				userToken: getToken() || "",
				quantity: quantity,
				onSuccess: () => {
					refetch();
					cartRefetch();
				}
			})
		}
		if (removeItem) {
			addRemoveItemToCart(0);
		} else {
			const qty: any = isIncrement ? quantity + 1 : quantity - 1;
			addRemoveItemToCart(qty);
		}
	}

	const priceWrapper = () => {
		return (
			<div className="flex flex-col ms-auto items-end text-heading text-sm ps-2 flex-shrink-0">
				<div className="flex">
					{itemTotal && <span className="text-green-600 pr-3 font-bold">{itemTotal}</span>}
					<span className={cn("", { "line-through text-gray-600": itemTotal})}>{mrpItemTotal}</span>
				</div>
				{item.discount && <span className="text-green-600 font-bold">{`${item.discount}%`}</span>}
			</div>
		)
	}

	const increamenter = () => {
		return (
			<Counter
				quantity={quantity}
				onIncrement={() => handleIncrementDecrement(true)}
				onDecrement={() => handleIncrementDecrement(false)}
				variant="dark"
				disableDecrement={quantity === 1}
			/>
		)
	}

	return (
		<div className="border-b border-gray-300">
			<div className="flex py-4 flex-col lg:px-3">
				<div className="flex">
					<div className="flex border my-auto border-gray-300 w-16 h-16 flex-shrink-0">
						<img
							src={item.image ?? "/assets/placeholder/order-product.svg"}
							width="64"
							height="64"
							className="object-cover"
						/>
					</div>
					<div className="ps-5 my-auto">
						<h6 className="text-base font-regular text-heading">
							{generateCartItemName(item.name, item.attributes)}
						</h6>
						{width > 600 && <div className="flex items-center mt-3">
							Quantity :
							<div className="ms-3">
								{increamenter()}
							</div>
						</div>}
					</div>
					{width > 600 && priceWrapper()}
					<MdClose size="25" className="ml-auto md:ml-10  cursor-pointer" onClick={() => handleIncrementDecrement(false, true)} />
				</div>
				{width <= 600 && <div className="flex items-center justify-center mt-2">
					{increamenter()}
					{priceWrapper()}
				</div>}
				{(isLoading || checkoutListLoading) && <div className="bg-gray-200 bg-opacity-50 absolute w-full h-full top-0 right-0 bottom-0 left-0">
					<BiLoaderCircle color="#FF3D00" size="60" className="animate-spin flex m-auto absolute top-0 right-0 bottom-0 left-0" />
				</div>}
			</div>
			{extendedWarranty.length ? extendedWarranty.map((warranty: any) => <ExtendedWarranty matchedCheckoutDetail={matchedCheckoutDetail} warranty={warranty} handleExtendedWarrantyChange={handleExtendedWarrantyChange} index={index} />) : null}
			{addOns.length ? addOns.map((addOnsProduct: any) => <AddOns matchedCheckoutDetail={matchedCheckoutDetail} addOnsProduct={addOnsProduct} handleAddonsChange={handleAddonsChange} index={index} />) : null}
		</div>
	);
};
