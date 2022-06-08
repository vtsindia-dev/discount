import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useMutation } from "react-query";

export interface SearchInputType {
  autoFill: string | string[];
  onSuccess: (data: any) => void;
}

async function fetchSearchResult(input: SearchInputType) {
	const { onSuccess, ...searchInput } = input;
  const response = await http.post(API_ENDPOINTS.SEARCH, searchInput);
  return {
		data: response?.data?.responseJson?.data,
		onSuccess,
	};
}
export const useSearchMutation = () => {
  return useMutation((input: SearchInputType) => fetchSearchResult(input), {
    onSuccess: (response: any) => {
			response.onSuccess(response.data);
    },
    onError: (data) => {
      console.log(data, "get all products error response");
    },
  });
};