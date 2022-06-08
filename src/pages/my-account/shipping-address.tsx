import Layout from '@components/layout/layout';
import AccountLayout from '@components/my-account/account-layout';
import ShippingAddress from '@components/my-account/shipping-address';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function ShippingAddressPage() {
	return (
		<AccountLayout>
			<ShippingAddress />
		</AccountLayout>
	);
}

ShippingAddressPage.Layout = Layout;

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