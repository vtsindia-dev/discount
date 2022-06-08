import { Product, ProductQueryOptionsType } from "@framework/types";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";
import { constructQueryParam } from "@framework/utils/helper";

export const fetchProduct = async ({ queryKey }: any) => {
	const [_key, _params] = queryKey;
	const { data } = await http.get(`${API_ENDPOINTS.PRODUCT}${constructQueryParam(_params)}`);
	return data?.responseJson;
};

export const useProductQuery = (options: ProductQueryOptionsType) => {
	return useQuery<Product, Error>(
		[API_ENDPOINTS.PRODUCT, options],
		fetchProduct
	);
};
