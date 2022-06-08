import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useMutation } from "react-query";

export interface CartType {
  productdataId: string | number;
  userId: string | number;
  userToken: string | number;
  quantity: string | number;
  onSuccess: (data: any) => void;
}
async function addToCart(input: CartType) {
  const { onSuccess, ...remainingCartInput } = input;
  const response:any = await http.post(API_ENDPOINTS.CART, remainingCartInput);
  return {
    data: { ...response?.data?.responseJson || '' },
    onSuccess
  };
}
export const useAddToCartMutation = () => {
  return useMutation((input: CartType) => addToCart(input), {
    onSuccess: (response) => {
      response.onSuccess(response.data);
    },
    onError: (data) => {
      console.log(data, "add/remove cart error response");
    },
  });
};
