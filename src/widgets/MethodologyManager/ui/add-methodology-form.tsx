import type { FC } from 'react';
import type {
	IAddMethodologyFormProps,
	IAddMethodologyValues,
} from '../types/types';
import type { TFormValidationErrors } from '../../../shared/components/Form/types/types';

import { useState, useEffect } from 'react';
import { useForm } from '../../../hooks/useForm';

import { Form } from '../../../shared/components/Form/ui/form';
import {
	FormField,
	FormInput,
	FormButtons,
} from '../../../shared/components/Form/components';
import { Button } from '../../../shared/components/Button/ui/button';

import { validationSchema } from '../lib/helpers';

export const AddMethodologyForm: FC<IAddMethodologyFormProps> = ({ onAdd }) => {
	const [isBlockSubmit, setIsBlockSubmit] = useState<boolean>(true);
	const { values, handleChange, errors } = useForm<IAddMethodologyValues>(
		{ name: '' },
		validationSchema
	);

	const handleAddMethodology = () => {
		if (!isBlockSubmit) {
			onAdd(values.name);
		}
	};

	const shouldBlockSubmit = (
		values: IAddMethodologyValues,
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
		<Form name='form-add-methodology'>
			<FormField
				title='Наименование:'
				fieldError={{
					text: errors.name || '',
					isShow: !!errors.name,
				}}>
				<FormInput name='name' value={values.name} onChange={handleChange} />
			</FormField>
			<FormButtons>
				<Button
					type='button'
					text='Создать'
					width='full'
					isBlock={isBlockSubmit}
					onClick={handleAddMethodology}
				/>
			</FormButtons>
		</Form>
	);
};
