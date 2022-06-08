import { useEffect, useState } from "react";
import ProductCardWishlist from "@components/product/product-card-wishlist";
import { useWishlistQueryMutation } from "@framework/wishlist/use-wishlist";
import { useUI } from "@contexts/ui.context";
import ProductFeedLoader from "@components/ui/loaders/product-feed-loader";
import { useTranslation } from "next-i18next";
import { BiLoaderCircle } from 'react-icons/bi';
import Button from "@components/ui/button";
import { cloneDeep } from "lodash";
import { getToken } from "@framework/utils/get-token";
import { Product } from "@framework/types";

let initialLoad = true;

const WishlistProductGrid = () => {
  const [ hasNextPage, setNextPage ] = useState<boolean>(false);
  const [ pageId, setPageId ] = useState<number>(1);
	const { setWishlist, wishlistProducts, accountDetails } = useUI();
	const { mutate: fetchWishlist, isLoading } = useWishlistQueryMutation();
	const { t } = useTranslation("common");

	useEffect(() => {
		initialLoad = true;
		fetchWishlist({  pageId: pageId, userToken: getToken() || "", userId: accountDetails.user_id, onSuccess: (data) => handleSuccessCbk(data, pageId) })
	}, []);
	
  function handleSuccessCbk(data: any, pageId: number) {
		const { pages, totalPages, totalProduct } = data;
		let products = cloneDeep(wishlistProducts);
		if (initialLoad) {
			products['pages'] = [];
		}
		products['pages'].push(pages);
		products['totalPages'] = totalPages;
		products['totalProduct'] = totalProduct;
		initialLoad = false;
		setNextPage(pageId < totalPages);
		setWishlist(products);
	}

	function loadMore() {
		setPageId(pageId + 1);
		fetchWishlist({ pageId: pageId + 1, userToken: getToken() || "", userId: accountDetails.user_id, onSuccess: (data) => handleSuccessCbk(data, pageId + 1) });
	}
	const isWishlistNotEmpty = Boolean(wishlistProducts?.pages && wishlistProducts?.pages.length > 0 && wishlistProducts?.pages[0]?.data)

	return (
		<>
			<h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
				{t("text-wishlist")}
			</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-x-3 lg:gap-x-5 xl:gap-x-7 gap-y-3 xl:gap-y-5 2xl:gap-y-8">
        {isLoading && initialLoad && !wishlistProducts?.length ? (
          <ProductFeedLoader limit={20} uniqueKey="search-product" />
        ) : (
          isWishlistNotEmpty && wishlistProducts?.pages?.map((page: any) => {
            return page?.data?.map((product: Product) => (
              <ProductCardWishlist
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
			{!isWishlistNotEmpty ? <div>Your wishlist is empty!</div> : null}
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

export default WishlistProductGrid;
