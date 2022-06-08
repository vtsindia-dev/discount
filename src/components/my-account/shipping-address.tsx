import { useTranslation } from "next-i18next";
import { useUI } from "@contexts/ui.context";
import { useAddressQuery } from '@framework/address/get-all-address';
import { useDeleteAddressMutation } from '@framework/address/use-delete-address';
import { getToken } from "@framework/utils/get-token";
import Button from "@components/ui/button";
import { TiEdit } from "react-icons/ti";
import { AiOutlineDelete } from "react-icons/ai";
import { BiLoaderCircle } from 'react-icons/bi';

const ShippingAddress: React.FC = () => {
	const { t } = useTranslation();
	const { accountDetails, setModalData, setModalView, openModal } = useUI();
	const { data: addressList, refetch, isLoading } = useAddressQuery({ userId: accountDetails.user_id, userToken: getToken() || "" });
	const { mutate: deleteAddress, isLoading: deleteAddressLoading } = useDeleteAddressMutation();
	const shippingAddress: any = addressList?.userAddress ? addressList?.userAddress : [];
	const cityList: any = addressList?.cityList ? addressList?.cityList : [];
	const handleAddressPopup = (address: any) => {
		if (address) {
			const { name, ...remianingAddress } = address
			const firstName = name.split(' ')[0];
			const lastName = name.split(' ')[1];
			setModalData({ data: { firstName, lastName, ...remianingAddress } });
		} else {
			setModalData({ data: {} });
		}
		setModalView('ADD_EDIT_ADDRESS_VIEW');
		return openModal();
	}
	const handleDeleteAddress = (id: any) => {
		deleteAddress({
			addressId: id,
			onSuccess: refetch
		})
	}
	return (
		<>
		<div className="flex items-center justify-between mb-6 xl:mb-8">
			<h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading">
				{t("common:text-shipping-address")}
			</h2>
			<div className="text-primary text-base cursor-pointer" onClick={() => handleAddressPopup("")}>Add New Address</div>
			</div>
			{shippingAddress && shippingAddress.length
				? shippingAddress.map((address: any) => {
					const { name, address1, address2, city, state, zipCode, phone, id, optionalPhone } = address;
					const selectCity = cityList.find((list: any) => list.id === city);
					const selectState = state === "1" ? "tamil nadu" : ""
					const addressField = [address1, address2, selectCity.name, selectState, zipCode].filter(value => value && value).join(', ');
					const phoneNumber = [ phone, optionalPhone ].filter(value => value && value).join(', ');
					return (
						<div
							className={'py-7 px-5 rounded-md cursor-pointer border-b border-gray-100 rounded-none shipping-address'}
							key={id}
						>
							<div className="flex justify-between">
								<div>
									<div className="flex items-center capitalize">
										<div className="font-bold text-xl">{name}</div>
										<div className="ml-5">{phoneNumber}</div>
									</div>
									<div className="mt-1 capitalize">{addressField}</div>
								</div>
								<div className="flex gap-5">
									<TiEdit size={25} className="text-primary" onClick={() => handleAddressPopup(address)} />
									<AiOutlineDelete size={25} className="text-primary" onClick={() => handleDeleteAddress(id)}/>
								</div>
							</div>
						</div>
					)})
				: (	<div className="text-base cursor-pointer flex flex-col items-center mt-10">
						<span className="text-lg">No add address found</span>
						<Button className="w-6/12 min-w-max mt-5 h-10 " onClick={() => handleAddressPopup("")}>Add address</Button>
					</div>
				)
			}
			{isLoading && deleteAddressLoading && <div className="bg-gray-200 bg-opacity-50 absolute w-full h-full">
				<BiLoaderCircle color="#FF3D00" size="60" className="animate-spin flex m-auto absolute top-0 right-0 bottom-0 left-0" />
			</div>}
		</>
	);
};

export default ShippingAddress;
