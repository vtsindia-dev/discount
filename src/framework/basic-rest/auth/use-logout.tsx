import { useUI } from '@contexts/ui.context';
// import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
// import { http1 } from "@framework/utils/http";
import Cookies from 'js-cookie';
import { useMutation } from 'react-query';

export interface LoginInputType {
	email: string;
	password: string;
	remember_me: boolean;
}
async function logout() {
	// return http1.post(API_ENDPOINTS.LOGIN, input);
	return {
		ok: true,
		message: 'Logout Successful!'
	};
}
export const useLogoutMutation = () => {
	const { unauthorize } = useUI();
	return useMutation(() => logout(), {
		onSuccess: _data => {
			Cookies.remove('auth_token');
			unauthorize();
			window.location.replace(window.location.origin);
		},
		onError: data => {
			console.log(data, 'logout error response');
		}
	});
};
