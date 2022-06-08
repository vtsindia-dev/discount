import React, { useState } from "react";
import cn from "classnames";
import Image from "next/image";
import type { FC } from "react";
import usePrice from "@framework/product/use-price";
import { Product } from "@framework/types";
import Button from "@components/ui/button";
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';
import { useRouter } from "next/router";
import { ROUTES } from "@utils/routes";
import Router from "next/router";
import { useCart } from "@contexts/cart/cart.context";
import { generateCartItem } from "@utils/generate-cart-item";
import { toast } from "react-toastify";
import { useWindowSize } from "@utils/use-window-size";
import { useUI } from "@contexts/ui.context";
import { useWishlistMutation } from "@framework/wishlist/use-wishlist";
import { getToken } from "@framework/utils/get-token";
import { GoCheck } from 'react-icons/go';
import { useAddToCartMutation } from '@framework/cart/use-cart'
import { useCartQuery } from "@framework/cart/get-all-cart";
import { getSourceParam } from "@framework/utils/helper";
import { useEffect } from "react";

interface ProductProps {
	product: Product;
	className?: string;
	contactClassName?: string;
	imageContentClassName?: string;
	variant?: "grid" | "gridSlim" | "list" | "listSmall";
	imgWidth?: number | string;
	imgHeight?: number | string;
	imgLoading?: "eager" | "lazy";
}

