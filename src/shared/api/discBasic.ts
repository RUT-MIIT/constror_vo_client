import type * as type from '../../store/discBasic/types';

import { request } from './utils';

export const getInitial = (programId: number) => {
	return request(`/programs/${programId}/stages/pr_opd`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
		},
	});
};

export const addCompetence = ({
	programId,
	competence,
}: type.IAddCompetenceRequest) => {
	return request(`/programs/${programId}/competences/`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
		},
		body: JSON.stringify({ competence: competence }),
	});
};

export const editCompetence = ({
	programId,
	competenceId,
	competence,
}: type.IEditCompetenceRequest) => {
	return request(`/programs/${programId}/competences/${competenceId}/`, {
		method: 'PATCH',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
		},
		body: JSON.stringify({ competence: competence }),
	});
};

export const removeCompetence = ({
	programId,
	competenceId,
}: type.IRemoveCompetenceRequest) => {
	return request(`/programs/${programId}/competences/${competenceId}/`, {
		method: 'DELETE',
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
