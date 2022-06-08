import React, { useState } from 'react';
import Button from "@components/ui/button";
import Input from "@components/ui/input";
import { useForm } from "react-hook-form";
import { useUI } from "@contexts/ui.context";
import { useTranslation } from "next-i18next";
import { useWindowSize } from "@utils/use-window-size";
import { siteSettings } from "@settings/site-settings";
import { toast, TypeOptions } from "react-toastify";
import { useForgetPasswordMutation } from "@framework/auth/use-forget-password";

import OtpForm from './otp-form';
import PasswordForm from './password-form';

type FormValues = {
	userName: string;
};

const defaultValues = {
	userName: "",
};

const ForgetPasswordForm = () => {
	const { t } = useTranslation();
	const { setModalView, openModal, closeModal } = useUI();
	const { width } = useWindowSize();
	const { mutate: forgetPassword, isLoading } = useForgetPasswordMutation();
	const [showOtpScreen, setOtpScreen] = useState<boolean>(false);
	const [showPasswordScreen, setPasswordScreen] = useState<boolean>(false);
	const [userId, setUserId] = useState<string>("");
	const [userName, setUserName] = useState<string>("");
	const logoSize = width < 768 ? 160 : 200;
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>({
		defaultValues,
	});

	function handleSignIn() {
		setModalView("LOGIN_VIEW");
		return openModal();
	}

	const onSubmit = ({ userName }: FormValues) => {
		forgetPassword({ userName, onSuccess: handleSuccessCbk })
	};

	function handlePasswordSuccess() {
		setModalView("REGISTER_SUCCESS_VIEW");
		return openModal();
	}

	function showToastMessage(message:string, type: TypeOptions) {
		toast(message, {
			type: type,
			position: width > 768 ? "bottom-center" : "top-center",
			autoClose: 2000,
			hideProgressBar: true,
			closeOnClick: false,
			closeButton: <></>
		});
	}

	function handleOtpSuccess(data:any) {
		if (data?.userId) {
			setUserId(data.userId);
			setOtpScreen(false);
			setPasswordScreen(true);
			showToastMessage("OTP verified successfully", "success");
		} else {
			showToastMessage(data.message, "error");
		}
	}

	function handleOtpBack() {
		setOtpScreen(false)
	}

	function handleSuccessCbk(data:any) {
		if (data?.userName) {
			setUserName(data.userName);
			setOtpScreen(true);
			showToastMessage("OTP sent to given E-Mail / Phone Number", "dark");
		} else {
			showToastMessage(data.message, "error");
		}
	}

	return (
		<div className="py-6 px-5 sm:p-8 bg-white mx-auto rounded-lg w-full sm:w-96 md:w-450px border border-gray-300">
			<div className="text-center mb-8 pt-2.5">
				<div onClick={closeModal} className="flex justify-center mb-4">
					<img src={siteSettings.logo.url} alt={siteSettings.logo.alt} width={logoSize} />
				</div>
				{!showPasswordScreen && !showOtpScreen && <p className="text-sm md:text-base text-body mt-3 sm:mt-4 mb-8 sm:mb-10">
					{t("common:forgot-password-helper")}
				</p>}
			</div>
			{!showPasswordScreen && !showOtpScreen && <form
				onSubmit={handleSubmit((data) => onSubmit(data))}
				className="flex flex-col justify-center"
				noValidate
			>
				<Input
					labelKey="forms:label-email-phone"
					type="text"
					variant="solid"
					className="mb-4"
					{...register("userName", {
						required: `${t("forms:email-phone-required")}`
					})}
					errorKey={errors.userName?.message}
				/>

				<Button type="submit" className="h-11 md:h-12 w-full mt-2" loading={isLoading}>
					{t("common:text-reset-password")}
				</Button>
			</form>}
			<OtpForm open={showOtpScreen} handleBack={handleOtpBack} onSuccess={handleOtpSuccess} userName={userName} userId="" forgotPassword />
			<PasswordForm open={showPasswordScreen} onSuccess={handlePasswordSuccess} userId={userId} forgotPassword />
			<div className="flex flex-col items-center justify-center relative text-sm text-heading mt-8 sm:mt-10 mb-6 sm:mb-7">
				<hr className="w-full border-gray-300" />
				<span className="absolute -top-2.5 px-2 bg-white">
					{t("common:text-or")}
				</span>
			</div>
			<div className="text-sm sm:text-base text-body text-center">
				{t("common:text-back-to")}{" "}
				<button
					type="button"
					className="text-sm sm:text-base text-heading underline font-bold hover:no-underline focus:outline-none"
					onClick={handleSignIn}
				>
					{t("common:text-login")}
				</button>
			</div>
		</div>
	);
};

export default ForgetPasswordForm;
