import Link from "next/link";
import Image from "next/image";
import Text from "@components/ui/text";
import { Category } from "@framework/types";
import { useTranslation } from "next-i18next";
import { ROUTES } from "@utils/routes";
import cn from "classnames";
import { formatPrice } from "@framework/product/use-price";


interface Props {
	category: Category;
}

const CategoryCard: React.FC<Props> = ({ category }) => {
	const { name, combo_price } = category;
	const { t } = useTranslation("common");
	const combo_price_format = formatPrice({
		amount: Number(combo_price),
		currencyCode: "INR",
		locale: "en"
	});
	return (
		<div className="flex flex-col border border-gray-300 rounded-lg p-4 lg:p-5 xl:p-6">
			<Text
				variant="heading"
				className="capitalize -mt-0.5 lg:-mt-1 xl:-mt-0 mb-2.5 lg:mb-3.5"
			>
				{name} - {combo_price_format}
			</Text>
			<div className="grid auto-rows-max">
			  <Link 
				href={`${ROUTES.PRODUCT}/${category?.combounique_id}`}
				key={`image--key${1}`}
			  >
					<a className="flex rounded-md">
					<Image
						src={`${category?.image}`}
						width={340}
						height={250}
						color={"white"}
						objectFit={"cover"}
						alt={name || t("text-category-thumbnail")}
						className={cn("bg-white object-fill rounded-s-md h-auto")}
					/>
					</a>
				</Link>
				{/* {products?.slice(0, 3)?.map((product) => (
					<Link href={`${ROUTES.PRODUCT}/${product?.unique_id}`} key={`image--key${product?.id}`}>
						<a className="flex rounded-md overflow-hidden">
							<Image
								src={
									product?.image?.original ?? product?.gallery?.[0]?.thumbnail ??
									"/assets/placeholder/products/product-cat.svg"
								}
								alt={name || t("text-category-thumbnail")}
								width={165}
								height={165}
								className="bg-gray-300 object-cover rounded-md transition duration-300 ease-in-out transform hover:scale-110"
							/>
						</a>
					</Link>
				))} */}
			</div>
		</div>
	);
};

export default CategoryCard;
