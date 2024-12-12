import type * as type from '../../store/discSpec/types';

import { request } from './utils';

export const getInitial = (programId: number) => {
	return request(`/programs/${programId}/stages/pr_prd`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
		},
	});
};

export const addDiscipline = ({
	programId,
	discipline,
}: type.IAddDisciplineRequest) => {
	return request(`/programs/${programId}/disciplines/`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
		},
		body: JSON.stringify({ discipline: discipline }),
	});
};

export const editDiscipline = ({
	programId,
	disciplineId,
	discipline,
}: type.IEditDisciplineRequest) => {
	return request(`/programs/${programId}/disciplines/${disciplineId}/`, {
		method: 'PATCH',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
		},
		body: JSON.stringify({ discipline: discipline }),
	});
};

export const removeDiscipline = ({
	programId,
	disciplineId,
}: type.IRemoveDisciplineRequest) => {
	return request(`/programs/${programId}/disciplines/${disciplineId}/`, {
		method: 'DELETE',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
		},
	});
};

export const syncProducts = ({
	disciplineId,
	products,
}: type.ISyncProductsRequest) => {
	return request(`/disciplines/${disciplineId}/sync-products/`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
		},
		body: JSON.stringify({ products: products }),
	});
};

export const syncStages = ({
	disciplineId,
	stages,
}: type.ISyncStagesRequest) => {
	return request(`/disciplines/${disciplineId}/sync-stages/`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
		},
		body: JSON.stringify({ stages: stages }),
	});
};

export const syncProcesses = ({
	disciplineId,
	processes,
}: type.ISyncProcessesRequest) => {
	return request(`/disciplines/${disciplineId}/sync-processes/`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
		},
		body: JSON.stringify({ processes: processes }),
	});
};
