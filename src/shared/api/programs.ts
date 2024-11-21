import type {
	IAddProgramRequest,
	IEditProgramRequest,
} from '../../store/programList/types';

import { request } from './utils';

export const getPrograms = () => {
	return request('/my_programs', {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
		},
	});
};

export const addProgram = (data: IAddProgramRequest) => {
	return request('/programs/', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
		},
		body: JSON.stringify(data),
	});
};

export const editProgram = (data: IEditProgramRequest) => {
	const reqBody = { program: data.program };
	return request(`/programs/${data.id}/`, {
		method: 'PATCH',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
		},
		body: JSON.stringify(reqBody),
	});
};

export const removeProgram = (id: number) => {
	return request(`/programs/${id}/`, {
		method: 'DELETE',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
		},
	});
};
