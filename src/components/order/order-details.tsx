import { useOrderQuery } from "@framework/order/get-order";
import usePrice from "@framework/product/use-price";
// import { OrderItem } from "@framework/types";
import { useRouter } from "next/router";
import { get, isEmpty } from "lodash";
import { paymentMethod } from "@components/checkout/checkout-payment-method";
import OrdersTable from "@components/my-account/orders-table";
import { formatPrice } from "@framework/product/use-price";
import { GoPlus } from 'react-icons/go';
import { ROUTES } from "@utils/routes";

// import { BsArrowLeft } from 'react-icons/bs';
// import Router from "next/router";
// import { ROUTES } from "@utils/routes";

// const OrderItemCard = ({ product }: { product: OrderItem }) => {
// 	const { price: itemTotal } = usePrice({
// 		amount: product.price * product.quantity,
// 		currencyCode: "INR",
// 	});
// 	return (
// 		<tr
// 			className="border-b font-normal border-gray-300 last:border-b-0"
// 			key={product.id}
// 		>
// 			<td className="p-4">
// 				{product.name} * {product.quantity}
// 			</td>
// 			<td className="p-4">{itemTotal}</td>
// 		</tr>
// 	);
// };

const OrderDetails: React.FC<{ className?: string }> = ({
	className = "pt-10 lg:pt-12",
}) => {
	const {
		query: { id = "", item_id = "" },
	} = useRouter();
	const router = useRouter();
	const { data: order, isLoading } = useOrderQuery({ order_id: id, orderitem_id: item_id });
	const { price: subtotal } = usePrice(
		order && {
			amount: parseInt(order?.subTotal, 10),
			currencyCode: "INR",
		}
	);
	const { price: total } = usePrice(
		order && {
			amount: parseInt(order?.totalPrice, 10),
			currencyCode: "INR",
		}
	);
	const { price: shipping } = usePrice(
		order && {
			amount: parseInt(order?.deliveryCharge, 10),
			currencyCode: "INR",
		}
	);
	const { price: discount } = usePrice(
		order && {
			amount: parseInt(order?.discountPrice, 10),
			currencyCode: "INR",
		}
	);
	const { price: itemPrice } = usePrice(
		order && {
			amount: parseInt(order?.price, 10),
			currencyCode: "INR",
		}
	);

	function navigateToProductPage() {
		router.push(`${ROUTES.PRODUCT}/${order?.uniqueId}`, undefined, {
			locale: router.locale,
		});
	}

	const paymentMethodId: any = get(order, 'paymentMethod', 4) || 4;
	let displayName = "";
	let phoneNumber = "";
	let addressField = [];
	if (!isEmpty(get(order, 'shippingAddress', '')) && order?.shippingAddress.length) {
		const { name, address1, address2, city_name, state_name, zipCode, phone, optionalPhone } = order?.shippingAddress[0];
		displayName = name;
		addressField = [address1, address2, city_name, state_name, zipCode].filter(value => value && value);
		phoneNumber = [phone, optionalPhone].filter(value => value && value).join(', ');
	}
	if (isLoading) return <p>Loading...</p>;
	return (
		<div className={className}>
			{/* <div className="flex items-center cursor-pointer" onClick={() => Router.push(ROUTES.ORDERS)}><BsArrowLeft size={30} className="pr-2"/>Back</div> */}
			<div className="flex items-center">
				<h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mt-1 mb-1">
					Order Details
				</h2>
				<div className="ml-2 px-2 text-sm border capitalize rounded-md" style={{ color: 'white', backgroundColor:order?.status === "ordered" ? "rgba(5, 150, 105, var(--tw-text-opacity))" : "orange" }}>{order?.status}</div>
			</div>
			<div>
				<div className="flex py-4 lg:px-3 cursor-pointer" onClick={navigateToProductPage}>
					<div className="flex border my-auto rounded-md w-30 h-30 flex-shrink-0">
						<img
							src={order?.image ?? "/assets/placeholder/order-product.svg"}
							width="64"
							height="64"
							className="object-cover"
						/>
					</div>
					<div className="ps-5">
						<h6 className="text-base font-regular text-heading">
							{order?.productName}
						</h6>
						<div className="flex items-center mt-3 text-green-600 font-bold text-base">
							Quantity : {order?.quantity}
						</div>
					</div>
					<div className="flex flex-col ms-auto items-end text-heading text-sm ps-2 flex-shrink-0">
						<span className="pr-3 text-green-600 font-bold text-base">{itemPrice}</span>
					</div>
				</div>
				{order?.extendedWarranty.length ? order?.extendedWarranty.map((warranty: any) => {
					const salePrice = formatPrice({
						amount: warranty.sale_price,
						currencyCode: "INR",
						locale: "en"
					});
					return (
						<div key={warranty.id} className="flex py-4 lg:px-3 mb-5 border-t border-gray-300">
							<div className="flex border my-auto w-16 h-16 flex-shrink-0 relative">
								<img
									src={"/assets/images/checkout/warranty.png"}
									width="64"
									height="64"
									className="object-cover"
								/>
								<span className="absolute top-0 right-0 bottom-0 left-0 flex justify-center items-center mb-4 font-bold">{warranty.years}</span>
							</div>
							<div className="ps-5">
								<h6 className="text-base font-regular text-heading">
									<div>{`Extended ${warranty.years} years warranty`}</div>
								</h6>
								<div className="text-sm">Buy together offer</div>
								<a href={warranty.link} target="_blank" className="text-xs text-primary flex items-center mt-3">
									Know more
								</a>
							</div>
							<div className="flex flex-col ms-auto items-end text-heading text-sm ps-2 flex-shrink-0">
								<span className="text-gray-600 pr-3 font-bold">{salePrice}</span>
							</div>
						</div>
					)
				}) : null}
				{order?.addOns.length ? order?.addOns.map((addOnsProduct: any) => {
					const salePrice = formatPrice({
						amount: addOnsProduct.sale_price,
						currencyCode: "INR",
						locale: "en"
					});
					return (
						<div key={addOnsProduct.id} className="flex py-4 lg:px-3 mb-5 border-t border-gray-300">
							<div className="grid grid-cols-2 gap-2">
								{addOnsProduct.products.map((product: any, index: number) => {
									const { name, gallery } = product;
									// const productSalePrice = formatPrice({
									// 	amount: sale_price,
									// 	currencyCode: "INR",
									// 	locale: "en"
									// });
									const image = gallery[0].thumbnail;
									let plusIcon = <GoPlus size={30} className="mx-10" />;
									if (index === addOnsProduct.products.length - 1) {
										plusIcon = <></>;
									}
									return (
										<div className="flex items-center">
											<div className="flex items-center">
												<div className="flex border my-auto w-16 h-16 flex-shrink-0 relative">
													<img
														src={image || "/assets/images/checkout/warranty.png"}
														width="64"
														height="64"
														className="object-cover"
													/>
												</div>
												<div className="ps-5">
													<h6 className="text-base font-regular text-heading">
														<div className="truncate w-32">{name}</div>
													</h6>
													{/* <span className="text-gray-600 pr-3">{productSalePrice}</span> */}
												</div>
											</div>
											{plusIcon}
										</div>
									);
								})}
							</div>
							<div className="flex flex-col ms-auto items-end text-heading text-sm ps-2 flex-shrink-0">
								<span className="text-gray-600 pr-3 font-bold">{salePrice}</span>
								{addOnsProduct.discount && <span className="text-green-600 font-bold">{`${addOnsProduct.discount}%`}</span>}
							</div>
						</div>
					)
				}) : null}
			</div>
			<div className="flex flex-col md:flex-row sm:flex-row w-full">
				<div className="flex-1 sm:mb-2">
					<h4 className="text-md md:text-lg xl:text-xl font-bold text-heading xl:mb-6 xl:mt-8">
						Shipping Details
					</h4>
					<p className="m-0 font-bold">{displayName}</p>
					{addressField.map((value: any, index: number) => <div className="mt-1 capitalize">{value}{index === addressField.length - 1 ? '.' : ','}</div>)}
					<p className="flex sm:mb-2"><p className="font-bold mr-2">Phone Number:</p> {phoneNumber}</p>
				</div>
				<div className="flex-1">
					<h6 className="text-md md:text-lg xl:text-xl font-bold text-heading xl:mb-6 xl:mt-8">
						Cancellation Process
					</h6>
					<p className="m-0 mb-1">Kindly Check eligibility for <a className="text-blue-600" href="/return-policy">{"Return & Cancellation Policy"}</a> of the product</p>
					<p className="m-0 mt-5 font-bold">For cancellation, Kindly contact us on</p>
					<p className="m-0 flex mt-2"><p className="font-bold mr-2">Email: </p>cancelorder@discountitstore.in</p>
					<p className="m-0 flex"><p className="font-bold mr-2">Phone Number:</p> +91-9840022665</p>
				</div>
			</div>
			{/* <h4 className="text-md md:text-lg xl:text-xl font-bold text-heading mb-4 xl:mb-6 mt-6 xl:mt-8">
				Shipping Details
			</h4>
			<table className="w-full text-heading font-semibold text-sm lg:text-base">
				<tbody>
					<tr className="odd:bg-gray-150">
						<td className="p-4 italic">Name:</td>
						<td className="p-4">{displayName}</td>
					</tr>
					<tr className="odd:bg-gray-150">
						<td className="p-4 italic">Address:</td>
						<td className="p-4">
							{addressField.map((value: any, index: number) => <div className="mt-1 capitalize">{value}{index === addressField.length - 1 ? '.' : ','}</div>)}
						</td>
					</tr>
					<tr className="odd:bg-gray-150">
						<td className="p-4 italic">Phone Number:</td>
						<td className="p-4">{phoneNumber}</td>
					</tr>
				</tbody>
			</table> */}
			{get(order, 'relatedToOrder') && get(order, 'relatedToOrder')?.length &&
				<>
					<h4 className="text-md md:text-lg xl:text-xl font-bold text-heading mb-4 xl:mb-6 mt-6 xl:mt-8">
						Other Order Item
					</h4>
					<OrdersTable order={order?.relatedToOrder} />
				</>
			}
			<h4 className="text-md md:text-lg xl:text-xl font-bold text-heading mb-4 xl:mb-6 mt-6 xl:mt-8">
				Overall Price
			</h4>
			<table className="w-full text-heading font-semibold text-sm lg:text-base">
				<tbody>
					<tr className="odd:bg-gray-150">
						<td className="p-4 italic">Subtotal:</td>
						<td className="p-4">{subtotal}</td>
					</tr>
					<tr className="odd:bg-gray-150">
						<td className="p-4 italic">Shipping Charge:</td>
						<td className="p-4">
							{shipping}
						</td>
					</tr>
					<tr className="odd:bg-gray-150">
						<td className="p-4 italic">Discount:</td>
						<td className="p-4">{discount}</td>
					</tr>
					<tr className="odd:bg-gray-150">
						<td className="p-4 italic">Payment method:</td>
						<td className="p-4">{paymentMethod[paymentMethodId - 1].label}</td>
					</tr>
					<tr className="odd:bg-gray-150">
						<td className="p-4 italic">Total:</td>
						<td className="p-4">{total}</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default OrderDetails;
