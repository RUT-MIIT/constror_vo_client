import type { IProgramDetail, IProgramDetailStore } from './types';
import type { IParticipant } from '../programList/types';
import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

import * as actions from './actions';

export const initialState: IProgramDetailStore = {
	program: null,
	loadingDetail: true,
	errorDetail: null,
	currentParticipant: null,
	isAddParticipant: false,
	isEditParticipant: false,
	isRemoveParticipant: false,
};

export const programDetailSlice = createSlice({
	name: 'programDetail',
	initialState,
	reducers: {
		setCurrentParticipant: (
			state,
			action: PayloadAction<IParticipant | null>
		) => {
			state.currentParticipant = action.payload;
		},
		setIsAddParticipant: (state, action: PayloadAction<boolean>) => {
			state.isAddParticipant = action.payload;
		},
		setIsEditParticipant: (state, action: PayloadAction<boolean>) => {
			state.isEditParticipant = action.payload;
		},
		setIsRemoveParticipant: (state, action: PayloadAction<boolean>) => {
			state.isRemoveParticipant = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(
				actions.getProgramDetail.fulfilled,
				(state, action: PayloadAction<IProgramDetail>) => {
					state.program = action.payload;
					state.loadingDetail = false;
				}
			)
			.addCase(actions.getProgramDetail.pending, (state) => {
				state.loadingDetail = true;
				state.errorDetail = null;
			})
			.addCase(actions.getProgramDetail.rejected, (state, action) => {
				state.loadingDetail = false;
				state.errorDetail = action.error?.message || 'Произошла ошибка';
			})
			.addCase(
				actions.addParticipantToList.fulfilled,
				(state, action: PayloadAction<IParticipant[]>) => {
					if (state.program) {
						state.program.participants = action.payload;
						state.isAddParticipant = false;
					}
				}
			)
			.addCase(
				actions.editParticipantFromList.fulfilled,
				(state, action: PayloadAction<IParticipant[]>) => {
					if (state.program) {
						state.program.participants = action.payload;
						state.isEditParticipant = false;
					}
				}
			)
			.addCase(actions.removeParticipantFromList.fulfilled, (state, action) => {
				if (state.program) {
					state.program.participants = action.payload;
					state.isRemoveParticipant = false;
				}
			})
			.addCase(actions.editProgramAnnotation.fulfilled, (state, action) => {
				if (state.program) {
					state.program.annotation = action.payload.annotation;
				}
			});
	},
});

export const {
	setIsAddParticipant,
	setIsEditParticipant,
	setIsRemoveParticipant,
	setCurrentParticipant,
} = programDetailSlice.actions;
