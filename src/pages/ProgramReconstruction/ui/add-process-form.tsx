import type { FC, FormEvent } from 'react';
import type { IAddProcessValues } from '../types/types';
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

import { addProcessToStage } from '../../../store/reconstruction/actions';

export const AddProcessForm: FC = () => {
	const dispatch = useDispatch();
	const { currentStage } = useSelector((state) => state.reconstruction);

	const [isBlockSubmit, setIsBlockSubmit] = useState<boolean>(true);
	const { values, handleChange, errors } = useForm<IAddProcessValues>(
		{ name: '', description: '', result: '' },
		validationSchema
	);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!isBlockSubmit) {
			const newData = {
				name: values.name,
				description: values.description,
				result: values.result,
			};
			if (currentStage) {
				dispatch(
					addProcessToStage({ stageId: currentStage.id, process: newData })
				);
			}
		}
	};

	const shouldBlockSubmit = (
		values: IAddProcessValues,
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
		<Form name='form-add-process' onSubmit={handleSubmit}>
			<FormField
				title='Наименование:'
				fieldError={{
					text: errors.name || '',
					isShow: !!errors.name,
				}}>
				<FormInput name='name' value={values.name} onChange={handleChange} />
			</FormField>
			<FormField title='Краткое описание:'>
				<FormTextarea
					name='description'
					value={values.description}
					onChange={handleChange}
				/>
			</FormField>
			<FormField title='Результат деятельности:'>
				<FormTextarea
					name='result'
					value={values.result}
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
