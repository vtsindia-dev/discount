import ActiveLink from "@components/ui/active-link";
import { BreadcrumbItems } from "@components/common/breadcrumb";
import { useUI } from "@contexts/ui.context";
import { useRouter } from "next/router";
import { ROUTES } from "@utils/routes";
import { isEmpty } from "lodash";

const ProductDetailBreadcrumb = () => {
	const { productDetail } = useUI();
	const { query: { source = "", searchTerm = "" }, asPath } = useRouter();
	const getPLPUrl = () => {
		if (source === 'category') {
			return {
				url: `${ROUTES.CATEGORY}/${productDetail?.subcategory_id}`,
				name: productDetail?.subcategory_name
			};
		} else if (source === 'categories') {
			return {
				url: `${ROUTES.CATEGORIES}/${productDetail?.category_name}-${productDetail?.category_id}`,
				name: productDetail?.category_name
			};
		} else if (source === 'search') {
			return {
				url: `${ROUTES.SEARCH}/${searchTerm}`,
				name: searchTerm
			};
		}
		return { url: '', name: '' };
	}
	const { url = "", name = "" }: any = getPLPUrl();
	return (
		<div className="pt-7">
			<BreadcrumbItems separator=">">
				<ActiveLink
					href={"/"}
					activeClassName="font-semibold text-heading"
				>
					<a>Home</a>
				</ActiveLink>
				{!isEmpty(source) && <ActiveLink
					href={url}
					activeClassName="font-semibold text-heading capitalize"
				>
					<a className="capitalize">{name}</a>
				</ActiveLink>}
				<ActiveLink
					href={asPath}
					activeClassName="font-semibold text-heading capitalize"
				>
					<a className="capitalize">{productDetail?.name}</a>
				</ActiveLink>
			</BreadcrumbItems>
		</div>
	)
}

export default ProductDetailBreadcrumb;