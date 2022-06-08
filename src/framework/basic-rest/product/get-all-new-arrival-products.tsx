import { QueryOptionsType, Product } from '@framework/types';
import { http1 } from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';

export const fetchNewArrivalProducts = async ({ queryKey }: any) => {
	const [ _key, _params ] = queryKey;
	const { data } = await http1.get(API_ENDPOINTS.NEW_ARRIVAL_PRODUCTS);
	return data as Product[];
};
export const useNewArrivalProductsQuery = (options: QueryOptionsType) => {
	return useQuery<Product[], Error>([ API_ENDPOINTS.NEW_ARRIVAL_PRODUCTS, options ], fetchNewArrivalProducts);
};
