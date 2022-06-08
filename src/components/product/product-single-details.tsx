import React, { useEffect, useState, useRef, Fragment } from "react";
import cn from "classnames";
import Image from "next/image";
import Button from "@components/ui/button";
import Counter from "@components/common/counter";
import { useRouter } from "next/router";
import { useProductQuery } from "@framework/product/get-product";
import { getVariations } from "@framework/utils/get-variations";
import usePrice from "@framework/product/use-price";
import { useCart } from "@contexts/cart/cart.context";
import { generateCartItem } from "@utils/generate-cart-item";
import { ProductAttributes } from "./product-attributes";
import isEmpty from "lodash/isEmpty";
import Link from "@components/ui/link";
import { toast } from "react-toastify";
import { useWindowSize } from "@utils/use-window-size";
import Carousel from "@components/ui/carousel/carousel";
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';
import { SwiperSlide } from "swiper/react";
// import ProductMetaReview from "@components/product/product-meta-review";
import ProductOfferList from "@components/product/product-offer-list";
import { useUI } from "@contexts/ui.context";
import { useWishlistMutation } from "@framework/wishlist/use-wishlist";
import { getToken } from "@framework/utils/get-token";
import { GoCheck } from 'react-icons/go';
import { useAddToCartMutation } from '@framework/cart/use-cart'
import { useCartQuery } from "@framework/cart/get-all-cart";
import { ROUTES } from "@utils/routes";
import Router from "next/router";
import TempProductMetaReview from "@components/product/temp-product-meta-review";
import ProductDescriptionReview from "@components/product/product-description-review";

const productGalleryCarouselResponsive = {
	"768": {
		slidesPerView: 1,
	},
	"0": {
		slidesPerView: 1,
	},
};

