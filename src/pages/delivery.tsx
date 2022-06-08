import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
// import Subscription from "@components/common/subscription";
import PageHeader from "@components/ui/page-header";
// import ContactForm from "@components/common/form/contact-form";
// import ContactInfoBlock from "@containers/contact-info";
// import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
// import { BiFontSize } from "react-icons/bi";

export default function about() {
	// const { t } = useTranslation("common");
	return (
		<>
			<PageHeader pageHeader="text-page-contact-us" />
			<Container>
				<div className="mt-12 lg:mt-14 xl:mt-16 lg:py-1 border-b border-gray-300 px-4 md:px-10 lg:px-7 xl:px-16 2xl:px-24 3xl:px-32 pb-9 md:pb-14 lg:pb-16 2xl:pb-20 3xl:pb-24">

				<div className="mx-auto max-w-[1920px] px-4 md:px-8 2xl:px-16" style={{textAlign:"justify"}}>
					<h2 className="text-lg md:text-xl lg:text-2xl text-heading font-bold mb-4">Assured Delivery And Shipping Policy</h2>
					<div className="text-heading text-sm leading-7 lg:text-base lg:leading-loose">
					<p>
						Discount IT Store assures and enables customers to enjoy a higher standard of delivery and
						hassle-free shipping. We guarantee quick, 24 hours delivery of our products to customers all
						across Tamil Nadu through Pin code options without any additional charges.
					</p>
					<p>
						Our products are packed with care and dispatched carefully, customers shopping through
						Discount IT Store’s website or mobile application can avail 24 hours delivery throughout the week.
					</p>
					<p>
						Also, we provide an Express premium delivery option that makes sure you receive your
						package within 4 hours. Please note that our Express premium delivery will carry additional
						charges. We provide reliable and fast delivery all across Tamil Nadu via Pin code options.
					</p>
					<p>
						We strictly follow the packing guidelines and make use of only the sturdiest materials that can
						endure even the hardest of transit. The customers can stay updated on the delivery status by
						making use of our delivery tracking options, across Tamil Nadu, through Pin code options.
					</p>
					<p className="font-bold">Contact us</p>
					<p>If you have any questions about our Delivery and Shipping Policy please contact us.</p>
					</div>
					</div>
					</div>
			
			</Container>
		</>
	);
}

about.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => {
	return {
		props: {
			...(await serverSideTranslations(locale, [
				"common",
				"forms",
				"menu",
				"footer",
			])),
		},
	};
};
