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

export interface ICatalogStore {
	educationLevels: IEducationLevel[];
	educationDirections: IEducationDirection[];
	programRoles: IProgramRole[];
	loading: boolean;
	error: string | null;
}
