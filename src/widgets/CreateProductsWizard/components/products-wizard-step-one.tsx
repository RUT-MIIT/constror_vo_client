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

import { Modal } from '../../../shared/components/Modal/ui/modal';
import { Button } from '../../../shared/components/Button/ui/button';
import { Text } from '../../../shared/components/Typography';

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

	const [isOpenMethodologyInfoModal, setIsOpenMethodologyInfoModal] =
		useState<boolean>();

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

	const openMethodologyInfoModal = () => {
		setIsOpenMethodologyInfoModal(true);
	};

	const closeMethodologyInfoModal = () => {
		setIsOpenMethodologyInfoModal(false);
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (program) {
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
				<WizardSubtitle text='Опишите замысел (идею) образовательной программы и определите модель жизненного цикла для реконструкции деятельности её выпускника. Пользуйтесь подсказками.' />
				<Form name='create-products-wizard-step-1' onSubmit={handleSubmit}>
					<FormField title='Описание замысла (идеи) образовательной программы'>
						<FormTextarea
							name='description'
							value={description}
							onChange={handleChangeDescription}
						/>
					</FormField>
					<FormField
						title='Выбор модели жизненного цикла'
						withInfo
						onInfo={openMethodologyInfoModal}>
						<MethodologyManager
							currentValues={methodology}
							onAdd={handleAddMethodology}
							onRemove={handleRemoveMethodology}
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
			{isOpenMethodologyInfoModal && (
				<Modal
					title='Модель жизненного цикла'
					isOpen={isOpenMethodologyInfoModal}
					onClose={closeMethodologyInfoModal}>
					<Text text='Продукты, которые создаёт выпускник в профессиональной деятельности (или&nbsp;участвует в их создании) имеют жизненный цикл создания, который можно описать по определённым стандартам (моделям). Нужно определиться по какой модели жизненного цикла будет производиться реконструкция деятельности выпускника образовательной программы. Наиболее распространённые модели есть в&nbsp;нашей базе, их просто можно выбрать из списка. Если для проектирования необходимо использовать другие модели, которые заданы документами о&nbsp;стандартизации (ГОСТ, ГОСТ Р и др.), то Вы можете добавить эти модели самостоятельно, загрузив файлы соответствующих документов в машиночитаемом формате .pdf, .txt.  ' />
				</Modal>
			)}
		</>
	);
};
