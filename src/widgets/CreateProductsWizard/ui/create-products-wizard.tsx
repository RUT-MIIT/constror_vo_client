import type { FC } from 'react';

import { useSelector } from '../../../store/store';
import { useSteps } from '../../../hooks/useWizardSteps';

import {
	ProductsWizardStepOne,
	ProductsWizardStepTwo,
	ProductsWizardStepThree,
	ProductsWizardStepFour,
} from '../index';
import {
	Wizard,
	WizardTitle,
	WizardSteps,
} from '../../../shared/components/Wizard';
import { PreloaderWizard } from '../../../shared/components/Preloader/ui/preloader-wizard';

export const CreateProductsWizard: FC = () => {
	const { productWizardData, isLoadingProductWizard } = useSelector(
		(state) => state.product
	);
	const stepsCount = productWizardData?.step_type_count || 0;
	const currentStep = productWizardData?.steps.length;
	const { steps, activeStep, goToStep, goToNextStep, goToPreviousStep } =
		useSteps(stepsCount, currentStep);

	return (
		<Wizard id='create-products-wizard'>
			<WizardTitle text='Подбор исходных данных' />
			<WizardSteps
				steps={steps}
				currentStep={currentStep || 1}
				activeStep={activeStep}
				onChange={goToStep}
			/>
			{isLoadingProductWizard ? (
				<PreloaderWizard text='Идёт генерация данных...' />
			) : (
				<>
					{activeStep === 1 && (
						<ProductsWizardStepOne goToNextStep={goToNextStep} />
					)}
					{activeStep === 2 && (
						<ProductsWizardStepTwo
							goToNextStep={goToNextStep}
							goToPreviousStep={goToPreviousStep}
						/>
					)}
					{activeStep === 3 && (
						<ProductsWizardStepThree
							goToNextStep={goToNextStep}
							goToPreviousStep={goToPreviousStep}
						/>
					)}
					{activeStep === 4 && (
						<ProductsWizardStepFour goToPreviousStep={goToPreviousStep} />
					)}
				</>
			)}
		</Wizard>
	);
};
