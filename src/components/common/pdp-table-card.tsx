import { TableCardType } from "@framework/types";

const TableCard: React.FC<{ card: TableCardType }> = ({ card }) => {
	return (
		<table className="w-full text-heading font-semibold text-sm lg:text-base">
			<tbody>
				{card.map((item, index) => (
					<tr
						className="font-normal"
						key={index}
					>
						<td style={{ width: '14rem' }} className="p-2 pl-0 text-gray-800 align-baseline capitalize">{item.key}</td>
						<td className="p-2 align-baseline">{item.value}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default TableCard;
