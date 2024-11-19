import type {
	ILoginRequest,
	IRegistrationRequest,
	IAuthResponse,
} from '../../store/user/types';

import { request } from './utils';

const setTokens = (accessToken: string) => {
	localStorage.setItem('accessToken', accessToken);
};

export const login = (data: ILoginRequest) => {
	return request('/auth/login/', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	}).then((res: IAuthResponse) => {
		if (res.access) {
			setTokens(res.access);
		}
		return res;
	});
};

export const registration = (data: IRegistrationRequest) => {
	return request('/auth/registration/', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	}).then((res: IAuthResponse) => {
		if (res.access) {
			setTokens(res.access);
		}
		return res;
	});
};

export const logout = () => {
	return request('/auth/logout/', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
		},
	}).then((res) => {
		const token = localStorage.getItem('accessToken');
		if (token) {
			localStorage.removeItem('accessToken');
		}
		return res;
	});
};

export const getUser = () => {
	return request('/auth/user', {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
		},
	});
};
