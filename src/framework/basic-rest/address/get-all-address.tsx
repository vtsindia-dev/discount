import { Product } from "@framework/types";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";
import { constructQueryParam } from "@framework/utils/helper";

export type QueryOptionsType = {
	userId: string | number;
	userToken: string | number;
};

export const fetchAddress = async ({ queryKey }: any) => {
	const [_key, _params] = queryKey;
	const { data } = await http.get(`${API_ENDPOINTS.GET_ADDRESS}${constructQueryParam(_params)}`);
	return data?.responseJson;
};

export const useAddressQuery = (options: QueryOptionsType) => {
	return useQuery<Product, Error>(
		[API_ENDPOINTS.GET_ADDRESS, options],
		fetchAddress
	);
};
