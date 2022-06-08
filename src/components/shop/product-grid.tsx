import { useEffect, useState } from "react";
import ProductCard from "@components/product/product-card";
import Button from "@components/ui/button";
import { Product } from "@framework/types";
import { useProductQueryMutation } from "@framework/product/get-all-products";
import { useUI } from "@contexts/ui.context";
import ProductFeedLoader from "@components/ui/loaders/product-feed-loader";
import { useTranslation } from "next-i18next";
import { cloneDeep, isEmpty, isEqual } from "lodash";
import { BiLoaderCircle } from 'react-icons/bi';
import { useRouter } from "next/router";

let initialLoad = true;
let prevFilterParams = {};

export const ProductGrid = () => {
	const {
		query,
		pathname
	} = useRouter();
	const [ hasNextPage, setNextPage ] = useState<boolean>(false);
	const [ pageId, setPageId ] = useState<number>(1);
	const { setProductList, productList } = useUI();
	const { mutate: fetchProduct, isLoading } = useProductQueryMutation();
	const { t } = useTranslation("common");
	const { slug, sortBy = '', ...filterParams } = query;
	const id = slug || "";
	const isCategory = pathname.includes("category");
	const isCategories = pathname.includes("categories");
	const isSearch = pathname.includes("search");
	useEffect(() => {
		initialLoad = true;
		prevFilterParams = filterParams;
		fetchProductList(pageId);
	}, [ sortBy, slug ])

	useEffect(() => {
		if (!isEqual(prevFilterParams, filterParams)) {
			initialLoad = true;
			prevFilterParams = filterParams;
			fetchProductList(pageId);
		}
	}, [ filterParams ])

	function getFilterObj(filterParams: any) {
		return Object.keys(filterParams).map((key: any) => {
			return {
				label: key,
				options: filterParams[key].split(',')
			}
		})
	}

	function fetchProductList(pageId: number) {
		fetchProduct({
			...(isCategory && { subcategoryId: id }),
			...(isCategories && { categoryId: id }),
			...(isSearch && { search: id }),
			...(sortBy && { sortBy: sortBy }),
			...(!isEmpty(filterParams) && { filter: getFilterObj(filterParams) }),
			pageId: pageId,
			onSuccess: (data) => handleSuccessCbk(data, pageId)
		});
	}

	function handleSuccessCbk(data: any, pageId: number) {
		const { pages, pageName, totalPages, totalProduct } = data;
		let products = cloneDeep(productList);
		if (initialLoad) {
			products['pages'] = [];
		}
		products['pages'].push(pages);
		products['totalPages'] = totalPages;
		products['totalProduct'] = totalProduct;
		products['pageName'] = pageName;
		initialLoad = false;
		setNextPage(pageId < totalPages);
		setProductList(products);
	}

	function loadMore() {
		setPageId(pageId + 1);
		fetchProductList(pageId + 1);
	}

	return (
		<>
			<div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-3 lg:gap-x-5 xl:gap-x-7 gap-y-3 xl:gap-y-5 2xl:gap-y-8">
				{isLoading && initialLoad && !productList?.length ? (
					<ProductFeedLoader limit={20} uniqueKey="search-product" />
				) : (
					productList?.pages?.map((page: any) => {
						return page?.data?.map((product: Product) => (
							<ProductCard
								key={`product--key${product.id}`}
								product={product}
								imgWidth={336}
								imgHeight={436}
								variant="grid"
							/>
						));
					})
				)}
			</div>
			<div className="text-center pt-8 xl:pt-14">
				{isLoading && !initialLoad && <BiLoaderCircle color="#FF3D00" size="60" className="animate-spin flex m-auto" />}
				{!isLoading && hasNextPage && (
					<Button onClick={loadMore} variant="slim">
						{t("button-load-more")}
					</Button>
				)}
			</div>
		</>
	);
};
