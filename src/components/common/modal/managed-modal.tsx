import { useUI } from "@contexts/ui.context";
import Modal from "./modal";
import dynamic from "next/dynamic";
const LoginForm = dynamic(() => import("@components/auth/login-form"));
const SignUpForm = dynamic(() => import("@components/auth/sign-up-form"));
const PasswordSuccessScreen = dynamic(() => import("@components/auth/password-success"));
const ForgetPasswordForm = dynamic(() =>
	import("@components/auth/forget-password-form")
);
const ProductPopup = dynamic(() => import("@components/product/product-popup"));
const ProductOffer = dynamic(() => import("@components/product/product-offer"));
const ImageFullScreenPopup = dynamic(() => import("@components/product/image-full-screen-popup"));
const CheckoutShippingPopup = dynamic(() => import("@components/checkout/checkout-shipping-popup"));
const OrderSuccess = dynamic(() => import("@components/order/order-success"));
const OrderFailure = dynamic(() => import("@components/order/order-failure"));
const WelcomeMessage = dynamic(() => import("@components/auth/welcome-message"));
const OrderConfirmation = dynamic(() => import("@components/order/order-confirmation"));
const ManagedModal: React.FC = () => {
	const { displayModal, closeModal, modalView } = useUI();
	const rootClassName = modalView === "IMAGE_FULL_SCREEN_VIEW" ? "p-0 !bg-white" : ""
	const childrenContainerClasses = modalView === "IMAGE_FULL_SCREEN_VIEW" ? "!rounded-none" : ""
	return (
		<Modal open={displayModal} onClose={closeModal} rootClassName={rootClassName} childrenContainerClasses={childrenContainerClasses}>
			{modalView === "LOGIN_VIEW" && <LoginForm />}
			{modalView === "SIGN_UP_VIEW" && <SignUpForm />}
			{modalView === "REGISTER_SUCCESS_VIEW" && <PasswordSuccessScreen />}
			{modalView === "FORGET_PASSWORD" && <ForgetPasswordForm />}
			{modalView === "PRODUCT_VIEW" && <ProductPopup />}
			{modalView === "PRODUCT_OFFER_VIEW" && <ProductOffer />}
			{modalView === "IMAGE_FULL_SCREEN_VIEW" && <ImageFullScreenPopup />}
			{modalView === "ADD_EDIT_ADDRESS_VIEW" && <CheckoutShippingPopup />}
			{modalView === "SET_ORDER_SUCCESS" && <OrderSuccess />}
			{modalView === "SET_ORDER_FAILURE" && <OrderFailure />}
			{modalView === "SET_WELCOME_MESSAGE" && <WelcomeMessage />}
			{modalView === "SET_COD_CONFIRMATION" && <OrderConfirmation />}
		</Modal>
	);
};

export default ManagedModal;
