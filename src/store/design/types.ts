import type { IEducationDirection, IEducationLevel } from '../catalog/types';

export interface IDesignStore {
	main: IDesignMain | null;
	products: IDesignProduct[];
	reconstruction: IDesignReconstruction[];
	disciplineSpec: IDesignDisciplineSpec[];
	disciplineBasic: IDesignDisciplineBasic[];
	educationPlan: IEducationPlan[];
	loadingData: boolean;
	errorData: string | null;
}

export interface IDesignMain {
	id: number;
	profile: string;
	direction: IEducationDirection;
	level: IEducationLevel;
	annotation: string;
}

export interface IDesignProduct {
	id: number;
	name: string;
	description: string;
	nsis: string[];
}

export interface IDesignReconstruction {
	id: number;
	nodes: INode[];
}

export interface IDesignDisciplineSpec {
	id: number;
	nodes: INode[];
}

export interface IDesignDisciplineBasic {
	id: number;
	code: string;
	description: string;
	name: string;
	position: number;
	program: number;
	type: string;
	disciplines: IDesignDisciplineBasic[];
	area: string;
}

export interface IDisciplineBasic {
	competence: number;
	description: string;
	id: number;
	name: string;
	position: number;
	program: number;
	area: string;
	type: string;
}

export interface IEducationPlan {
	type: string;
	number: string;
	name: string;
	competences: [
		{
			id: string;
			code: string;
			name: string;
		}
	];
	sem1: string;
	sem2: string;
	sem3: string;
	sem4: string;
	sem5: string;
	sem6: string;
	sem7: string;
	sem8: string;
	colspan: number;
}

export interface INode {
	id: string;
	pid?: string;
	stpid?: string;
	name: string;
	description?: string;
	title?: string;
	nsis?: string[];
	type?: string;
	practice?: string;
	result?: string;
}

export interface IInitialDataResponse {
	message: string;
	main: IDesignMain;
	products: IDesignProduct[];
	rd: IDesignReconstruction[];
	pd: IDesignDisciplineSpec[];
	opd: IDesignDisciplineBasic[];
	plan: IEducationPlan[];
}
