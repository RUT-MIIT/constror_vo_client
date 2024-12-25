import type { FC, FormEvent } from 'react';

import { useDispatch, useSelector } from '../../../store/store';

import { sendProductsWizardDataStepThree } from '../../../store/product/actions';

import { Form } from '../../../shared/components/Form/ui/form';
import { FormField } from '../../../shared/components/Form/components';
import { Field } from '../../../shared/components/Field/ui/field';
import { WizardMain, WizardButtons } from '../../../shared/components/Wizard';

import { Button } from '../../../shared/components/Button/ui/button';

interface IProductsWizardStepThreeProps {
	goToPreviousStep: () => void;
	goToNextStep: () => void;
}

export const ProductsWizardStepThree: FC<IProductsWizardStepThreeProps> = ({
	goToPreviousStep,
	goToNextStep,
}) => {
	const dispatch = useDispatch();
	const { program } = useSelector((state) => state.programDetail);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (program) {
			try {
				await dispatch(sendProductsWizardDataStepThree(program.id)).unwrap();
				goToNextStep();
			} catch (error) {
				console.error('Ошибка при выполнении запроса:', error);
			}
		}
	};

	return (
		<>
			<WizardMain>
				<Form name='create-products-wizard-step-3' onSubmit={handleSubmit}>
					<FormField title='Создание нормативно-справочной информации для продуктов'>
						<Field
							text='Конструктор подберёт источники нормативно-справочной информации (НСИ), которые регламентируют жизненный цикл и сделает это отдельно каждого продукта. Информация из НСИ на следующем этапе проектирования будет использована для подробной реконструкция деятельности выпускника образовательной программы. Вы сможете редактировать полученный результат.
							На следующем шаге - сохраните, если результат соответствует ожиданиям. В дальнейшем его можно отредактировать. Перегенерируйте, если хотите получить другую версию источников НСИ. '
						/>
					</FormField>
				</Form>
			</WizardMain>
			<WizardButtons>
				<Button type='button' text='Назад' onClick={goToPreviousStep} />
				<Button
					type='submit'
					text='Сгенерировать'
					style='magic'
					form='create-products-wizard-step-3'
				/>
			</WizardButtons>
		</>
	);
};
