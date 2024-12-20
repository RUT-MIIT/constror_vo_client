import type * as type from './types';

import * as api from '../../shared/api/design';

import { createAsyncThunk } from '@reduxjs/toolkit';

export const getInitialData = createAsyncThunk<
	type.IInitialDataResponse,
	number
>('design/getInitialData', api.getInitial);
