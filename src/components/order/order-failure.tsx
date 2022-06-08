import { useUI } from "@contexts/ui.context";

export default function OrderSuccess() {
	const { modalData: { data } } = useUI();
	return (
		<div className="bg-white p-5">
			<div className="border border-gray-300 bg-gray-50 p-4 rounded-md flex items-center justify-start text-heading text-sm md:text-base">
				Order failed. Amount will be refunded to your account, if any amount is deducted or contact customer support for more.
			</div>
			{data.orderId && <div className="px-4 py-2 font-bold">{`Order Number: ${data.orderId}`}</div>}
		</div>
	);
}
