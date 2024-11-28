import type { FC, FormEvent, ChangeEvent } from 'react';

import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from '../../../store/store';

import { sendProductsWizardDataStepOne } from '../../../store/product/actions';

import { Form } from '../../../shared/components/Form/ui/form';
import {
	FormField,
	FormTextarea,
} from '../../../shared/components/Form/components';
import {
	WizardSubtitle,
	WizardMain,
	WizardButtons,
} from '../../../shared/components/Wizard';
import { MethodologyManager } from '../../MethodologyManager/ui/methodology-manager';

import { Button } from '../../../shared/components/Button/ui/button';

interface IProductsWizardStepOneProps {
	goToNextStep: () => void;
}

export const ProductsWizardStepOne: FC<IProductsWizardStepOneProps> = ({
	goToNextStep,
}) => {
	const dispatch = useDispatch();
	const { program } = useSelector((state) => state.programDetail);
	const { productWizardData } = useSelector((state) => state.product);

	const initialMethodology = useMemo(() => {
		const methodologies = productWizardData?.steps[0]?.chunks?.methodologies;
		return Array.isArray(methodologies) ? methodologies : [];
	}, [productWizardData]);

	const initialDescription = useMemo(() => {
		const description = productWizardData?.steps[0]?.chunks?.subject_scope;
		return typeof description === 'string' ? description : '';
	}, [productWizardData]);

	const [methodology, setMethodology] = useState<string[]>(initialMethodology);
	const [description, setDescription] = useState<string>(initialDescription);
	const [isBlockSubmit, setIsBlockSubmit] = useState<boolean>(true);

	const handleChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setDescription(e.target.value);
	};

	const handleAddMethodology = (newMethodology: string) => {
		setMethodology((prev) => [...prev, newMethodology]);
	};

	const handleRemoveMethodology = (methodologyToRemove: string) => {
		setMethodology((prev) =>
			prev.filter((item) => item !== methodologyToRemove)
		);
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (
			program &&
			productWizardData?.steps[0]?.chunks?.methodologies &&
			productWizardData?.steps[0]?.chunks?.subject_scope
		) {
			const data = {
				programId: program.id,
				methodologies: methodology,
				subject_scope: description,
			};
			try {
				await dispatch(sendProductsWizardDataStepOne(data)).unwrap();
				goToNextStep();
			} catch (error) {
				console.error('Ошибка при выполнении запроса:', error);
			}
		}
	};

	useEffect(() => {
		setIsBlockSubmit(description.trim().length === 0);
	}, [description]);

	return (
		<>
			<WizardMain>
				<WizardSubtitle text='Выберите одну или несколько методологий из предложенного списка или добавьте данные своей методологии. После этого опишите предметную область программы для продолжения работы.' />
				<Form name='create-products-wizard-step-1' onSubmit={handleSubmit}>
					<FormField title='Выбор методологии:'>
						<MethodologyManager
							currentValues={methodology}
							onAdd={handleAddMethodology}
							onRemove={handleRemoveMethodology}
						/>
					</FormField>
					<FormField title='Описание предметной области:'>
						<FormTextarea
							name='description'
							value={description}
							onChange={handleChangeDescription}
						/>
					</FormField>
				</Form>
			</WizardMain>
			<WizardButtons>
				<Button
					type='submit'
					text='Сохранить и сгенерировать'
					style='magic'
					form='create-products-wizard-step-1'
					isBlock={isBlockSubmit}
				/>
			</WizardButtons>
		</>
	);
};
