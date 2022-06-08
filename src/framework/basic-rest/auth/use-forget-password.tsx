import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import Cookies from "js-cookie";
import { useMutation } from "react-query";

export interface ForgetPasswordType {
  userName: string;
  onSuccess: (data: any) => void;
}
async function forgetPassword(input: ForgetPasswordType) {
  const { onSuccess, ...remainingForgetPassword } = input;
  const response:any = await http.post(API_ENDPOINTS.FORGET_PASSWORD, remainingForgetPassword);
  return {
    data: { ...response?.data?.responseJson || '' },
    onSuccess
  };
}
export const useForgetPasswordMutation = () => {
  return useMutation((input: ForgetPasswordType) => forgetPassword(input), {
    onSuccess: (response) => {
      Cookies.remove("auth_token");
      response.onSuccess(response.data);
    },
    onError: (data) => {
      console.log(data, "forget password error response");
    },
  });
};
