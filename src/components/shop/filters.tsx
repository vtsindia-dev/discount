// import { CategoryFilter } from "./category-filter";
// import { BrandFilter } from "./brand-filter";
import { FilteredItem } from "./filtered-item";
// import { ColorFilter } from "./color-filter";
// import { PriceFilter } from "./price-filter";
import { useRouter } from "next/router";
import isEmpty from "lodash/isEmpty";
import { useTranslation } from "next-i18next";
import { useFilterMutation } from "@framework/product/get-filter";
import { useEffect, useState } from "react";
import { Filter } from "./filter";

export const ShopFilters: React.FC = () => {
	const router = useRouter();
	const { pathname, query } = router;
	const { slug = "", ...fliterQuery } = query;
	const { mutate: fetchFilter, isLoading } = useFilterMutation();
	const [ filterData, setFilterData ] = useState([]);
	const { t } = useTranslation("common");
	const isCategory = pathname.includes("category");
	const isCategories = pathname.includes("categories");
	const isSearch = pathname.includes("search");
	const slugValue: any = slug || "";
	useEffect(() => {
		fetchFilter({
			...(isCategory && { subcategoryId: slug }),
			...(isCategories && { categoryId: slug }),
			...(isSearch && { search: slug }),
			onSuccess: (data) => setFilterData(data)
		});
	}, [ slug ]);
	if (isLoading) return <p>Loading...</p>;
	return (
		<div className="pt-1">
			<div className="block border-b border-gray-300 pb-7 mb-7">
				<div className="flex items-center justify-between mb-2.5">
					<h2 className="font-semibold text-heading text-2xl">
						{t("text-filters")}
					</h2>
					<button
						className="flex-shrink text-xs mt-0.5 transition duration-150 ease-in focus:outline-none hover:text-heading"
						aria-label="Clear All"
						onClick={() => {
							router.push(pathname.replace('[slug]', slugValue));
						}}
					>
						{t("text-clear-all")}
					</button>
				</div>
				<div className="flex flex-wrap -m-1.5 pt-2">
					{!isEmpty(fliterQuery) &&
						Object.values(fliterQuery)
							.join(",")
							.split(",")
							.map((v, idx) => (
								<FilteredItem
									itemKey={
										Object.keys(fliterQuery).find((k) => fliterQuery[k]?.includes(v))!
									}
									itemValue={v}
									key={idx}
									filterData={filterData}
								/>
							))}
				</div>
			</div>
			{filterData && filterData.map((filter, index) => {
				return <Filter key={index} {...filter} />
			})}
			{/* <CategoryFilter />
			<BrandFilter />
			<PriceFilter />
			<ColorFilter /> */}
		</div>
	);
};
