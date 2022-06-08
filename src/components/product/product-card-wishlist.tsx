import React, { useState } from "react";
import cn from "classnames";
import Image from "next/image";
import type { FC } from "react";
import usePrice from "@framework/product/use-price";
import { Product } from "@framework/types";
import Button from "@components/ui/button";
import { RiDeleteBinLine } from 'react-icons/ri';
import { useRouter } from "next/router";
import { ROUTES } from "@utils/routes";
import { toast } from "react-toastify";
import { useWindowSize } from "@utils/use-window-size";
import { useUI } from "@contexts/ui.context";
import { useWishlistMutation } from "@framework/wishlist/use-wishlist";
import { getToken } from "@framework/utils/get-token";
import { cloneDeep } from "lodash";
import { useAddToCartMutation } from '@framework/cart/use-cart'
import { useCartQuery } from "@framework/cart/get-all-cart";

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

const ProductCardWishlist: FC<ProductProps> = ({
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
	const { width } = useWindowSize();
	const { mutate: addRemoveWishlist, isLoading } = useWishlistMutation();
	const { isAuthorized, accountDetails, setModalView, openModal, setWishlist, wishlistProducts } = useUI();
	const { mutate: addToCart } = useAddToCartMutation();
	const { refetch } = useCartQuery();
	const placeholderImage = `/assets/placeholder/products/product-${variant}.svg`;
	const imageSrc = product?.image?.thumbnail ?? product?.gallery?.[0]?.thumbnail ?? placeholderImage
	const [moveToCartLoader, setMoveToCartLoader] = useState<boolean>(false);
	const { price, basePrice, discount } = usePrice({
		amount: product.sale_price ? product.sale_price : product.price,
		baseAmount: product.price,
		currencyCode: "INR",
	});
	const uniqueId:any = product?.unique_id || "";

	function navigateToProductPage() {
		router.push(`${ROUTES.PRODUCT}/${uniqueId}`, undefined, {
			locale: router.locale,
		});
	}
	function showToastMessage(message:string) {
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
	function moveToCart() {
		const removeWishlistSuccess = () => {
			addToCart({ 
				userId: accountDetails?.user_id,
				productdataId: uniqueId,
				userToken: getToken() || "",
				quantity: 1,
				onSuccess: () => {
					refetch();
					setMoveToCartLoader(false);
					showToastMessage("Moved to the bag");
					removeLocalWishlistProduct();
				}
			});
		}
		setMoveToCartLoader(true);
		handleRemoveWishlist(removeWishlistSuccess)
	}

	function handleRemoveWishlist(removeWishlistSuccess:any = "") {
		if (isAuthorized) {
			addRemoveWishlist({ 
				userId: accountDetails?.user_id,
				productdataId: uniqueId,
				userToken: getToken() || "",
				onSuccess: (data) => typeof removeWishlistSuccess === 'function' ? removeWishlistSuccess() : removeWishlistProduct(data),
			})
		} else {
			setMoveToCartLoader(false);
			setModalView("LOGIN_VIEW");
			return openModal();
		}
	}

	function removeLocalWishlistProduct() {
		const products = cloneDeep(wishlistProducts);
		products.pages.forEach((page:any, pageIndex: number) => {
			page.data.findIndex((wishlistProduct:any, productIndex: number) => {
				if (wishlistProduct.unique_id === uniqueId) {
					products.pages[pageIndex].data.splice(productIndex, 1);
					setWishlist(products);
				}
			});
		});
	}

	function removeWishlistProduct(data: any) {
		const { isWishlisted } = data;
		if (typeof isWishlisted === undefined || typeof isWishlisted === null) {
			showToastMessage("Something went wrong please try again later");
		} else if (!isWishlisted) {
			showToastMessage("Removed from wishlist");
		}
		removeLocalWishlistProduct();
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
							className={`text-heading font-semibold text-sm sm:text-base mt-1.5 space-s-2 ${
								variant === "grid"
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
				<Button className="Buy-new" onClick={moveToCart} loading={moveToCartLoader}>Move to cart</Button>
			</div>
			<div className="absolute top-1 right-1 cursor-pointer bg-green-300 p-2 rounded-full" onClick={isLoading ? () => {} : handleRemoveWishlist}>
				<RiDeleteBinLine color="white" size="20" />
			</div>
		</div>
	);
};

export default ProductCardWishlist;
