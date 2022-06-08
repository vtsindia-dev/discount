import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

export interface SubscriptionType {
  subscription_email: string | number;
  userId: string | number;
  userToken: string | number;
  onSuccess: () => void;
}
async function subscription(input: SubscriptionType) {
  const { onSuccess, ...subscriptionInput } = input;
  const response:any = await http.post(API_ENDPOINTS.SUBSCRIPTION, subscriptionInput);
  return {
    data: response?.data,
    onSuccess
  }
}
export const useSubscriptiontMutation = () => {
  return useMutation((input: SubscriptionType) => subscription(input), {
    onSuccess: (response) => {
      const props:any = {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        closeButton: <></>
      }
      if (response?.data?.statusCode) {
        toast("Subscription added successfully", {
          type: "success",
          ...props
        });
      } else {
        toast("Something went wrong, please try again later", {
          type: "success",
          ...props
        });
      }
      response.onSuccess();
    },
    onError: (data) => {
      console.log(data, "Subscription error response");
    },
  });
};
