import React from "react";
import { useTranslation } from "next-i18next";
import cn from 'classnames';
import Router from "next/router";
import Scrollbar from "@components/common/scrollbar";
interface MenuItem {
	id: number | string;
	path: string;
	label: string;
	columnItemItems?: MenuItem[];
}
type MegaMenuProps = {
	columns: ColumnProps[];
	handleMenuClose: () => void;
};

type ColumnProps = {
	id: number | string;
	columnItems: MenuItem[];
};

const MegaMenu: React.FC<MegaMenuProps> = ({ columns, handleMenuClose }) => {
	const { t } = useTranslation("menu");
	let newColumns: ColumnProps[] = [];
	columns?.forEach((column, columnIndex) => {
		column?.columnItems?.forEach((columnItem, columnItemIndex) => {
			let columnItemItems: any = columnItem?.columnItemItems;
			let columnItems: any = [];
			let numberOfArrayToSplit = 1;
			if (columnItemItems.length > 10) {
				numberOfArrayToSplit = Math.ceil(columnItemItems.length / 10);
				for (var i = 1; i <= numberOfArrayToSplit; i++) {
					const newColumnItemItems = columnItemItems.length > 10
						? columnItemItems.slice((i-1) * 10, i * 10)
						: columnItemItems;
					newColumns.push({
						columnItems: [
							{
								columnItemItems: newColumnItemItems,
								id: i === 1 ? columnItem.id : `${columnItem.id}-${i}`,
								label: i === 1 ? columnItem.label : "",
								path: ""
							}
						],
						id: columnItem.id
					});
				}
			} else {
				columnItems[columnItemIndex] = columns[columnIndex].columnItems[columnItemIndex]
				const columnItemsId = columns[columnIndex].id;
				newColumns[columnIndex] = {
					columnItems,
					id: columnItemsId
				}
			}
		})
	})

	return (
		<div className={cn("megaMenu shadow-header overflow-y-scroll max-h-96 bg-gray-200 absolute -start-20 xl:start-0 opacity-100 visible")}>
			<Scrollbar className="megaMenu-scroll flex-grow mb-auto">
				<div className="grid grid-cols-5">
					{newColumns?.map((column) => (
						<ul
							className="even:bg-gray-150 pb-3 2xl:pb-4 pt-3 2xl:pt-4"
							key={column.id}
						>
							{column?.columnItems?.map((columnItem) => (
								<React.Fragment key={columnItem.id}>
									<li className="mb-1.5">
										<div
											onClick={() => {
												handleMenuClose();
												Router.push(`/categories/${columnItem.label}-${columnItem.id}`);
											}}
											className={cn("block text-sm h-8 py-1.5 text-heading font-semibold px-5 xl:px-8 2xl:px-10 hover:text-heading hover:bg-gray-300", {
												"pointer-events-none opacity-0": columnItem.label === ""
											})}
										>
											{`${t(columnItem.label)}`}
										</div>
									</li>
									{columnItem?.columnItemItems?.map((item: any) => (
										<li
											key={item.id}
											className={
												columnItem?.columnItemItems?.length === item.id
													? "border-b border-gray-300 pb-3.5 mb-3"
													: ""
											}
										>
											<div
												onClick={() => {
													handleMenuClose();
													Router.push(`/category/${item.unique_id}`);
												}}
												className="text-body text-sm block py-1.5 px-5 xl:px-8 2xl:px-10 hover:text-heading hover:bg-gray-300"
											>
												{`${t(item.label)}`}
											</div>
										</li>
									))}
								</React.Fragment>
							))}
						</ul>
					))}
				</div>
			</Scrollbar>
		</div>
	);
};

export default MegaMenu;
