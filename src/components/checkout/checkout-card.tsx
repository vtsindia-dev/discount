import usePrice, { formatPrice } from "@framework/product/use-price";
// import { useCart } from "@contexts/cart/cart.context";
import { CheckoutItem } from "@components/checkout/checkout-card-item";
import CheckoutPaymentMethod from "@components/checkout/checkout-payment-method";
import { CheckoutCardFooterItem } from "./checkout-card-footer-item";
import { useTranslation } from "next-i18next";

interface Item {
  id: string | number;
  price: number;
  quantity?: number;
  [key: string]: any;
}
interface CheckoutCardProps {
  isAddressSelected?: Boolean;
	items?: Item;
	isEmpty?: Boolean;
	total?: any;
	subTotal?: any;
	saving?: any;
	deliveryMethod?: any;
	promocode?: any;
	handlePromocodeChange?: any,
	handlePaymentMethod?: any,
	checkoutDetails?: any,
	promocodeData?: any
}

const CheckoutCard: React.FC<CheckoutCardProps> = (props: any) => {
	// const { items, total, isEmpty } = useCart();
	const { items, total, subTotal, isEmpty, saving, deliveryMethod, promocodeData, handlePromocodeChange, handlePaymentMethod, checkoutDetails } = props;
	const { promocodePrice } = promocodeData;
	const deliveryCost = deliveryMethod === 'free' ? 0 : 199;
	const { price: deliveryCostPrice } = usePrice({
		amount: deliveryCost,
		currencyCode: "INR",
	});
	const { price: subtotal } = usePrice({
		amount: subTotal,
		currencyCode: "INR",
	});
	const { price: finalPrice } = usePrice({
		amount: total + deliveryCost - promocodePrice,
		currencyCode: "INR",
	});
	const { price: savings } = usePrice({
		amount: saving + promocodePrice,
		currencyCode: "INR",
	});

	const itemsCount = items?.length || 0;
	const { isAddressSelected = false } = props;
	const { t } = useTranslation("common");
	const handlePromocodeUpdate = (data: any) => {
		if (data) {
			const value = data.type === 'amount' ? data.value : data.type === 'percentage' ? subTotal * data.value / 100 : "";
			handlePromocodeChange({
				promocode: data.promoCode,
				promocodePrice: parseInt(value, 10),
				promocodeValue: data.value,
				type: data.type
			});
		} else {
			handlePromocodeChange({
				promocode: data.promoCode,
				promocodePrice: 0,
				promocodeValue: 0,
				type: ''
			});
		}
	}
	const formatedPromocode = formatPrice({
		amount: promocodePrice,
		currencyCode: "INR",
		locale: "en"
	});
	const subTotalText = isAddressSelected ? "Price" : "Subtotal";
	const checkoutFooter = [
		{
			id: 1,
			name: `${subTotalText} (${itemsCount} ${itemsCount > 1 ? 'items' : 'item'})`,
			price: subtotal,
		},
		{
			id: 2,
			name: 'Having promo code?',
			price: promocodePrice === 0 ? <p>--</p> : <p className="text-green-600">{formatedPromocode}</p>,
			type: 'promocode'
		},
		{
			id: 3,
			name: t("text-shipping"),
			price: deliveryCost === 0 ? <p className="text-green-600">{t("text-free")}</p> : deliveryCostPrice,
		},
		{
			id: 4,
			name: t("text-savings"),
			price: <p className="text-green-600">{savings}</p>,
		},
		{
			id: 5,
			name: t("text-total"),
			price: finalPrice,
		},
	];
	return (
		<div className="pt-12 md:pt-0 2xl:ps-4">
			<h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-6">
				{isAddressSelected ? "Price Details": "Your Order"}
			</h2>
			{!isAddressSelected &&
				<>
					<div className="flex p-4 rounded-md mt-6 md:mt-7 xl:mt-9 bg-gray-150 text-sm font-semibold text-heading">
						<span>{t("text-product")}</span>
						<span className="ms-auto flex-shrink-0">{t("text-sub-total")}</span>
					</div>
					{!isEmpty ? (
						items.map((item: any) => <CheckoutItem item={item} key={item.id} />)
					) : (
						<p className="text-red-500 lg:px-3 py-4">{t("text-empty-cart")}</p>
					)}
				</>
			}
			{checkoutFooter.map((item: any) => (
				<CheckoutCardFooterItem item={item} key={item.id} handlePromocodeUpdate={handlePromocodeUpdate} />
			))}
			{isAddressSelected && <CheckoutPaymentMethod handlePaymentMethod={handlePaymentMethod} checkoutDetails={checkoutDetails} />}
		</div>
	);
};

export default CheckoutCard;
