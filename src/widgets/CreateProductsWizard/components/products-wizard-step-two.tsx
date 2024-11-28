import type { FC, FormEvent } from 'react';

import { useDispatch, useSelector } from '../../../store/store';

import {
	sendProductsWizardDataStepOne,
	sendProductsWizardDataStepTwo,
} from '../../../store/product/actions';

import { Form } from '../../../shared/components/Form/ui/form';
import { FormField } from '../../../shared/components/Form/components';
import { Markdown } from '../../../features/Markdown/ui/markdown';
import {
	WizardSubtitle,
	WizardMain,
	WizardButtons,
} from '../../../shared/components/Wizard';

import { Button } from '../../../shared/components/Button/ui/button';

interface IProductsWizardStepTwoProps {
	goToPreviousStep: () => void;
	goToNextStep: () => void;
}

export const ProductsWizardStepTwo: FC<IProductsWizardStepTwoProps> = ({
	goToPreviousStep,
	goToNextStep,
}) => {
	const dispatch = useDispatch();
	const { program } = useSelector((state) => state.programDetail);
	const { productWizardData } = useSelector((state) => state.product);

	const result = productWizardData?.steps[1].result;

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (program) {
			try {
				await dispatch(sendProductsWizardDataStepTwo(program.id)).unwrap();
				goToNextStep();
			} catch (error) {
				console.error('Ошибка при выполнении запроса:', error);
			}
		}
	};

	const handleRegenerate = () => {
		if (
			program &&
			productWizardData?.steps[0]?.chunks?.methodologies &&
			productWizardData?.steps[0]?.chunks?.subject_scope
		) {
			const data = {
				programId: program.id,
				methodologies: Array.isArray(
					productWizardData.steps[0].chunks.methodologies
				)
					? productWizardData.steps[0].chunks.methodologies
					: [],
				subject_scope:
					typeof productWizardData.steps[0].chunks.subject_scope === 'string'
						? productWizardData.steps[0].chunks.subject_scope
						: '',
			};
			dispatch(sendProductsWizardDataStepOne(data));
		}
	};

	return (
		<>
			<WizardMain>
				<WizardSubtitle text='Выберите описание продуктов, сгенерированных искусственным интеллектом. Убедитесь, что результат соответствует вашим ожиданиям, и переходите к следующему шагу.' />
				<Form name='create-products-wizard-step-2' onSubmit={handleSubmit}>
					<FormField title='Описание продуктов программы:'>
						{result && <Markdown text={result} />}
					</FormField>
				</Form>
			</WizardMain>
			<WizardButtons>
				<Button type='button' text='Назад' onClick={goToPreviousStep} />
				<Button
					type='button'
					text='Перегенерировать'
					style='magic'
					onClick={handleRegenerate}
				/>
				<Button
					type='submit'
					text='Сохранить'
					form='create-products-wizard-step-2'
				/>
			</WizardButtons>
		</>
	);
};
