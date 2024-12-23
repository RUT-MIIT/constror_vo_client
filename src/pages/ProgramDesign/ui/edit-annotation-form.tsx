import type { FC, FormEvent } from 'react';
import type { ChangeEvent } from 'react';

import { useState } from 'react';
import { useDispatch, useSelector } from '../../../store/store';

import { Form } from '../../../shared/components/Form/ui/form';
import {
	FormButtons,
	FormTextarea,
} from '../../../shared/components/Form/components';
import { Button } from '../../../shared/components/Button/ui/button';

import { editProgramAnnotation } from '../../../store/programDetail/actions';

export const EditAnnotationForm: FC = () => {
	const dispatch = useDispatch();
	const { program } = useSelector((state) => state.programDetail);

	const [annotation, setAnnotation] = useState<string>(
		program?.annotation || ''
	);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (program) {
			const data = {
				annotation: annotation,
			};
			dispatch(editProgramAnnotation({ programId: program.id, program: data }));
		}
	};

	const handleChangeAnnotation = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setAnnotation(e.target.value);
	};

	return (
		<Form name='form-edit-annotation' onSubmit={handleSubmit}>
			<FormTextarea
				name='annotation'
				value={annotation}
				onChange={handleChangeAnnotation}
				placeholder='Введите аннотацию для программы..'
			/>
			<FormButtons>
				<Button type='submit' text='Сохранить'></Button>
			</FormButtons>
		</Form>
	);
};
