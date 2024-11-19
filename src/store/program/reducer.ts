import type { IProgramStore, IProgramItem } from './types';
import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
	getProgramsList,
	addProgramToList,
	editProgramFromList,
	removeProgramFromList,
} from './actions';

export const initialState: IProgramStore = {
	programList: [],
	isAddProgram: false,
	isEditProgram: false,
	isRemoveProgram: false,
	currentProgram: null,
	loading: true,
	error: null,
};

export const programSlice = createSlice({
	name: 'program',
	initialState,
	reducers: {
		setCurrentProgram: (state, action: PayloadAction<IProgramItem | null>) => {
			state.currentProgram = action.payload;
		},
		setIsAddProgram: (state, action: PayloadAction<boolean>) => {
			state.isAddProgram = action.payload;
		},
		setIsEditProgram: (state, action: PayloadAction<boolean>) => {
			state.isEditProgram = action.payload;
		},
		setIsRemoveProgram: (state, action: PayloadAction<boolean>) => {
			state.isRemoveProgram = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(
				getProgramsList.fulfilled,
				(state, action: PayloadAction<IProgramItem[]>) => {
					state.programList = action.payload;
					state.loading = false;
				}
			)
			.addCase(getProgramsList.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getProgramsList.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error?.message || 'Произошла ошибка';
			})
			.addCase(
				addProgramToList.fulfilled,
				(state, action: PayloadAction<IProgramItem>) => {
					state.programList = [...state.programList, action.payload];
					state.isAddProgram = false;
				}
			)
			.addCase(addProgramToList.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error?.message || 'Произошла ошибка';
			})
			.addCase(
				editProgramFromList.fulfilled,
				(state, action: PayloadAction<IProgramItem>) => {
					state.programList = state.programList.map((program) =>
						program.id === action.payload.id ? action.payload : program
					);
					state.isEditProgram = false;
				}
			)
			.addCase(removeProgramFromList.fulfilled, (state, action) => {
				const programId = action.meta.arg;
				state.programList = state.programList.filter(
					(elem) => elem.id !== programId
				);
				state.currentProgram = null;
				state.isRemoveProgram = false;
			});
	},
});

export const {
	setIsAddProgram,
	setIsEditProgram,
	setIsRemoveProgram,
	setCurrentProgram,
} = programSlice.actions;
