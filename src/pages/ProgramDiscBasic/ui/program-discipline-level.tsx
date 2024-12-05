import type { FC } from 'react';
import type { IDisciplineBasic } from '../../../store/discBasic/types';

import { useDispatch, useSelector } from '../../../store/store';

import {
	setCurrentDiscipline,
	setIsShowModal,
} from '../../../store/discBasic/reducer';

import { removeDisciplineFromProgram } from '../../../store/discBasic/actions';

import {
	Level,
	LevelList,
	LevelCard,
	LevelEmpty,
} from '../../../shared/components/Level';
import { Modal } from '../../../shared/components/Modal/ui/modal';
import { AddDisciplineForm } from './add-discipline-form';
import { EditDisciplineForm } from './edit-discipline-form';
import { ConfirmDelete } from '../../../features/ConfirmDelete/ui/confirm-delete';

export const ProgramDisciplineLevel: FC = () => {
	const dispatch = useDispatch();

	const { program } = useSelector((state) => state.programDetail);
	const { currentCompetence, currentDiscipline, isShowModal } = useSelector(
		(state) => state.discBasic
	);

	const openAddDisciplineModal = () => {
		dispatch(setIsShowModal({ modal: 'addDiscipline', isShow: true }));
	};

	const openEditDisciplineModal = (stage: IDisciplineBasic) => {
		dispatch(setCurrentDiscipline(stage));
		dispatch(setIsShowModal({ modal: 'editDiscipline', isShow: true }));
	};

	const openRemoveDisciplineModal = (stage: IDisciplineBasic) => {
		dispatch(setCurrentDiscipline(stage));
		dispatch(setIsShowModal({ modal: 'removeDiscipline', isShow: true }));
	};

	const closeModal = () => {
		dispatch(setIsShowModal({ modal: 'addDiscipline', isShow: false }));
		dispatch(setIsShowModal({ modal: 'editDiscipline', isShow: false }));
		dispatch(setIsShowModal({ modal: 'removeDiscipline', isShow: false }));
	};

	const handleRemove = (id: number) => {
		if (program) {
			const newData = {
				programId: program.id,
				disciplineId: id,
			};
			dispatch(removeDisciplineFromProgram(newData));
		}
	};

	return (
		<Level
			title='Общепрофессиональные дисциплины'
			count={currentCompetence ? currentCompetence.disciplines.length : 0}
			icons={
				currentCompetence
					? [{ icon: 'add', onClick: openAddDisciplineModal }]
					: []
			}>
			{currentCompetence && currentCompetence.disciplines.length > 0 ? (
				<LevelList>
					{currentCompetence.disciplines.map(
						(elem: IDisciplineBasic, i: number) => (
							<LevelCard
								name={elem.name}
								id={elem.id}
								key={elem.id}
								badges={[{ text: `Дисциплина ${i + 1}` }]}
								icons={[
									{
										icon: 'edit',
										onClick: () => openEditDisciplineModal(elem),
									},
									{
										icon: 'delete',
										onClick: () => openRemoveDisciplineModal(elem),
									},
								]}
							/>
						)
					)}
				</LevelList>
			) : (
				<LevelEmpty text='Отсутствуют дисциплины компетенции' />
			)}
			{isShowModal.addDiscipline && (
				<Modal
					title='Создание дисциплины'
					isOpen={isShowModal.addDiscipline}
					onClose={closeModal}>
					<AddDisciplineForm />
				</Modal>
			)}
			{isShowModal.editDiscipline && (
				<Modal
					title='Редактирование дисциплины'
					isOpen={isShowModal.editDiscipline}
					onClose={closeModal}>
					<EditDisciplineForm />
				</Modal>
			)}
			{isShowModal.removeDiscipline && currentDiscipline && (
				<ConfirmDelete
					isOpen={isShowModal.removeDiscipline}
					onClose={closeModal}
					id={currentDiscipline.id}
					onSubmit={handleRemove}
				/>
			)}
		</Level>
	);
};
