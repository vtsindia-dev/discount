import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useMutation } from "react-query";

export interface WishlistType {
  userId: string;
  productdataId: string;
  userToken: string;
  onSuccess: (data: any) => void;
}

export interface GetWishlistType {
  userId: string;
  userToken: string;
  pageId: string | number;
  onSuccess: (data: any) => void;
}

async function addRemoveWishlist(input: WishlistType) {
  const { onSuccess, ...wishlistInput } = input;
  const response:any = await http.post(API_ENDPOINTS.WISHLIST, wishlistInput);
  return {
    data: response?.data?.responseJson,
    onSuccess
  }
}

export const useWishlistMutation = () => {
  return useMutation((input: WishlistType) => addRemoveWishlist(input), {
    onSuccess: (response) => {
      response.onSuccess(response.data);
    },
    onError: (data) => {
      console.log(data, "add/remove wishlist error response");
    },
  });
};

async function fetchWishlist(input: GetWishlistType) {
	const { onSuccess, ...productInput } = input;
  const response = await http.post(API_ENDPOINTS.GET_WISHLIST, productInput);
  const statusCode = response?.data?.statusCode;
  return {
		data: {
			pages: statusCode !== 200 ? [] : response?.data?.responseJson,
			totalPages: response?.data?.pages,
			totalProduct: response?.data?.totalProduct,
		},
		onSuccess,
	};
}
export const useWishlistQueryMutation = () => {
  return useMutation((input: GetWishlistType) => fetchWishlist(input), {
    onSuccess: (response: any) => {
			response.onSuccess(response.data);
    },
    onError: (data) => {
      console.log(data, "get wishlist error response");
    },
  });
};

