import type * as type from './types';

import * as api from '../../shared/api/discSpec';

import { createAsyncThunk } from '@reduxjs/toolkit';

export const getInitialData = createAsyncThunk<
	type.IInitialDataResponse,
	number
>('discSpec/getInitialData', api.getInitial);

export const addDisciplineToProgram = createAsyncThunk<
	type.IDisciplineSpec,
	type.IAddDisciplineRequest
>('discSpec/addDiscipline', api.addDiscipline);

export const editDisciplineFromProgram = createAsyncThunk<
	type.IDisciplineSpec,
	type.IEditDisciplineRequest
>('discSpec/editDiscipline', api.editDiscipline);

export const removeDisciplineFromProgram = createAsyncThunk<
	type.IRemoveDisciplineResponse,
	type.IRemoveDisciplineRequest
>('discSpec/removeDiscipline', api.removeDiscipline);

export const syncProductsWithDiscipline = createAsyncThunk<
	type.IDiscProduct[],
	type.ISyncProductsRequest
>('discSpec/syncProducts', api.syncProducts);

export const syncStagesWithDiscipline = createAsyncThunk<
	type.IDiscStage[],
	type.ISyncStagesRequest
>('discSpec/syncStages', api.syncStages);

export const syncProcessesWithDiscipline = createAsyncThunk<
	type.IDiscProcess[],
	type.ISyncProcessesRequest
>('discSpec/syncProcesses', api.syncProcesses);
