import type { FC, FormEvent } from 'react';
import type { IUser, IProgramRole } from '../../../../../store/catalog/types';

import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from '../../../../../store/store';

import { Form } from '../../../../../shared/components/Form/ui/form';
import {
	FormField,
	FormButtons,
} from '../../../../../shared/components/Form/components';
import { Select } from '../../../../../shared/components/Select/ui/select';
import { Button } from '../../../../../shared/components/Button/ui/button';

import { addParticipantToList } from '../../../../../store/programDetail/actions';

const initialData = {
	user: {
		id: 0,
		name: 'Выберите из списка..',
	},
	role: {
		id: 0,
		name: 'Выберите из списка..',
	},
};

export const AddParticipantForm: FC = () => {
	const dispatch = useDispatch();

	const { program } = useSelector((state) => state.programDetail);
	const { users, programRoles } = useSelector((state) => state.catalog);

	const [currentUser, setCurrentUser] = useState<IUser>(initialData.user);
	const [currentRole, setCurrentRole] = useState<IProgramRole>(
		initialData.role
	);

	const availableUsers = useMemo(() => {
		const participantIds = program?.participants.map((p) => p.user.id) || [];
		return users.filter((user) => !participantIds.includes(user.id));
	}, [users, program]);

	const [isBlockSubmit, setIsBlockSubmit] = useState<boolean>(true);

	const handleChangeUser = (option: IUser) => {
		setCurrentUser(option);
	};

	const handleChangeRole = (option: IProgramRole) => {
		setCurrentRole(option);
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!isBlockSubmit) {
			const newParticipant = {
				user_id: currentUser.id,
				role_id: currentRole.id,
			};
			if (program) {
				dispatch(
					addParticipantToList({
						participant: newParticipant,
						programId: program.id,
					})
				);
			}
		}
	};

	const shouldBlockSubmit = (): boolean => {
		return currentUser.id === 0 || currentRole.id === 0;
	};

	useEffect(() => {
		setIsBlockSubmit(shouldBlockSubmit());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentUser, currentRole]);

	useEffect(() => {
		setCurrentUser(initialData.user);
		setCurrentRole(initialData.role);
		setIsBlockSubmit(true);
	}, []);

	return (
		<Form name='form-add-participant' onSubmit={handleSubmit}>
			<FormField title='Пользователь:'>
				<Select
					currentOption={currentUser}
					options={availableUsers}
					onChooseOption={handleChangeUser}
				/>
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
					text='Добавить'
					width='full'
					isBlock={isBlockSubmit}></Button>
			</FormButtons>
		</Form>
	);
};
