// import { Product } from "@framework/types";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useMutation } from "react-query";
// import { constructQueryParam } from "@framework/utils/helper";
import { toast } from "react-toastify";

export type ContactFormValues = {
    name: string;
    email: string;
    subject: string;
    message: string;
    onSuccess: () => void;
}

async function postContactForm(values: ContactFormValues) {
    const { onSuccess, ...remainingValues } = values;
    const response = await http.post(API_ENDPOINTS.CONTACTUS, remainingValues);
    return {
        data: response?.data,
        onSuccess
    };
}
export const usePostContactForm = () => {
    return useMutation((values: ContactFormValues) => postContactForm(values), {
        onSuccess: (response: any) => {
            const props: any = {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: false,
                closeButton: <></>
            }
            if (response?.data?.statusCode)
                toast(response?.data?.responseJson?.message, {
                    type: "success",
                    ...props
                });
            response.onSuccess(response.data);
        },
        onError: (data) => {
            console.log(data, "get all products error response");
        },
    });
};
