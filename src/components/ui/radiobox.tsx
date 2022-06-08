import React from "react";
import { useTranslation } from "next-i18next";
interface RadioBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
	labelKey: string | React.ReactElement;
	labelClassName?: string;
	className?: string;
}
export const RadioBox = React.forwardRef<HTMLInputElement, RadioBoxProps>(
	({ labelKey, labelClassName = '', className = '', ...rest }, ref) => {
		const { t } = useTranslation("forms");
		return (
			<label className={`group flex items-center text-heading text-sm cursor-pointer ${className}`}>
				<input
					type="radio"
					className="form-radio w-5 h-5 border rounded-full cursor-pointer transition duration-500 ease-in-out focus:ring-offset-0 focus:outline-none focus:ring-0 focus-visible:outline-none radio-button"
					ref={ref}
					{...rest}
				/>
				<span className={`ms-2 text-sm text-heading relative ${labelClassName}`}>
					{t(`${labelKey}`)}
				</span>
			</label>
		);
	}
);
