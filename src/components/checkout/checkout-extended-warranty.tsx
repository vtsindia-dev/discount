import { formatPrice } from "@framework/product/use-price";
import cn from "classnames";
import { CheckBox } from "@components/ui/checkbox";
import { useState } from "react";
import { useWindowSize } from "@utils/use-window-size";

export const ExtendedWarranty: React.FC<{ warranty: any, handleExtendedWarrantyChange: any, index: number, matchedCheckoutDetail: any }> = (props) => {
	const { warranty, handleExtendedWarrantyChange, index, matchedCheckoutDetail } = props;
	const isDefaultExtendedWarrantyChecked = matchedCheckoutDetail.extended_warranty && matchedCheckoutDetail.extended_warranty.length
		? Boolean(matchedCheckoutDetail.extended_warranty.find((extendedWarranty: any) => extendedWarranty.extended_id === warranty.id))
		: false;
	const [ isExtendedWarrantyChecked, setExtendedWarrantyChecked ] = useState(isDefaultExtendedWarrantyChecked);
	const { width } = useWindowSize();
	const price = formatPrice({
		amount: warranty.price,
		currencyCode: "INR",
		locale: "en"
	});
	const salePrice = formatPrice({
		amount: warranty.sale_price,
		currencyCode: "INR",
		locale: "en"
	});
	const handleExtendedChange = () => {
		setExtendedWarrantyChecked(!isExtendedWarrantyChecked);
		const props = {
			extended_id: warranty.id,
			extended_offer: warranty.discount,
			extended_price: warranty.price,
			extended_sale_price: warranty.sale_price,
			extended_years: warranty.years
		}
		handleExtendedWarrantyChange(!isExtendedWarrantyChecked, props, index);
	}
	const hasDifferentSalePrice = warranty.price !== warranty.sale_price || warranty.discount !== "0"
	const priceWrapper = () => (
		<div className="flex flex-col ms-auto items-end text-heading text-sm px-2 flex-shrink-0">
			<div className="flex">
				{hasDifferentSalePrice && <span className="text-green-600 pr-3 font-bold">{salePrice}</span>}
				<span className={cn("", { "line-through text-gray-600": hasDifferentSalePrice})}>{price}</span>
			</div>
			{warranty.discount !== "0" && <span className="text-green-600 font-bold">{`${warranty.discount}%`}</span>}
		</div>
	)
	return (
		<div className="bg-gray-100 mb-5 py-4 lg:px-3">
			<div key={warranty.id} className="flex">
				<div className="flex border my-auto w-16 h-16 flex-shrink-0 relative">
					<img
						src={"/assets/images/checkout/warranty.png"}
						width="64"
						height="64"
						className="object-cover"
					/>
					<span className="absolute top-0 right-0 bottom-0 left-0 flex justify-center items-center mb-4 font-bold">{warranty.years}</span>
				</div>
				<div className="ps-5">
					<h6 className="text-base font-regular text-heading">
					<div>{`Extended ${warranty.years} years warranty`}</div>
					</h6>
					<div className="text-sm">Buy together offer</div>
					<a href={warranty.link} target="_blank" className="text-xs text-primary flex items-center mt-3">
						Know more
					</a>
				</div>
				{width > 600 && priceWrapper()}
				<CheckBox
					checked={isExtendedWarrantyChecked}
					onChange={handleExtendedChange}
					className="form-checkbox w-5 h-5 border border-gray-300 rounded cursor-pointer transition duration-500 ease-in-out focus:ring-offset-0 focus:outline-none focus:ring-0 focus-visible:outline-none checkbox w-5 h-5 cursor-pointer"
					labelClassName="items-start mr-2 ml-auto md:ml-10"
				/>
			</div>
			{width <= 600 && priceWrapper()}
		</div>
	);
};
