export interface IDiscBasicStore {
	competences: ICompetence[] | null;
	loadingData: boolean;
	errorData: string | null;
	currentCompetence: ICompetence | null;
	currentDiscipline: IDisciplineBasic | null;
	isShowModal: {
		addCompetence: boolean;
		editCompetence: boolean;
		removeCompetence: boolean;
		addDiscipline: boolean;
		editDiscipline: boolean;
		removeDiscipline: boolean;
	};
}

export interface IInitialDataResponse {
	message: string;
	competences: ICompetence[];
}

export interface ICompetence {
	id: number;
	name: string;
	code: string;
	type: string;
	disciplines: IDisciplineBasic[];
}

export interface IDisciplineBasic {
	id: number;
	name: string;
	description?: string;
	task?: string;
	multiplicity_type?: number;
	type: string;
	competence?: number;
	area?: string;
}

export interface IAddCompetenceRequest {
	programId: number;
	competence: {
		name: string;
		code: string;
		type: string;
	};
}

export interface IEditCompetenceRequest {
	programId: number;
	competenceId: number;
	competence: {
		name: string;
		code: string;
		type: string;
	};
}

export interface IRemoveCompetenceRequest {
	programId: number;
	competenceId: number;
}

export interface IRemoveCompetenceResponse {
	id: number;
	message: string;
}

export interface IAddDisciplineRequest {
	programId: number;
	discipline: {
		name: string;
		area: string;
		description: string;
		competence: number;
		type: string;
	};
}

export interface IEditDisciplineRequest {
	programId: number;
	disciplineId: number;
	discipline: {
		name: string;
		area: string;
		description: string;
		competence: number;
		type: string;
	};
}

export interface IRemoveDisciplineRequest {
	programId: number;
	disciplineId: number;
}

export interface IRemoveDisciplineResponse {
	id: number;
	message: string;
}
