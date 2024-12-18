import type * as type from '../../store/educationPlan/types';

import { request } from './utils';

export const getInitial = (programId: number) => {
	return request(`/programs/${programId}/stages/yp`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
		},
	});
};

export const addHours = ({ disciplineId, semester }: type.IAddHoursRequest) => {
	return request(`/disciplines/${disciplineId}/add_to_semester`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
		},
		body: JSON.stringify({ semester: semester }),
	});
};

export const removeHours = ({
	disciplineId,
	semester,
}: type.IRemoveHoursRequest) => {
	return request(`/disciplines/${disciplineId}/remove_from_semester`, {
		method: 'DELETE',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
		},
		body: JSON.stringify({ semester: semester }),
	});
};
