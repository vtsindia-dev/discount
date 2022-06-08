import { Product } from "@framework/types";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";
import { constructQueryParam } from "@framework/utils/helper";

export type HomeQueryOptionsType = {
	userId: string | number;
	userToken: string | number;
};

export const fetchAfforableProducts = async ({ queryKey }: any) => {
	const [_key, _params] = queryKey;
	const { data } = await http.get(`${API_ENDPOINTS.AFFORDABLE_PRODUCTS}${constructQueryParam(_params)}`);
	return data?.responseJson?.data || [];
};
export const useAffordableProductsQuery = (options: HomeQueryOptionsType) => {
	return useQuery<Product[], Error>(
		[API_ENDPOINTS.AFFORDABLE_PRODUCTS, options],
		fetchAfforableProducts
	);
};