const ProductCard: FC<ProductProps> = ({
	product,
	className = "",
	contactClassName = "",
	imageContentClassName = "",
	variant = "list",
	imgWidth = 340,
	imgHeight = 440,
	imgLoading
}) => {

	const router = useRouter();
	const { addItemToCart, items } = useCart();
	const { width } = useWindowSize();
	const { mutate: addRemoveWishlist, isLoading } = useWishlistMutation();
	const { isAuthorized, accountDetails, setModalView, openModal, setBuyNowProductId } = useUI();
	const placeholderImage = `/assets/placeholder/products/product-${variant}.svg`;
	const imageSrc = product?.image?.thumbnail ?? product?.gallery?.[0]?.thumbnail ?? placeholderImage
	const [addToFavorites, setAddToFavorites] = useState<any>("");
	const [addedToCard, setAddedToCard] = useState<any>("");
	const { price, basePrice, discount } = usePrice({
		amount: product.sale_price ? product.sale_price : product.price,
		baseAmount: product.price,
		currencyCode: "INR",
	});
	const { mutate: addToCart, isLoading: addToCartLoader } = useAddToCartMutation();
	const { refetch } = useCartQuery();
	const uniqueId: any = product?.unique_id || "";
	const isFavorite = typeof addToFavorites === 'boolean' ? addToFavorites : product.isWishlisted;
	const isAddedToCart = typeof addedToCard === 'boolean'
		? addedToCard
		: isAuthorized
			? product.cart
			: Boolean(items.find(item => item.unique_id === product?.unique_id));
	// function handlePopupView() {
	// 	setModalData({ data: product });
	// 	setModalView("PRODUCT_VIEW");
	// 	return openModal();
	// }

	useEffect(() => {
		let addedToCartTemp = Boolean(items.find(item => item.unique_id === product?.unique_id));
		setAddedToCard(addedToCartTemp);
	}, [items?.length])

	function navigateToProductPage() {
		router.push(`${ROUTES.PRODUCT}/${uniqueId}?${getSourceParam(router?.pathname, router?.query)}`, undefined, {
			locale: router.locale
		});
	}
	function showToastMessage(message: string) {
		toast(message, {
			type: "dark",
			progressClassName: "fancy-progress-bar",
			position: width > 768 ? "bottom-right" : "top-right",
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
		});
	}
	function handleAddToCart() {
		if (accountDetails.user_id) {
			addToCart({
				userId: accountDetails?.user_id,
				productdataId: product?.unique_id ? product.unique_id : "",
				userToken: getToken() || "",
				quantity: 1,
				onSuccess: handleAddToCartSuccess
			});
		} else {
			let item: any = generateCartItem(product!, {});
			item.cart = true;
			addItemToCart(item, 1);
			setAddedToCard(true);
			showToastMessage("Added to the bag");
		}
	}

	function handleAddToCartSuccess() {
		refetch();
		setAddedToCard(true);
		showToastMessage("Added to the bag");
	}

	function handleAddRemoveWishlist() {
		if (isAuthorized) {
			addRemoveWishlist({
				userId: accountDetails?.user_id,
				productdataId: uniqueId,
				userToken: getToken() || "",
				onSuccess: handleSuccessCbk,
			})
		} else {
			setModalView("LOGIN_VIEW");
			return openModal();
		}
	}

	function handleSuccessCbk(data: any) {
		const { isWishlisted } = data;
		if (typeof isWishlisted === undefined || typeof isWishlisted === null) {
			showToastMessage("Something went wrong please try again later");
		} else if (isWishlisted) {
			showToastMessage("Added to wishlist");
		} else {
			showToastMessage("Removed from wishlist");
		}
		setAddToFavorites(isWishlisted);
	}

	function handleBuyNow() {
		if (isAuthorized) {
			setBuyNowProductId(uniqueId);
			Router.push(ROUTES.CHECKOUT);
		} else {
			setModalView("LOGIN_VIEW");
			return openModal();
		}
	}

	return (
		<div className="relative">
			<div
				className={cn(
					"group box-border overflow-hidden flex rounded-md cursor-pointer justify-between h-full",
					{
						"pe-0 pb-2 lg:pb-3 flex-col items-start bg-white transition duration-200 ease-in-out transform hover:-translate-y-1 hover:md:-translate-y-1.5 hover:shadow-product":
							variant === "grid",
						"pe-0 md:pb-1 flex-col items-start bg-white": variant === "gridSlim",
						"items-center bg-transparent border border-gray-100 transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-listProduct":
							variant === "listSmall",
						"flex-row items-center transition-transform ease-linear bg-gray-200 pe-2 lg:pe-3 2xl:pe-4":
							variant === "list",
					},
					className
				)}
				// onClick={handlePopupView}
				role="button"
				title={product?.name}
			>
				<div
					className={cn(
						"flex flex-col w-full",
						{
							"mb-3 md:mb-3.5": variant === "grid",
							"mb-3 md:mb-3.5 pb-0": variant === "gridSlim",
							"flex-shrink-0 w-32 sm:w-44 md:w-36 lg:w-44":
								variant === "listSmall",
						},
						imageContentClassName
					)}
					onClick={navigateToProductPage}
				>
					<div className="flex">
						<Image
							src={imageSrc}
							width={imgWidth}
							height={imgHeight}
							loading={imgLoading}
							color={"white"}
							quality={100}
							objectFit={"scale-down"}


							alt={product?.name || "Product Image"}
							className={cn("bg-white object-cover rounded-s-md", {
								"w-full rounded-md transition duration-200 ease-in group-hover:rounded-b-none":
									variant === "grid",
								"rounded-md transition duration-150 ease-linear transform group-hover:scale-105":
									variant === "gridSlim",
								"rounded-s-md transition duration-200 ease-linear transform group-hover:scale-105":
									variant === "list",
							})}
						/>
					</div>
					<div
						className={cn(
							"w-full overflow-hidden",
							{
								"ps-0 lg:ps-2.5 xl:ps-4 pe-2.5 xl:pe-4": variant === "grid",
								"ps-0": variant === "gridSlim",
								"px-4 lg:px-5 2xl:px-4": variant === "listSmall",
							},
							contactClassName
						)}
					>
						<h2
							className={cn("text-heading font-semibold truncate mb-1", {
								"text-sm md:text-base": variant === "grid",
								"md:mb-1.5 text-sm sm:text-base md:text-sm lg:text-base xl:text-lg":
									variant === "gridSlim",
								"text-sm sm:text-base md:mb-1.5 pb-0": variant === "listSmall",
								"text-sm sm:text-base md:text-sm lg:text-base xl:text-lg md:mb-1.5":
									variant === "list",
							})}
						>
							{product?.name}
						</h2>
						{product?.description && (
							<p className="text-body text-xs lg:text-sm leading-normal xl:leading-relaxed max-w-[250px] truncate">
								{product?.description}
							</p>
						)}
						<div
							className={`text-heading font-semibold text-sm sm:text-base mt-1.5 space-s-2 ${variant === "grid"
									? "lg:text-lg lg:mt-2.5"
									: "sm:text-xl md:text-base lg:text-xl md:mt-2.5 2xl:mt-3"
								}`}
						>
							<span className="inline-block">{price}</span>
							{discount && (
								<del className="sm:text-base font-normal text-gray-800">
									{basePrice}
								</del>
							)}
						</div>
					</div>
				</div>
				<div>
					{isAddedToCart
						? <Button className="Add-to-cart !bg-white border-none text-green-600 hover:!text-green-600" onClick={() => { }}>
							<GoCheck size="18" className="mr-1" />
							Added to cart
						</Button>
						: <Button
							className="Add-to-cart"
							style={{ backgroundColor: "white", color: "#FF3D00", border: "2px solid rgb(255, 61, 0)" }}
							onClick={handleAddToCart}
							loading={addToCartLoader}
						>
							Add to cart
						</Button>
					}
					<Button className="Buy-new" onClick={handleBuyNow}>Buy Now</Button>
				</div>
			</div>
			<div className="absolute top-1 right-1 cursor-pointer" onClick={isLoading ? () => { } : handleAddRemoveWishlist}>
				{isFavorite ? <MdFavorite color="red" size="25" /> : <MdFavoriteBorder size="25" />}
			</div>
		</div>
	);
};

export default ProductCard;
