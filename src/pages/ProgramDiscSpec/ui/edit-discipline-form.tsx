import type { FC, FormEvent } from 'react';
import type { IEditDisciplineValues } from '../types/types.ts';
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

import { editDisciplineFromProgram } from '../../../store/discSpec/actions';

export const EditDisciplineForm: FC = () => {
	const dispatch = useDispatch();
	const { program } = useSelector((state) => state.programDetail);
	const { currentDiscipline } = useSelector((state) => state.discSpec);

	const [isBlockSubmit, setIsBlockSubmit] = useState<boolean>(true);
	const { values, handleChange, errors } = useForm<IEditDisciplineValues>(
		{
			name: currentDiscipline?.name || '',
			description: currentDiscipline?.description || '',
			task: currentDiscipline?.task || '',
		},
		validationSchema
	);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!isBlockSubmit) {
			if (program && currentDiscipline) {
				const newData = {
					name: values.name,
					description: values.description,
					task: values.task,
					type: 'Профессиональные',
				};

				dispatch(
					editDisciplineFromProgram({
						programId: program.id,
						disciplineId: currentDiscipline.id,
						discipline: newData,
					})
				);
			}
		}
	};

	const shouldBlockSubmit = (
		values: IEditDisciplineValues,
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
		<Form name='form-edit-discipline' onSubmit={handleSubmit}>
			<FormField
				title='Наименование дисциплины:'
				fieldError={{
					text: errors.name || '',
					isShow: !!errors.name,
				}}>
				<FormInput
					name='name'
					value={values.name}
					onChange={handleChange}
					placeholder='Введите наименование дисциплины'
				/>
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
					placeholder='Введите краткое описание дисциплины'
				/>
			</FormField>
			<FormField
				title='Практическое задание к дисциплине:'
				fieldError={{
					text: errors.description || '',
					isShow: !!errors.description,
				}}>
				<FormTextarea
					name='task'
					value={values.task}
					onChange={handleChange}
					placeholder='Введите практическое задание для дисциплины'
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
