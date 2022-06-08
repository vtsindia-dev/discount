import cn from "classnames";
import React, { SelectHTMLAttributes } from "react";
import { useTranslation } from "next-i18next";

export interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
	className?: string;
	inputClassName?: string;
	labelKey?: string;
	placeholderKey?: string;
	name: string;
	errorKey?: string;
	type?: string;
	shadow?: boolean;
	options: object[];
	variant?: "normal" | "solid" | "outline";
}
const classes = {
	root:
		"py-2 px-4 md:px-5 w-full appearance-none transition duration-150 ease-in-out border text-input text-xs lg:text-sm font-body rounded-md placeholder-body min-h-12 transition duration-200 ease-in-out",
	normal:
		"bg-gray-100 border-gray-300 focus:shadow focus:bg-white focus:border-primary",
	solid:
		"bg-white border-gray-300 focus:outline-none focus:border-heading h-11 md:h-12",
	outline: "border-gray-300 focus:border-primary",
	shadow: "focus:shadow",
};
const Select = React.forwardRef<HTMLSelectElement, Props>(
	(
		{
			className = "block",
			labelKey,
			name,
			errorKey,
			placeholderKey,
			variant = "normal",
			shadow = false,
			type = "text",
			inputClassName,
			disabled = false,
			options,
			defaultValue,
			...rest
		},
		ref
	) => {
		const rootClassName = cn(
			classes.root,
			{
				[classes.normal]: variant === "normal",
				[classes.solid]: variant === "solid",
				[classes.outline]: variant === "outline",
			},
			{
				[classes.shadow]: shadow,
			},
			inputClassName
		);
		const { t } = useTranslation();

		return (
			<div className={className}>
				{labelKey && (
					<label
						htmlFor={name}
						className="block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer"
					>
						{t(labelKey)}
					</label>
				)}
				<select id={name}
					name={name}
					ref={ref}
					className={cn(rootClassName, disabled && 'opacity-50')}
					autoComplete="off"
					spellCheck="false"
					aria-invalid={errorKey ? "true" : "false"}
					disabled={disabled}
					defaultValue={defaultValue}
					{...rest}
				>
					<option value={""} disabled></option>
					{options.map((option: any) => (
						<option value={option.id} selected={Boolean(rest.value === option.id) || Boolean(defaultValue === option.id)}>{option.name}</option>
					))}
				</select>
				{errorKey && <p className="my-2 text-xs text-red-500">{t(errorKey)}</p>}
			</div>
		);
	}
);

export default Select;
