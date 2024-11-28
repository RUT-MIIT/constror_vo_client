import type {
	IEducationLevel,
	IEducationDirection,
	IUser,
	IProgramRole,
	IProgramNsi,
	IAddProgramNsiRequest,
	IEditProgramNsiRequest,
	IRemoveProgramNsiRequest,
} from './types';

import * as api from '../../shared/api/catalog';

import { createAsyncThunk } from '@reduxjs/toolkit';

export const getEducationLevelsList = createAsyncThunk<IEducationLevel[]>(
	'catalog/getEducationLevels',
	async () => {
		const response = await api.getEducationLevels();
		return response;
	}
);

export const getEducationDirectionsList = createAsyncThunk<
	IEducationDirection[]
>('catalog/getEducationDirections', async () => {
	const response = await api.getEducationDirections();
	return response;
});

export const getUsersList = createAsyncThunk<IUser[]>(
	'catalog/getUsers',
	async () => {
		const response = await api.getUsers();
		return response;
	}
);

export const getProgramRolesList = createAsyncThunk<IProgramRole[]>(
	'catalog/getProgramRoles',
	async () => {
		const response = await api.getProgramRoles();
		return response;
	}
);

export const getProgramNsiList = createAsyncThunk<IProgramNsi[], number>(
	'catalog/getProgramNsi',
	api.getProgramNsi
);

export const addNsiToList = createAsyncThunk<
	IProgramNsi,
	IAddProgramNsiRequest
>('catalog/addNsiToList', api.addNsi);

export const editNsiFromList = createAsyncThunk<
	IProgramNsi,
	IEditProgramNsiRequest
>('catalog/editNsiFromList', api.editNsi);

export const removeNsiFromList = createAsyncThunk<
	IProgramNsi,
	IRemoveProgramNsiRequest
>('catalog/addNsiFromList', api.removeNsi);
