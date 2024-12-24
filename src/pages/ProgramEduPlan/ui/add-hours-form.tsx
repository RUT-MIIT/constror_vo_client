import type { FC, FormEvent } from 'react';
import type { IDisciplineForm } from '../../../store/catalog/types';
import type { ISemesterDisc } from '../../../store/educationPlan/types';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from '../../../store/store';

import { disciplineForms } from '../../../store/catalog/mock';

import {
	addHoursToDiscipline,
	removeHoursFromDiscipline,
} from '../../../store/educationPlan/actions';

import { Form } from '../../../shared/components/Form/ui/form';
import {
	FormField,
	FormInputNumber,
	FormButtons,
} from '../../../shared/components/Form/components';
import { Select } from '../../../shared/components/Select/ui/select';
import { Button } from '../../../shared/components/Button/ui/button';

interface IError {
	text: string;
	isShow: boolean;
}

const initialData = {
	form: {
		id: 0,
		name: 'Выберите из списка..',
	},
};

export const AddHoursForm: FC = () => {
	const dispatch = useDispatch();

	const { currentDiscipline, currentSemesterId } = useSelector(
		(state) => state.eduPlan
	);

	const currentItem: ISemesterDisc | null =
		currentDiscipline?.semesters.find(
			(elem) => elem.semester === currentSemesterId
		) || null;

	const [currentForm, setCurrentForm] = useState<IDisciplineForm>(
		currentItem
			? disciplineForms.find((item) => item.name === currentItem.control) ||
					initialData.form
			: initialData.form
	);

	const [hours, setHours] = useState<number | null>(currentItem?.zet || null);

	const [hoursError, setHoursError] = useState<IError>({
		text: '',
		isShow: false,
	});
	const [isBlockSubmitButton, setIsBlockSubmitButton] =
		useState<boolean>(false);

	const handleChangeHours = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = Number(e.target.value);

		if (value === 0 || (value > 1 && value <= 36)) {
			setHoursError({ text: '', isShow: false });
			setIsBlockSubmitButton(false);
		} else {
			setHoursError({
				text: 'Число должно быть равно 0 или в диапазоне от 2 до 36',
				isShow: true,
			});
			setIsBlockSubmitButton(true);
		}

		setHours(value);
	};

	const handleChangeForm = (option: IDisciplineForm) => {
		setCurrentForm(option);
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (currentDiscipline && currentSemesterId) {
			const data = {
				disciplineId: currentDiscipline.id,
				semester: {
					semester: currentSemesterId,
					zet: hours ? hours : null,
					control: currentForm.id === 0 ? '' : currentForm.name,
				},
			};
			dispatch(addHoursToDiscipline(data));
		}
	};

	const handleRemoveHours = () => {
		if (currentDiscipline && currentSemesterId) {
			const data = {
				disciplineId: currentDiscipline.id,
				semester: currentSemesterId,
			};
			dispatch(removeHoursFromDiscipline(data));
		}
	};

	useEffect(() => {
		setIsBlockSubmitButton(false);
	}, []);

	return (
		<Form name='form-add-hours' onSubmit={handleSubmit}>
			<FormField
				title='Количество ЗЕТ:'
				fieldError={{
					text: hoursError.text,
					isShow: hoursError.isShow,
				}}>
				<FormInputNumber
					name='hours'
					value={hours}
					onChange={handleChangeHours}
					placeholder='Введите число ЗЕТ'
				/>
			</FormField>
			<FormField title='Форма контроля:'>
				<Select
					currentOption={currentForm}
					options={disciplineForms}
					onChooseOption={handleChangeForm}
				/>
			</FormField>
			<FormButtons>
				<Button
					type='button'
					text='Открепить'
					width='full'
					style='delete'
					onClick={handleRemoveHours}
				/>
				<Button
					type='submit'
					text='Сохранить'
					width='full'
					isBlock={isBlockSubmitButton}
				/>
			</FormButtons>
		</Form>
	);
};
