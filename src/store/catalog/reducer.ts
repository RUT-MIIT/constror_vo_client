import type {
	ICatalogStore,
	IEducationLevel,
	IEducationDirection,
	IUser,
	IProgramRole,
} from './types';
import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
	getEducationLevelsList,
	getEducationDirectionsList,
	getUsersList,
	getProgramRolesList,
} from './actions';

export const initialState: ICatalogStore = {
	educationLevels: [],
	educationDirections: [],
	users: [],
	programRoles: [],
	loading: true,
	error: null,
};

export const catalogSlice = createSlice({
	name: 'catalog',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(
				getEducationLevelsList.fulfilled,
				(state, action: PayloadAction<IEducationLevel[]>) => {
					state.educationLevels = action.payload;
					state.loading = false;
				}
			)
			.addCase(getEducationLevelsList.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getEducationLevelsList.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error?.message || 'Произошла ошибка';
			})
			.addCase(
				getEducationDirectionsList.fulfilled,
				(state, action: PayloadAction<IEducationDirection[]>) => {
					state.educationDirections = action.payload;
					state.loading = false;
				}
			)
			.addCase(getEducationDirectionsList.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getEducationDirectionsList.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error?.message || 'Произошла ошибка';
			})
			.addCase(
				getUsersList.fulfilled,
				(state, action: PayloadAction<IUser[]>) => {
					state.users = action.payload;
					state.loading = false;
				}
			)
			.addCase(getUsersList.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getUsersList.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error?.message || 'Произошла ошибка';
			})
			.addCase(
				getProgramRolesList.fulfilled,
				(state, action: PayloadAction<IProgramRole[]>) => {
					state.programRoles = action.payload;
					state.loading = false;
				}
			)
			.addCase(getProgramRolesList.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getProgramRolesList.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error?.message || 'Произошла ошибка';
			});
	},
});
