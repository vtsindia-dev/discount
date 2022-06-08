import Input from "@components/ui/input";
import { useForm } from "react-hook-form";
import { useAddressMutation } from "@framework/address/use-address";
import Button from "@components/ui/button";
import { useTranslation } from "next-i18next";
import { useUI } from "@contexts/ui.context";
import { getToken } from "@framework/utils/get-token";
import { toast, TypeOptions } from "react-toastify";
import { useAddressQuery } from '@framework/address/get-all-address';
import Select from '@components/ui/select';
import { isEmpty } from 'lodash';

interface ShippingInputType {
	firstName: string;
	lastName: string;
	phone: string;
	email: string;
	address1: string;
	address2: string;
	city: string;
	zipCode: string;
	optionalPhone: string;
	id?: string | number;
}

const CheckoutShippingPopup: React.FC = () => {
	const { t } = useTranslation();
	const { mutate: updateUser, isLoading } = useAddressMutation();
	const { closeModal, accountDetails, setAddedAddress, modalData: { data } } = useUI();
	const { data: shippingDetails, refetch } = useAddressQuery({ userId: accountDetails.user_id, userToken: getToken() || "" });
	const {
		firstName = '',
		lastName = '',
		phone = '',
		email = '',
		address1 = '',
		address2 = '',
		city = '',
		zipCode = '',
		optionalPhone = '',
		id = ''
	} = data
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ShippingInputType>();
	function onSubmit(input: ShippingInputType) {
		const { firstName, lastName, ...remainingInput } = input;
		const name = `${firstName} ${lastName}`;
		updateUser({
			name,
			userId: accountDetails.user_id,
			userToken: getToken() || '',
			...(id && { addressId: id }),
			...remainingInput,
			onSuccess: (data) => {
				refetch();
				setAddedAddress(data.addressId);
				showToastMessage('Address added successfully', 'success');
				closeModal();
			},
			onFailure: () => {
				showToastMessage('Failed to add address, please try again later', 'error');
			},
		});
	}

	function showToastMessage(message:string, type: TypeOptions) {
		toast(message, {
			type: type,
			position: "bottom-center",
			autoClose: 2000,
			hideProgressBar: true,
			closeOnClick: false,
			closeButton: <></>
		});
	}
	const cityList: any = shippingDetails?.cityList || [];

	return (
		<div className="bg-white px-5 py-7 w-full">
			<h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
				{t("text-shipping-address")}
			</h2>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="w-full mx-auto flex flex-col justify-center "
				noValidate
			>
				<div className="flex flex-col space-y-4 lg:space-y-5">
					<div className="flex flex-col lg:flex-row md:flex-row space-y-4 lg:space-y-0 md:space-y-0">
						<Input
							labelKey="forms:label-first-name"
							{...register("firstName", {
								required: "forms:first-name-required",
							})}
							errorKey={errors.firstName?.message}
							variant="solid"
							className="w-full lg:w-96 md:w-80 "
							defaultValue={firstName}
							/>
						<Input
							labelKey="forms:label-last-name"
							{...register("lastName", {
								required: "forms:last-name-required",
							})}
							errorKey={errors.lastName?.message}
							variant="solid"
							className="w-full lg:w-96 md:w-80 lg:ms-3 md:ms-3 mt-2 sm:mt-0"
							defaultValue={lastName}
						/>
					</div>
					<Input
						labelKey="forms:label-address1"
						{...register("address1", {
							required: "forms:address-required",
						})}
						errorKey={errors.address1?.message}
						variant="solid"
						defaultValue={address1}
					/>

					<div className="flex flex-col lg:flex-row md:flex-row space-y-4 lg:space-y-0 md:space-y-0">
						<Input
							labelKey="forms:label-address2"
							{...register("address2")}
							variant="solid"
							className="w-full lg:w-96 md:w-80"
							defaultValue={address2}
						/>
						<Input
							type="email"
							labelKey="forms:label-email"
							{...register("email", {
								pattern: {
									value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
									message: t("forms:email-error"),
								},
							})}
							errorKey={errors.email?.message}
							variant="solid"
							className="w-full lg:w-96 md:w-80 lg:ms-3 md:ms-3 mt-2 sm:mt-0"
							defaultValue={email}
						/>
					</div>

					<div className="flex flex-col lg:flex-row md:flex-row space-y-4 lg:space-y-0 md:space-y-0">
						<Input
							type="tel"
							labelKey="forms:label-phone"
							{...register("phone", {
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
							errorKey={errors.phone?.message}
							variant="solid"
							className="w-full lg:w-96 md:w-80"
							defaultValue={phone}
						/>
						<Input
							type="tel"
							labelKey="forms:label-phone-optional"
							{...register("optionalPhone", {
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
							className="w-full lg:w-96 md:w-80 lg:ms-3 md:ms-3 mt-2 sm:mt-0"
							defaultValue={optionalPhone}
						/>
					</div>
					<div className="flex flex-col lg:flex-row md:flex-row space-y-4 lg:space-y-0 md:space-y-0">
						<Select labelKey="forms:label-city-star"
							{...register("city", {
								required: "forms:city-required",
							})}
							options={cityList}
							variant="solid"
							className="w-full lg:w-96 md:w-80 "
							errorKey={errors.city?.message}
							defaultValue={city}
						/>
						<Input
							labelKey="forms:label-postcode-star"
							{...register("zipCode", {
								required: "forms:postalcode-required",
								pattern: {
									value: /^\d{6}$/,
									message: t("forms:zipcode-error"),
								},
							})}
							onKeyPress={(event) => {
								if (isEmpty(event?.key.match(new RegExp('^[0-9]+$'))) || event.currentTarget.value.length >= 6) {
									event.preventDefault();
								}
							}}
							variant="solid"
							className="w-full lg:w-96 md:w-80 lg:ms-3 md:ms-3 mt-2 sm:mt-0"
							errorKey={errors.zipCode?.message}
							defaultValue={zipCode}
						/>
					</div>
					<div className="flex w-full justify-end !mt-7">
						<div
							className="w-32 h-10 flex items-center justify-center text-primary rounded-md border-2 border-primary cursor-pointer"
							onClick={closeModal}
						>
							Cancel
						</div>
						<Button
							type="submit"
							className="w-32 ml-3 h-10"
							loading={isLoading}
							disabled={isLoading}
						>
							Save
						</Button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default CheckoutShippingPopup;
