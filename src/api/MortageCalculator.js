import axois from 'axios';
import { _accessToken } from '../auth/auth';

export const axiosInstance =  axois.create({
	baseURL:`${process.env.REACT_APP_API_URL}`,
	timeout: 45000
});

axiosInstance.interceptors.request.use(
	function (config) {
		console.log('headers', config)
		config.headers = {
			...config.headers,
			Authorization: _accessToken,
		};
		return config;
        
	},
	function (error) {
		return Promise.reject(error);
	},
);