import type { FC, FormEvent } from 'react';
import type { IAddProgramFormProps, IAddProgramValues } from '../types/types';
import type {
	IEducationDirection,
	IEducationForm,
} from '../../../store/catalog/types';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from '../../../store/store';
import { useForm } from '../../../hooks/useForm';

import { Form } from '../../../shared/components/Form/ui/form';
import {
	FormField,
	FormInput,
	FormButtons,
} from '../../../shared/components/Form/components';
import { Select } from '../../../shared/components/Select/ui/select';
import { Button } from '../../../shared/components/Button/ui/button';
import { Link } from '../../../shared/components/Link/ui/link';

import { validationSchema } from '../lib/helpers';
import { API_URL } from '../../../shared/config';

import { editProgramFromList } from '../../../store/programList/actions';
import { educationForms } from '../../../store/catalog/mock';

const initialData = {
	direction: {
		id: 0,
		name: 'Выберите из списка..',
		code: '',
		level: '',
	},
	form: {
		id: 0,
		name: 'Выберите из списка..',
	},
};

export const EditProgramForm: FC<IAddProgramFormProps> = ({ directions }) => {
	const dispatch = useDispatch();
	const { currentProgram } = useSelector((state) => state.programList);

	const [currentDirection, setCurrentDirection] = useState<IEducationDirection>(
		currentProgram ? currentProgram.direction : initialData.direction
	);
	const [currentForm, setCurrentForm] = useState<IEducationForm>(
		currentProgram
			? educationForms.find((elem) => elem.name === currentProgram.form) ||
					initialData.form
			: initialData.form
	);

	const [isBlockSubmit, setIsBlockSubmit] = useState<boolean>(true);
	const { values, handleChange, errors } = useForm<IAddProgramValues>(
		{ profile: currentProgram ? currentProgram.profile : '' },
		validationSchema
	);

	const handleChangeDirection = (option: IEducationDirection) => {
		setCurrentDirection(option);
	};

	const handleChangeForm = (option: IEducationForm) => {
		setCurrentForm(option);
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!isBlockSubmit) {
			const newProgram = {
				direction: currentDirection,
				profile: values.profile,
				form: currentForm.name,
			};
			if (currentProgram) {
				dispatch(
					editProgramFromList({ program: newProgram, id: currentProgram?.id })
				);
			}
		}
	};

	const shouldBlockSubmit = (values: IAddProgramValues): boolean => {
		return (
			!values.profile.trim() ||
			currentDirection.id === 0 ||
			currentForm.id === 0
		);
	};

	useEffect(() => {
		setIsBlockSubmit(shouldBlockSubmit(values));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [values, currentDirection, currentForm]);

	return (
		<Form name='form-edit-program' onSubmit={handleSubmit}>
			{/*
				<Link
					text='Инструкция по разработке программы'
					path={`${API_URL}/help/pdf_1`}
				/>
			*/}

			<FormField title='Направление:'>
				<Select
					currentOption={currentDirection}
					options={directions}
					onChooseOption={handleChangeDirection}
				/>
			</FormField>
			<FormField title='Форма обучения:'>
				<Select
					currentOption={currentForm}
					options={educationForms}
					onChooseOption={handleChangeForm}
				/>
			</FormField>
			<FormField
				title='Профиль:'
				fieldError={{
					text: errors.profile || '',
					isShow: !!errors.profile,
				}}>
				<FormInput
					name='profile'
					value={values.profile}
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
