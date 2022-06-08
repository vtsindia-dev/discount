import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useMutation } from "react-query";

export type CheckoutFailure = {
  payment_id: string;
  order_id: string;
  checkoutType: string;
  successCbk: () => void;
};

async function checkoutFailure(input: CheckoutFailure) {
  console.log("Failure Input -> ", input)
  const { successCbk , ...remainingInput} = input;
	const response = await http.post(API_ENDPOINTS.ORDER_FAILURE, remainingInput);
  console.log("Failure Response -> ",response)
  return {
		data: response?.data?.responseJson,
		statusCode: response?.data?.statusCode,
    successCbk
	}
}
export const useCheckoutFailureMutation = () => {
  return useMutation((input: CheckoutFailure) => checkoutFailure(input), {
    onSuccess: (response) => {
      // checkout failed
      response.successCbk();
    },
    onError: (data) => {
      console.log(data, "Checkout error response");
    },
  });
};

