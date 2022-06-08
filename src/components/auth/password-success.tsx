import React from "react";
import Button from "@components/ui/button";
import { useTranslation } from "next-i18next";
import { FaCheckCircle } from 'react-icons/fa';
import { useUI } from "@contexts/ui.context";
import { useWindowSize } from "@utils/use-window-size";
import Text from "@components/ui/text";

const PasswordSuccessScreen: React.FC = () => {
	const { t } = useTranslation();
	const { setModalView, openModal, passwordType } = useUI();
	const { width } = useWindowSize();

	function handleSignIn() {
		setModalView("LOGIN_VIEW");
		return openModal();
	}
	const iconSize = width < 1025 ? 40 : 50;
	const message = passwordType === "FORGET_PASSWORD" ? "Password reset successfully!" : "Registration completed successfully!"
	return (
		<div className="flex flex-col space-y-4 items-center text-center bg-white p-6 md:p-8">
			<FaCheckCircle size={iconSize} color="green" />
			<Text variant="mediumHeading"
				className="mb-4 md:mb-5 lg:mb-6 xl:mb-5 2xl:mb-6 3xl:mb-8 xl:text-2xl"
			>{message}</Text>
			<label
				className="block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer"
			>
				Please click on login button to sign in
			</label>
			<div className="relative flex flex-col sm:flex-row !mt-8 w-full">
				<Button
					onClick={handleSignIn}
					className="h-11 md:h-12 w-full max-w-xs flex m-auto"
				>
					{t("common:text-login")}
				</Button>
			</div>
		</div>
	);
};

export default PasswordSuccessScreen;
