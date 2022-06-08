import { formatPrice } from "@framework/product/use-price";
import { useUI } from "@contexts/ui.context";
import Button from "@components/ui/button";

export default function OrderConfirmation() {
	const { modalData: { data }, closeModal } = useUI();
	const { handlePlaceOrder, totalPrice } = data;
	const price = formatPrice({
		amount: totalPrice,
		currencyCode: "INR",
		locale: "en"
	});
	return (
		<div className="bg-white p-5">
			<div className="p-4 flex items-center justify-start text-heading text-sm md:text-base font-bold">
				{`Amount need to be paid during the time of delivery is ${price}`}
			</div>
			<div className="px-4 py-2">Please click on proceed to confirm</div>
			<div className="flex w-full justify-end !mt-7">
				<div
					className="w-32 h-10 flex items-center justify-center text-primary rounded-md border-2 border-primary cursor-pointer"
					onClick={closeModal}
				>
					Cancel
				</div>
				<Button
					type="submit"
					className="w-32 ml-3 h-10"
					onClick={handlePlaceOrder}
				>
					Proceed
				</Button>
			</div>
		</div>
	);
}
