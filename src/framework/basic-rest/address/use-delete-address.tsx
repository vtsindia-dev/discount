import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

export interface DeleteAddressInputType {
  addressId: string;
  onSuccess: () => void;
}
async function deleteAddress(input: DeleteAddressInputType) {
  const { onSuccess, ...deleteAddressInput } = input;
  const response = await http.post(API_ENDPOINTS.DELETE_ADDRESS, deleteAddressInput);
  return {
    data: response?.data?.responseJson,
    statusCode: response?.data?.statusCode,
    onSuccess
  };
}
export const useDeleteAddressMutation = () => {
  return useMutation((input: DeleteAddressInputType) => deleteAddress(input), {
    onSuccess: (response) => {
      const props = {
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        closeButton: <></>
      }
      if (response.statusCode === 200) {
        response.onSuccess();
        toast("Address deleted successfully", {
          type: "success",
          position: "bottom-center",
          ...props
        });
      } else {
        toast("Address delete failed, please try again later", {
          type: "error",
          position: "bottom-center",
          ...props
        });
      }
    },
    onError: (data) => {
      console.log(data, "delete address error response");
    },
  });
};
