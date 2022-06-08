import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import Subscription from "@components/common/subscription";
import PageHeader from "@components/ui/page-header";
// import CheckoutForm from "@components/checkout/checkout-form";
import CheckoutClassic from "@components/checkout/checkout-classic";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function CheckoutPage() {
	return (
		<>
			<PageHeader pageHeader="text-page-checkout" />
			<Container>
				<div className="py-10 xl:py-10 px-0 2xl:max-w-screen-2xl xl:max-w-screen-xl mx-auto flex flex-col lg:flex-row w-full relative">
					<CheckoutClassic />
				</div>
				<Subscription />
			</Container>
		</>
	);
}

CheckoutPage.Layout = Layout;

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
