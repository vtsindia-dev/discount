import { useState } from "react";
import { Collapse } from "@components/common/accordion";
import TableCard from "@components/common/pdp-table-card";

interface Props {
	data: any;
}

const TempProductMetaReview: React.FC<Props> = (props) => {
	const [expanded, setExpanded] = useState<number>(0);
	const { data: { product_specification } } = props;
	let content: any = [];
	if (product_specification && product_specification.length) {
		content = product_specification.map((item: any) => {
			const key = Object.keys(item);
			const value = Object.values(item);
			return {
				key: [key[0]],
				value: [value[0]]
			}
		})
	}
	if(content.length > 0)
	return (
		<Collapse
			i={0}
			key={"product_specification"}
			title={"Product Specification"}
			translatorNS="review"
			content={typeof content === "object" ? <TableCard card={content} /> : content}
			expanded={expanded}
			setExpanded={setExpanded}
			variant="transparent"
		/>
	);else return null;
};

export default TempProductMetaReview;
