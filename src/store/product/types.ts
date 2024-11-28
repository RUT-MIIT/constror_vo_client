export interface IProduct {
	name: string;
	id: number;
	description?: string;
	position?: number;
	nsis: number[];
}

export interface IInitialData {
	message: string;
	products: IProduct[];
}

export interface IProductsWizardData {
	wizard_id: number;
	chain_id: number;
	wizard_program: string;
	wizard_type: string;
	step_type_count: number;
	step_created: boolean;
	steps: IProductsWizardStep[];
	status: string;
}

export interface IProductsWizardStep {
	id: number;
	step_type__name: string;
	step_type__code: string;
	created_at: string;
	chunks?: Record<string, unknown>;
	result?: string;
	result_json?: {
		products: [
			{
				name: string;
				nsis: [
					{
						name: string;
						author: string;
						year: string;
					}
				];
			}
		];
	};
}

export interface IProductsWizardStepResponse {
	steps: IProductsWizardStep[];
}

export interface IProductStore {
	productList: IProduct[];
	productWizardData: IProductsWizardData | null;
	currentProduct: IProduct | null;
	loadingData: boolean;
	errorData: string | null;
	isShowProductWizard: boolean;
	isLoadingProductWizard: boolean;
	isAddProduct: boolean;
	isEditProduct: boolean;
	isRemoveProduct: boolean;
}

export interface IAddProductRequest {
	programId: number;
	product: INewProduct;
}

export interface IEditProductRequest {
	programId: number;
	productId: number;
	product: INewProduct;
}

export interface IRemoveProductRequest {
	programId: number;
	productId: number;
}

export interface ISendProductsDataStepOneRequest {
	programId: number;
	methodologies: string[];
	subject_scope: string;
}

export interface ISendProductsDataStepFourRequest {
	programId: number;
	products: [
		{
			name: string;
			nsis: [
				{
					name: string;
					author: string;
					year: string;
				}
			];
		}
	];
}

export interface ISetProductNsiRequest {
	productId: number;
	nsis: number[];
}

export interface INewProduct {
	name: string;
}

export interface IMessageResponse {
	success: boolean;
	message: string;
}
