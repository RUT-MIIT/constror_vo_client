import type {
	IReconstructionStore,
	IInitialDataResponse,
	IReconstructionProduct,
	IReconstructionStage,
	IReconstructionProcess,
	IRemoveStageResponse,
	IRemoveProcessResponse,
	IShowLevel,
} from './types';
import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

import * as actions from './actions';

export const initialState: IReconstructionStore = {
	initialData: null,
	loadingData: true,
	errorData: null,
	currentProduct: null,
	currentStage: null,
	currentProcess: null,
	isShowModal: {
		addStage: false,
		editStage: false,
		removeStage: false,
		addProcess: false,
		editProcess: false,
		removeProcess: false,
	},
	isShowLevel: {
		product: true,
		stage: true,
		process: false,
	},
};

export const reconstructionSlice = createSlice({
	name: 'reconstruction',
	initialState,
	reducers: {
		setCurrentProduct: (
			state,
			action: PayloadAction<IReconstructionProduct | null>
		) => {
			state.currentProduct = action.payload;
		},
		setCurrentStage: (
			state,
			action: PayloadAction<IReconstructionStage | null>
		) => {
			state.currentStage = action.payload;
		},
		setCurrentProcess: (
			state,
			action: PayloadAction<IReconstructionProcess | null>
		) => {
			state.currentProcess = action.payload;
		},
		setIsShowModal: (
			state,
			action: PayloadAction<{
				modal: keyof IReconstructionStore['isShowModal'];
				isShow: boolean;
			}>
		) => {
			state.isShowModal[action.payload.modal] = action.payload.isShow;
		},
		setIsShowLevel: (state, action: PayloadAction<IShowLevel>) => {
			state.isShowLevel = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(
				actions.getInitialData.fulfilled,
				(state, action: PayloadAction<IInitialDataResponse>) => {
					state.initialData = action.payload.products;
					state.loadingData = false;
				}
			)
			.addCase(actions.getInitialData.pending, (state) => {
				state.loadingData = true;
				state.errorData = null;
			})
			.addCase(actions.getInitialData.rejected, (state, action) => {
				state.loadingData = false;
				state.errorData = action.error?.message || 'Произошла ошибка';
			})
			.addCase(
				actions.addStageToProduct.fulfilled,
				(state, action: PayloadAction<IReconstructionStage>) => {
					state.isShowModal.addStage = false;

					if (state.currentProduct) {
						state.currentProduct = {
							...state.currentProduct,
							stages: [...state.currentProduct.stages, action.payload],
						};
					}

					if (state.initialData) {
						state.initialData = state.initialData.map((product) => {
							if (product.id === state.currentProduct?.id) {
								return {
									...product,
									stages: [...product.stages, action.payload],
								};
							}
							return product;
						});
					}
				}
			)
			.addCase(
				actions.editStageFromProduct.fulfilled,
				(state, action: PayloadAction<IReconstructionStage>) => {
					state.isShowModal.editStage = false;

					if (state.currentProduct) {
						state.currentProduct = {
							...state.currentProduct,
							stages: state.currentProduct.stages.map((stage) =>
								stage.id === action.payload.id ? action.payload : stage
							),
						};
					}

					if (state.initialData) {
						state.initialData = state.initialData.map((product) => {
							if (product.id === state.currentProduct?.id) {
								return {
									...product,
									stages: product.stages.map((stage) =>
										stage.id === action.payload.id ? action.payload : stage
									),
								};
							}
							return product;
						});
					}
				}
			)
			.addCase(
				actions.removeStageFromProduct.fulfilled,
				(state, action: PayloadAction<IRemoveStageResponse>) => {
					state.isShowModal.removeStage = false;

					if (state.currentProduct) {
						state.currentProduct = {
							...state.currentProduct,
							stages: state.currentProduct.stages.filter(
								(stage) => stage.id !== action.payload.id
							),
						};
					}

					if (state.initialData) {
						state.initialData = state.initialData.map((product) => {
							if (product.id === state.currentProduct?.id) {
								return {
									...product,
									stages: product.stages.filter(
										(stage) => stage.id !== action.payload.id
									),
								};
							}
							return product;
						});
					}

					state.currentStage = null;
				}
			)
			.addCase(
				actions.addProcessToStage.fulfilled,
				(state, action: PayloadAction<IReconstructionProcess>) => {
					state.isShowModal.addProcess = false;

					if (state.currentStage) {
						state.currentStage = {
							...state.currentStage,
							processes: [...state.currentStage.processes, action.payload],
						};
					}

					if (state.currentProduct) {
						state.currentProduct = {
							...state.currentProduct,
							stages: state.currentProduct.stages.map((stage) =>
								stage.id === state.currentStage?.id
									? {
											...stage,
											processes: [...stage.processes, action.payload],
									  }
									: stage
							),
						};
					}

					if (state.initialData) {
						state.initialData = state.initialData.map((product) =>
							product.id === state.currentProduct?.id
								? {
										...product,
										stages: product.stages.map((stage) =>
											stage.id === state.currentStage?.id
												? {
														...stage,
														processes: [...stage.processes, action.payload],
												  }
												: stage
										),
								  }
								: product
						);
					}
				}
			)

			.addCase(
				actions.editProcessFromStage.fulfilled,
				(state, action: PayloadAction<IReconstructionProcess>) => {
					state.isShowModal.editProcess = false;

					if (state.currentStage) {
						state.currentStage = {
							...state.currentStage,
							processes: state.currentStage.processes.map((process) =>
								process.id === action.payload.id ? action.payload : process
							),
						};
					}

					if (state.currentProduct) {
						state.currentProduct = {
							...state.currentProduct,
							stages: state.currentProduct.stages.map((stage) =>
								stage.id === state.currentStage?.id
									? {
											...stage,
											processes: stage.processes.map((process) =>
												process.id === action.payload.id
													? action.payload
													: process
											),
									  }
									: stage
							),
						};
					}

					if (state.initialData) {
						state.initialData = state.initialData.map((product) =>
							product.id === state.currentProduct?.id
								? {
										...product,
										stages: product.stages.map((stage) =>
											stage.id === state.currentStage?.id
												? {
														...stage,
														processes: stage.processes.map((process) =>
															process.id === action.payload.id
																? action.payload
																: process
														),
												  }
												: stage
										),
								  }
								: product
						);
					}
				}
			)

			.addCase(
				actions.removeProcessFromStage.fulfilled,
				(state, action: PayloadAction<IRemoveProcessResponse>) => {
					state.isShowModal.removeProcess = false;

					if (state.currentStage) {
						state.currentStage = {
							...state.currentStage,
							processes: state.currentStage.processes.filter(
								(process) => process.id !== action.payload.id
							),
						};
					}

					if (state.currentProduct) {
						state.currentProduct = {
							...state.currentProduct,
							stages: state.currentProduct.stages.map((stage) =>
								stage.id === state.currentStage?.id
									? {
											...stage,
											processes: stage.processes.filter(
												(process) => process.id !== action.payload.id
											),
									  }
									: stage
							),
						};
					}

					if (state.initialData) {
						state.initialData = state.initialData.map((product) =>
							product.id === state.currentProduct?.id
								? {
										...product,
										stages: product.stages.map((stage) =>
											stage.id === state.currentStage?.id
												? {
														...stage,
														processes: stage.processes.filter(
															(process) => process.id !== action.payload.id
														),
												  }
												: stage
										),
								  }
								: product
						);
					}

					state.currentProcess = null;
				}
			);
	},
});

export const {
	setCurrentProduct,
	setCurrentStage,
	setCurrentProcess,
	setIsShowModal,
	setIsShowLevel,
} = reconstructionSlice.actions;
