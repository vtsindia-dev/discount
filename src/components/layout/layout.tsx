import { NextSeo } from "next-seo";
import Header from "@components/layout/header/header";
import Footer from "@components/layout/footer/footer";
import MobileNavigation from "@components/layout/mobile-navigation/mobile-navigation";
import Search from "@components/common/search";

const Layout: React.FC = ({ children }) => (
	<div className="flex flex-col min-h-screen">
		<NextSeo
			additionalMetaTags={[
				{
					name: "viewport",
					content: "width=device-width, initial-scale=1.0",
				},
			]}
			title="Discount IT Store"
			description="Discount IT Store Process Is To Sell The Products At A Very Steep Discount In All 365 Days"
			canonical="https://discount-it.vercel.app"
			openGraph={{
				url: "https://discount-it.vercel.app/",
				title: "Discount IT Store",
				description: "Discount IT Store Process Is To Sell The Products At A Very Steep Discount In All 365 Days",
				images: [
					{
						url: "/assets/images/logo.png",
						width: 800,
						height: 600,
						alt: "Discount IT Store",
					},
					{
						url: "/assets/images/logo.png",
						width: 900,
						height: 800,
						alt: "Discount IT Store",
					},
				],
			}}
		/>
		<Header />
		<main
			className="relative flex-grow"
			style={{
				minHeight: "-webkit-fill-available",
				WebkitOverflowScrolling: "touch",
			}}
		>
			{children}
		</main>
		<Footer />
		<MobileNavigation />
		<Search />
		<script src="https://checkout.razorpay.com/v1/checkout.js" />
	</div>
);

export default Layout;
