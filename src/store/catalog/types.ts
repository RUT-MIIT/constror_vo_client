export interface IEducationLevel {
	id: number;
	name: string;
}

export interface IEducationForm {
	id: number;
	name: string;
}

export interface IEducationDirection {
	id: number;
	code: string;
	level: string;
	name: string;
}

export interface IProgramRole {
	id: number;
	name: string;
}

export interface IDisciplineForm {
	id: number;
	name: string;
}

export interface IUser {
	id: number;
	name: string;
}

export interface IProgramNsi {
	id: number;
	nsiFullName: string;
}

export interface IAddProgramNsi {
	nsiFullName: string;
}

export interface IAddProgramNsiRequest {
	programId: number;
	nsi: IAddProgramNsi;
}

export interface IEditProgramNsiRequest {
	programId: number;
	nsi: IProgramNsi;
}

export interface IRemoveProgramNsiRequest {
	programId: number;
	nsiId: number;
}

export interface ICatalogStore {
	educationLevels: IEducationLevel[];
	educationDirections: IEducationDirection[];
	users: IUser[];
	programRoles: IProgramRole[];
	programNsi: IProgramNsi[];
	loading: boolean;
	error: string | null;
}
