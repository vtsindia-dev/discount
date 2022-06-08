import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";

export const fetchCart = async () => {
	const { data } = await http.get(`${API_ENDPOINTS.GET_CART}`);
	return data?.responseJson;
};

export const useCartQuery = () => {
	return useQuery<any, Error>(
		[API_ENDPOINTS.GET_CART],
		fetchCart
	);
};
