import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

export interface UpdateUserType {
  firstName: string;
  lastName: string;
  displayName: string;
  // phoneNumber: string;
  // email: string;
  // password: string;
  // confirmPassword: string;
  userId: string;
  userToken: string;
  gender: string;
}
async function updateUser(input: UpdateUserType) {
  const response = await http.post(API_ENDPOINTS.PROFILE_UPDATE, input);
  return response?.data;
}
export const useUpdateUserMutation = () => {
  return useMutation((input: UpdateUserType) => updateUser(input), {
    onSuccess: (response) => {
      const props = {
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        closeButton: <></>
      }
      if (response.statusCode === 200) {
        toast("Account details updated successfully", {
          type: "success",
          position: "bottom-center",
          ...props
        });
      } else {
        toast("Account details update failed, please try again later", {
          type: "error",
          position: "bottom-center",
          ...props
        });
      }
    },
    onError: (data) => {
      console.log(data, "UpdateUser error response");
    },
  });
};
