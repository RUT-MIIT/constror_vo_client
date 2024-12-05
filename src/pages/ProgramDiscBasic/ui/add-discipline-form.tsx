import type { FC, FormEvent } from 'react';
import type { IAddDisciplineValues } from '../types/types';
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

import { addDisciplineToProgram } from '../../../store/discBasic/actions';

export const AddDisciplineForm: FC = () => {
	const dispatch = useDispatch();
	const { program } = useSelector((state) => state.programDetail);
	const { currentCompetence } = useSelector((state) => state.discBasic);

	const [isBlockSubmit, setIsBlockSubmit] = useState<boolean>(true);
	const { values, handleChange, errors } = useForm<IAddDisciplineValues>(
		{ name: '', area: '', description: '' },
		validationSchema
	);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!isBlockSubmit) {
			if (program && currentCompetence) {
				const newData = {
					name: values.name,
					area: values.area,
					description: values.description,
					competence: currentCompetence.id,
					type: 'Общепрофессиональные',
				};
				dispatch(
					addDisciplineToProgram({ programId: program.id, discipline: newData })
				);
			}
		}
	};

	const shouldBlockSubmit = (
		values: IAddDisciplineValues,
		errors: TFormValidationErrors
	): boolean => {
		return (
			!values.name.trim() ||
			!!errors.name ||
			!values.area.trim() ||
			!!errors.area
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
		<Form name='form-add-discipline' onSubmit={handleSubmit}>
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
				title='Предметные области:'
				fieldError={{
					text: errors.area || '',
					isShow: !!errors.area,
				}}>
				<FormInput
					name='area'
					value={values.area}
					onChange={handleChange}
					placeholder='Введите предметные области дисциплины через запятую'
				/>
			</FormField>
			<FormField
				title='Содержание дисциплины:'
				fieldError={{
					text: errors.description || '',
					isShow: !!errors.description,
				}}>
				<FormTextarea
					name='description'
					value={values.description}
					onChange={handleChange}
					placeholder='Введите содержание общеобразовательной дисциплины'
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
