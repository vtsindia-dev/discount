import { Order } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';
import { constructQueryParam } from "@framework/utils/helper";

type OptionsType = {
	order_id: string | string[];
	orderitem_id: string | string[]
};

export const fetchOrder = async (options: OptionsType) => {
	const { data } = await http.get(`${API_ENDPOINTS.ORDER}${constructQueryParam(options)}`);
	return data?.responseJson?.data[0] as Order;
};
export const useOrderQuery = (options: OptionsType) => {
	return useQuery<Order, Error>([ API_ENDPOINTS.ORDER, options ], () => fetchOrder(options));
};
