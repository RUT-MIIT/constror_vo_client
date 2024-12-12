import type {
	IDiscSpecStore,
	IDisciplineSpec,
	IInitialDataResponse,
	IShowLevel,
	IAddElemToActivity,
	IRemoveDisciplineResponse,
	IDiscProduct,
	IDiscStage,
	IDiscProcess,
} from './types';
import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

import * as actions from './actions';

export const initialState: IDiscSpecStore = {
	products: null,
	activity: null,
	disciplines: null,
	currentDiscipline: null,
	loadingData: true,
	errorData: null,
	currentProduct: null,
	currentStage: null,
	currentProcess: null,
	isShowModal: {
		addDiscipline: false,
		editDiscipline: false,
		removeDiscipline: false,
	},
	isShowLevel: {
		reconstruction: true,
		activity: true,
		discipline: false,
	},
};

export const discSpecSlice = createSlice({
	name: 'discSpec',
	initialState,
	reducers: {
		setCurrentDiscipline: (
			state,
			action: PayloadAction<IDisciplineSpec | null>
		) => {
			state.currentDiscipline = action.payload;
		},
		setIsShowModal: (
			state,
			action: PayloadAction<{
				modal: keyof IDiscSpecStore['isShowModal'];
				isShow: boolean;
			}>
		) => {
			state.isShowModal[action.payload.modal] = action.payload.isShow;
		},
		setIsShowLevel: (state, action: PayloadAction<IShowLevel>) => {
			state.isShowLevel = action.payload;
		},
		addElemToActivity: (state, action: PayloadAction<IAddElemToActivity>) => {
			if (state.activity) {
				state.activity = {
					...state.activity,
					items: [...state.activity.items, action.payload.item],
				};
			} else {
				state.activity = {
					level: action.payload.type,
					items: [action.payload.item],
				};
			}
		},
		removeElemFromActivity: (state, action: PayloadAction<number>) => {
			if (state.activity) {
				if (state.activity.items.length > 1) {
					state.activity = {
						...state.activity,
						items: state.activity.items.filter(
							(item) => item.id !== action.payload
						),
					};
				} else {
					state.activity = null;
				}
			}
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(
				actions.getInitialData.fulfilled,
				(state, action: PayloadAction<IInitialDataResponse>) => {
					state.products = action.payload.products;
					state.disciplines = action.payload.disciplines;
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
				actions.addDisciplineToProgram.fulfilled,
				(state, action: PayloadAction<IDisciplineSpec>) => {
					state.disciplines = state.disciplines
						? [...state.disciplines, action.payload]
						: [action.payload];
				}
			)
			.addCase(
				actions.editDisciplineFromProgram.fulfilled,
				(state, action: PayloadAction<IDisciplineSpec>) => {
					if (state.disciplines) {
						state.disciplines = state.disciplines.map((elem) =>
							elem.id === action.payload.id ? action.payload : elem
						);
					}
					state.isShowModal.editDiscipline = false;
				}
			)
			.addCase(
				actions.syncProductsWithDiscipline.fulfilled,
				(state, action: PayloadAction<IDiscProduct[]>) => {
					if (state.products) {
						state.products = state.products.map((product) => {
							const updatedProduct = action.payload.find(
								(p) => p.id === product.id
							);
							return updatedProduct ? updatedProduct : product;
						});
					}
					state.activity = null;
					state.isShowModal.addDiscipline = false;
					state.isShowLevel.reconstruction = true;
					state.isShowLevel.activity = false;
					state.isShowLevel.discipline = true;
				}
			)
			.addCase(
				actions.syncStagesWithDiscipline.fulfilled,
				(state, action: PayloadAction<IDiscStage[]>) => {
					if (state.products) {
						state.products = state.products.map((product) => {
							const updatedStages = product.stages.map((stage) => {
								const updatedStage = action.payload.find(
									(s) => s.id === stage.id
								);
								return updatedStage ? updatedStage : stage;
							});

							return {
								...product,
								stages: updatedStages,
							};
						});
					}
					state.activity = null;
					state.isShowModal.addDiscipline = false;
					state.isShowLevel.reconstruction = true;
					state.isShowLevel.activity = false;
					state.isShowLevel.discipline = true;
				}
			)
			.addCase(
				actions.syncProcessesWithDiscipline.fulfilled,
				(state, action: PayloadAction<IDiscProcess[]>) => {
					if (state.products) {
						state.products = state.products.map((product) => {
							const updatedStages = product.stages.map((stage) => {
								const updatedProcesses = stage.processes.map((process) => {
									const updatedProcess = action.payload.find(
										(p) => p.id === process.id
									);
									return updatedProcess ? updatedProcess : process;
								});

								return {
									...stage,
									processes: updatedProcesses,
								};
							});

							return {
								...product,
								stages: updatedStages,
							};
						});
					}
					state.activity = null;
					state.isShowModal.addDiscipline = false;
					state.isShowLevel.reconstruction = true;
					state.isShowLevel.activity = false;
					state.isShowLevel.discipline = true;
				}
			)
			.addCase(
				actions.removeDisciplineFromProgram.fulfilled,
				(state, action: PayloadAction<IRemoveDisciplineResponse>) => {
					if (state.disciplines) {
						state.disciplines = state.disciplines.filter(
							(elem) => elem.id !== action.payload.id
						);
					}

					if (state.products) {
						state.products = state.products.map((product) => ({
							...product,
							discipline:
								product.discipline === action.payload.id
									? null
									: product.discipline,
							stages: product.stages.map((stage) => ({
								...stage,
								discipline:
									stage.discipline === action.payload.id
										? null
										: stage.discipline,
								processes: stage.processes.map((process) =>
									process.discipline === action.payload.id
										? { ...process, discipline: null }
										: process
								),
							})),
						}));
					}

					state.isShowModal.removeDiscipline = false;
				}
			);
	},
});

export const {
	setCurrentDiscipline,
	addElemToActivity,
	removeElemFromActivity,
	setIsShowModal,
	setIsShowLevel,
} = discSpecSlice.actions;
