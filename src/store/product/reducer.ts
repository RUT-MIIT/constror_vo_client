import type {
	IProductStore,
	IInitialData,
	IProductsWizardData,
	IProductsWizardStepResponse,
	IProduct,
} from './types';
import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

import * as actions from './actions';

export const initialState: IProductStore = {
	productList: [],
	productWizardData: null,
	currentProduct: null,
	loadingData: true,
	errorData: null,
	isShowProductWizard: false,
	isLoadingProductWizard: false,
	isAddProduct: false,
	isEditProduct: false,
	isRemoveProduct: false,
};

export const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {
		updateProductFromList: (state, action: PayloadAction<IProduct>) => {
			const updatedProduct = action.payload;
			state.productList = state.productList.map((product) =>
				product.id === updatedProduct.id ? updatedProduct : product
			);
		},
		setCurrentProduct: (state, action: PayloadAction<IProduct | null>) => {
			state.currentProduct = action.payload;
		},
		setIsAddProduct: (state, action: PayloadAction<boolean>) => {
			state.isAddProduct = action.payload;
		},
		setIsEditProduct: (state, action: PayloadAction<boolean>) => {
			state.isEditProduct = action.payload;
		},
		setIsRemoveProduct: (state, action: PayloadAction<boolean>) => {
			state.isRemoveProduct = action.payload;
		},
		setIsShowProductWizard: (state, action: PayloadAction<boolean>) => {
			state.isShowProductWizard = action.payload;
		},
		setIsLoadingProductWizard: (state, action: PayloadAction<boolean>) => {
			state.isLoadingProductWizard = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(
				actions.getInitialData.fulfilled,
				(state, action: PayloadAction<IInitialData>) => {
					state.productList = action.payload.products;
					state.loadingData = false;
				}
			)
			.addCase(actions.getInitialData.pending, (state) => {
				state.loadingData = true;
				state.errorData = null;
			})
			.addCase(actions.getInitialData.rejected, (state, action) => {
				state.loadingData = false;
				state.errorData = action.error?.message || 'Произошла ошибка';
			})
			.addCase(
				actions.getProductsWizardData.fulfilled,
				(state, action: PayloadAction<IProductsWizardData>) => {
					state.productWizardData = action.payload;
				}
			)
			.addCase(actions.sendProductsWizardDataStepOne.pending, (state) => {
				state.isLoadingProductWizard = true;
			})
			.addCase(
				actions.sendProductsWizardDataStepOne.fulfilled,
				(state, action: PayloadAction<IProductsWizardStepResponse>) => {
					state.productWizardData = {
						...state.productWizardData,
						wizard_id: state.productWizardData?.wizard_id ?? 0,
						chain_id: state.productWizardData?.chain_id ?? 0,
						wizard_program: state.productWizardData?.wizard_program ?? '',
						wizard_type: state.productWizardData?.wizard_type ?? '',
						step_type_count: state.productWizardData?.step_type_count ?? 0,
						step_created: state.productWizardData?.step_created ?? false,
						steps: action.payload.steps,
						status: state.productWizardData?.status ?? '',
					};
					state.isLoadingProductWizard = false;
				}
			)
			.addCase(actions.sendProductsWizardDataStepTwo.pending, (state) => {
				state.isLoadingProductWizard = true;
			})
			.addCase(
				actions.sendProductsWizardDataStepTwo.fulfilled,
				(state, action: PayloadAction<IProductsWizardStepResponse>) => {
					state.productWizardData = {
						...state.productWizardData,
						wizard_id: state.productWizardData?.wizard_id ?? 0,
						chain_id: state.productWizardData?.chain_id ?? 0,
						wizard_program: state.productWizardData?.wizard_program ?? '',
						wizard_type: state.productWizardData?.wizard_type ?? '',
						step_type_count: state.productWizardData?.step_type_count ?? 0,
						step_created: state.productWizardData?.step_created ?? false,
						steps: action.payload.steps,
						status: state.productWizardData?.status ?? '',
					};
					state.isLoadingProductWizard = false;
				}
			)
			.addCase(actions.sendProductsWizardDataStepThree.pending, (state) => {
				state.isLoadingProductWizard = true;
			})
			.addCase(
				actions.sendProductsWizardDataStepThree.fulfilled,
				(state, action: PayloadAction<IProductsWizardStepResponse>) => {
					state.productWizardData = {
						...state.productWizardData,
						wizard_id: state.productWizardData?.wizard_id ?? 0,
						chain_id: state.productWizardData?.chain_id ?? 0,
						wizard_program: state.productWizardData?.wizard_program ?? '',
						wizard_type: state.productWizardData?.wizard_type ?? '',
						step_type_count: state.productWizardData?.step_type_count ?? 0,
						step_created: state.productWizardData?.step_created ?? false,
						steps: action.payload.steps,
						status: state.productWizardData?.status ?? '',
					};
					state.isLoadingProductWizard = false;
				}
			)
			.addCase(actions.sendProductsWizardDataStepFour.pending, (state) => {
				state.isLoadingProductWizard = true;
			})
			.addCase(
				actions.sendProductsWizardDataStepFour.fulfilled,
				(state, action: PayloadAction<IProduct[]>) => {
					state.productList = action.payload;
				}
			)
			.addCase(
				actions.addProductToList.fulfilled,
				(state, action: PayloadAction<IProduct>) => {
					state.productList = [...state.productList, action.payload];
					state.isAddProduct = false;
				}
			)
			.addCase(
				actions.editProductFromList.fulfilled,
				(state, action: PayloadAction<IProduct>) => {
					state.productList = state.productList.map((product) =>
						product.id === action.payload.id ? action.payload : product
					);
					state.isEditProduct = false;
				}
			)
			.addCase(actions.removeProductFromList.fulfilled, (state, action) => {
				const { productId } = action.meta.arg;
				state.productList = state.productList.filter(
					(elem) => elem.id !== productId
				);
				state.currentProduct = null;
				state.isRemoveProduct = false;
			})
			.addCase(
				actions.setProductNsiList.fulfilled,
				(state, action: PayloadAction<IProduct>) => {
					state.currentProduct = action.payload;
				}
			);
	},
});

export const {
	updateProductFromList,
	setIsAddProduct,
	setIsEditProduct,
	setIsRemoveProduct,
	setCurrentProduct,
	setIsShowProductWizard,
	setIsLoadingProductWizard,
} = productSlice.actions;
