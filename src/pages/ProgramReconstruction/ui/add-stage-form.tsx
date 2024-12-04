import type { FC, FormEvent } from 'react';
import type { IAddStageValues } from '../types/types';
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

import { addStageToProduct } from '../../../store/reconstruction/actions';

export const AddStageForm: FC = () => {
	const dispatch = useDispatch();
	const { currentProduct } = useSelector((state) => state.reconstruction);

	const [isBlockSubmit, setIsBlockSubmit] = useState<boolean>(true);
	const { values, handleChange, errors } = useForm<IAddStageValues>(
		{ name: '', description: '' },
		validationSchema
	);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!isBlockSubmit) {
			const newData = {
				name: values.name,
				description: values.description,
			};
			if (currentProduct) {
				dispatch(
					addStageToProduct({ productId: currentProduct.id, stage: newData })
				);
			}
		}
	};

	const shouldBlockSubmit = (
		values: IAddStageValues,
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
		<Form name='form-add-stage' onSubmit={handleSubmit}>
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
