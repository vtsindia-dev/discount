import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

export interface ChangePasswordInputType {
  currentPassword: string;
  password: string;
  onSuccess: () => void;
}
async function changePassword(input: ChangePasswordInputType) {
  const { onSuccess, ...changePasswordInput } = input;
  const response = await http.post(API_ENDPOINTS.CHANGE_PASSWORD, changePasswordInput);
  return {
    ...response?.data,
    onSuccess
  };
}
export const useChangePasswordMutation = () => {
  return useMutation(
    (input: ChangePasswordInputType) => changePassword(input),
    {
      onSuccess: (response) => {
        const props = {
          hideProgressBar: true,
          closeOnClick: false,
          closeButton: <></>
        }
        if (response.statusCode === 200) {
          toast("Sign In again to proceed", {
            type: "dark",
            position: "bottom-center",
            autoClose: 5000,
            ...props
          });
          toast("Password updated successfully", {
            type: "success",
            position: "bottom-center",
            autoClose: 5000,
            ...props
          });
          response.onSuccess();
        } else {
          toast(response?.responseJson?.message, {
            type: "error",
            position: "bottom-center",
            autoClose: 2000,
            ...props
          });
        }
      },
      onError: (data) => {
        console.log(data, "ChangePassword error response");
      },
    }
  );
};
