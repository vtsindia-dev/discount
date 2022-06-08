import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";
import { constructQueryParam } from "@framework/utils/helper";

export type HomeQueryOptionsType = {
	userId: string | number;
	userToken: string | number;
};

export const fetchFlashSaleProducts = async ({ queryKey }: any) => {
	const [_key, _params] = queryKey;
	const { data } = await http.get(`${API_ENDPOINTS.PREVIOUS_DAY_OFFERS}${constructQueryParam(_params)}`);
	return {
		previousDayOffer: data?.responseJson?.data,
		todayOffer: data?.responseJson?.todayOffer
	}
};
export const useFlashSaleProductsQuery = (options: HomeQueryOptionsType) => {
	return useQuery<any, Error>(
		[API_ENDPOINTS.PREVIOUS_DAY_OFFERS, options],
		fetchFlashSaleProducts
	);
};
