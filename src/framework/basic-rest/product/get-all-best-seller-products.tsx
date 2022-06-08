import { Product } from "@framework/types";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";
import { constructQueryParam } from "@framework/utils/helper";

export type HomeQueryOptionsType = {
	userId: string | number;
	userToken: string | number;
};

export const fetchBestSellerProducts = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const { data } = await http.get(`${API_ENDPOINTS.BEST_SELLER_PRODUCTS}${constructQueryParam(_params)}`);
  return data?.responseJson?.data;
};
export const useBestSellerProductsQuery = (options: HomeQueryOptionsType) => {
  return useQuery<Product[], Error>(
    [API_ENDPOINTS.BEST_SELLER_PRODUCTS, options],
    fetchBestSellerProducts
  );
};
