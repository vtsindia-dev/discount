import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useMutation } from "react-query";

export interface SignUpInputType {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender: string;
  onSuccess: (data: any) => void;
}
export interface PasswordInputType {
  password: string;
  confirmPassword: string;
  forgotPassword: boolean;
}
export interface SetPasswordInputType {
  password: string;
  userId: string;
  onSuccess: () => void;
  forgotPassword: boolean;
}
export interface OtpInputType {
  otp: string;
  userId: string;
  onSuccess: (data: any) => void;
}
export interface PasswordResetOtpInputType {
  otp: string;
  userName: string;
  onSuccess: (data: any) => void;
}

// Mobile Number Verification
async function signUp(input: SignUpInputType) {
  const { onSuccess, ...verifyMobileInput } = input
  const response:any = await http.post(API_ENDPOINTS.VERIFY_MOBILE_NUMBER, verifyMobileInput);
  return {
    data: { ...response?.data?.responseJson || '' },
    onSuccess
  }
}
export const useSignUpMutation = () => {
  return useMutation((input: SignUpInputType) => signUp(input), {
    onSuccess: (response) => {
      response.onSuccess(response.data)
    },
    onError: (data) => {
      console.log(data, "signup error response");
    },
  });
};

// OTP Verification
async function verifyOtp(input: OtpInputType) {
  const { onSuccess, ...verifyOtpInput } = input
  const response:any = await http.post(API_ENDPOINTS.VERIFY_OTP, verifyOtpInput);
  return {
    data: { ...response?.data?.responseJson || '' },
    onSuccess
  }
}
export const useOtpMutation = () => {
  return useMutation((input: OtpInputType) => verifyOtp(input), {
    onSuccess: (response) => {
      response.onSuccess(response.data)
    },
    onError: (data) => {
      console.log(data, "otp verification error response");
    },
  });
};

// Password Reset OTP Verification
async function verifyPasswordResetOtp(input: PasswordResetOtpInputType) {
  const { onSuccess, ...verifyOtpInput } = input
  const response:any = await http.post(API_ENDPOINTS.FORGET_PASSWORD, verifyOtpInput);
  return {
    data: { ...response?.data?.responseJson || '' },
    onSuccess
  }
}
export const usePasswordResetMutation = () => {
  return useMutation((input: PasswordResetOtpInputType) => verifyPasswordResetOtp(input), {
    onSuccess: (response) => {
      response.onSuccess(response.data)
    },
    onError: (data) => {
      console.log(data, "reset password -> otp verification error response");
    },
  });
};

// Set Password
async function setPassword(input: SetPasswordInputType) {
  const { onSuccess, ...registerInput } = input
  const response:any = await http.post(API_ENDPOINTS.REGISTER, registerInput);
  return {
    data: { ...response?.data?.responseJson || '' },
    onSuccess
  }
}
export const usePasswordMutation = () => {
  return useMutation((input: SetPasswordInputType) => setPassword(input), {
    onSuccess: (response) => {
      response.onSuccess()
    },
    onError: (data) => {
      console.log(data, "set password error response");
    },
  });
};