import type {
	IProgramItem,
	IAddProgramRequest,
	IEditProgramRequest,
	IMessageResponse,
} from './types';

import * as api from '../../shared/api/programs';

import { createAsyncThunk } from '@reduxjs/toolkit';

export const getProgramsList = createAsyncThunk<IProgramItem[]>(
	'programList/getProgramsList',
	async () => {
		const response = await api.getPrograms();
		return response;
	}
);

export const addProgramToList = createAsyncThunk<
	IProgramItem,
	IAddProgramRequest
>('programList/addProgram', api.addProgram);

export const editProgramFromList = createAsyncThunk<
	IProgramItem,
	IEditProgramRequest
>('programList/editProgram', api.editProgram);

export const removeProgramFromList = createAsyncThunk<IMessageResponse, number>(
	'programList/removeProgram',
	api.removeProgram
);
