import type { FC, FormEvent } from 'react';
import type { IAddCompetenceValues } from '../types/types';
import type { TFormValidationErrors } from '../../../shared/components/Form/types/types';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from '../../../store/store';
import { useForm } from '../../../hooks/useForm';

import { Form } from '../../../shared/components/Form/ui/form';
import {
	FormField,
	FormInput,
	FormButtons,
} from '../../../shared/components/Form/components';
import { Button } from '../../../shared/components/Button/ui/button';

import { validationSchema } from '../lib/helpers';

import { addCompetenceToProgram } from '../../../store/discBasic/actions';

export const AddCompetenceForm: FC = () => {
	const dispatch = useDispatch();
	const { program } = useSelector((state) => state.programDetail);

	const [isBlockSubmit, setIsBlockSubmit] = useState<boolean>(true);
	const { values, handleChange, errors } = useForm<IAddCompetenceValues>(
		{ name: '', code: '' },
		validationSchema
	);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!isBlockSubmit) {
			const newData = {
				name: values.name,
				code: values.code,
				type: 'Общепрофессиональные',
			};
			if (program) {
				dispatch(
					addCompetenceToProgram({ programId: program.id, competence: newData })
				);
			}
		}
	};

	const shouldBlockSubmit = (
		values: IAddCompetenceValues,
		errors: TFormValidationErrors
	): boolean => {
		return (
			!values.name.trim() ||
			!!errors.name ||
			!values.code.trim() ||
			!!errors.code
		);
	};

	useEffect(() => {
		setIsBlockSubmit(shouldBlockSubmit(values, errors));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [values]);

	useEffect(() => {
		setIsBlockSubmit(true);
	}, []);

	return (
		<Form name='form-add-competence' onSubmit={handleSubmit}>
			<FormField
				title='Шифр ОПК:'
				fieldError={{
					text: errors.code || '',
					isShow: !!errors.code,
				}}>
				<FormInput
					name='code'
					value={values.code}
					onChange={handleChange}
					placeholder='Введите шифр ОПК'
				/>
			</FormField>
			<FormField
				title='Наименование ОПК:'
				fieldError={{
					text: errors.name || '',
					isShow: !!errors.name,
				}}>
				<FormInput
					name='name'
					value={values.name}
					onChange={handleChange}
					placeholder='Введите наименование ОПК'
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
