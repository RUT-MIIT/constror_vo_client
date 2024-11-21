import type { FC } from 'react';
import type { IParticipant } from '../../../../../store/programList/types';

import { useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from '../../../../../store/store';
import {
	setCurrentParticipant,
	setIsAddParticipant,
	setIsEditParticipant,
	setIsRemoveParticipant,
} from '../../../../../store/programDetail/reducer';
import { removeParticipantFromList } from '../../../../../store/programDetail/actions';

import { Button } from '../../../../../shared/components/Button/ui/button';
import { Table } from '../../../../../shared/components/Table/ui/table';
import { Icon } from '../../../../../shared/components/Icon/ui/icon';
import { Modal } from '../../../../../shared/components/Modal/ui/modal';
import { AddParticipantForm } from './add-participant-form';
import { EditParticipantForm } from './edit-participant-form';
import { ConfirmDelete } from '../../../../../features/ConfirmDelete/ui/confirm-delete';

import styles from '../styles/program-participants.module.scss';

export const ProgramParticipants: FC = () => {
	const dispatch = useDispatch();
	const {
		program,
		currentParticipant,
		isAddParticipant,
		isEditParticipant,
		isRemoveParticipant,
	} = useSelector((state) => state.programDetail);

	const participantsList = useMemo(
		() => program?.participants || [],
		[program]
	);

	const openAddParticipantModal = () => {
		dispatch(setIsAddParticipant(true));
	};

	const openEditProgramModal = useCallback(
		(item: IParticipant) => {
			if (item) {
				dispatch(setCurrentParticipant(item));
				dispatch(setIsEditParticipant(true));
			}
		},
		[dispatch]
	);

	const openRemoveProgramModal = useCallback(
		(item: IParticipant) => {
			if (item) {
				dispatch(setCurrentParticipant(item));
				dispatch(setIsRemoveParticipant(true));
			}
		},
		[dispatch]
	);

	const handleClose = useCallback(() => {
		dispatch(setIsAddParticipant(false));
		dispatch(setIsEditParticipant(false));
		dispatch(setIsRemoveParticipant(false));
	}, [dispatch]);

	const handleRemoveParticipant = (participantId: number) => {
		if (program) {
			const data = { programId: program.id, participantId: participantId };
			dispatch(removeParticipantFromList(data));
		}
	};

	return (
		<div className={styles.container}>
			<Button text='Добавить участника' onClick={openAddParticipantModal} />
			<Table>
				<div className='table__header'>
					<div className='table__main-column'>
						<div className='table__column table__column_type_header table__column_type_count'>
							<p className='table__text table__text_type_header'>№</p>
						</div>
						<div className='table__column table__column_type_header table__column_type_full'>
							<p className='table__text table__text_type_header'>Имя</p>
						</div>
						<div className='table__column table__column_type_header table__column_type_large'>
							<p className='table__text table__text_type_header'>Роль</p>
						</div>
					</div>
					<div className='table__column table__column_type_header table__column_type_btn table__column_type_btn-header'>
						<div className='table__btn-stub'></div>
						<div className='table__btn-stub'></div>
					</div>
				</div>
				<ul className='table__main'>
					{participantsList.map((item, i) => (
						<li className='table__row' key={item.user.id}>
							<div className='table__main-column'>
								<div className='table__column table__column_type_count'>
									<p className='table__text'>{i + 1}</p>
								</div>
								<div className='table__column table__column_type_full'>
									<p className='table__text table__text_weight_bold'>
										{item.user.name}
									</p>
								</div>
								<div className='table__column table__column_type_large'>
									<p className='table__text'>{item.role.name}</p>
								</div>
							</div>
							<div className='table__column table__column_type_btn'>
								<Icon icon='edit' onClick={() => openEditProgramModal(item)} />
								<Icon
									icon='delete'
									onClick={() => openRemoveProgramModal(item)}
								/>
							</div>
						</li>
					))}
				</ul>
			</Table>
			{isAddParticipant && (
				<Modal
					title='Добавление участника'
					isOpen={isAddParticipant}
					onClose={handleClose}>
					<AddParticipantForm />
				</Modal>
			)}
			{isEditParticipant && (
				<Modal
					title='Изменение роли'
					isOpen={isEditParticipant}
					onClose={handleClose}>
					<EditParticipantForm />
				</Modal>
			)}
			{isRemoveParticipant && currentParticipant && (
				<ConfirmDelete
					isOpen={isRemoveParticipant}
					onClose={handleClose}
					onSubmit={handleRemoveParticipant}
					id={currentParticipant.user.id}
				/>
			)}
		</div>
	);
};
