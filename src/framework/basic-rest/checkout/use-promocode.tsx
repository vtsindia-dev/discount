import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

export type PromocodeType = {
	promoCode: string;
	onSuccess: (data: any) => void;
};

async function promocodeOffer(input: PromocodeType) {
	const { promoCode, onSuccess } = input
	const response = await http.post(API_ENDPOINTS.PROMOCODE, { promoCode });
  return {
		data: response?.data?.responseJson,
		statusCode: response?.data?.statusCode,
		onSuccess
	}
}
export const usePromocodeMutation = () => {
  return useMutation((input: PromocodeType) => promocodeOffer(input), {
    onSuccess: (response) => {
			const props = {
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        closeButton: <></>
      }
      if (response.statusCode === 200) {
				response.onSuccess(response.data);
				toast("Promo code applied successfully", {
          type: "success",
          position: "bottom-center",
          ...props
        });
			} else {
				response.onSuccess("");
				toast("Invalid promo code", {
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

