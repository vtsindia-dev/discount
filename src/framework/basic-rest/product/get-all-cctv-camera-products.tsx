import { Product } from "@framework/types";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";
import { constructQueryParam } from "@framework/utils/helper";

export type HomeQueryOptionsType = {
	userId: string | number;
	userToken: string | number;
};

export const fetchCCTVCameraProducts = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const { data } = await http.get(`${API_ENDPOINTS.CCTV_CAMERA_PRODUCTS}${constructQueryParam(_params)}`);
  return data?.responseJson?.data as Product[];
};
export const useCCTVCameraProductsQuery = (options: HomeQueryOptionsType) => {
  return useQuery<Product[], Error>(
    [API_ENDPOINTS.CCTV_CAMERA_PRODUCTS, options],
    fetchCCTVCameraProducts
  );
};
