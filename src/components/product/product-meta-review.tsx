import { useState } from "react";
import { Collapse } from "@components/common/accordion";
// import ReviewForm from "@components/common/form/review-form";
import TableCard from "@components/common/pdp-table-card";

interface Props {
	data: any;
}

const ProductMetaReview: React.FC<Props> = ({ data }) => {
	const [expanded, setExpanded] = useState<number>(0);
	// review need to enable when needed
	// content={
	// 	data?.meta.length === item.id ? (
	// 		<>
	// 			{item.content} <ReviewForm />
	// 		</>
	// 	) : typeof item.content === "object" ? <TableCard card={item.content} /> : item.content
	// }
	return (
		<>
			{data?.meta?.length && data?.meta.map((item: any, index: any) => (
				<Collapse
					i={index}
					key={item.title}
					title={item.title}
					translatorNS="review"
					content={typeof item.content === "object" ? <TableCard card={item.content} /> : item.content}
					expanded={expanded}
					setExpanded={setExpanded}
					variant="transparent"
				/>
			))}
		</>
	);
};

export default ProductMetaReview;
