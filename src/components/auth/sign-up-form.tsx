import React, { useState } from "react";
import Input from "@components/ui/input";
import Button from "@components/ui/button";
import { useForm } from "react-hook-form";
import { useUI } from "@contexts/ui.context";
import { useSignUpMutation, SignUpInputType } from "@framework/auth/use-signup";
import Link from "@components/ui/link";
import { ROUTES } from "@utils/routes";
import { useTranslation } from "next-i18next";
import { useWindowSize } from "@utils/use-window-size";
import { siteSettings } from "@settings/site-settings";
import { toast, TypeOptions } from "react-toastify";
import { RadioBox } from "@components/ui/radiobox";
import { isEmpty } from "lodash";

import OtpForm from './otp-form';
import PasswordForm from './password-form';

const SignUpForm: React.FC = () => {
	const { t } = useTranslation();
	const { mutate: signUp, isLoading } = useSignUpMutation();
	const { setModalView, openModal, closeModal } = useUI();
	const { width } = useWindowSize();
	const [showOtpScreen, setOtpScreen] = useState<boolean>(false);
	const [showPasswordScreen, setPasswordScreen] = useState<boolean>(false);
	const [userId, setUserId] = useState<string>("");
	const logoSize = width < 768 ? 160 : 200;
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignUpInputType>();

	function handleSignIn() {
		setModalView("LOGIN_VIEW");
		return openModal();
	}

	function onSignUp({ firstName, lastName, email, phoneNumber, gender }: SignUpInputType) {
		signUp({
			email,
			firstName,
			lastName,
			phoneNumber,
			gender: gender ? gender : '',
			onSuccess: handleSuccessCbk
		});
	}

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

	function handleOtpSuccess() {
		setOtpScreen(false);
		setPasswordScreen(true);
		showToastMessage("OTP verified successfully", "success");
	}

	function handleOtpBack() {
		setOtpScreen(false)
	}

	function handleSuccessCbk(data:any) {
		if (data.isAlreadyRegistered) {
			showToastMessage(data.message, "error");
		} else {
			setUserId(data.userId);
			setOtpScreen(true);
			// showToastMessage("OTP sent to your registered mobile number", "dark");
			showToastMessage("OTP sent to your registered Email ID", "dark");
		}
	}

	return (
		<div className="py-6 px-5 sm:p-8 bg-white mx-auto rounded-lg w-full sm:w-96 md:w-450px border border-gray-300">
			<div className="text-center mb-8 pt-2.5">
				<div onClick={closeModal} className="flex justify-center mb-4">
					<img src={siteSettings.logo.url} alt={siteSettings.logo.alt} width={logoSize} />
				</div>
				<p className="text-sm md:text-base text-body mt-3 sm:mt-4 mb-8 sm:mb-10">
					{t("common:registration-helper")}{" "}
					<Link
						href={ROUTES.TERMS}
						className="text-heading underline hover:no-underline focus:outline-none"
					>
						{t("common:text-terms")}
					</Link>{" "}
					&amp;{" "}
					<Link
						href={ROUTES.POLICY}
						className="text-heading underline hover:no-underline focus:outline-none"
					>
						{t("common:text-policy")}
					</Link>
				</p>
			</div>
			{!showPasswordScreen && !showOtpScreen && <form
				onSubmit={handleSubmit(onSignUp)}
				className="flex flex-col justify-center"
				noValidate
			>
				<div className="flex flex-col space-y-4">
					<Input
						labelKey="forms:label-first-name"
						type="text"
						variant="solid"
						{...register("firstName", {
							required: "forms:first-name-required",
						})}
						errorKey={errors.firstName?.message}
					/>
					<Input
						labelKey="forms:label-last-name"
						type="text"
						variant="solid"
						{...register("lastName", {
							required: "forms:last-name-required",
						})}
						errorKey={errors.lastName?.message}
					/>
					<Input
						labelKey="forms:label-email-star"
						type="email"
						variant="solid"
						{...register("email", {
							required: `${t("forms:email-required")}`,
							pattern: {
								value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
								message: t("forms:email-error"),
							},
						})}
						errorKey={errors.email?.message}
					/>
					<Input
						type="tel"
						labelKey="forms:label-phone"
						{...register("phoneNumber", {
							required: "forms:phone-required",
							pattern: {
								value: /^\d{10}$/,
								message: t("forms:phone-error"),
							},
						})}
						onKeyPress={(event) => {
							if (isEmpty(event?.key.match(new RegExp('^[0-9]+$'))) || event.currentTarget.value.length >= 10) {
								event.preventDefault();
							}
						}}
						variant="solid"
						errorKey={errors.phoneNumber?.message}
					/>
					<div className="relative flex flex-col">
						<span className="mt-2 text-sm text-heading font-semibold block pb-1">
							{t("common:text-gender")}
						</span>
						<div className="mt-2 flex items-center space-s-6">
							<RadioBox
								labelKey="forms:label-male"
								{...register("gender")}
								value="male"
							/>
							<RadioBox
								labelKey="forms:label-female"
								{...register("gender")}
								value="female"
							/>
						</div>
					</div>
					<div className="relative">
						<Button
							type="submit"
							loading={isLoading}
							disabled={isLoading}
							className="h-11 md:h-12 w-full mt-3"
						>
							{t("common:text-sign-up")}
						</Button>
					</div>
				</div>
			</form>}
			<OtpForm open={showOtpScreen} handleBack={handleOtpBack} onSuccess={handleOtpSuccess} userId={userId} userName="" forgotPassword={false} />
			<PasswordForm open={showPasswordScreen} onSuccess={handlePasswordSuccess} userId={userId} forgotPassword={false} />
			<div className="flex flex-col items-center justify-center relative text-sm text-heading mt-8 sm:mt-10 mb-6 sm:mb-7">
				<hr className="w-full border-gray-300" />
				<span className="absolute -top-2.5 px-2 bg-white">
					{t("common:text-or")}
				</span>
			</div>
			<div className="text-sm sm:text-base text-body text-center">
				{t("common:text-have-account")}{" "}
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

export default SignUpForm;
