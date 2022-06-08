import React, { useState } from "react";
import Button from "@components/ui/button";
import { useTranslation } from "next-i18next";
import { useWindowSize } from "@utils/use-window-size";
import OtpInput from 'react-otp-input';
import { useOtpMutation, usePasswordResetMutation } from "@framework/auth/use-signup";

type OtpFormProps = {
	open: boolean;
	onSuccess: (data: any) => void;
	handleBack: () => void;
	userId: string;
	userName: string;
	forgotPassword: boolean;
};

const OtpForm: React.FC<OtpFormProps> = (props) => {
	const { t } = useTranslation();
	const { open, handleBack, onSuccess, userId, forgotPassword, userName } = props;
	const { mutate: verifyOtp, isLoading } = useOtpMutation();
	const { mutate: verifyPasswordResetOtp, isLoading:isPasswordResetLoading } = usePasswordResetMutation();
	const { width } = useWindowSize();
	const [otp, setOtp] = useState<string>('');

	function handleConfirmOtp() {
		verifyOtp({ userId, otp, onSuccess });
	}
	
	function handleConfirmPasswordResetOtp() {
		verifyPasswordResetOtp({ userName, otp, onSuccess });
	}

	let inputStyle: any = { borderBottom: '1px solid black', color: 'black' };
	const separatorStyle = width < 768 ? { padding: '10px' } : { padding: '15px' };
	inputStyle = width < 768 ? { fontSize: 20, width: 28, ...inputStyle } : { fontSize: 20, width: 36, ...inputStyle };
	const focusStyle = { outline: 'none' };
	const containerStyle = { justifyContent: 'center' };

	if (!open) {
		return null;
	}

	function handleBackAction() {
		handleBack();
		setOtp('');
	}

	return (
		<div className="flex flex-col justify-center">
			<div className="flex flex-col space-y-4">
				<label
					className="block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer"
				>
					{t("common:text-enter-otp")}
				</label>
				<OtpInput
					value={otp}
					onChange={(otp: any) => setOtp(otp)}
					numInputs={6}
					separator={<span style={separatorStyle} />}
					inputStyle={inputStyle}
					focusStyle={focusStyle}
					containerStyle={containerStyle}
				/>
				<div className="relative flex flex-col sm:flex-row !mt-8">
					<Button
						onClick={handleBackAction}
						variant="flat"
						className={`w-full h-11 md:h-12 px-1.5 mr-0 sm:mr-3`}
						disabled={isLoading}
					>
						{t("common:text-back")}
					</Button>
					<Button
						onClick={forgotPassword ? handleConfirmPasswordResetOtp: handleConfirmOtp}
						disabled={otp.length < 6}
						loading={isLoading || isPasswordResetLoading}
						className="h-11 md:h-12 w-full ml-0 sm:ml-3 mt-4 sm:mt-0"
					>
						{t("common:text-confirm-otp")}
					</Button>
				</div>
			</div>
		</div>
	);
};

export default OtpForm;
