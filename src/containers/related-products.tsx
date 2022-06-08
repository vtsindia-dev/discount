import SectionHeader from "@components/common/section-header";
import ProductCardWithoutButton from "@components/product/product-card-without-action";
// import ProductFeedLoader from "@components/ui/loaders/product-feed-loader";
import { useRelatedProductsQuery } from "@framework/product/get-related-product";
import Alert from "@components/ui/alert";
import Carousel from "@components/ui/carousel/carousel";
import { SwiperSlide } from "swiper/react";
import CardRoundedLoader from "@components/ui/loaders/card-rounded-loader";
import { useRouter } from "next/router";
import { useUI } from "@contexts/ui.context";
import { getToken } from "@framework/utils/get-token";

interface ProductsProps {
	sectionHeading: string;
	className?: string;
}

const breakpoints = {
	"1720": {
		slidesPerView: 8,
		spaceBetween: 28,
	},
	"1400": {
		slidesPerView: 7,
		spaceBetween: 28,
	},
	"1025": {
		slidesPerView: 6,
		spaceBetween: 28,
	},
	"768": {
		slidesPerView: 5,
		spaceBetween: 20,
	},
	"500 ": {
		slidesPerView: 4,
		spaceBetween: 20,
	},
	"0": {
		slidesPerView: 3,
		spaceBetween: 12,
	},
};

const RelatedProducts: React.FC<ProductsProps> = ({
	sectionHeading,
	className = "mb-9 lg:mb-10 xl:mb-14",
}) => {
	const {
		query: { slug },
	} = useRouter();
	const { accountDetails } = useUI();
	const { data, isLoading, error } = useRelatedProductsQuery({
		productdataId: slug || "",
		userId: accountDetails.user_id,
		userToken: getToken() || ""
	});
	const isNavigationScrollShown = data && data?.length > 1;

	return (
		<div className={className}>
			<SectionHeader sectionHeading={sectionHeading} />
			<div>
				{error ? (
					<div className="col-span-full">
						<Alert message={error?.message} />
					</div>
				) : <Carousel breakpoints={breakpoints} buttonClassName="-mt-8 md:-mt-12" navigationArrowsShown={isNavigationScrollShown}>
					{isLoading
						? Array.from({ length: 10 }).map((_, idx) => (
							<SwiperSlide key={idx}>
								<CardRoundedLoader uniqueKey={`category-${idx}`} />
							</SwiperSlide>
						))
						:
						data?.length === 1 ?
							<div className="md:w-1/5 sm:w-auto">
								<ProductCardWithoutButton
									key={`product--key${data[0].id}`}
									product={data[0]}
									imgWidth={340}
									imgHeight={440}
									variant="grid"
								/>
							</div>
						 :data?.map((product: any) => (
							<SwiperSlide key={`brand--key${product.id}`}>
								<ProductCardWithoutButton
									key={`product--key${product.id}`}
									product={product}
									imgWidth={340}
									imgHeight={440}
									variant="grid"
								/>
							</SwiperSlide>
						))}
				</Carousel>}
			</div>
		</div>
	);
};



export default RelatedProducts;
