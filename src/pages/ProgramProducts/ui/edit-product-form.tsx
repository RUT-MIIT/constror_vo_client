import type { FC, FormEvent } from 'react';
import type { IEditProductValues } from '../types/types';
import { TFormValidationErrors } from '../../../shared/components/Form/types/types';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from '../../../store/store';
import { useForm } from '../../../hooks/useForm';

import { Form } from '../../../shared/components/Form/ui/form';
import {
	FormField,
	FormInput,
	FormTextarea,
	FormButtons,
} from '../../../shared/components/Form/components';
import { Button } from '../../../shared/components/Button/ui/button';

import { validationSchema } from '../lib/helpers';

import { editProductFromList } from '../../../store/product/actions';

export const EditProductForm: FC = () => {
	const dispatch = useDispatch();
	const { program } = useSelector((state) => state.programDetail);
	const { currentProduct } = useSelector((state) => state.product);

	const [isBlockSubmit, setIsBlockSubmit] = useState<boolean>(true);
	const { values, handleChange, errors } = useForm<IEditProductValues>(
		{
			name: currentProduct?.name || '',
			description: currentProduct?.description || '',
		},
		validationSchema
	);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!isBlockSubmit) {
			const newProduct = {
				name: values.name,
				description: values.description,
			};
			if (program && currentProduct) {
				dispatch(
					editProductFromList({
						programId: program.id,
						productId: currentProduct.id,
						product: newProduct,
					})
				);
			}
		}
	};

	const shouldBlockSubmit = (
		values: IEditProductValues,
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
		<Form name='form-edit-product' onSubmit={handleSubmit}>
			<FormField
				title='Наименование:'
				fieldError={{
					text: errors.name || '',
					isShow: !!errors.name,
				}}>
				<FormInput name='name' value={values.name} onChange={handleChange} />
			</FormField>
			<FormField
				title='Краткое описание:'
				fieldError={{
					text: errors.description || '',
					isShow: !!errors.description,
				}}>
				<FormTextarea
					name='description'
					value={values.description}
					onChange={handleChange}
					placeholder='Введите краткое описание продукта'
				/>
			</FormField>
			<FormButtons>
				<Button
					type='submit'
					text='Сохранить'
					width='full'
					isBlock={isBlockSubmit}></Button>
			</FormButtons>
		</Form>
	);
};
