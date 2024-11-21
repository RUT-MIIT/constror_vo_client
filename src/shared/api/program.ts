import type {
	IAddParticipantRequest,
	IEditParticipantRequest,
	IRemoveParticipantRequest,
} from '../../store/programDetail/types';

import { request } from './utils';

export const getProgram = (id: string) => {
	return request(`/programs/${id}/information`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
		},
	});
};

export const addParticipant = ({
	programId,
	participant,
}: IAddParticipantRequest) => {
	return request(`/programs/${programId}/add_participant/`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
		},
		body: JSON.stringify({ participant: participant }),
	});
};

export const editParticipant = ({
	programId,
	participant,
}: IEditParticipantRequest) => {
	return request(`/programs/${programId}/update_participant/`, {
		method: 'PATCH',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
		},
		body: JSON.stringify({ participant: participant }),
	});
};

export const removeParticipant = ({
	programId,
	participantId,
}: IRemoveParticipantRequest) => {
	return request(
		`/programs/${programId}/remove_participant/${participantId}/`,
		{
			method: 'DELETE',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
			},
		}
	);
};
