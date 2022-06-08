// import { BannerType } from "@framework/types";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useQuery } from "react-query";


const fetchMenuList = async ({ queryKey }: any) => {
	const [_key, _params] = queryKey;
	const { data } = await http.get(API_ENDPOINTS.MENU_LIST);
	return data?.responseJson?.menu as any;
};

const useMenuListQuery = () => {
	return useQuery<any, Error>(
		[API_ENDPOINTS.MENU_LIST],
		fetchMenuList
	);
};

export { fetchMenuList, useMenuListQuery };
