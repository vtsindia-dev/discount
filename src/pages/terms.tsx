import Layout from "@components/layout/layout";
import Container from "@components/ui/container";
import PageHeader from "@components/ui/page-header";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function TermsPage() {
	return (
		<>
			<PageHeader pageHeader="text-page-terms-of-service" />
				<Container>
				<div className="mt-12 lg:mt-14 xl:mt-16 lg:py-1 border-b border-gray-300 px-4 md:px-10 lg:px-7 xl:px-16 2xl:px-24 3xl:px-32 pb-9 md:pb-14 lg:pb-16 2xl:pb-20 3xl:pb-24">
					<div className="mx-auto max-w-[1920px] px-4 md:px-8 2xl:px-16" style={{textAlign:"justify"}}>
						<h2 className="text-lg md:text-xl lg:text-2xl text-heading font-bold mb-4">Terms & conditions</h2>
						<div className="text-heading text-sm leading-7 lg:text-base lg:leading-loose">
						<p>
							Welcome to Discount IT Store. The following Terms & Conditions govern your access and/or
							use of Discount IT store’s website, products, categories, sub-categories, pages related to the
							website (any applications, mobile applications, content, and materials) whether as a registered
							user or a guest.
						</p>
						<p className="font-bold">Acceptance of Terms & Conditions</p>
						<p>
							If you wish to continue browsing through this website, then you are automatically bound by and
							are agreeing to comply with the Terms & conditions of our company which relates to the privacy
							policy, refund policy and cookie policy subsequently. So, we insist you to please go through our
							terms & conditions thoroughly before using https://discount-it.vercel.app/ as they oversee your
							use of information, tools and features provided via the site and establish an agreement
							regarding your legal rights and obligations relating to Discount IT store, its affiliates,
							subsidiaries, contractors (individually and collectively) and our third party suppliers, information
							providers and marketing partners.
						</p>
						<p>
							In addition, your privileges and obligations regarding your purchase and/or use of products
							and/or the services, information, software offered by us are ruled by the terms of our agreement,
							product license agreement, order or order schedule with Discount IT Store or as may be
							applicable.
						</p>
						<p>
							If you do not agree to these Terms & Conditions you are not permitted to use the Discount IT
							Store’s website. Kindly note that Discount IT Store can change these terms & conditions at any
							time without notice and it is for your general information and use only. In case you use the
							platform or website after the change of any of these Terms & conditions then you are entirely
							agreeing to all of the changes.
						</p>
						<p className="font-bold">Eligibility</p>
						<p>
							Access and/or use of Discount IT store’s website, products, categories, sub-categories, and
							pages related to the website (any applications, mobile applications, content, and materials) by
							anyone under the age of 18 is strictly prohibited. By agreeing to these terms and continuing to
							browse through the site, you represent that you are 18 years of age or above and warrant that
							you have the legal capacity to enter and abide by these Terms & Conditions.
						</p>
						<p className="font-bold">Account and Security</p>
						<p>
							In order to use certain features in this website you may need to set up an account, you must
							give only relevant and accurate information when doing so. By accessing the account, you
							represent that you have been authorized by the Discount IT store to do so and are accessing
							the account only by using the credentials provided to you by the Discount IT store. You shall not
							use any account belonging to any other person without the prior, written permission of Discount 
							IT Store. You must bring to our immediate notice when someone is using your account without
							your permission. You cannot transfer your account to someone else and by doing so, you could
							incur civil or criminal charges. We are not accountable for the damages and/losses caused by
							someone using your account without your permission.
						</p>
						<p className="font-bold">General terms of use</p>
						<p>On using this website you are subject to the following terms of use.</p>
						<p>
						<ul className="list-disc ps-16">
							<li>
								The content of the website is subject to change without prior notice and is for your
								general information and use only.
							</li>
							<li>
								Neither we nor any other third party offers warranty/guarantee for the truthfulness,
								timeline, presentation, completeness or relevance of the information and resources found or
								provided on this website. You accept that those information and resources will contain
								inaccuracies or errors. We deeply rule out the liability for any such discrepancy or errors to the
								fullest degree as permitted by the law.
							</li>
							<li>
								We are not liable for the use of any information and resources found on this website as it
								is entirely at your own risk.
							</li>
							<li>
								The website contains materials which includes, but is not limited to the design, layout,
								look, appearance and graphics, that is specifically owned by or licensed to us.
							</li>
							<li>
								Note that any unauthorized use of this website may raise a claim for damages and/or
								could be a criminal offence.
							</li>
							<li>
								Under any circumstances you may not create a link to this website from another website
								or document without getting the prior consent of the Discount IT Store.
							</li>
							<li>
								Any dispute arising because of the use of this website in any illegal way is subject to the
								laws of India and other regulatory authorities.
							</li>
						</ul>
						</p>
						<p className="font-bold">Warranty Disclaimer</p>
						<p>
							We do not commit to warrant the completeness or accuracy of the information published on our
							site nor do we ensure that the website remains available or that the contents on the platform are
							kept up-to-date.
						</p>
						<p>
							You are accessing the website at your own risk and the website provided on a “as is” and “as
							available” basis. Discount IT store, its affiliates, subsidiaries, contractors, and partners disclaim
							all warranties of any kind.
						</p>
						<p>
							We make no guarantee that the website or any products purchased through the website
							(application) will meet your requirements. We do not warrant that the website will be
							uninterrupted, timely, secure and/or without any errors. Any material or content obtained by use 
							of the website (application) are obtained at your own discretion and risk. Discount IT store will
							not be responsible for any damage or loss caused to your computer/data by any bugs, viruses,
							malwares or other destructive code resulting from the use of the website (application) or from its
							content or material.
						</p>
						<p className="font-bold">Intellectual Property Rights</p>
						<p>
							The website (application) and all the information and materials contained within it are the
							property of Discount IT store and/or the property of our associates or third party suppliers. It is
							protected by copyright, trademark and other intellectual property rights law. You can make use
							the site and its materials/contents only after getting our authorization. Any use of the website
							(application) or its materials in violation of its copyrights, privacy rights, publicity rights,
							trademark rights, patent rights, contract rights, or any other rights belonging to us or the third
							party is to be strictly avoided; The violation of which will lead to the suspension, cancellation or
							termination of your rights to use the website (application) without our prior notice.
						</p>
						<p>
							You acknowledge that all the information (listed or updated) submitted on our website is
							accurate and true to your knowledge. Contact us immediately if you believe there is a violation
							of copyright in any form.
						</p>
						<p className="font-bold">Contact us</p>
						<p>In case of any questions about our terms & conditions, please contact us.</p>
						</div>
					</div>
				</div>
				</Container>
		</>
	);
}

TermsPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => {
	return {
		props: {
			...(await serverSideTranslations(locale, [
				"common",
				"forms",
				"menu",
				"terms",
				"footer",
			])),
		},
	};
};