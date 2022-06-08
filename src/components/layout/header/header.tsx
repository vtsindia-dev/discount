import React, { useRef } from "react";
import SearchIcon from "@components/icons/search-icon";
import { useCart } from "@contexts/cart/cart.context";
import { additionalMenu } from "@settings/site-settings";
import HeaderMenu from "@components/layout/header/header-menu";
import Logo from "@components/ui/logo";
import { useUI } from "@contexts/ui.context";
import { ROUTES } from "@utils/routes";
import { addActiveScroll } from "@utils/add-active-scroll";
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";
import { useMenuListQuery } from "@framework/home/get-menu-list";
import { useCartQuery } from "@framework/cart/get-all-cart";
import { useEffect } from "react";
import { get } from 'lodash';
import { useRouter } from "next/router";
// import LanguageSwitcher from "@components/ui/language-switcher";
const AuthMenu = dynamic(() => import("./auth-menu"), { ssr: false });
const CartButton = dynamic(() => import("@components/cart/cart-button"), {
	ssr: false,
});

type DivElementRef = React.MutableRefObject<HTMLDivElement>;
// const { site_header } = siteSettings;
const Header: React.FC = () => {
	const {
		openSidebar,
		setDrawerView,
		openSearch,
		openModal,
		setModalView,
		isAuthorized
	} = useUI();
	const { data: cartData } = useCartQuery();
	const { setCartItems } = useCart();
	const { t } = useTranslation("common");
	const siteHeaderRef = useRef() as DivElementRef;
	addActiveScroll(siteHeaderRef);
	const { data } = useMenuListQuery();
	const { route } = useRouter();

	function handleLogin() {
		setModalView("LOGIN_VIEW");
		return openModal();
	}
	function handleMobileMenu() {
		setDrawerView("MOBILE_MENU");
		return openSidebar();
	}

	useEffect(() => {
		if (isAuthorized) {
			if (get(cartData, 'totalItems', '')) {
				const { item, totalItems, totalUniqueItems, total } = cartData;
				setCartItems(item, totalItems, totalUniqueItems, total);
			} else {
				setCartItems([], 0 , 0, 0);
			}
		}
	}, [cartData, isAuthorized])

	return (
		<header
			id="siteHeader"
			ref={siteHeaderRef}
			className="w-full h-16 sm:h-20 lg:h-24 relative z-20"
		>
			<div className="innerSticky text-gray-700 body-font fixed bg-white w-full h-16 sm:h-20 lg:h-24 z-20 ps-4 md:ps-0 lg:ps-6 pe-4 lg:pe-6 transition duration-200 ease-in-out">
				<div className="flex items-center justify-center mx-auto max-w-[1920px] h-full w-full">
					<button
						aria-label="Menu"
						className="menuBtn hidden md:flex lg:hidden flex-col items-center justify-center px-5 2xl:px-7 flex-shrink-0 h-full outline-none focus:outline-none"
						onClick={handleMobileMenu}
					>
						<span className="menuIcon">
							<span className="bar" />
							<span className="bar" />
							<span className="bar" />
						</span>
					</button>
					<Logo />

					<HeaderMenu
						data={data}
						additionalMenu={additionalMenu}
						className="hidden lg:flex md:ms-6 xl:ms-10"
					/>

			
					<div className="hidden md:flex justify-end items-center space-s-6 lg:space-s-5 xl:space-s-8 2xl:space-s-10 ms-auto flex-shrink-0">
						<button
							className="flex items-center justify-center flex-shrink-0 h-auto relative focus:outline-none transform"
							onClick={openSearch}
							aria-label="search-button"
						>
							<SearchIcon />
						</button>
						<div className="-mt-0.5 flex-shrink-0">
							<AuthMenu
								isAuthorized={isAuthorized}
								href={ROUTES.ACCOUNT_DETAILS}
								className="text-sm xl:text-base text-heading font-semibold"
								btnProps={{
									className:
										"text-sm xl:text-base text-heading font-semibold focus:outline-none",
									children: t("text-sign-in"),
									onClick: handleLogin,
								}}
							>
								{t("text-account")}
							</AuthMenu>
						</div>
						{!route.includes('checkout') && <CartButton />}
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
