import type { FC, FormEvent } from 'react';
import type { IAddDisciplineValues } from '../types/types.ts';
import type { TFormValidationErrors } from '../../../shared/components/Form/types/types';
import { ELevel, type IDisciplineSpec } from '../../../store/discSpec/types';

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

import {
	addDisciplineToProgram,
	syncProductsWithDiscipline,
	syncStagesWithDiscipline,
	syncProcessesWithDiscipline,
} from '../../../store/discSpec/actions';

export const AddDisciplineForm: FC = () => {
	const dispatch = useDispatch();
	const { program } = useSelector((state) => state.programDetail);
	const { activity } = useSelector((state) => state.discSpec);

	const [isBlockSubmit, setIsBlockSubmit] = useState<boolean>(true);
	const { values, handleChange, errors } = useForm<IAddDisciplineValues>(
		{ name: '', description: '', task: '' },
		validationSchema
	);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!isBlockSubmit) {
			if (program && activity) {
				const newData = {
					name: values.name,
					description: values.description,
					task: values.task,
					type: 'Профессиональные',
				};

				try {
					const resultAction = await dispatch(
						addDisciplineToProgram({
							programId: program.id,
							discipline: newData,
						})
					);

					const createdDiscipline = resultAction.payload as IDisciplineSpec;

					if (createdDiscipline && createdDiscipline.id) {
						if (activity.level === ELevel.PRODUCT) {
							await dispatch(
								syncProductsWithDiscipline({
									disciplineId: createdDiscipline.id,
									products: activity.items.map((elem) => elem.id) || [],
								})
							);
						} else if (activity.level === ELevel.STAGE) {
							await dispatch(
								syncStagesWithDiscipline({
									disciplineId: createdDiscipline.id,
									stages: activity.items.map((elem) => elem.id) || [],
								})
							);
						} else {
							await dispatch(
								syncProcessesWithDiscipline({
									disciplineId: createdDiscipline.id,
									processes: activity.items.map((elem) => elem.id) || [],
								})
							);
						}
					}
				} catch (error) {
					console.error(
						'Ошибка при создании дисциплины или синхронизации:',
						error
					);
				}
			}
		}
	};

	const shouldBlockSubmit = (
		values: IAddDisciplineValues,
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
					text='Создать'
					width='full'
					isBlock={isBlockSubmit}></Button>
			</FormButtons>
		</Form>
	);
};
