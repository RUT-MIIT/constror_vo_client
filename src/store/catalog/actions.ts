import type {
	IEducationLevel,
	IEducationDirection,
	IUser,
	IProgramRole,
} from './types';

import {
	getEducationLevels,
	getEducationDirections,
	getUsers,
	getProgramRoles,
} from '../../shared/api/catalog';

import { createAsyncThunk } from '@reduxjs/toolkit';

export const getEducationLevelsList = createAsyncThunk<IEducationLevel[]>(
	'catalog/getEducationLevels',
	async () => {
		const response = await getEducationLevels();
		return response;
	}
);

export const getEducationDirectionsList = createAsyncThunk<
	IEducationDirection[]
>('catalog/getEducationDirections', async () => {
	const response = await getEducationDirections();
	return response;
});

export const getUsersList = createAsyncThunk<IUser[]>(
	'catalog/getUsers',
	async () => {
		const response = await getUsers();
		return response;
	}
);

export const getProgramRolesList = createAsyncThunk<IProgramRole[]>(
	'catalog/getProgramRoles',
	async () => {
		const response = await getProgramRoles();
		return response;
	}
);
