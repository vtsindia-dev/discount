import React from "react";
import { useUI } from "@contexts/ui.context";
import { SwiperSlide } from "swiper/react";
import Carousel from "@components/ui/carousel/carousel";
import { useWindowSize } from "@utils/use-window-size";

const productGalleryCarouselResponsive = {
	"0": {
		slidesPerView: 1,
	},
};

export default function ProductPopup() {
	const { modalData: { data } } = useUI();
	const { width, height } = useWindowSize();
	const isMobile = width < 480;

	return (
		<Carousel
			pagination={{
				clickable: true,
			}}
			className="product-gallery"
			buttonClassName="hidden"
			breakpoints={productGalleryCarouselResponsive}
			autoplay={false}
			style={{ width: width }}
		>
			{data?.map((item: any, index: number) => (
				<SwiperSlide key={`product-gallery-key-${index}`} style={{ width: width / 100 }}>
					<div className="col-span-1 transition duration-150 ease-in hover:opacity-90 flex justify-center">
						<img
							src={
								item?.original ??
								"/assets/placeholder/products/product-gallery.svg"
							}
							alt={`${item?.name}--${index}`}
							className="object-contain"
							style={{ height: height - (isMobile ? 200 : 50)}}
						/>
					</div>
				</SwiperSlide>
			))}
		</Carousel>
	);
}
