export interface IDiscSpecStore {
	products: IDiscProduct[] | null;
	activity: {
		level: ELevel;
		items: IDiscProduct[] | IDiscStage[] | IDiscProcess[];
	} | null;
	disciplines: IDisciplineSpec[] | null;
	currentDiscipline: IDisciplineSpec | null;
	loadingData: boolean;
	errorData: string | null;
	currentProduct: IDiscProduct | null;
	currentStage: IDiscStage | null;
	currentProcess: IDiscProcess | null;
	isShowModal: {
		addDiscipline: boolean;
		editDiscipline: boolean;
		removeDiscipline: boolean;
	};
	isShowLevel: IShowLevel;
}

export interface IShowLevel {
	reconstruction: boolean;
	activity: boolean;
	discipline: boolean;
}

export interface IDiscProduct {
	id: number;
	name: string;
	stages: IDiscStage[];
	discipline: number | null;
	product: number | null;
	stage: number | null;
}

export interface IDiscStage {
	id: number;
	name: string;
	processes: IDiscProcess[];
	discipline: number | null;
	product: number | null;
	stage: number | null;
}

export interface IDiscProcess {
	id: number;
	name: string;
	discipline: number | null;
	product: number | null;
	stage: number | null;
}

export interface IDisciplineSpec {
	id: number;
	name: string;
	description: string;
	task: string;
}

export interface IInitialDataResponse {
	message: string;
	products: IDiscProduct[];
	disciplines: IDisciplineSpec[];
}

export interface IAddElemToActivity {
	type: ELevel;
	item: IDiscProduct | IDiscStage | IDiscProcess;
}

export enum ELevel {
	PRODUCT = 'product',
	STAGE = 'stage',
	PROCESS = 'process',
}

export interface IAddDisciplineRequest {
	programId: number;
	discipline: {
		name: string;
		description: string;
		task: string;
		type: string;
	};
}

export interface IEditDisciplineRequest {
	programId: number;
	disciplineId: number;
	discipline: {
		name: string;
		description: string;
		task: string;
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

export interface ISyncProductsRequest {
	disciplineId: number;
	products: number[];
}

export interface ISyncStagesRequest {
	disciplineId: number;
	stages: number[];
}

export interface ISyncProcessesRequest {
	disciplineId: number;
	processes: number[];
}
