import { combineSlices } from '@reduxjs/toolkit';
import { userSlice } from './user/reducer';
import { programListSlice } from './programList/reducer';
import { programDetailSlice } from './programDetail/reducer';
import { productSlice } from './product/reducer';
import { reconstructionSlice } from './reconstruction/reducer';
import { discSpecSlice } from './discSpec/reducer';
import { discBasicSlice } from './discBasic/reducer';
import { educationPlanSlice } from './educationPlan/reducer';
import { designSlice } from './design/reducer';
import { catalogSlice } from './catalog/reducer';

export const rootReducer = combineSlices(
	userSlice,
	programListSlice,
	programDetailSlice,
	productSlice,
	reconstructionSlice,
	discSpecSlice,
	discBasicSlice,
	educationPlanSlice,
	designSlice,
	catalogSlice
);
