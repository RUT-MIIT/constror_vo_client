import type { FC, FormEvent } from 'react';
import type { IEditStageValues } from '../types/types';
import type { TFormValidationErrors } from '../../../shared/components/Form/types/types';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from '../../../store/store';
import { useForm } from '../../../hooks/useForm';

import { Form } from '../../../shared/components/Form/ui/form';
import {
	FormField,
	FormInput,
	FormButtons,
	FormTextarea,
} from '../../../shared/components/Form/components';
import { Button } from '../../../shared/components/Button/ui/button';

import { validationSchema } from '../lib/helpers';

import { editStageFromProduct } from '../../../store/reconstruction/actions';

export const EditStageForm: FC = () => {
	const dispatch = useDispatch();
	const { currentProduct, currentStage } = useSelector(
		(state) => state.reconstruction
	);

	const [isBlockSubmit, setIsBlockSubmit] = useState<boolean>(true);
	const { values, handleChange, errors } = useForm<IEditStageValues>(
		{
			name: currentStage?.name || '',
			description: currentStage?.description || '',
		},
		validationSchema
	);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!isBlockSubmit) {
			const newData = {
				name: values.name,
				description: values.description,
			};
			if (currentProduct && currentStage) {
				dispatch(
					editStageFromProduct({
						productId: currentProduct.id,
						stageId: currentStage.id,
						stage: newData,
					})
				);
			}
		}
	};

	const shouldBlockSubmit = (
		values: IEditStageValues,
		errors: TFormValidationErrors
	): boolean => {
		return !values.name.trim() || !!errors.name;
	};

	useEffect(() => {
		setIsBlockSubmit(shouldBlockSubmit(values, errors));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [values]);

	useEffect(() => {
		setIsBlockSubmit(true);
	}, []);

	return (
		<Form name='form-edit-stage' onSubmit={handleSubmit}>
			<FormField
				title='Наименование:'
				fieldError={{
					text: errors.name || '',
					isShow: !!errors.name,
				}}>
				<FormInput name='name' value={values.name} onChange={handleChange} />
			</FormField>
			<FormField title='Описание:'>
				<FormTextarea
					name='description'
					value={values.description}
					onChange={handleChange}
				/>
			</FormField>
			<FormButtons>
				<Button
					type='submit'
					text='Создать'
					width='full'
					isBlock={isBlockSubmit}></Button>
			</FormButtons>
		</Form>
	);
};
