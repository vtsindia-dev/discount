import { CheckBox } from "@components/ui/checkbox";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { isEmpty } from "lodash";
import Input from "@components/ui/input";
import InputRange, { Range } from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import { useForm } from "react-hook-form";

type FormValues = {
	min: number;
	max: number;
};

let timeout: any = null;

export const Filter = (props: any) => {
	const router = useRouter();
	const { label, options } = props;
	const { pathname, query } = router;
	const filterName = label.toLowerCase();
	const selectedFilters = query?.[filterName]
	? filterName === 'price'
		? (query?.[filterName] as string).split("-")
		: (query?.[filterName] as string).split(",")
	: [];
	const [ price, setPrice ] = useState<any>(
		{ min: parseInt(selectedFilters[0], 10) || 0,
			max: parseInt(selectedFilters[1], 10) || parseInt(options, 10)
		});
	const [formState, setFormState] = React.useState<string[]>(
		selectedFilters
	);

	const { register } = useForm<FormValues>({
		defaultValues: price,
	});
	
	React.useEffect(() => {
		setFormState(selectedFilters);
		if (filterName === 'price') {
			setPrice({
				min: parseInt(selectedFilters[0], 10) || 0,
				max: parseInt(selectedFilters[1], 10) || parseInt(options, 10)
			})
		}
	}, [query?.[filterName]]);

	if (isEmpty(options)) {
		return null;
	}

	function handleItemClick(e: React.FormEvent<HTMLInputElement>): void {
		const { value } = e.currentTarget;
		let currentFormState = formState.includes(value)
			? formState.filter((i) => i !== value)
			: [...formState, value];
		const { [filterName]: filterValue, ...restQuery } = query;
		router.push(
			{
				pathname,
				query: {
					...restQuery,
					...(!!currentFormState.length
						? { [filterName]: currentFormState.join(",") }
						: {}),
				},
			},
			undefined,
			{ scroll: false }
		);
	}

	function handePriceSliderChange(value: Range) {
		const priceLabel = `${value.min}-${value.max}`;
		const { [filterName]: filterValue, ...restQuery } = query;
		router.push(
			{
				pathname,
				query: {
					...restQuery,
					[filterName]: priceLabel,
				},
			},
			undefined,
			{ scroll: false }
		);
	}

	const handleMinValueChange = (event: React.FormEvent<HTMLInputElement>) => {
		const { value } = event.currentTarget;
		if (!(parseInt(event.currentTarget.value, 10) < 0 || parseInt(event.currentTarget.value, 10) > parseInt(price.max, 10))) {
			const newPrice = { max: price.max, min: parseInt(value, 10) }
			setPrice(newPrice)
			if(timeout){
				clearTimeout(timeout);
			}
			timeout = setTimeout(() => {
				clearTimeout(timeout);
				handePriceSliderChange(newPrice)
			}, 500)
		}
	}

	const handleMaxValueChange = (event: React.FormEvent<HTMLInputElement>) => {
		const { value } = event.currentTarget;
		if (!(parseInt(event.currentTarget.value, 10) > parseInt(options, 10) || parseInt(event.currentTarget.value, 10) < parseInt(price.min, 10))) {
			const newPrice = { min: price.min, max: parseInt(value, 10) }
			setPrice(newPrice)
			if(timeout){
				clearTimeout(timeout);
			}
			timeout = setTimeout(() => {
				clearTimeout(timeout);
				handePriceSliderChange(newPrice)
			}, 500)
		}
	}

	return (
		<div className="block border-b border-gray-300 pb-7 mb-7">
			<h3 className="text-heading text-sm md:text-base font-semibold mb-7">
				{label}
			</h3>
			<div className="mt-2 flex flex-col space-y-4 filter-container">
				{label === 'Price'
				? <div>
						<InputRange
							draggableTrack
							maxValue={parseInt(options, 10)}
							minValue={0}
							onChange={(value: any) => setPrice(value)}
							onChangeComplete={(value: any) => handePriceSliderChange(value)}
							value={price}
						/>
						<div className="flex justify-between items-end mt-6">
							<Input
								type="tel"
								labelKey="Min"
								value={price.min || 0}
								{...register("min")}
								onKeyPress={(event) => {
									if (isEmpty(event?.key.match(new RegExp('^[0-9]+$'))) 
										|| parseInt(event.currentTarget.value, 10) < 0
										|| parseInt(event.currentTarget.value, 10) > parseInt(price.max, 10)
									) {
										event.preventDefault();
									}
								}}
								onChange={handleMinValueChange}
								variant="solid"
								className="w-32 flex items-center flex-col"
							/>
							<span className="mb-5">__</span>
							<Input
								type="tel"
								labelKey="Max"
								{...register("max")}
								value={price.max || 0}
								onKeyPress={(event) => {
									if (isEmpty(event?.key.match(new RegExp('^[0-9]+$')))
										|| parseInt(event.currentTarget.value, 10) > parseInt(options, 10)
										|| parseInt(event.currentTarget.value, 10) < parseInt(price.min, 10)
									) {
										event.preventDefault();
									}
								}}
								onChange={handleMaxValueChange}
								variant="solid"
								className="w-32 flex items-center flex-col"
							/>
						</div>
					</div>
					: <>
							{options?.map((item: any) => (
								<CheckBox
									key={item.id}
									label={item.name}
									name={item.name.toLowerCase()}
									checked={formState.includes(item.unique_id)}
									value={item.unique_id}
									onChange={(e) => handleItemClick(e)}
								/>
							))}
						</>
				}
			</div>
		</div>
	);
};
