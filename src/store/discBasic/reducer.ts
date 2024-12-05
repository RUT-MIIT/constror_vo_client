import type {
	IDiscBasicStore,
	IInitialDataResponse,
	ICompetence,
	IDisciplineBasic,
	IRemoveCompetenceResponse,
	IRemoveDisciplineResponse,
} from './types';
import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

import * as actions from './actions';

export const initialState: IDiscBasicStore = {
	competences: null,
	loadingData: true,
	errorData: null,
	currentCompetence: null,
	currentDiscipline: null,
	isShowModal: {
		addCompetence: false,
		editCompetence: false,
		removeCompetence: false,
		addDiscipline: false,
		editDiscipline: false,
		removeDiscipline: false,
	},
};

export const discBasicSlice = createSlice({
	name: 'discBasic',
	initialState,
	reducers: {
		setCurrentCompetence: (
			state,
			action: PayloadAction<ICompetence | null>
		) => {
			state.currentCompetence = action.payload;
		},
		setCurrentDiscipline: (
			state,
			action: PayloadAction<IDisciplineBasic | null>
		) => {
			state.currentDiscipline = action.payload;
		},
		setIsShowModal: (
			state,
			action: PayloadAction<{
				modal: keyof IDiscBasicStore['isShowModal'];
				isShow: boolean;
			}>
		) => {
			state.isShowModal[action.payload.modal] = action.payload.isShow;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(
				actions.getInitialData.fulfilled,
				(state, action: PayloadAction<IInitialDataResponse>) => {
					state.competences = action.payload.competences;
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
				actions.addCompetenceToProgram.fulfilled,
				(state, action: PayloadAction<ICompetence>) => {
					if (state.competences) {
						state.competences = [...state.competences, action.payload];
						state.isShowModal.addCompetence = false;
					}
				}
			)
			.addCase(
				actions.editCompetenceFromProgram.fulfilled,
				(state, action: PayloadAction<ICompetence>) => {
					if (state.competences) {
						state.competences = state.competences.map((elem) =>
							elem.id === action.payload.id ? action.payload : elem
						);
						state.isShowModal.editCompetence = false;
					}
				}
			)
			.addCase(
				actions.removeCompetenceFromProgram.fulfilled,
				(state, action: PayloadAction<IRemoveCompetenceResponse>) => {
					if (state.competences) {
						state.competences = state.competences.filter(
							(elem) => elem.id !== action.payload.id
						);
						state.currentCompetence = null;
						state.isShowModal.removeCompetence = false;
					}
				}
			)
			.addCase(
				actions.addDisciplineToProgram.fulfilled,
				(state, action: PayloadAction<IDisciplineBasic>) => {
					if (state.currentCompetence) {
						state.currentCompetence = {
							...state.currentCompetence,
							disciplines: [
								...state.currentCompetence.disciplines,
								action.payload,
							],
						};
					}

					if (state.competences) {
						state.competences = state.competences.map((competence) => {
							if (competence.id === state.currentCompetence?.id) {
								return {
									...competence,
									disciplines: [...competence.disciplines, action.payload],
								};
							}
							return competence;
						});
					}

					state.isShowModal.addDiscipline = false;
				}
			)
			.addCase(
				actions.editDisciplineFromProgram.fulfilled,
				(state, action: PayloadAction<IDisciplineBasic>) => {
					if (state.currentCompetence) {
						state.currentCompetence = {
							...state.currentCompetence,
							disciplines: state.currentCompetence.disciplines.map((elem) =>
								elem.id === action.payload.id ? action.payload : elem
							),
						};
					}

					if (state.competences) {
						state.competences = state.competences.map((competence) => {
							if (competence.id === state.currentCompetence?.id) {
								return {
									...competence,
									disciplines: competence.disciplines.map((elem) =>
										elem.id === action.payload.id ? action.payload : elem
									),
								};
							}
							return competence;
						});
					}

					state.isShowModal.editDiscipline = false;
				}
			)
			.addCase(
				actions.removeDisciplineFromProgram.fulfilled,
				(state, action: PayloadAction<IRemoveDisciplineResponse>) => {
					if (state.currentCompetence) {
						state.currentCompetence = {
							...state.currentCompetence,
							disciplines: state.currentCompetence.disciplines.filter(
								(elem) => elem.id !== action.payload.id
							),
						};
					}

					if (state.competences) {
						state.competences = state.competences.map((competence) => {
							if (competence.id === state.currentCompetence?.id) {
								return {
									...competence,
									disciplines: competence.disciplines.filter(
										(elem) => elem.id !== action.payload.id
									),
								};
							}
							return competence;
						});
					}
					state.currentDiscipline = null;
					state.isShowModal.removeDiscipline = false;
				}
			);
	},
});

export const { setCurrentCompetence, setCurrentDiscipline, setIsShowModal } =
	discBasicSlice.actions;
