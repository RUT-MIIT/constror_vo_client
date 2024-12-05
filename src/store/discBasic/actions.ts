import type * as type from './types';

import * as api from '../../shared/api/discBasic';

import { createAsyncThunk } from '@reduxjs/toolkit';

export const getInitialData = createAsyncThunk<
	type.IInitialDataResponse,
	number
>('discBasic/getInitialData', api.getInitial);

export const addCompetenceToProgram = createAsyncThunk<
	type.ICompetence,
	type.IAddCompetenceRequest
>('discBasic/addCompetence', api.addCompetence);

export const editCompetenceFromProgram = createAsyncThunk<
	type.ICompetence,
	type.IEditCompetenceRequest
>('discBasic/editCompetence', api.editCompetence);

export const removeCompetenceFromProgram = createAsyncThunk<
	type.IRemoveCompetenceResponse,
	type.IRemoveCompetenceRequest
>('discBasic/removeCompetence', api.removeCompetence);

export const addDisciplineToProgram = createAsyncThunk<
	type.IDisciplineBasic,
	type.IAddDisciplineRequest
>('discBasic/addDiscipline', api.addDiscipline);

export const editDisciplineFromProgram = createAsyncThunk<
	type.IDisciplineBasic,
	type.IEditDisciplineRequest
>('discBasic/editDiscipline', api.editDiscipline);

export const removeDisciplineFromProgram = createAsyncThunk<
	type.IRemoveDisciplineResponse,
	type.IRemoveDisciplineRequest
>('discBasic/removeDiscipline', api.removeDiscipline);
