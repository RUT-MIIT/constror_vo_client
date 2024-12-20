import type { IDesignStore, IInitialDataResponse } from './types';
import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

import * as actions from './actions';

export const initialState: IDesignStore = {
	main: null,
	products: [],
	reconstruction: [],
	disciplineSpec: [],
	disciplineBasic: [],
	educationPlan: [],
	loadingData: true,
	errorData: null,
};

export const designSlice = createSlice({
	name: 'design',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(
				actions.getInitialData.fulfilled,
				(state, action: PayloadAction<IInitialDataResponse>) => {
					state.main = action.payload.main;
					state.products = action.payload.products;
					state.reconstruction = action.payload.rd;
					state.disciplineSpec = action.payload.pd;
					state.disciplineBasic = action.payload.opd;
					state.educationPlan = action.payload.plan;
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
			});
	},
});
