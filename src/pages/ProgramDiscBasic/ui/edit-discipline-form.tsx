import type { FC, FormEvent } from 'react';
import type { IEditDisciplineValues } from '../types/types';
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

import { editDisciplineFromProgram } from '../../../store/discBasic/actions';

export const EditDisciplineForm: FC = () => {
	const dispatch = useDispatch();
	const { program } = useSelector((state) => state.programDetail);
	const { currentCompetence, currentDiscipline } = useSelector(
		(state) => state.discBasic
	);

	const [isBlockSubmit, setIsBlockSubmit] = useState<boolean>(true);
	const { values, handleChange, errors } = useForm<IEditDisciplineValues>(
		{
			name: currentDiscipline?.name || '',
			area: currentDiscipline?.area || '',
			description: currentDiscipline?.description || '',
		},
		validationSchema
	);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!isBlockSubmit) {
			if (program && currentCompetence && currentDiscipline) {
				const newData = {
					name: values.name,
					area: values.area,
					description: values.description,
					competence: currentCompetence.id,
					type: 'Общепрофессиональные',
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
		<Form name='form-edit-discipline' onSubmit={handleSubmit}>
			<FormField
				title='Наименование дисциплины:'
				fieldError={{
					text: errors.name || '',
					isShow: !!errors.name,
				}}>
				<FormInput name='name' value={values.name} onChange={handleChange} />
			</FormField>
			<FormField
				title='Предметные области:'
				fieldError={{
					text: errors.area || '',
					isShow: !!errors.area,
				}}>
				<FormInput name='area' value={values.area} onChange={handleChange} />
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
