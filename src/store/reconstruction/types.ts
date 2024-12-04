import type { IProduct } from '../product/types';

export interface IReconstructionStore {
	initialData: IReconstructionProduct[] | null;
	loadingData: boolean;
	errorData: string | null;
	currentProduct: IReconstructionProduct | null;
	currentStage: IReconstructionStage | null;
	currentProcess: IReconstructionProcess | null;
	isShowModal: {
		addStage: boolean;
		editStage: boolean;
		removeStage: boolean;
		addProcess: boolean;
		editProcess: boolean;
		removeProcess: boolean;
	};
	isShowLevel: IShowLevel;
}

export interface IShowLevel {
	product: boolean;
	stage: boolean;
	process: boolean;
}

export interface IReconstructionProduct extends IProduct {
	stages: IReconstructionStage[];
}

export interface IReconstructionStage {
	name: string;
	id: number;
	description?: string;
	position?: number;
	processes: IReconstructionProcess[];
}

export interface IReconstructionProcess {
	name: string;
	id: number;
	description?: string;
	result?: string;
	position?: number;
}

export interface IInitialDataResponse {
	message: string;
	products: IReconstructionProduct[];
}

export interface IAddStageRequest {
	productId: number;
	stage: {
		name: string;
		description: string;
	};
}

export interface IEditStageRequest {
	productId: number;
	stageId: number;
	stage: {
		name: string;
		description: string;
	};
}

export interface IRemoveStageRequest {
	productId: number;
	stageId: number;
}

export interface IRemoveStageResponse {
	id: number;
	message: string;
}

export interface IAddProcessRequest {
	stageId: number;
	process: {
		name: string;
		description: string;
		result: string;
	};
}

export interface IEditProcessRequest {
	stageId: number;
	processId: number;
	process: {
		name: string;
		description: string;
		result: string;
	};
}

export interface IRemoveProcessRequest {
	stageId: number;
	processId: number;
}

export interface IRemoveProcessResponse {
	id: number;
	message: string;
}
