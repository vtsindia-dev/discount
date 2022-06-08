import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useMutation } from "react-query";

export interface AddressInputType {
  name: string;
  phone: string;
  email: string;
  city: string;
  zipCode: string;
  address1: string;
  address2: string;
  optionalPhone: string;
  userId: string;
  userToken: string;
  onSuccess: (data: any) => void;
  onFailure: () => void;
}
async function address(input: AddressInputType) {
  const { onSuccess, onFailure, ...addressInput } = input;
  const response = await http.post(API_ENDPOINTS.ADD_ADDRESS, addressInput);
  return {
    data: response?.data?.responseJson,
    statusCode: response?.data?.statusCode,
    onSuccess,
    onFailure
  };
}
export const useAddressMutation = () => {
  return useMutation((input: AddressInputType) => address(input), {
    onSuccess: (response) => {
      if (response.statusCode === 200) {
        response.onSuccess(response.data);
      } else {
        response.onFailure();
      }
    },
    onError: (data) => {
      console.log(data, "Checkout error response");
    },
  });
};
