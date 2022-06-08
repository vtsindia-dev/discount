import { Item } from "@contexts/cart/cart.utils";
import { generateCartItemName } from "@utils/generate-cart-item-name";
import usePrice from "@framework/product/use-price";
import cn from "classnames";

export const CheckoutItem: React.FC<{ item: Item }> = ({ item }) => {
	const { price: mrpItemTotal } = usePrice({
		amount: item.mrpitemTotal,
		currencyCode: "INR",
	});
	const { price: itemTotal } = usePrice({
		amount: item.itemTotal,
		currencyCode: "INR",
	});

	return (
		<div className="flex py-4 items-center lg:px-3 border-b border-gray-300">
			<div className="flex border border-gray-300 w-16 h-16 flex-shrink-0">
				<img
					src={item.image ?? "/assets/placeholder/order-product.svg"}
					width="64"
					height="64"
					className="object-cover"
				/>
			</div>
			<div>
				<h6 className="text-sm ps-3 font-regular text-heading">
					{generateCartItemName(item.name, item.attributes)}
				</h6>
				<div className="ps-3 text-xs pt-1">{`Quantity: ${item.quantity}`}</div>
			</div>
			<div className="flex flex-col text-right ms-auto text-heading text-sm ps-2 flex-shrink-0">
				{itemTotal && <span className="text-green-600 font-bold text-base">{itemTotal}</span>}
				<span className={cn("text-base", { "line-through !text-xs text-gray-600": itemTotal})}>{mrpItemTotal}</span>
			</div>
		</div>
	);
};
