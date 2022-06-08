import ActiveLink from "@components/ui/active-link";
import { BreadcrumbItems } from "@components/common/breadcrumb";
import { useUI } from "@contexts/ui.context";
import { useRouter } from "next/router";

const ProductListBreadcrumb = () => {
	const { productList } = useUI();
	const { query: { slug } } = useRouter();
	const { pageName } = productList;
	return (
		<div className="pb-7">
			<BreadcrumbItems separator=">">
				<ActiveLink
					href={"/"}
					activeClassName="font-semibold text-heading"
				>
					<a>Home</a>
				</ActiveLink>
				<ActiveLink
					href={`${slug}`}
					activeClassName="font-semibold text-heading capitalize"
				>
					<a className="capitalize">{pageName || ''}</a>
				</ActiveLink>
			</BreadcrumbItems>
		</div>
	)
}

export default ProductListBreadcrumb;