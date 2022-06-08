import { BannerType } from "@framework/types";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useQuery } from "react-query";


const fetchHeroBanner = async ({ queryKey }: any) => {
	const [_key, _params] = queryKey;
	const { data } = await http.get(API_ENDPOINTS.HERO_BANNER);
	return data?.responseJson as BannerType;
};

const useHeroBannerQuery = () => {
	return useQuery<BannerType, Error>(
		[API_ENDPOINTS.HERO_BANNER],
		fetchHeroBanner
	);
};

export { useHeroBannerQuery, fetchHeroBanner };
