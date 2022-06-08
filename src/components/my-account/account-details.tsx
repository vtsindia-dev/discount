import Input from "@components/ui/input";
import Button from "@components/ui/button";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { fadeInTop } from "@utils/motion/fade-in-top";
import { useUI } from "@contexts/ui.context";
import {
	useUpdateUserMutation,
	UpdateUserType,
} from "@framework/customer/use-update-customer";
import { RadioBox } from "@components/ui/radiobox";
import { useTranslation } from "next-i18next";
import { isEmpty } from "lodash";
import { useEffect } from "react";
import { getToken } from "@framework/utils/get-token";

let initialValueAssigned = false;
const AccountDetails: React.FC = () => {
	const { mutate: updateUser, isLoading } = useUpdateUserMutation();
	const { t } = useTranslation();
	const { accountDetails } = useUI();
	const { display_name: displayName, email, first_name: firstName, last_name: lastName,	phone_number, gender = '' } = accountDetails;
	const defaultValues = { displayName, firstName, lastName, gender };

	const {
		register,
		handleSubmit,
		getValues,
		reset,
		formState: { errors },
	} = useForm<UpdateUserType>({
		defaultValues,
	});

	useEffect(() => {
		if (!isEmpty(accountDetails?.user_id) && !initialValueAssigned) {
			reset(defaultValues);
			initialValueAssigned = true
		}
	}, [accountDetails])

	function onSubmit(input: UpdateUserType) {
		updateUser({ ...input, userId: accountDetails?.user_id || '', userToken: getToken() || "" });
	}

	return (
		<motion.div
			layout
			initial="from"
			animate="to"
			exit="from"
			//@ts-ignore
			variants={fadeInTop(0.35)}
			className={`w-full flex flex-col`}
		>
			<h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
				{t("common:text-account-details")}
			</h2>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="w-full mx-auto flex flex-col justify-center "
				noValidate
			>
				<div className="flex flex-col space-y-4 sm:space-y-5">
					<div className="flex flex-col sm:flex-row sm:space-s-3 space-y-4 sm:space-y-0">
						<Input
							labelKey="forms:label-first-name"
							{...register("firstName", {
								required: "forms:first-name-required",
							})}
							defaultValue={getValues("firstName")}
							variant="solid"
							className="w-full sm:w-1/2"
							errorKey={errors.firstName?.message}
						/>
						<Input
							labelKey="forms:label-last-name"
							{...register("lastName", {
								required: "forms:last-name-required",
							})}
							defaultValue={getValues("lastName")}
							variant="solid"
							className="w-full sm:w-1/2"
							errorKey={errors.lastName?.message}
						/>
					</div>
					<Input
						labelKey="forms:label-display-name"
						{...register("displayName", {
							required: "forms:display-name-required",
						})}
						defaultValue={getValues("displayName")}
						variant="solid"
						errorKey={errors.displayName?.message}
					/>
					<div className="flex flex-col sm:flex-row sm:space-s-3 space-y-4 sm:space-y-0">
						<Input
							type="tel"
							labelKey="forms:label-phone"
							name="phoneNumber"
							value={phone_number}
							defaultValue={phone_number}
							variant="solid"
							className="w-full sm:w-1/2"
							disabled
						/>
						<Input
							type="email"
							labelKey="forms:label-email-star"
							name="email"
							defaultValue={email}
							value={email}
							variant="solid"
							className="w-full sm:w-1/2"
							disabled
						/>
					</div>
					<div className="relative flex flex-col">
						<span className="mt-2 text-sm text-heading font-semibold block pb-1">
							{t("common:text-gender")}
						</span>
						<div className="mt-2 flex items-center space-s-6">
							<RadioBox
								labelKey="forms:label-male"
								{...register("gender")}
								value="male"
								defaultChecked={getValues("gender") === 'male'}
							/>
							<RadioBox
								labelKey="forms:label-female"
								{...register("gender")}
								value="female"
								defaultChecked={getValues("gender") === 'female'}
							/>
						</div>
					</div>
					<div className="relative">
						<Button
							type="submit"
							loading={isLoading}
							disabled={isLoading}
							className="h-12 mt-3 w-full sm:w-32"
						>
							{t("common:button-save")}
						</Button>
					</div>
				</div>
			</form>
		</motion.div>
	);
};

export default AccountDetails;
