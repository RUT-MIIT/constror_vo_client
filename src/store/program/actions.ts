import type {
	IProgramItem,
	IAddProgramRequest,
	IEditProgramRequest,
	IMessageResponse,
} from './types';

import {
	getPrograms,
	addProgram,
	editProgram,
	removeProgram,
} from '../../shared/api/programs';

import { createAsyncThunk } from '@reduxjs/toolkit';

export const getProgramsList = createAsyncThunk<IProgramItem[]>(
	'program/getProgramsList',
	async () => {
		const response = await getPrograms();
		return response;
	}
);

export const addProgramToList = createAsyncThunk<
	IProgramItem,
	IAddProgramRequest
>('program/addProgram', addProgram);

export const editProgramFromList = createAsyncThunk<
	IProgramItem,
	IEditProgramRequest
>('program/editProgram', editProgram);

export const removeProgramFromList = createAsyncThunk<IMessageResponse, number>(
	'program/removeProgram',
	removeProgram
);
