import { combineSlices } from '@reduxjs/toolkit';
import { userSlice } from './user/reducer';
import { programSlice } from './program/reducer';
import { catalogSlice } from './catalog/reducer';

export const rootReducer = combineSlices(userSlice, programSlice, catalogSlice);
