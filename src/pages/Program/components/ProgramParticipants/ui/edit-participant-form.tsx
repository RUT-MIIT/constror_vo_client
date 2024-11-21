import type { FC, FormEvent } from 'react';
import type { IProgramRole } from '../../../../../store/catalog/types';

import { useState } from 'react';
import { useDispatch, useSelector } from '../../../../../store/store';

import { Form } from '../../../../../shared/components/Form/ui/form';
import {
	FormField,
	FormButtons,
} from '../../../../../shared/components/Form/components';
import { Select } from '../../../../../shared/components/Select/ui/select';
import { Button } from '../../../../../shared/components/Button/ui/button';
import { Field } from '../../../../../shared/components/Field/ui/field';

import { editParticipantFromList } from '../../../../../store/programDetail/actions';

const initialData = {
	role: {
		id: 0,
		name: 'Выберите из списка..',
	},
};

export const EditParticipantForm: FC = () => {
	const dispatch = useDispatch();

	const { program, currentParticipant } = useSelector(
		(state) => state.programDetail
	);
	const { programRoles } = useSelector((state) => state.catalog);

	const [currentRole, setCurrentRole] = useState<IProgramRole>(
		currentParticipant?.role || initialData.role
	);

	const [isBlockSubmit, setIsBlockSubmit] = useState<boolean>(true);

	const handleChangeRole = (option: IProgramRole) => {
		setCurrentRole(option);
		setIsBlockSubmit(false);
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!isBlockSubmit) {
			if (currentParticipant && program) {
				const newParticipant = {
					user_id: currentParticipant.user.id,
					role_id: currentRole.id,
				};
				dispatch(
					editParticipantFromList({
						participant: newParticipant,
						programId: program.id,
					})
				);
			}
		}
	};

	return (
		<Form name='form-add-participant' onSubmit={handleSubmit}>
			<FormField title='Пользователь:'>
				<Field text={currentParticipant?.user.name || ''} />
			</FormField>
			<FormField title='Роль в программе:'>
				<Select
					currentOption={currentRole}
					options={programRoles}
					onChooseOption={handleChangeRole}
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
