import Input from "@components/ui/input";
import { MdClose } from "react-icons/md";
import { useState } from "react";
import { isEmpty } from "lodash";
import cn from "classnames";
import { usePromocodeMutation } from '@framework/checkout/use-promocode'

type FooterItemProps = {
	id: string;
	name: string;
	price: string;
	type?: string;
};
export const CheckoutCardFooterItem: React.FC<{ item: FooterItemProps, handlePromocodeUpdate: any }> = ({
	item,
	handlePromocodeUpdate
}) => {
	const { type = "", name, price } = item;
	const [ promoCode, setPromoCode ] = useState("");
	const [ isValidPromocode, setIsValidPromocode ] = useState(false);
	const [ placeholder, setPlaceholder ] = useState("Enter here");
	const [ inputClassName, setInputClassName ] = useState("");
	const { mutate: validatePromocode, isLoading } = usePromocodeMutation();

	const handleCallback = (data: any) => {
		if (data) {
			setPlaceholder("Enter here");
			setIsValidPromocode(true);
		} else {
			setPromoCode("Invalid promo code!");
			setInputClassName("!text-red-500 !border-red-500");
			setTimeout(() => {
				setPlaceholder("Try again");
				setPromoCode("");
				setInputClassName("");
			}, 1000)
			setIsValidPromocode(false);
		}
		handlePromocodeUpdate(data);
	}

	const isPromocode = type === 'promocode';
	return (
		<div className={cn("flex items-center px:2 py-4 lg:px-3 lg:py-5 border-b border-gray-300 text-sm w-full font-semibold text-heading last:border-b-0 last:text-base last:pb-0", { "lg:!py-3": isPromocode && !isValidPromocode })}>
			{name}
			{isPromocode && <div className="flex items-center">
			{!isValidPromocode && <>
					<Input
						labelKey=""
						type="text"
						variant="solid"
						name={name}
						className="ml-5 promocode"
						value={promoCode}
						inputClassName={`!border-2 ${inputClassName}`}
						placeholder={placeholder}
						onChange={(event) => setPromoCode(event?.target.value)}
					/>
					<div
						className={cn("text-blue-600 ml-5 cursor-pointer", { "opacity-50 pointer-events-none": isEmpty(promoCode) || isLoading})}
						onClick={() => validatePromocode({ 
							promoCode,
							onSuccess: (data) => handleCallback(data)
						})}
					>
						Apply
					</div>
				</>}
				{isValidPromocode && <div className="flex items-center px-3">
					<div className="text-xs text-green-600 mr-1">Promo code applied!</div>
					<MdClose
						className="cursor-pointer"
						onClick={() => {
							setPlaceholder("Enter here");
							setPromoCode("");
							handlePromocodeUpdate("");
							setIsValidPromocode(false);
						}}
					/>
				</div>}
			</div>}
			<span className="ms-auto flex-shrink-0">{price}</span>
		</div>
	);
};
