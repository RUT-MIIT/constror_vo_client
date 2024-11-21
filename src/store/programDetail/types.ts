import { IParticipant } from '../programList/types';

export interface IProgramDetail {
	name: string;
	id: number;
	form: string;
	profile: string;
	direction: {
		code: string;
		id: number;
		level: string;
		name: string;
	};
	participants: IParticipant[];
}

export interface IProgramDetailStore {
	program: IProgramDetail | null;
	loadingDetail: boolean;
	errorDetail: string | null;
	currentParticipant: IParticipant | null;
	isAddParticipant: boolean;
	isEditParticipant: boolean;
	isRemoveParticipant: boolean;
}

export interface IAddParticipantRequest {
	programId: number;
	participant: INewParticipant;
}

export interface IEditParticipantRequest {
	programId: number;
	participant: INewParticipant;
}

export interface IRemoveParticipantRequest {
	programId: number;
	participantId: number;
}

export interface INewParticipant {
	user_id: number;
	role_id: number;
}

export interface IMessageResponse {
	success: boolean;
	message: string;
}
