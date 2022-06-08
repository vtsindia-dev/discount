import ActiveLink from "@components/ui/active-link";
import { BreadcrumbItems } from "@components/common/breadcrumb";
import { useUI } from "@contexts/ui.context";
// import { useRouter } from "next/router";

const MyAccountBreadcrumb = () => {
	// const { query: { slug } } = useRouter();
	// const { pageName } = productList;
    const { myAccountName } = useUI();
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
					href={`/my-account/account-details`}
					activeClassName="font-semibold text-heading capitalize"
				>
					<a className="capitalize">{myAccountName || ''}</a>
				</ActiveLink>
			</BreadcrumbItems>
		</div>
	)
}

export default MyAccountBreadcrumb;