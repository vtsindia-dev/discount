import { useState } from "react";
import { Collapse } from "@components/common/accordion";
import TableCard from "@components/common/pdp-table-card";
import { isEmpty } from "lodash";

interface Props {
	data: any;
}

const ProductDescriptionReview: React.FC<Props> = (props) => {
	const [expanded, setExpanded] = useState<number>(0);
	const { data: { color_name, brand_name, model_name } } = props;
	if (isEmpty(color_name) && isEmpty(brand_name) && isEmpty(model_name)) {
		return null;
	}
	let content: any = [];
	const productDescription: any = {
		brand: brand_name,
		model: model_name,
		color: color_name
	}
	Object.keys(productDescription).forEach((key: string) => {
		if (!isEmpty(productDescription[key])) {
			content.push({
				key,
				value: productDescription[key]
			})
		}
	})
	if(content.length > 0)
	return (
		<Collapse
			i={0}
			key={"product_description"}
			title={"Product Description"}
			translatorNS="review"
			content={typeof content === "object" ? <TableCard card={content} /> : content}
			expanded={expanded}
			setExpanded={setExpanded}
			variant="transparent"
		/>
	);
	else return null;
};

export default ProductDescriptionReview;
