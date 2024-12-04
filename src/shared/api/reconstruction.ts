import type * as type from '../../store/reconstruction/types';

import { request } from './utils';

export const getInitial = (programId: number) => {
	return request(`/programs/${programId}/stages/rec_dt`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
		},
	});
};

export const addStage = ({ productId, stage }: type.IAddStageRequest) => {
	return request(`/products/${productId}/stages/`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
		},
		body: JSON.stringify({ stage: stage }),
	});
};

export const editStage = ({
	productId,
	stageId,
	stage,
}: type.IEditStageRequest) => {
	return request(`/products/${productId}/stages/${stageId}/`, {
		method: 'PATCH',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
		},
		body: JSON.stringify({ stage: stage }),
	});
};

export const removeStage = ({
	productId,
	stageId,
}: type.IRemoveStageRequest) => {
	return request(`/products/${productId}/stages/${stageId}/`, {
		method: 'DELETE',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
		},
	});
};

export const addProcess = ({ stageId, process }: type.IAddProcessRequest) => {
	return request(`/stages/${stageId}/processes/`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
		},
		body: JSON.stringify({ process: process }),
	});
};

export const editProcess = ({
	stageId,
	processId,
	process,
}: type.IEditProcessRequest) => {
	return request(`/stages/${stageId}/processes/${processId}/`, {
		method: 'PATCH',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
		},
		body: JSON.stringify({ process: process }),
	});
};

export const removeProcess = ({
	stageId,
	processId,
}: type.IRemoveProcessRequest) => {
	return request(`/stages/${stageId}/processes/${processId}/`, {
		method: 'DELETE',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
		},
	});
};
