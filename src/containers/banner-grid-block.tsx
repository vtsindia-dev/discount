import BannerCard from "@components/common/banner-card";
import Carousel from "@components/ui/carousel/carousel";
import SectionHeader from "@components/common/section-header";
import { SwiperSlide } from "swiper/react";
import { useWindowSize } from "@utils/use-window-size";
import { useDiscountBannerQuery } from "@framework/home/get-discount-banner";
import { formatDiscountBannerData } from '@framework/utils/helper';

const breakpoints = {
	"1025": {
		slidesPerView: 3,
		spaceBetween: 28,
	},
	"480": {
		slidesPerView: 2,
		spaceBetween: 20,
	},
	"0": {
		slidesPerView: 1,
		spaceBetween: 12,
	},
};

interface BannerProps {
	className?: string;
}

const BannerGridBlock: React.FC<BannerProps> = ({
	className = "mb-12 md:mb-14 xl:mb-16 lg:pb-1 xl:pb-0",
}) => {
	const { width } = useWindowSize();
	const { data } = useDiscountBannerQuery();
	const bannerGrid = formatDiscountBannerData(data);
	return (
		<div className={`${className}`}>
			<SectionHeader sectionHeading="text-discount-categories" />
			{width < 768 ? (
				<div>
					<Carousel breakpoints={breakpoints}>
						{bannerGrid?.map((banner: any) => (
							<SwiperSlide key={`banner--key${banner.id}`}>
								<BannerCard banner={banner} className="h-full" />
							</SwiperSlide>
						))}
					</Carousel>
				</div>
			) : (
				<div className="md:grid md:grid-cols-2 md:gap-5 xl:gap-7 relative">
					{bannerGrid.map((banner: any) => (
						<BannerCard
							key={`banner--key${banner.id}`}
							banner={banner}
							className={banner.type === "large" ? "col-span-2" : "col-span-1"}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default BannerGridBlock;
