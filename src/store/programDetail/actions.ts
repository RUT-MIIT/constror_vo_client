import type {
	IProgramDetail,
	IAddParticipantRequest,
	IEditParticipantRequest,
	IRemoveParticipantRequest,
} from './types';
import type { IParticipant } from '../programList/types';

import * as api from '../../shared/api/program';

import { createAsyncThunk } from '@reduxjs/toolkit';

export const getProgramDetail = createAsyncThunk<IProgramDetail, string>(
	'programDetail/getProgramDetail',
	api.getProgram
);

export const addParticipantToList = createAsyncThunk<
	IParticipant[],
	IAddParticipantRequest
>('programDetail/addParticipant', api.addParticipant);

export const editParticipantFromList = createAsyncThunk<
	IParticipant[],
	IEditParticipantRequest
>('programList/editProgram', api.editParticipant);

export const removeParticipantFromList = createAsyncThunk<
	IParticipant[],
	IRemoveParticipantRequest
>('programDetail/removeParticipant', api.removeParticipant);
