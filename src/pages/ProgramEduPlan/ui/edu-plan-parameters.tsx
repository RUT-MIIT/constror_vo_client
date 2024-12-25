import type { FC, FormEvent } from 'react';
import type { IEduPlanParametersValues } from '../types/types';

import { useForm } from '../../../hooks/useForm';

import { Form } from '../../../shared/components/Form/ui/form';
import {
	FormField,
	FormInputNumber,
} from '../../../shared/components/Form/components';

export const EduPlanParameters: FC = () => {
	const { values, handleChange } = useForm<IEduPlanParametersValues>(
		{
			abpFirst: 17,
			abpSecond: 11,
			eduPractice: 3,
			prodPractice: 6,
			diplomaPractice: 12,
			diploma: 21,
		},
		{}
	);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	return (
		<Form name='form-edu-plan-parameters' onSubmit={handleSubmit}>
			<FormField title='АБП (1 семестр):'>
				<FormInputNumber
					name='abpFirst'
					value={values.abpFirst}
					onChange={handleChange}
					placeholder='Введите количесто ЗЕТ..'
				/>
			</FormField>
			<FormField title='АБП (2 семестр):'>
				<FormInputNumber
					name='abpSecond'
					value={values.abpSecond}
					onChange={handleChange}
					placeholder='Введите количесто ЗЕТ..'
				/>
			</FormField>
			<FormField title='Учебная практика (4 семестр):'>
				<FormInputNumber
					name='eduPractice'
					value={values.eduPractice}
					onChange={handleChange}
					placeholder='Введите количесто ЗЕТ..'
				/>
			</FormField>
			<FormField title='Производственная практика (6 семестр):'>
				<FormInputNumber
					name='prodPractice'
					value={values.prodPractice}
					onChange={handleChange}
					placeholder='Введите количесто ЗЕТ..'
				/>
			</FormField>
			<FormField title='Преддипломная практика (8 семестр):'>
				<FormInputNumber
					name='diplomaPractice'
					value={values.diplomaPractice}
					onChange={handleChange}
					placeholder='Введите количесто ЗЕТ..'
				/>
			</FormField>
			<FormField title='Выпускная квалификационная работа (8 семестр):'>
				<FormInputNumber
					name='diploma'
					value={values.diploma}
					onChange={handleChange}
					placeholder='Введите количесто ЗЕТ..'
				/>
			</FormField>
		</Form>
	);
};
