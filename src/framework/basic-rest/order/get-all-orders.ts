import { NewOrder as Order } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';

export const fetchOrders = async () => {
	const { data } = await http.get(API_ENDPOINTS.ORDERS);
	return data?.responseJson?.data as Order[];
};
export const useOrdersQuery = () => {
	return useQuery<Order[], Error>([ API_ENDPOINTS.ORDERS ], fetchOrders);
};
