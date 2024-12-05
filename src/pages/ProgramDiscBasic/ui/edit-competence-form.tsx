import type { FC, FormEvent } from 'react';
import type { IEditCompetenceValues } from '../types/types';
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

import { editCompetenceFromProgram } from '../../../store/discBasic/actions';

export const EditCompetenceForm: FC = () => {
	const dispatch = useDispatch();
	const { program } = useSelector((state) => state.programDetail);
	const { currentCompetence } = useSelector((state) => state.discBasic);

	const [isBlockSubmit, setIsBlockSubmit] = useState<boolean>(true);
	const { values, handleChange, errors } = useForm<IEditCompetenceValues>(
		{
			name: currentCompetence?.name || '',
			code: currentCompetence?.code || '',
		},
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
			if (program && currentCompetence) {
				dispatch(
					editCompetenceFromProgram({
						programId: program.id,
						competenceId: currentCompetence.id,
						competence: newData,
					})
				);
			}
		}
	};

	const shouldBlockSubmit = (
		values: IEditCompetenceValues,
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
		<Form name='form-edit-competence' onSubmit={handleSubmit}>
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
					text='Сохранить'
					width='full'
					isBlock={isBlockSubmit}></Button>
			</FormButtons>
		</Form>
	);
};
