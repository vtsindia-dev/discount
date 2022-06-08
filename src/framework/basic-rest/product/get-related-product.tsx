import { Product, ProductQueryOptionsType } from "@framework/types";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";
import { constructQueryParam } from "@framework/utils/helper";

export const fetchRelatedProducts = async ({ queryKey }: any) => {
	const [_key, _params] = queryKey;
	const { data } = await http.get(`${API_ENDPOINTS.RELATED_PRODUCTS}${constructQueryParam(_params)}`);
	return data?.responseJson?.data;
};
export const useRelatedProductsQuery = (options: ProductQueryOptionsType) => {
	return useQuery<Product[], Error>(
		[API_ENDPOINTS.RELATED_PRODUCTS, options],
		fetchRelatedProducts
	);
};
