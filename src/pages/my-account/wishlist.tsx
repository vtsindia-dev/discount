import Layout from "@components/layout/layout";
import AccountLayout from "@components/my-account/account-layout";
import WishlistProductGrid from "@components/my-account/wishlist-product-grid";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function WishlistPage() {
	return (
		<AccountLayout>
			<WishlistProductGrid />
		</AccountLayout>
	);
}

WishlistPage.Layout = Layout;

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
