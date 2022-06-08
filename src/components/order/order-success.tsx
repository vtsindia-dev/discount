import { IoCheckmarkCircle } from "react-icons/io5";
import { useTranslation } from "next-i18next";
import { useUI } from "@contexts/ui.context";
import Button from "@components/ui/button";
import Router from "next/router";
import { ROUTES } from "@utils/routes";

export default function OrderSuccess() {
	const { t } = useTranslation("common");
	const { modalData: { data }, closeModal } = useUI();
	return (
		<div className="bg-white p-5">
			<div className="border border-gray-300 bg-gray-50 p-4 rounded-md flex items-center justify-start text-heading text-sm md:text-base">
				<span className="w-10 h-10 me-3 lg:me-4 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
					<IoCheckmarkCircle className="w-5 h-5 text-green-600" />
				</span>
				{t("text-order-received")}
			</div>
			{data.orderId && <div className="px-4 py-2 font-bold">{`Order Number: ${data.orderId}`}</div>}
			{data.transactionId && <div className="px-4 font-bold">{`Transaction ID: ${data.transactionId}`}</div>}
			<div className="flex mt-5">
				<Button
					onClick={() => {
						window.location.replace(window.location.origin);
						closeModal();
					}}
					className="h-11 mr-2 md:h-12 w-full max-w-xs flex m-auto"
				>
					Continue shopping
				</Button>
				<Button
					onClick={() => {
						Router.push(`${ROUTES.ORDERS}`);
						closeModal();
					}}
					className="h-11 ml-2 md:h-12 w-full max-w-xs flex m-auto"
				>
					View Order
				</Button>
			</div>
		</div>
	);
}
