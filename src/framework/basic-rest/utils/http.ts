import axios from 'axios';
import Cookies from "js-cookie";
import { getToken } from './get-token';
import moment from "moment";

const http = axios.create({
	baseURL: 'http://ditstore.vrikshatech.in/DiscountIT',
	timeout: 30000,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json'
	}
});

const http1 = axios.create({
	baseURL: 'http://localhost:3000/api',
	timeout: 30000,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json'
	}
});

// Change request data/error here
http.interceptors.request.use(
	config => {
		const token = getToken();
		config.headers = {
			...config.headers,
			Authorization: `Bearer ${token ? token : ''}`
		};
		return config;
	},
	error => {
		return Promise.reject(error);
	}
);

http.interceptors.response.use(res => {
  if (res.data.statusCode === 401) {
		window.localStorage.clear();
		Cookies.remove("auth_token");
		const user = Cookies.get("user") || '';
		if (user) {
			const userName = user.split('-')[0];
			Cookies.remove("user");
			Cookies.set("user", `${userName}-${moment(new Date()).format('x')}`);
		}
		window.location.replace(window.location.origin);
	}
  return res;
});

// Change request data/error here
http1.interceptors.request.use(
	config => {
		const token = getToken();
		config.headers = {
			...config.headers,
			Authorization: `Bearer ${token ? token : ''}`
		};
		return config;
	},
	error => {
		return Promise.reject(error);
	}
);

export default http;
export { http1 };
