import type {
	ICatalogStore,
	IEducationLevel,
	IEducationDirection,
	IUser,
	IProgramRole,
	IProgramNsi,
} from './types';
import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

import * as actions from './actions';

export const initialState: ICatalogStore = {
	educationLevels: [],
	educationDirections: [],
	users: [],
	programRoles: [],
	programNsi: [],
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
				actions.getEducationLevelsList.fulfilled,
				(state, action: PayloadAction<IEducationLevel[]>) => {
					state.educationLevels = action.payload;
					state.loading = false;
				}
			)
			.addCase(actions.getEducationLevelsList.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(actions.getEducationLevelsList.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error?.message || 'Произошла ошибка';
			})
			.addCase(
				actions.getEducationDirectionsList.fulfilled,
				(state, action: PayloadAction<IEducationDirection[]>) => {
					state.educationDirections = action.payload;
					state.loading = false;
				}
			)
			.addCase(actions.getEducationDirectionsList.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(actions.getEducationDirectionsList.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error?.message || 'Произошла ошибка';
			})
			.addCase(
				actions.getUsersList.fulfilled,
				(state, action: PayloadAction<IUser[]>) => {
					state.users = action.payload;
					state.loading = false;
				}
			)
			.addCase(actions.getUsersList.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(actions.getUsersList.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error?.message || 'Произошла ошибка';
			})
			.addCase(
				actions.getProgramRolesList.fulfilled,
				(state, action: PayloadAction<IProgramRole[]>) => {
					state.programRoles = action.payload;
					state.loading = false;
				}
			)
			.addCase(actions.getProgramRolesList.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(actions.getProgramRolesList.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error?.message || 'Произошла ошибка';
			})
			.addCase(
				actions.getProgramNsiList.fulfilled,
				(state, action: PayloadAction<IProgramNsi[]>) => {
					state.programNsi = action.payload;
					state.loading = false;
				}
			)
			.addCase(actions.getProgramNsiList.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(actions.getProgramNsiList.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error?.message || 'Произошла ошибка';
			})
			.addCase(
				actions.addNsiToList.fulfilled,
				(state, action: PayloadAction<IProgramNsi>) => {
					state.programNsi = [...state.programNsi, action.payload];
				}
			)
			.addCase(
				actions.editNsiFromList.fulfilled,
				(state, action: PayloadAction<IProgramNsi>) => {
					state.programNsi = state.programNsi.map((elem) =>
						elem.id === action.payload.id ? action.payload : elem
					);
				}
			);
	},
});
