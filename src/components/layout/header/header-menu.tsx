import Link from "@components/ui/link";
import { FaChevronDown } from "react-icons/fa";
import MegaMenu from "@components/ui/mega-menu";
import classNames from "classnames";
import ListMenu from "@components/ui/list-menu";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import cn from 'classnames';

interface MenuProps {
	data: any;
	className?: string;
	additionalMenu: any;
}

const HeaderMenu: React.FC<MenuProps> = ({ data, className, additionalMenu }) => {
	const { t } = useTranslation("menu");
	const [ showMenu, setShowMenu ] = useState(false);
	const [currentMenu,setCurrentMenu] = useState(null)
	const setCurrentMenuHandler :any= (value:any) => {
		setCurrentMenu(value);
		setShowMenu(true)
	}
	let menu: any = [];
	if (data) {
		menu = [ ...data ];
	}
	menu = [ ...menu, ...additionalMenu ]
	// menu = [menu[0]];
	return (
		<nav className={classNames(`headerMenu flex w-full relative`, className)}>
			{menu?.map((item: any) => {
				let props = {};
				if ((item?.columns && Array.isArray(item.columns)) || (item?.subMenu && Array.isArray(item.subMenu))) {
					props = {
						onMouseEnter: () =>setCurrentMenuHandler(item.label) ,
						onMouseLeave: () => setShowMenu(false),
						onClick: () => setShowMenu(!showMenu)
					}
				}
				return (
					<div
						className={cn("menuItem group cursor-pointer py-7", {
							"relative": item.subMenu,
							"menuItemHover": showMenu
						})}
						key={item.id}
						{...props}
					>
						<Link
							href={item.path}
							className={cn("inline-flex items-center text-sm xl:text-base text-heading px-3 xl:px-4 py-2 font-normal relative", { "text-black": showMenu})}
						>
							{t(item.label)}
							{(item?.columns || item.subMenu) && (
								<span className="opacity-30 text-xs mt-1 xl:mt-0.5 w-4 flex justify-end">
									<FaChevronDown className={cn("transition duration-300 ease-in-out transform", { "-rotate-180": currentMenu===item.label && showMenu})} />
								</span>
							)}
						</Link>

						{item?.columns && Array.isArray(item.columns) && currentMenu===item.label && showMenu && (
							<MegaMenu columns={item.columns} handleMenuClose={() => setShowMenu(false)} />
						)}

						{item?.subMenu && Array.isArray(item.subMenu) && (
							<div className={cn("subMenu shadow-header bg-gray-200 absolute start-0 opacity-0", { "opacity-100": showMenu})}>
								<ul className="text-body text-sm py-5">
									{item.subMenu.map((menu: any, index: number) => {
										const dept: number = 1;
										const menuName: string = `sidebar-menu-${dept}-${index}`;

										return (
											<ListMenu
												dept={dept}
												data={menu}
												hasSubMenu={menu.subMenu}
												menuName={menuName}
												key={menuName}
												menuIndex={index}
											/>
										);
									})}
								</ul>
							</div>
						)}
					</div>
				)
			})}
		</nav>
	);
};

export default HeaderMenu;
