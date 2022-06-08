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
					<h2 className="text-lg md:text-xl lg:text-2xl text-heading font-bold mb-4">Return and Cancellation Policy</h2>
					
					
				

					<div className="text-heading text-sm leading-7 lg:text-base lg:leading-loose">

					<p>
						You can return or cancel the products when you get the wrong product delivered or when you
						wish to modify the product. After placing an order you will get an invoice through your registered
						email, which can be downloaded to verify whether the product you ordered is the correct one
						before it is dispatched.
					</p>

					<p>
						Cancellation of an Order is only possible before the shipment of the product. Once the product
						is packed and shipped it cannot be cancelled. To cancel an order please go to the Discount IT
						Store’s website and visit ‘My Account’ Section and Click on ‘Cancel Order’ Button and then
						select the product you wish to cancel. Post Cancellation, the refund will be sent back via the
						original method of payment
					</p>
					<p>
						Do not accept tampered packages, the acceptance of which will automatically disqualify any
						return claims. For those products received in damaged condition and/or with missing items, the
						issue has to be reported within 24 hours, failing which your package will not be eligible for
						replacement.
					</p>
					<p>
						Once the returned products are received, it will undergo a thorough inspection, the completion
						of which will determine the approval or rejection of your refund.
					</p>
					<p>
						In case the product you received was later found to be defective, the Discount IT store will
						schedule a service engineer to resolve the issue after its evaluation.
					</p>
					<p>Some items labeled as non-refundable in the website will not be eligible for returns once received.</p>
					<p className="font-bold">Contact us</p>
					<p>In case of any questions about our Return and Cancellation Policy, kindly contact us.</p>
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
