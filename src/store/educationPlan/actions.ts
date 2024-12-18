import type * as type from './types';

import * as api from '../../shared/api/eduPlan';

import { createAsyncThunk } from '@reduxjs/toolkit';

export const getInitialData = createAsyncThunk<
	type.IInitialDataResponse,
	number
>('eduPlan/getInitialData', api.getInitial);

export const addHoursToDiscipline = createAsyncThunk<
	type.ISemesterDisc,
	type.IAddHoursRequest
>('eduPlan/addHours', api.addHours);

export const removeHoursFromDiscipline = createAsyncThunk<
	type.IRemoveHoursResponse,
	type.IRemoveHoursRequest
>('eduPlan/removeHours', api.removeHours);
