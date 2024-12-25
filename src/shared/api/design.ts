import { request } from './utils';

export const getInitial = (programId: number) => {
	return request(`/programs/${programId}/stages/design`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	});
};