const ProductSingleDetails: React.FC = () => {
	const {
		query: { slug },
	} = useRouter();
	const { setModalView, openModal, setModalData, isAuthorized, accountDetails, setBuyNowProductId, setProductDetail } = useUI();
	const { width } = useWindowSize();
	const { data, isLoading } = useProductQuery({ 
		productdataId: slug || "",
		userId: accountDetails.user_id,
		userToken: getToken() || ""
	});
	const { addItemToCart, items } = useCart();
	const [quantity, setQuantity] = useState(1);
	const [attributes, setAttributes] = useState<{ [key: string]: string }>({});
	const [activeImage, setActiveImage] = useState<any>({});
	const [thumbnailStep, setThumbnailStep] = useState<number>(0);
	const [addToFavorites, setAddToFavorites] = useState<any>('');
	const [addedToCard, setAddedToCard] = useState<any>("");
	const overlay = useRef(null);
	const image = useRef(null);
	const zoomInImage = useRef(null);
	const zoomInWindow = useRef(null);

	const [showOverlay, setShowOverlay] = useState<boolean>(false);
	const [overlayLeft, setOverlayLeft] = useState<number>(0);
	const [overlayTop, setOverlayTop] = useState<number>(0);
	const [zoomInLeft, setZoomInLeft] = useState<number>(0);
	const [zoomInTop, setZoomInTop] = useState<number>(0);
	const [zoomInMaxWidth, setZoomInMaxWidth] = useState<number>(0);
	const { mutate: addRemoveWishlist, isLoading: addRemoveWishlistLoading } = useWishlistMutation();
	const { mutate: addToCart, isLoading: addToCartLoader } = useAddToCartMutation();
	const { refetch } = useCartQuery();
	const { price, basePrice, discount } = usePrice(
		data && {
			amount: data.sale_price ? data.sale_price : data.price,
			baseAmount: data.price,
			currencyCode: "INR",
		}
	);
	const galleryLength:any = data?.gallery?.length;
	const totalStepCount:number = galleryLength / 4;
	const isIpad = width < 1025;
	const isMobile = width < 480;
	const variations: any = getVariations(data?.variations);
	const isFavorite = typeof addToFavorites === 'boolean' ? addToFavorites : data?.isWishlisted ? data.isWishlisted : "";
	const isAddedToCart = typeof addedToCard === 'boolean'
		? addedToCard
		: isAuthorized 
			? data?.cart ? data.cart : ""
			: Boolean(items.find(item => item.unique_id === data?.unique_id));

	let tempAttribute = {}
	Object.keys(variations).forEach(key => {
		tempAttribute = {
			...tempAttribute,
			[key]: variations[key][0].value
		}
	});
	tempAttribute = !isEmpty(attributes) ? attributes : tempAttribute

	useEffect(() => {
		let addedToCartTemp = Boolean(items.find(item => item.unique_id === data?.unique_id));
		setAddedToCard(addedToCartTemp);
	}, [items?.length])

	useEffect(() => {
		// isEmpty(attributes) && setAttributes(tempAttribute)
	}, [attributes])

	useEffect(() => {
		if (data && data.special_banner) {
			setTimeout(() => {
				setModalData({ data });
				setModalView("PRODUCT_OFFER_VIEW");
				return openModal();
			}, 3000)
		}
		setProductDetail(data);
	}, [ data ])

	if (isLoading) return <p>Loading...</p>;

	const isSelected = !isEmpty(variations)
		? !isEmpty(tempAttribute) &&
		  Object.keys(variations).every((variation) =>
				tempAttribute.hasOwnProperty(variation)
		  )
		: true;

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
	function handleAddToCart() {
		if (!isSelected) return;
		// to show btn feedback while product carting
		if (accountDetails.user_id) {
			addToCart({ 
				userId: accountDetails?.user_id,
				productdataId: data?.unique_id ? data.unique_id : "",
				userToken: getToken() || "",
				quantity: quantity,
				onSuccess: handleAddToCartSuccess
			});
		} else {
			let item: any = generateCartItem(data!, attributes);
			item.cart = true;
			addItemToCart(item, quantity);
			setAddedToCard(true);
			showToastMessage("Added to the bag");
		}
	}

	function handleAddToCartSuccess() {
		refetch();
		setAddedToCard(true);
		showToastMessage("Added to the bag");
	}

	function handleAttribute(attribute: any) {
		setAttributes((prev) => ({
			...prev,
			...attribute,
		}));
	}

	function handleImageViewStepChange(step: number) {
		setThumbnailStep(step);
	}

	function onMouseMove (e: any) {
    const overlayNode: any = !overlay ? {} : overlay.current;
    const imageNode: any = !image ? {} : image.current;
    const zoomInImageNode: any = !zoomInImage ? {} : zoomInImage.current;
    const zoomInWindowNode: any = !zoomInWindow ? {} : zoomInWindow.current;
    const zoomInWindowWidth = zoomInWindowNode.clientWidth;
    const overlayWidth = overlayNode?.clientWidth || 200;
    const imageWidth = imageNode.clientWidth;
    const imageHeight = imageNode.clientHeight;
    const zoomInImageWidth = zoomInImageNode.clientWidth;
    const zoomInImageHeight = zoomInImageNode.clientHeight;
    const offsetLeft = imageNode.offsetLeft;
    const offsetTop = imageNode.offsetTop;
    const overlayLeft = Math.min(
      Math.max(
        e.clientX - overlayWidth - overlayWidth / 1.7,
        offsetLeft
      ),
      offsetLeft + imageWidth - overlayWidth
    );
    const overlayTop = Math.min(
      Math.max(
        e.clientY - overlayWidth - overlayWidth / 1.5,
        offsetTop
      ),
      offsetTop + imageHeight - overlayWidth
    );

    const zoomInLeft = -(overlayLeft - offsetLeft - 8) / imageWidth * zoomInImageWidth;
    const zoomInTop = -(overlayTop - offsetTop) / imageHeight * zoomInImageHeight;
    const zoomInMaxWidth = zoomInWindowWidth / (overlayWidth / imageWidth);
		setOverlayLeft(overlayLeft);
		setOverlayTop(overlayTop);
		setZoomInLeft(zoomInLeft);
		setZoomInTop(zoomInTop);
		setZoomInMaxWidth(zoomInMaxWidth);
  };

	function toggleOverlay(showOverlay: any) {
		setShowOverlay(showOverlay);
	}

	function handleImageFullscreen() {
		setModalData({ data: data?.gallery });
		setModalView("IMAGE_FULL_SCREEN_VIEW");
		return openModal();
	}

	function handleAddRemoveWishlist() {
		if (isAuthorized) {
			addRemoveWishlist({ 
				userId: accountDetails?.user_id,
				productdataId: data?.unique_id ? data.unique_id : "",
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
			setBuyNowProductId(data?.unique_id ? data.unique_id : "");
			Router.push(ROUTES.CHECKOUT);
		} else {
			setModalView("LOGIN_VIEW");
			return openModal();
		}
	}

	const overlayStyle = {
		left: overlayLeft,
		top: overlayTop
	};
	const zoomInImageStyle: any = {
		left: zoomInLeft,
		top: zoomInTop
	};
	const ZoomInWindow = {
		width: `550px`,
		height: `550px`,
		right: `-570px`,
		display: showOverlay ? 'block' : 'none'
	}
	if (zoomInMaxWidth) {
		zoomInImageStyle['max-width'] = zoomInMaxWidth;
	}

	return (
		<div className="block lg:grid grid-cols-9 gap-x-10 xl:gap-x-14 pt-7 pb-10 lg:pb-14 2xl:pb-20 items-start">
			{isIpad ? (
				<div className="relative z-10">
					<Carousel
						pagination={{
							clickable: true,
						}}
						breakpoints={productGalleryCarouselResponsive}
						className="product-gallery"
						buttonClassName="hidden"
						autoplay={false}
					>
						{data?.gallery?.map((item, index: number) => (
							<SwiperSlide key={`product-gallery-key-${index}`}>
								<div className="col-span-1 transition duration-150 ease-in hover:opacity-90 flex justify-center" onClick={handleImageFullscreen}>
									{isMobile ? <img
										src={
											item?.original ??
											"/assets/placeholder/products/product-gallery.svg"
										}
										alt={`${data?.name}--${index}`}
										className="object-cover w-3/4"
									/> : 
									<Image
										src={item?.original ??
											"/assets/placeholder/products/product-gallery.svg"}
										width={600}
										height={600}
										color={"white"}
										quality={100}
										objectFit={"scale-down"}
										alt={`${data?.name}--${0}`}
									/>}
								</div>
							</SwiperSlide>
						))}
					</Carousel>
					<div className="absolute top-1 sm:top-3 right-1 sm:right-3 cursor-pointer" onClick={addRemoveWishlistLoading ? () => {} : handleAddRemoveWishlist}>
						{isFavorite ? <MdFavorite color="red" size="30" /> : <MdFavoriteBorder size="30" />}
					</div>
				</div>
			) : (
				<div className="col-span-4 flex flex-col grid-cols-1 gap-5 sticky top-32">
					<div className="flex flex-row gap-5">
						<div className="flex flex-col overflow-hidden" style={{ minWidth: '87px' }}>
							{galleryLength > 4 &&
								<button
									aria-label="prev-button"
									disabled={thumbnailStep === 0}
									onClick={() => handleImageViewStepChange(thumbnailStep - 1)}
									className={cn("flex w-full justify-center h-12 items-center mb-1 border border-gray-300 rounded-md bg-white z-10", {
										"pointer-events-none opacity-50": thumbnailStep === 0
									})}
								>
									<BsChevronUp size="35" className="stroke-1" />
								</button>
							}
							<div style={{ height: '348px', transform: `translateY(-${thumbnailStep * 348}px)` }} className="transition-transform duration-500">
								{data?.gallery?.map((item, index: number) => (
									<div style={{ width: '87px', height: '87px' }} className={`flex flex-col p-1 cursor-pointer${(item?.id === activeImage?.id || (isEmpty(activeImage) && index === 0)) ? ' border border-gray-300' : ''}`}  key={`product-gallery-key-${index}`}>
										<Image
											src={item?.original ??
												"/assets/placeholder/products/product-gallery.svg"}
											width={"auto"}
											height={"auto"}
											color={"white"}
											quality={100}
											objectFit={"scale-down"}
											alt={`${data?.name}--${index}`}
											onMouseOver={() => setActiveImage(item)}
										/>
									</div>
								))}
							</div>
							{galleryLength > 4 &&
								<button
									aria-label="next-button"
									disabled={thumbnailStep === totalStepCount - 1}
									onClick={() => handleImageViewStepChange(thumbnailStep + 1)}
									className={cn("flex w-full justify-center h-12 items-center mt-1 border border-gray-300 rounded-md bg-white z-10", {
										"pointer-events-none opacity-50": thumbnailStep === totalStepCount - 1
									})}
								>
									<BsChevronDown size="35" className="stroke-1" />
								</button>
							}
						</div>
						<div className="relative w-full">
							<div
								className="border border-gray-300 rounded-md w-full flex justify-center cursor-move OriginalImageContainer"
								onMouseMove={onMouseMove}
								onMouseEnter={() => toggleOverlay(true)}
								onMouseLeave={() => toggleOverlay(false)}
							>
								<div ref={image} className={"flex OriginalImage"}>
									<Image
										src={!isEmpty(activeImage) ? activeImage?.original : data?.gallery?.[0]?.original ??
											"/assets/placeholder/products/product-gallery.svg"}
										width={450}
										height={450}
										color={"white"}
										quality={100}
										objectFit={"scale-down"}
										alt={`${data?.name}--${0}`}
									/>
								</div>
								{showOverlay && (
									<span
										ref={overlay}
										style={overlayStyle}
										className="ZoomOverlay"
									/>
								)}
							</div>
							<div className="absolute right-0 top-0 pt-3 pr-3 cursor-pointer z-10" onClick={addRemoveWishlistLoading ? () => {} : handleAddRemoveWishlist}>
								{isFavorite ? <MdFavorite color="red" size="30" /> : <MdFavoriteBorder size="30" />}
							</div>
						</div>
					</div>
					<div
						ref={zoomInWindow}
						className="ZoomInWindow"
						style={ZoomInWindow}
					>
						<img
							className="ZoomInWindow-Image"
							ref={zoomInImage}
							style={zoomInImageStyle}
							src={!isEmpty(activeImage) ? activeImage?.original : data?.gallery?.[0]?.original ??
								"/assets/placeholder/products/product-gallery.svg"}
						/>
					</div>
					<div className="flex gap-5">
						{isAddedToCart
							? <Button variant="slim" className="Add-to-cart !border-green-600 !border-2 w-full md:w-6/12 xl:w-full !bg-white text-green-600 hover:!text-green-600" onClick={() => {}}>
									<GoCheck size="20" className="mr-1" />
									Added to cart
								</Button>
							: <Button
									onClick={handleAddToCart}
									variant="slim"
									className={`Add-to-cart w-full md:w-6/12 xl:w-full ${
										!isSelected && "bg-gray-400 hover:bg-gray-400"
									}`}
									style={{backgroundColor:"white",color:"#FF3D00",border:"2px solid rgb(255, 61, 0)"}}
									disabled={!isSelected}
									loading={addToCartLoader}
								>
									Add to cart
								</Button>
						}
						<Button
							onClick={handleBuyNow}
							variant="slim"
							className={`w-full md:w-6/12 xl:w-full ${
								!isSelected && "bg-gray-400 hover:bg-gray-400"
							}`}
							disabled={!isSelected}
						>
							<span className="py-2 3xl:px-8">Buy Now</span>
						</Button>
					</div>
				</div>
			)}

			<div className="col-span-5 pt-8 lg:pt-0">
				<div className="pb-7 border-b border-gray-300">
					<h2 className="text-heading text-lg md:text-xl lg:text-2xl 2xl:text-3xl font-bold hover:text-black mb-3.5">
						{data?.name}
					</h2>
					<p className="text-body text-sm lg:text-base leading-6 lg:leading-8">
						{data?.description}
					</p>
					<div className="flex items-center mt-5">
						<div className="text-heading font-bold text-base md:text-xl lg:text-2xl 2xl:text-4xl pe-2 md:pe-0 lg:pe-2 2xl:pe-0">
							{price}
						</div>
						{discount && (
							<span className="line-through font-segoe text-gray-400 text-sm md:text-base lg:text-lg xl:text-xl ps-2">
								{basePrice}
							</span>
						)}
					</div>
				</div>
				<ProductOfferList />
				{Object.keys(variations).length > 0 ? (<div className="pb-3 border-b border-gray-300">
					{Object.keys(variations).map((variation) => {
						return (
							<ProductAttributes
								key={variation}
								title={variation}
								attributes={variations[variation]}
								active={attributes[variation]}
								onClick={handleAttribute}
							/>
						);
					})}
				</div>) : null}
				<div className="flex items-center space-s-0 md:space-s-4 md:pe-32 lg:pe-12 2xl:pe-32 3xl:pe-48 py-8 flex-wrap md:flex-nowrap gap-4 md:gap-0">
					<div className="flex gap-4 w-full">
						<Counter
							quantity={quantity}
							onIncrement={() => setQuantity((prev) => prev + 1)}
							onDecrement={() =>
								setQuantity((prev) => (prev !== 1 ? prev - 1 : 1))
							}
							disableDecrement={quantity === 1}
						/>
						{isIpad &&
							<Fragment>
								{isAddedToCart
								? <Button variant="slim" className="Add-to-cart !border-green-600 !border-2 w-full xl:w-full !bg-white text-green-600 hover:!text-green-600" onClick={() => {}}>
										<GoCheck size="20" className="mr-1" />
										Added to cart
									</Button>
								: <Button
										onClick={handleAddToCart}
										variant="slim"
										className={`Add-to-cart w-full xl:w-full ${
											!isSelected && "bg-gray-400 hover:bg-gray-400"
										}`}
										style={{backgroundColor:"white",color:"#FF3D00",border:"2px solid rgb(255, 61, 0)"}}
										disabled={!isSelected}
										loading={addToCartLoader}
									>
										<span className="py-2 3xl:px-8">Add to cart</span>
									</Button>
								}
							</Fragment>
						}
					</div>
					{isIpad &&
						<Button
							onClick={handleBuyNow}
							variant="slim"
							className={`w-full md:w-6/12 xl:w-full ml-0 ${
								!isSelected && "bg-gray-400 hover:bg-gray-400"
							}`}
							disabled={!isSelected}
							loading={addToCartLoader}
						>
							<span className="py-2 3xl:px-8">Buy Now</span>
						</Button>
					}
				</div>
				{(data?.sku || data?.category?.name || data?.tags) && (<div className="py-6">
					<ul className="text-sm space-y-5 pb-1">
						{data?.sku && <li>
							<span className="font-semibold text-heading inline-block pe-2">
								SKU:
							</span>
							{data?.sku}
						</li>}
						{data?.category?.name && <li>
							<span className="font-semibold text-heading inline-block pe-2">
								Category:
							</span>
							<Link
								href="/"
								className="transition hover:underline hover:text-heading"
							>
								{data?.category?.name}
							</Link>
						</li>}
						{data?.tags && Array.isArray(data.tags) && (
							<li className="productTags">
								<span className="font-semibold text-heading inline-block pe-2">
									Tags:
								</span>
								{data.tags.map((tag) => (
									<Link
										key={tag.id}
										href={tag.slug}
										className="inline-block pe-1.5 transition hover:underline hover:text-heading last:pe-0"
									>
										{tag.name}
										<span className="text-heading">,</span>
									</Link>
								))}
							</li>
						)}
					</ul>
				</div>)}

				<ProductDescriptionReview data={data} />
				<TempProductMetaReview data={data} />
				{/* <ProductMetaReview data={data} /> */}
			</div>
		</div>
	);
};

export default ProductSingleDetails;
