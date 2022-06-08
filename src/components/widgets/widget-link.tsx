import type { FC } from "react";
import { useTranslation } from "next-i18next";

interface Props {
	className?: string;
	data: {
		widgetTitle?: string;
		lists: {
			id: string;
			path?: string;
			title: string;
			icon?: any;
		}[];
		id: number
	};
}

const WidgetLink: FC<Props> = ({ className, data }) => {
	const { widgetTitle, lists, id } = data;
	const { t } = useTranslation("footer");
	return (
		<div className={`${className}`}>
			<h4 className="text-heading text-center sm:text-left text-sm md:text-base xl:text-lg font-semibold mb-5 2xl:mb-6 3xl:mb-7">
				{t(`${widgetTitle}`)}
			</h4>
			<ul className="text-xs lg:text-sm text-body flex flex-col space-y-3 lg:space-y-3.5">
				{lists.map((list: any) => (
					<li
						key={`widget-list--key${list.id}`}
						className="flex items-baseline justify-center sm:justify-start"
					>
						{list.icon && (
							<span className="me-3 relative top-0.5 lg:top-1 text-sm lg:text-base">
								{list.icon}
							</span>
						)}
						<a className="transition-colors duration-200 hover:text-black" target={id === 1 ? "_blank" : "_self"} href={list.type === "email" ? `mailto:${t(`${list.path}`)}` : list.path ? list.path : "#!"}>
							{t(`${list.title}`)}
						</a>
					</li>
				))}
			</ul>
		</div>
	);
};

export default WidgetLink;
