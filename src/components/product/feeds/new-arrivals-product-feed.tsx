import ProductsBlock from "@containers/products-block";
import { useCCTVCameraProductsQuery } from "@framework/product/get-all-cctv-camera-products";
import { useUI } from "@contexts/ui.context";
import { getToken } from "@framework/utils/get-token";

export default function NewArrivalsProductFeed() {
	const { accountDetails } = useUI();
	const { data, isLoading, error } = useCCTVCameraProductsQuery({
		userId: accountDetails.user_id,
		userToken: getToken() || ""
	});

	return (
		<ProductsBlock
			sectionHeading="text-cctv-cameras"
			products={data}
			loading={isLoading}
			error={error?.message}
			uniqueKey="new-arrivals"
			categorySlug="/search"
		/>
	);
}
