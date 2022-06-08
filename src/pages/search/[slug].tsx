import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import Subscription from "@components/common/subscription";
import ShopDiscount from "@components/shop/discount";
import { ShopFilters } from "@components/shop/filters";
import StickyBox from "react-sticky-box";
import { ProductGrid } from "@components/shop/product-grid";
import SearchTopBar from "@components/shop/top-bar";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ProductListBreadcrumb from "@components/product/product-list-breadcrumb";

export default function Shop() {
	return (
		<>
			<ShopDiscount />
			<Container>
				<div className={`flex pt-8 pb-16 lg:pb-20`}>
					<div className="flex-shrink-0 pe-24 hidden lg:block w-96">
						<StickyBox offsetTop={50} offsetBottom={20}>
							<ProductListBreadcrumb />
							<ShopFilters />
						</StickyBox>
					</div>

					<div className="w-full lg:-ms-9">
						<SearchTopBar />
						<ProductGrid />
					</div>
				</div>
				<Subscription />
			</Container>
		</>
	);
}

Shop.Layout = Layout;

export const getServerSideProps = async ({ locale }: any) => {
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

