import type {
	IEducationDirection,
	IEducationLevel,
	IProgramRole,
} from '../catalog/types';

export interface IProgramListStore {
	programList: IProgramItem[];
	isAddProgram: boolean;
	isEditProgram: boolean;
	isRemoveProgram: boolean;
	currentProgram: IProgramItem | null;
	loading: boolean;
	error: string | null;
}

export interface IProgramItem {
	annotation: string | null;
	authorId: number;
	direction: IEducationDirection;
	fgos_url: null;
	form: string;
	id: number;
	level: IEducationLevel;
	my_role: string;
	name: string;
	participants: IParticipant[];
	profile: string;
}

export interface IParticipant {
	id: number;
	user: {
		id: number;
		name: string;
	};
	role: IProgramRole;
	program_id: number;
}

export interface IAddProgramRequest {
	program: INewProgram;
}

export interface IEditProgramRequest {
	program: INewProgram;
	id: number;
}

export interface INewProgram {
	direction: IEducationDirection;
	profile: string;
	form: string;
	fgos_file?: {
		base64: string | ArrayBuffer | null;
		filename: string;
	};
}

export interface IMessageResponse {
	success: boolean;
	message: string;
}
