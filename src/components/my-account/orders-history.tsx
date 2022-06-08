import { useTranslation } from "next-i18next";
import { useOrdersQuery } from '@framework/order/get-all-orders';
import OrdersTable from "@components/my-account/orders-table";

const OrdersHistory: React.FC = () => {
	const { t } = useTranslation("common");
	const { data: order } = useOrdersQuery();
	return (
		<>
			<h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
				{t("text-orders")}
			</h2>
			<OrdersTable order={order} />
		</>
	);
};

export default OrdersHistory;
