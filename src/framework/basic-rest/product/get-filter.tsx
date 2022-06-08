import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useMutation } from "react-query";

export interface FilterInputType {
  subcategoryId?: string | string[];
	categoryId?: string | string[];
	search?: string | string[];
  onSuccess: (data: any) => void;
}

async function fetchFilter(input: FilterInputType) {
	const { onSuccess, ...filterInput } = input;
  const response = await http.post(API_ENDPOINTS.FILTER, filterInput);
  return {
		data: response?.data?.responseJson,
		onSuccess,
	};
}
export const useFilterMutation = () => {
  return useMutation((input: FilterInputType) => fetchFilter(input), {
    onSuccess: (response: any) => {
			response.onSuccess(response.data);
    },
    onError: (data) => {
      console.log(data, "get all products error response");
    },
  });
};