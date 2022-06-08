import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useMutation } from "react-query";

type ProductInputType = {
	subcategoryId?: string | string[];
	categoryId?: string | string[];
	search?: string | string[];
	sortBy?: string | string[];
	pageId: string | number;
	onSuccess: (data:any) => void;
};

async function fetchProducts(input: ProductInputType) {
	const { onSuccess, ...productInput } = input;
  const response = await http.post(API_ENDPOINTS.PRODUCTS, productInput);
  return {
		data: {
			pages: response?.data?.responseJson,
			pageName: response?.data?.responseJson.label,
			totalPages: response?.data?.pages,
			totalProduct: response?.data?.totalProduct,
		},
		onSuccess,
	};
}
export const useProductQueryMutation = () => {
  return useMutation((input: ProductInputType) => fetchProducts(input), {
    onSuccess: (response: any) => {
			response.onSuccess(response.data);
    },
    onError: (data) => {
      console.log(data, "get all products error response");
    },
  });
};