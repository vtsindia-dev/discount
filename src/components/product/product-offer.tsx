import React from "react";
import { useUI } from "@contexts/ui.context";

export default function ProductOffer() {
	const { modalData: { data } } = useUI();
	const { name, special_banner } = data;

	return (
		<div className="rounded-lg bg-white">
			<img
				src={special_banner}
				alt={name}
				className="lg:object-cover lg:w-full lg:h-full"
			/>
		</div>
	);
}
