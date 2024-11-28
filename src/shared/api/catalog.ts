import type {
	IAddProgramNsiRequest,
	IEditProgramNsiRequest,
	IRemoveProgramNsiRequest,
} from '../../store/catalog/types';

import { request } from './utils';

export const getEducationLevels = () => {
	return request('/education_levels', {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
		},
	});
};

export const getEducationDirections = () => {
	return request('/education_directions', {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
		},
	});
};

export const getUsers = () => {
	return request('/users', {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
		},
	});
};

export const getProgramRoles = () => {
	return request('/program_roles', {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
		},
	});
};

export const getProgramNsi = (programId: number) => {
	return request(`/programs/${programId}/nsis/`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
		},
	});
};

export const addNsi = ({ programId, nsi }: IAddProgramNsiRequest) => {
	return request(`/programs/${programId}/nsis/`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
		},
		body: JSON.stringify({ nsi: nsi }),
	});
};

export const editNsi = ({ programId, nsi }: IEditProgramNsiRequest) => {
	return request(`/programs/${programId}/nsis/${nsi.id}/`, {
		method: 'PATCH',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
		},
		body: JSON.stringify({ nsi: nsi }),
	});
};

export const removeNsi = ({ programId, nsiId }: IRemoveProgramNsiRequest) => {
	return request(`/programs/${programId}/nsis/${nsiId}/`, {
		method: 'DELETE',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
		},
	});
};
