import { combineSlices } from '@reduxjs/toolkit';
import { userSlice } from './user/reducer';
import { programListSlice } from './programList/reducer';
import { programDetailSlice } from './programDetail/reducer';
import { catalogSlice } from './catalog/reducer';

export const rootReducer = combineSlices(
	userSlice,
	programListSlice,
	programDetailSlice,
	catalogSlice
);
