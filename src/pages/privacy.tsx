import Layout from "@components/layout/layout";
import Container from "@components/ui/container";
import PageHeader from "@components/ui/page-header";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function PrivacyPage() {
	return (
		<>
			<PageHeader pageHeader="text-page-privacy-policy" />
				<Container>
					<div className="mt-12 lg:mt-14 xl:mt-16 lg:py-1 border-b border-gray-300 px-4 md:px-10 lg:px-7 xl:px-16 2xl:px-24 3xl:px-32 pb-9 md:pb-14 lg:pb-16 2xl:pb-20 3xl:pb-24">
					<div className="flex flex-col md:flex-row">
						{/* <nav className="md:w-72 xl:w-3/12 mb-8 md:mb-0">
							<ol className="sticky md:top-16 lg:top-28 z-10">
								{privacyPolicy?.map((item, index) => (
									<li key={item.id}>
										<Link
											spy={true}
											offset={-120}
											smooth={true}
											duration={500}
											to={makeTitleToDOMId(item.title)}
											activeClass="text-heading font-semibold"
											className="block cursor-pointer py-3 lg:py-3.5  text-sm lg:text-base  text-gray-700 uppercase"
										>
											{(index <= 9 ? "0" : "") +
												index +
												" " +
												t(`${item.title}`)}
										</Link>
									</li>
								))}
							</ol>
						</nav> */}
						{/* End of section scroll spy menu */}

						<div className="md:w-12/12 md:ps-8 pt-0 lg:pt-2" style={{textAlign:"justify"}}>
							<h2 className="text-lg md:text-xl lg:text-2xl text-heading font-bold mb-4">
								Privacy policy
							</h2>
							<div className="text-heading text-sm leading-7 lg:text-base lg:leading-loose">
							<p>
								Our privacy policy explains how the Discount IT Store uses and protects the personal
								information you provide. We have compiled this Privacy policy to answer how your ‘Personally
								Identifiable Information’ (PII) is being used online. Kindly, go through our Privacy policy carefully
								to get a thorough understanding of how the information about you is handled by us.
							</p>
							<p className="font-bold">What personal information do we collect through our website?</p>
							<p>
								Discount IT Store collects personally identifiable information like Name, Phone number,
								WhatsApp number and email ID along with Facebook and Instagram ID from when you register
								on our website or place an order. We might also receive additional information through other
								sources such as delivery addresses.
							</p>
							<p className="font-bold">How we collect, use and protect your information</p>
							<p>Your information will be automatically collected when you fill in forms, register, purchase, signin, login or browse our website.</p>
							<p>
								We use your personal information to display product and service cantered ads based on your
								interest that may be of interest to you. We also use your information to gain personalized user
								experience to develop our website into one that provides a better experience.
							</p>
							<p>
								Periodic scanning of the website is done regularly to look for security risks and susceptibilities.
								All the personal information we obtain is maintained inside secure networks and can only be
								accessed by authorized personnel. We have integrated a number of security measures to
								ensure the safety of your personal information. The transactions you make are processed
								through a secure gateway the information of which is not processed or stored by our servers.
							</p>
							<p className="font-bold">Cookies</p>
							<p>Discount IT store uses and allows select partners to use cookies to help understand your preferences and provide personalized features, contents that improve your user experience.</p>
							<p>
								Discount IT Store customizes your shopping experience by storing cookies on your computer.
								Cookies cannot be programmed and cannot carry viruses or install malware. A cookie does not
								give us any form of access to your system or information and you have full control on what
								information you wish you share with us through the cookies.
							</p>
							<p>Although most browsers automatically accept cookies, you can opt to accept or decline the cookies at your convenience.</p>
							<p className="font-bold">Links to third party sites</p>
							<p>
								Our website may often contain hyperlinks to third party or manufacture sites for product related
								information. Once you visit these third party sites we are not liable for any unauthorized or
								unlawful disclosures of your personal information, as we have no control over the information
								shared with that website. These third party sites have their own independent privacy policies
								that may be different from ours. Please note that our privacy policy is subject to change at any
								time without notice.
							</p>
							<p className="font-bold">Contact us</p>
							<p>In case of any queries regarding the Privacy Policy, Returns and Refund Policies then Please Contact us.</p>
							</div>
							{/* {privacyPolicy?.map((item) => (
								// @ts-ignore
								<Element
									key={item.title}
									id={makeTitleToDOMId(item.title)}
									className="mb-10"
								>
									<h2 className="text-lg md:text-xl lg:text-2xl text-heading font-bold mb-4">
										{t(`${item.title}`)}
									</h2>
									<div
										className="text-heading text-sm leading-7 lg:text-base lg:leading-loose"
										dangerouslySetInnerHTML={{
											__html: t(`${item.description}`),
										}}
									/>
								</Element>
							))} */}
						</div>
						{/* End of content */}
					</div>
				</div>
			</Container>
		</>
	);
}

PrivacyPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => {
	return {
		props: {
			...(await serverSideTranslations(locale, [
				"common",
				"forms",
				"menu",
				"privacy",
				"footer",
			])),
		},
	};
};
 