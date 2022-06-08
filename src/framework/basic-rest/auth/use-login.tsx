import { useUI } from "@contexts/ui.context";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import Cookies from "js-cookie";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

export interface LoginInputType {
  userName: string;
  password: string;
  remember_me: boolean;
}
async function login(input: LoginInputType) {
  const response = await http.post(API_ENDPOINTS.LOGIN, input);
  return { ...response?.data };
}
export const useLoginMutation = () => {
  const { authorize, closeModal, setAccountDetails } = useUI();
  return useMutation((input: LoginInputType) => login(input), {
    onSuccess: (response: any) => {
      const { statusCode, responseJson } = response
      const props = {
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        closeButton: <></>
      }
      if (statusCode === 200) {
        toast("Logged in successfully", {
          type: "success",
          position: "bottom-center",
          ...props
        });
        Cookies.set("auth_token", responseJson.token);
        setAccountDetails(responseJson);
        authorize();
        closeModal();
        window.location.reload();
      } else {
        toast("E-Mail/Phone Number or Password is incorrect", {
          type: "error",
          position: "bottom-center",
          ...props
        });
      }
    },
    onError: (data) => {
      console.log(data, "login error response");
    },
  });
};
