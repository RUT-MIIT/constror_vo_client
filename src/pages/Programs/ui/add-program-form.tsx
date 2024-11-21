import type { FC, FormEvent } from 'react';
import type { IAddProgramFormProps, IAddProgramValues } from '../types/types';
import type {
	IEducationDirection,
	IEducationForm,
} from '../../../store/catalog/types';
import type { IUploadFile } from '../../../shared/components/UploadField/ui/upload-field';

import { useState, useEffect } from 'react';
import { useDispatch } from '../../../store/store';
import { useForm } from '../../../hooks/useForm';

import { Form } from '../../../shared/components/Form/ui/form';
import {
	FormField,
	FormInput,
	FormButtons,
} from '../../../shared/components/Form/components';
import { Select } from '../../../shared/components/Select/ui/select';
import { UploadField } from '../../../shared/components/UploadField/ui/upload-field';
import { Button } from '../../../shared/components/Button/ui/button';

import { validationSchema } from '../lib/helpers';

import { addProgramToList } from '../../../store/programList/actions';
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

export const AddProgramForm: FC<IAddProgramFormProps> = ({ directions }) => {
	const dispatch = useDispatch();

	const [currentDirection, setCurrentDirection] = useState<IEducationDirection>(
		initialData.direction
	);
	const [currentForm, setCurrentForm] = useState<IEducationForm>(
		initialData.form
	);
	const [currentFile, setCurrentFile] = useState<IUploadFile | null>(null);

	const [isBlockSubmit, setIsBlockSubmit] = useState<boolean>(true);
	const { values, handleChange, errors } = useForm<IAddProgramValues>(
		{ profile: '' },
		validationSchema
	);

	const handleChangeDirection = (option: IEducationDirection) => {
		setCurrentDirection(option);
	};

	const handleChangeForm = (option: IEducationForm) => {
		setCurrentForm(option);
	};

	const handleChangeFile = (file: IUploadFile) => {
		setCurrentFile(file);
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!isBlockSubmit) {
			const newProgram = {
				direction: currentDirection,
				profile: values.profile,
				form: currentForm.name,
				...(currentFile && {
					fgos_file: {
						base64: currentFile.base64,
						filename: currentFile.name,
					},
				}),
			};
			dispatch(addProgramToList({ program: newProgram }));
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

	useEffect(() => {
		setCurrentDirection(initialData.direction);
		setCurrentForm(initialData.form);
		setIsBlockSubmit(true);
	}, []);

	return (
		<Form name='form-add-program' onSubmit={handleSubmit}>
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
			<FormField title='Образовательный стандарт:'>
				<UploadField file={currentFile} onChange={handleChangeFile} />
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
					text='Создать'
					width='full'
					isBlock={isBlockSubmit}></Button>
			</FormButtons>
		</Form>
	);
};
