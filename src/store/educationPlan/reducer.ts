import type {
	IEducationPlanStore,
	IInitialDataResponse,
	ISemesterDisc,
	IDiscPlan,
} from './types';
import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

import * as actions from './actions';

export const initialState: IEducationPlanStore = {
	disciplinesBasic: null,
	disciplinesSpec: null,
	currentDiscipline: null,
	currentSemesterId: null,
	semesters: null,
	loadingData: true,
	errorData: null,
	isShowModal: {
		addHours: false,
		editHours: false,
	},
};

export const educationPlanSlice = createSlice({
	name: 'eduPlan',
	initialState,
	reducers: {
		setCurrentDiscipline: (state, action: PayloadAction<IDiscPlan | null>) => {
			state.currentDiscipline = action.payload;
		},
		setCurrentSemesterId: (state, action: PayloadAction<number | null>) => {
			state.currentSemesterId = action.payload;
		},
		setIsShowModal: (
			state,
			action: PayloadAction<{
				modal: keyof IEducationPlanStore['isShowModal'];
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
					state.disciplinesBasic = action.payload.op_disciplines;
					state.disciplinesSpec = action.payload.pr_disciplines;
					state.semesters = action.payload.semesters;
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
				actions.addHoursToDiscipline.fulfilled,
				(state, action: PayloadAction<ISemesterDisc>) => {
					if (state.disciplinesBasic && state.currentDiscipline) {
						state.disciplinesBasic = state.disciplinesBasic.map((elem) =>
							state.currentDiscipline?.id === elem.id
								? {
										...elem,
										semesters: [...elem.semesters, action.payload],
								  }
								: elem
						);
					}

					if (state.disciplinesSpec && state.currentDiscipline) {
						state.disciplinesSpec = state.disciplinesSpec.map((elem) =>
							state.currentDiscipline?.id === elem.id
								? {
										...elem,
										semesters: [...elem.semesters, action.payload],
								  }
								: elem
						);
					}

					state.currentDiscipline = null;
					state.currentSemesterId = null;
					state.isShowModal.addHours = false;
				}
			)
			.addCase(actions.removeHoursFromDiscipline.fulfilled, (state) => {
				if (state.disciplinesBasic && state.currentDiscipline) {
					state.disciplinesBasic = state.disciplinesBasic.map((elem) =>
						state.currentDiscipline?.id === elem.id
							? {
									...elem,
									semesters: elem.semesters.filter(
										(s) => s.semester !== state.currentSemesterId
									),
							  }
							: elem
					);
				}

				if (state.disciplinesSpec && state.currentDiscipline) {
					state.disciplinesSpec = state.disciplinesSpec.map((elem) =>
						state.currentDiscipline?.id === elem.id
							? {
									...elem,
									semesters: elem.semesters.filter(
										(s) => s.semester !== state.currentSemesterId
									),
							  }
							: elem
					);
				}

				state.currentDiscipline = null;
				state.currentSemesterId = null;
				state.isShowModal.addHours = false;
			});
	},
});

export const { setCurrentDiscipline, setCurrentSemesterId, setIsShowModal } =
	educationPlanSlice.actions;
