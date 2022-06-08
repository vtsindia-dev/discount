import { BannerType } from "@framework/types";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useQuery } from "react-query";


const fetchDiscountBanner = async ({ queryKey }: any) => {
	const [_key, _params] = queryKey;
	const { data } = await http.get(API_ENDPOINTS.DISCOUNT_BANNER);
	return data?.responseJson?.data as BannerType;
};

const useDiscountBannerQuery = () => {
	return useQuery<BannerType, Error>(
		[API_ENDPOINTS.DISCOUNT_BANNER],
		fetchDiscountBanner
	);
};

export { fetchDiscountBanner, useDiscountBannerQuery };
