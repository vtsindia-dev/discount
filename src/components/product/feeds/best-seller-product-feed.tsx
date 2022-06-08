import ProductsBlock from "@containers/products-block";
import { useBestSellerProductsQuery } from "@framework/product/get-all-best-seller-products";
import { useUI } from "@contexts/ui.context";
import { getToken } from "@framework/utils/get-token";

export default function BestSellerProductFeed() {
	const { accountDetails } = useUI();
	const { data, isLoading, error } = useBestSellerProductsQuery({
		userId: accountDetails.user_id,
		userToken: getToken() || ""
	});

	return (
		<ProductsBlock
			sectionHeading="text-best-sellers"
			products={data}
			loading={isLoading}
			error={error?.message}
			uniqueKey="best-sellers"
			categorySlug="/search"
		/>
	);
}
