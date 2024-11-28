import type {
	IAddProductRequest,
	IEditProductRequest,
	IRemoveProductRequest,
	ISendProductsDataStepOneRequest,
	ISendProductsDataStepFourRequest,
	ISetProductNsiRequest,
} from '../../store/product/types';

import { request } from './utils';

export const getInitial = (programId: number) => {
	return request(`/programs/${programId}/stages/ish_data`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
		},
	});
};

export const getProductsWizard = (programId: number) => {
	return request(
		`/programs/${programId}/stages/ish_data/wizards/ish_data_products`,
		{
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
			},
		}
	);
};

export const sendProductsDataStepOne = ({
	programId,
	methodologies,
	subject_scope,
}: ISendProductsDataStepOneRequest) => {
	return request(
		`/programs/${programId}/stages/ish_data/wizards/ish_data_products/steps/ish_data_products_step_1`,
		{
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
			},
			body: JSON.stringify({ methodologies, subject_scope }),
		}
	);
};

export const sendProductsDataStepTwo = (programId: number) => {
	return request(
		`/programs/${programId}/stages/ish_data/wizards/ish_data_products/steps/ish_data_products_step_2`,
		{
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
			},
		}
	);
};

export const sendProductsDataStepThree = (programId: number) => {
	return request(
		`/programs/${programId}/stages/ish_data/wizards/ish_data_products/steps/ish_data_products_step_3`,
		{
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
			},
		}
	);
};

export const sendProductsDataStepFour = ({
	programId,
	products,
}: ISendProductsDataStepFourRequest) => {
	return request(
		`/programs/${programId}/stages/ish_data/wizards/ish_data_products/steps/ish_data_products_step_4`,
		{
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
			},
			body: JSON.stringify({ products }),
		}
	);
};

export const addProduct = ({ programId, product }: IAddProductRequest) => {
	return request(`/programs/${programId}/products/`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
		},
		body: JSON.stringify({ product: product }),
	});
};

export const editProduct = ({
	programId,
	productId,
	product,
}: IEditProductRequest) => {
	return request(`/programs/${programId}/products/${productId}/`, {
		method: 'PATCH',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
		},
		body: JSON.stringify({ product: product }),
	});
};

export const removeProduct = ({
	programId,
	productId,
}: IRemoveProductRequest) => {
	return request(`/programs/${programId}/products/${productId}/`, {
		method: 'DELETE',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
		},
	});
};

export const setProductNsi = ({ productId, nsis }: ISetProductNsiRequest) => {
	return request(`/products/${productId}/sync-nsi/`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
		},
		body: JSON.stringify({ nsis: nsis }),
	});
};
