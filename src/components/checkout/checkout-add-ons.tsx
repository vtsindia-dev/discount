import { formatPrice } from "@framework/product/use-price";
import cn from "classnames";
import { CheckBox } from "@components/ui/checkbox";
import { GoPlus } from 'react-icons/go';
import { useState } from "react";
import { useWindowSize } from "@utils/use-window-size";

export const AddOns: React.FC<{ addOnsProduct: any, handleAddonsChange: any, index: number, matchedCheckoutDetail: any }> = (props) => {
	const { addOnsProduct, handleAddonsChange, index, matchedCheckoutDetail } = props;
	const isDefaultExtendedWarrantyChecked = matchedCheckoutDetail.add_ons && matchedCheckoutDetail.add_ons.length
		? Boolean(matchedCheckoutDetail.add_ons.find((addOns: any) => addOns.combo_id === addOnsProduct.id))
		: false;
	const [ isAddonChecked, setIsAddonChecked ] = useState(isDefaultExtendedWarrantyChecked);
	const { width } = useWindowSize();
	const price = formatPrice({
		amount: addOnsProduct.combo_price,
		currencyCode: "INR",
		locale: "en"
	});
	const salePrice = formatPrice({
		amount: addOnsProduct.sale_price,
		currencyCode: "INR",
		locale: "en"
	});
	const handleChange = () => {
		setIsAddonChecked(!isAddonChecked);
		const props = {
			combo_id: addOnsProduct.id,
			combo_offer: addOnsProduct.discount,
			combo_price: addOnsProduct.combo_price,
			combo_sale_price: addOnsProduct.sale_price
		}
		handleAddonsChange(!isAddonChecked, props, index);
	}
	const hasDifferentSalePrice = addOnsProduct.combo_price !== addOnsProduct.sale_price || addOnsProduct.discount !== "0"
	const priceWrapper = () => (
		<div className="flex flex-col ms-auto items-end text-heading text-sm px-2 flex-shrink-0">
			<div className="flex">
				{hasDifferentSalePrice && <span className="text-green-600 pr-3 font-bold">{salePrice}</span>}
				<span className={cn("", { "line-through text-gray-600": hasDifferentSalePrice})}>{price}</span>
			</div>
			{addOnsProduct.discount !== "0" && <span className="text-green-600 font-bold">{`${addOnsProduct.discount}%`}</span>}
		</div>
	)
	return (
		<div className="py-4 lg:px-3 bg-gray-100 mb-5">
			<div key={addOnsProduct.id} className="flex">
				<div className="flex pl-2 flex-wrap grid-cols-2 gap-2">
					{addOnsProduct.products.map((product: any, index: number) => {
						const { name, gallery, sale_price } = product;
						const productSalePrice = formatPrice({
							amount: sale_price,
							currencyCode: "INR",
							locale: "en"
						});
						const image = gallery[0].thumbnail;
						let plusIcon = <GoPlus size={30} className="mx-10" />;
						if (index === addOnsProduct.products.length - 1) {
							plusIcon = <></>;
						}
						return (
							<div className="flex w-56 items-start flex-col sm:w-80 sm:items-center sm:flex-row">
								<div className="flex items-center">
									<div className="flex border my-auto w-16 h-16 flex-shrink-0 relative">
										<img
											src={image || "/assets/images/checkout/warranty.png"}
											width="64"
											height="64"
											className="object-cover"
										/>
									</div>
									<div className="ps-5">
										<h6 className="text-base font-regular text-heading">
											<div className="truncate w-32">{name}</div>
										</h6>
										<span className="text-green-600 pr-3 font-bold">{productSalePrice}</span>
									</div>
								</div>
								{plusIcon}
							</div>
						);
					})}
				</div>
				{width > 600 && priceWrapper()}
				<CheckBox
					checked={isAddonChecked}
					onChange={handleChange}
					className="form-checkbox w-5 h-5 border border-gray-300 rounded cursor-pointer transition duration-500 ease-in-out focus:ring-offset-0 focus:outline-none focus:ring-0 focus-visible:outline-none checkbox w-5 h-5 cursor-pointer"
					labelClassName="items-start mr-2 ml-auto md:ml-10"
				/>
			</div>
			{width <= 600 && priceWrapper()}
		</div>
	);
};
