import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import Subscription from "@components/common/subscription";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ContactForm from "@components/common/form/contact-form";
import ContactInfoBlock from "@containers/contact-info";

export default function ContactUsPage() {
    return (
        <>
            <Container>
                <div className={`my-14 lg:my-16 xl:my-20 px-0 pb-2 lg: xl:max-w-screen-xl mx-auto flex flex-col md:flex-row w-full`}>
                    <div className="md:w-full lg:w-2/5 2xl:w-2/6 flex flex-col h-full">
                        <ContactInfoBlock />
                    </div>
                    <div className="md:w-full lg:w-3/5 2xl:w-4/6 flex h-full md:ms-7 flex-col lg:ps-7">
                        <ContactForm />
                    </div>
                </div>
                <Subscription />
            </Container>
        </>
    );
}

ContactUsPage.Layout = Layout;

export const getServerSideProps = async ({ locale }: any) => {
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

