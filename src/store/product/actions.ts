import type {
	IInitialData,
	IProductsWizardData,
	IProductsWizardStepResponse,
	IProduct,
	IAddProductRequest,
	IEditProductRequest,
	IRemoveProductRequest,
	ISendProductsDataStepOneRequest,
	ISendProductsDataStepFourRequest,
	ISetProductNsiRequest,
	IMessageResponse,
} from './types';

import * as api from '../../shared/api/product';

import { createAsyncThunk } from '@reduxjs/toolkit';

export const getInitialData = createAsyncThunk<IInitialData, number>(
	'product/getProgramsList',
	api.getInitial
);

export const getProductsWizardData = createAsyncThunk<
	IProductsWizardData,
	number
>('product/getProductsWizardData', api.getProductsWizard);

export const sendProductsWizardDataStepOne = createAsyncThunk<
	IProductsWizardStepResponse,
	ISendProductsDataStepOneRequest
>('product/sendProductsWizardDataStepOne', api.sendProductsDataStepOne);

export const sendProductsWizardDataStepTwo = createAsyncThunk<
	IProductsWizardStepResponse,
	number
>('product/sendProductsWizardDataStepTwo', api.sendProductsDataStepTwo);

export const sendProductsWizardDataStepThree = createAsyncThunk<
	IProductsWizardStepResponse,
	number
>('product/sendProductsWizardDataStepThree', api.sendProductsDataStepThree);

export const sendProductsWizardDataStepFour = createAsyncThunk<
	IProduct[],
	ISendProductsDataStepFourRequest
>('product/sendProductsWizardDataStepFour', api.sendProductsDataStepFour);

export const addProductToList = createAsyncThunk<IProduct, IAddProductRequest>(
	'product/addProduct',
	api.addProduct
);

export const editProductFromList = createAsyncThunk<
	IProduct,
	IEditProductRequest
>('product/editProduct', api.editProduct);

export const removeProductFromList = createAsyncThunk<
	IMessageResponse,
	IRemoveProductRequest
>('product/removeProduct', api.removeProduct);

export const setProductNsiList = createAsyncThunk<
	IProduct,
	ISetProductNsiRequest
>('product/setProductNsi', api.setProductNsi);
