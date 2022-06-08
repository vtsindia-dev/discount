import Image from "next/image";
import Link from "@components/ui/link";
import cn from "classnames";
import { siteSettings } from "@settings/site-settings";
import { useWindowSize } from "@utils/use-window-size";

const Logo: React.FC<React.AnchorHTMLAttributes<{}>> = ({
	className,
	...props
}) => {
	const { width } = useWindowSize();
	const logoSize = width < 768 ? 120 : width < 1025 ? 160 : 200
	return (
		<Link
			href={siteSettings.logo.href}
			className={cn("inline-flex focus:outline-none", className)}
			{...props}
		>
			<Image
				src={siteSettings.logo.url}
				alt={siteSettings.logo.alt}
				height={46}
				width={logoSize}
				layout="fixed"
				loading="eager"
			/>
		</Link>
	);
};

export default Logo;
