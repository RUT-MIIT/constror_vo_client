import type * as type from './types';

import * as api from '../../shared/api/reconstruction';

import { createAsyncThunk } from '@reduxjs/toolkit';

export const getInitialData = createAsyncThunk<
	type.IInitialDataResponse,
	number
>('reconstruction/getInitialData', api.getInitial);

export const addStageToProduct = createAsyncThunk<
	type.IReconstructionStage,
	type.IAddStageRequest
>('reconstruction/addStage', api.addStage);

export const editStageFromProduct = createAsyncThunk<
	type.IReconstructionStage,
	type.IEditStageRequest
>('reconstruction/editStage', api.editStage);

export const removeStageFromProduct = createAsyncThunk<
	type.IRemoveStageResponse,
	type.IRemoveStageRequest
>('reconstruction/removeStage', api.removeStage);

export const addProcessToStage = createAsyncThunk<
	type.IReconstructionProcess,
	type.IAddProcessRequest
>('reconstruction/addProcess', api.addProcess);

export const editProcessFromStage = createAsyncThunk<
	type.IReconstructionProcess,
	type.IEditProcessRequest
>('reconstruction/editProcess', api.editProcess);

export const removeProcessFromStage = createAsyncThunk<
	type.IRemoveProcessResponse,
	type.IRemoveProcessRequest
>('reconstruction/removeProcess', api.removeProcess);
