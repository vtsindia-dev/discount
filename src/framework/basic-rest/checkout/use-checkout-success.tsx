import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useMutation } from "react-query";

export type CheckoutSuccess = {
  payment_id: string;
  order_id: string;
  checkoutType: string;
  successCbk: () => void;
};

async function checkoutSuccess(input: CheckoutSuccess) {
  console.log("input -> ", input);
  const { successCbk , ...remainingInput} = input;
	const response = await http.post(API_ENDPOINTS.ORDER_SUCCESS, remainingInput);
  console.log("API Response -> ", response);
  console.log("JSON Response -. ", JSON.stringify(response));
  return {
		data: response?.data?.responseJson,
		statusCode: response?.data?.statusCode,
    successCbk
	}
}
export const useCheckoutSuccessMutation = () => {
  return useMutation((input: CheckoutSuccess) => checkoutSuccess(input), {
    onSuccess: (response) => {
      // checkout success
      response.successCbk();
    },
    onError: (data) => {
      console.log(data, "Checkout error response");
    },
  });
};

