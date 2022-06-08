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
						<h2 className="text-lg md:text-xl lg:text-2xl text-heading font-bold mb-4">About Us</h2>
						<div className="text-heading text-sm leading-7 lg:text-base lg:leading-loose">
						<p>
							Discount IT Store was created with the main intention of selling all (IT) products with a very
							steep discount for all 365 days in a year. The discount offer will vary each day of the week and
							the products we sell are of very high quality.
						</p>
						<p>
							We are driven by the need to provide a quality buying experience to our customers. We are very
							transparent in the way we conduct our business and strive to earn the trust of our customers.
							We advocate transparency and conduct our business deals with integrity and honesty.
						</p>
						<p>
							Discount IT store is highly adaptive while growing and evolving around our beliefs and core
							values that define us and make us unique from others. We are the one-stop destination for all
							your IT needs and are equipped with the latest infrastructure. Our qualified professionals are
							well experienced to take care of all your sales and service needs.
						</p>
						<p>
							Our customer support center is filled with efficient personnel who can handle and support the
							customers with proficiency. We provide both on-site and at-home service and repairs for your
							products. Our professionals are highly qualified and live up to our company’s values by
							providing innovative solutions to our customers.
						</p>
						<p>
							Discount IT Store strives to practice sustainability and aims to safeguard our environment while
							also maintaining the greatest level of professionalism and trust with our customers.
						</p>
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
