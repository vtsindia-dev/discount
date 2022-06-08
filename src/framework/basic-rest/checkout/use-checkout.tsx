import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

export interface CheckoutInputType {
  shipping_address_id: string;
  delivery_type: string;
  promocode: string;
  payment_method: string;
  productDataId: string;
  price: string;
  discount: string;
  checkoutType: string;
  onSuccess: (data: any) => void;
}
async function checkout(input: CheckoutInputType) {
  const { onSuccess, ...remainingCheckoutInput } = input;
  const response = await http.post(API_ENDPOINTS.CHECKOUT, remainingCheckoutInput);
  return {
    data: response?.data?.responseJson,
    statusCode: response?.data?.statusCode,
    onSuccess
  };
}
export const useCheckoutMutation = () => {
  return useMutation((input: CheckoutInputType) => checkout(input), {
    onSuccess: (response) => {
      const props = {
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        closeButton: <></>
      }
      if (response.statusCode === 200) {
        response.onSuccess(response.data);
      } else {
        toast("Something went wrong, please try again later", {
          type: "error",
          position: "bottom-center",
          ...props
        });
      }
    },
    onError: (data) => {
      console.log(data, "Checkout error response");
    },
  });
};
