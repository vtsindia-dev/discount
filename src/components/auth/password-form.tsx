import React, { useRef } from "react";
import PasswordInput from "@components/ui/password-input";
import Button from "@components/ui/button";
import { useForm } from "react-hook-form";
import { PasswordInputType, SetPasswordInputType } from "@framework/auth/use-signup";
import { useTranslation } from "next-i18next";
import { usePasswordMutation } from "@framework/auth/use-signup";
import { useUI } from "@contexts/ui.context";

type PasswordFormProps = {
	open: boolean;
	onSuccess: () => void;
	userId: string;
	forgotPassword: boolean;
};

const PasswordForm: React.FC<PasswordFormProps> = (props) => {
	const { t } = useTranslation();
	const { passwordType } = useUI();
	const { open, onSuccess, userId, forgotPassword = false } = props;
	const { mutate: setPassword, isLoading } = usePasswordMutation();
	const {
		register: passwordRegister,
		handleSubmit: handleSetPasswordSubmit,
		formState: { errors: passwordErrors },
		watch
	} = useForm<PasswordInputType>();
	const password = useRef({});
  password.current = watch("password", "");

	function onSetPassword({ password }: SetPasswordInputType) {
		setPassword({ password, userId, forgotPassword, onSuccess });
	}

	if (!open) {
		return null;
	}
	const buttonText = passwordType === "FORGET_PASSWORD" ? "text-reset-password" : "text-set-password"
	return (
		<form
			onSubmit={handleSetPasswordSubmit(onSetPassword)}
			className="flex flex-col justify-center"
			noValidate
		>
			<div className="flex flex-col space-y-4">
				<PasswordInput
					labelKey="forms:label-password-star"
					errorKey={passwordErrors.password?.message}
					{...passwordRegister("password", {
						required: `${t("forms:password-required")}`,
						minLength: {
							value: 8,
							message: "Password must have at least 8 characters"
						},
						validate: value =>
							Boolean(value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,32})/)) || "Password didn’t match the criteria",
					})}
				/>
				<PasswordInput
					labelKey="forms:label-confirm-password"
					errorKey={passwordErrors.confirmPassword?.message}
					{...passwordRegister("confirmPassword", {
						required: `${t("forms:confirmPassword-required")}`,
						validate: value =>
							value === password.current || "Password did not matched"
					})}
				/>
				<label className="text-sm mt-4">Note: Use 8 - 32 characters with a mix of uppercase letters, lowercase letters, numbers & symbols.</label>
				<div className="relative flex flex-col sm:flex-row !mt-8">
					<Button
						type="submit"
						className="h-11 md:h-12 w-full ml-0 sm:ml-3 mt-4 sm:mt-0"
						loading={isLoading}
						disabled={isLoading}
					>
						{t(`common:${buttonText}`)}
					</Button>
				</div>
			</div>
		</form>
	);
};

export default PasswordForm;
