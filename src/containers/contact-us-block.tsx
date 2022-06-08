import Image from 'next/image';
import cn from 'classnames';
import Button from '@components/ui/button';
import { BsArrowRight } from 'react-icons/bs';
import Text from '@components/ui/text';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

const contactUsDelivery = [
	{
		key: 'contact-us',
		title: 'Want To Purchase In Bulk?',
		subText: 'Contact us to know more offers for bulk and corporate offers.',
		image: '/assets/images/contact-us.jpg',
		buttonText: 'Contact Us for More Offer',
		url: '/contact-us'
	},
	{
		key: 'delivery',
		title: 'Assured Delivery Within 24 Hrs',
		subText: 'We guarantee that your order will be delivered within 24 hours.',
		image: '/assets/images/delivery.jpg',
		buttonText: 'See How It Works',
		url: '/delivery'
	}
];

interface BannerProps {
	className?: string;
}

const ContactUsBlock: React.FC<BannerProps> = ({
	className = 'mb-12 lg:mb-14 xl:mb-16 lg:pb-1 xl:pb-0 grid md:grid md:grid-cols-2 gap-8 md:gap-8 xl:gap-10'
}) => {
	const { t } = useTranslation('common');
	const router = useRouter();
	return (
		<div className={`${className}`}>
			{contactUsDelivery.map((data: any) => {
				const { title, subText, image, buttonText, url, key } = data;
				return (
					<div key={key} className="flex flex-col justify-center text-center">
						<Text variant="pageHeading" className="mb-2 md:mb-4">
							{t(`${title}`)}
						</Text>
						<p className="text-body text-sm lg:text-base leading-6 md:leading-7 xl:px-10 3xl:px-20">
							{t(`${subText}`)}
						</p>
						<div className="mt-6 lg:mt-10 xl:mt-12 mb-6 lg:mb-10 xl:mb-12">
							<Image
								src={image}
								width={885}
								height={430}
								alt={key}
								quality={100}
								className={cn('bg-gray-300 object-fill w-full h-full rounded')}
							/>
						</div>
						<Button className="mx-auto w-auto col-span-1 h-12 sm:h-auto" onClick={() => router.push(url)}>
							<span className="mr-3 text-sm sm:text-base lg:text-lg ">{t(`${buttonText}`)}</span>
							<BsArrowRight size="25" />
						</Button>
					</div>
				);
			})}
		</div>
	);
};

export default ContactUsBlock;
