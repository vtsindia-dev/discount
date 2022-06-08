import Layout from "@components/layout/layout";
import AccountLayout from "@components/my-account/account-layout";
import OrdersHistory from "@components/my-account/orders-history";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function OrdersTablePage() {
	return (
		<AccountLayout>
			<OrdersHistory />
		</AccountLayout>
	);
}

OrdersTablePage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => {
	return {
		props: {
			...(await serverSideTranslations(locale, [
				"common",
				"forms",
				"menu",
				"footer",
			])),
		},
	};
};
