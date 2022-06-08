import React from "react";
import { useTranslation } from "next-i18next";
interface CheckBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
	labelKey?: string;
	label?: string | any;
	labelClassName?: string | any;
}
export const CheckBox = React.forwardRef<HTMLInputElement, CheckBoxProps>(
	({ labelKey, label, labelClassName = "", ...rest }, ref) => {
		const { t } = useTranslation();
		return (
			<label className={`group flex items-center text-heading text-sm cursor-pointer ${labelClassName}`}>
				<input
					type="checkbox"
					className="form-checkbox w-5 h-5 border border-gray-300 rounded cursor-pointer transition duration-500 ease-in-out focus:ring-offset-0 focus:outline-none focus:ring-0 focus-visible:outline-none checkbox"
					ref={ref}
					{...rest}
				/>
				{(labelKey || label) && <span className="ms-4 -mt-0.5">{labelKey ? t(labelKey) : label}</span>}
			</label>
		);
	}
);
