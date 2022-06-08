import { motion } from "framer-motion";
import { fadeInTop } from "@utils/motion/fade-in-top";
import { useWindowSize } from "@utils/use-window-size";
import { useTranslation } from "next-i18next";
import moment from "moment";
import Router from "next/router";
import Image from "next/image";


const OrdersTable: React.FC<{ order: any }> = (props) => {
	const { width } = useWindowSize();
	const { t } = useTranslation("common");
	const { order } = props;
	const handleOrderItemClick = (orderId: any, orderItemId: any) => {
		Router.push(`/my-account/orders/${orderId}/${orderItemId}`);
	}
	return (
		<>
			<motion.div
				layout
				initial="from"
				animate="to"
				exit="from"
				//@ts-ignore
				variants={fadeInTop(0.35)}
				className={`w-full flex flex-col`}
			>
				{width >= 1025 ? (
					<table>
						<thead className="text-sm lg:text-base">
							<tr>
								<th className="bg-gray-100 p-4 text-heading font-semibold text-start first:rounded-ts-md">
									{t("text-order")}
								</th>
								<th className="bg-gray-100 p-4 text-heading font-semibold text-start lg:text-center">
									{t("text-date")}
								</th>
								<th colSpan={2} className="bg-gray-100 p-4 text-heading font-semibold text-start lg:text-center">
									{t("text-product-details")}
								</th>
								<th className="bg-gray-100 p-4 text-heading font-semibold text-start lg:text-center">
									{t("text-status")}
								</th>
							</tr>
						</thead>
						<tbody className="text-sm lg:text-base">
							{
								order?.length ? order.map((orderData: any, index: any) => {
									const { orderId, orderItemId, productName, status, orderDate, image, totalPrice } = orderData;
									return (
										<tr key={index} className="border-b border-gray-300 last:border-b-0 cursor-pointer bg-[#f9f9f9]" onClick={() => handleOrderItemClick(orderId, orderItemId)}>
											<td className="px-4 py-5 text-start">
												{orderId}
											</td>
											<td className="text-start lg:text-center px-4 py-5 text-heading">
												{moment(orderDate).format('MMMM DD, YYYY')}
											</td>
											<td className="text-start lg:text-center px-4 py-5 text-heading flex">
												<Image
													src={image}
													width={80}
													height={80}
													loading="eager"
													alt={productName}
													className="bg-gray-300 object-cover"
												/>
												<div className="ml-5">
													<p className="m-0" >{productName}</p>
													<p className="m-0">₹ {totalPrice}</p>
												</div>
											</td>
											<td className="text-start lg:text-center px-4 py-5 text-heading capitalize">

											</td>
											<td className="text-start lg:text-center px-4 py-5 text-heading capitalize">
												<p style={{ color: status === "ordered" ? "green" : "orange", border: `1px solid ${status === "ordered" ? "green" : "orange"}`, borderRadius: 8, width: 'auto', textAlign: 'center' }}>{status}</p>
											</td>
										</tr>
									)
								}) : null
							}
						</tbody>
					</table>
				) : (
					<div className="w-full space-y-4">
						{
							order?.length ? order.map((orderData: any, index: any) => {
								const { orderId, orderItemId, productName, status, orderDate, image } = orderData;
								return (
									<ul key={index} className="text-sm font-semibold text-heading border border-gray-300 rounded-md flex flex-col px-4 pt-5 pb-6 space-y-5" onClick={() => handleOrderItemClick(orderId, orderItemId)}>
										<li className="flex items-center justify-between">
											<span className="font-normal">{moment(orderDate).format('MMMM DD, YYYY')}</span>
											<span className="font-normal capitalize p-1" style={{ color: status === "ordered" ? "green" : "orange", border: `1px solid ${status === "ordered" ? "green" : "orange"}`, borderRadius: 8, width: 'auto', textAlign: 'center' }}>{status}</span>
										</li>
										<li className="flex items-center justify-between">
											<Image
												src={image}
												width={112}
												height={112}
												loading="eager"
												alt={productName}
												className="bg-gray-300 object-cover"
											/>
											<span className="font-normal">{productName}</span>
										</li>
									</ul>
								)
							}) : null
						}
					</div>
				)}
			</motion.div>
		</>
	);
};

export default OrdersTable;
