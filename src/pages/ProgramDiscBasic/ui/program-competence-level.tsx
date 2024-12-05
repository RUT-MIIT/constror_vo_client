import type { FC } from 'react';
import type { ICompetence } from '../../../store/discBasic/types';

import { useDispatch, useSelector } from '../../../store/store';

import {
	setCurrentCompetence,
	setIsShowModal,
} from '../../../store/discBasic/reducer';

import { removeCompetenceFromProgram } from '../../../store/discBasic/actions';

import {
	Level,
	LevelList,
	LevelCard,
	LevelEmpty,
} from '../../../shared/components/Level';
import { Modal } from '../../../shared/components/Modal/ui/modal';
import { AddCompetenceForm } from './add-competence-form';
import { EditCompetenceForm } from './edit-competence-form';
import { ConfirmDelete } from '../../../features/ConfirmDelete/ui/confirm-delete';

export const ProgramCompetenceLevel: FC = () => {
	const dispatch = useDispatch();

	const { program } = useSelector((state) => state.programDetail);
	const { competences, currentCompetence, isShowModal } = useSelector(
		(state) => state.discBasic
	);

	const handleOpenCompetence = (item: ICompetence) => {
		dispatch(setCurrentCompetence(item));
	};

	const openAddCompetenceModal = () => {
		dispatch(setIsShowModal({ modal: 'addCompetence', isShow: true }));
	};

	const openEditCompetenceModal = (stage: ICompetence) => {
		dispatch(setCurrentCompetence(stage));
		dispatch(setIsShowModal({ modal: 'editCompetence', isShow: true }));
	};

	const openRemoveCompetenceModal = (stage: ICompetence) => {
		dispatch(setCurrentCompetence(stage));
		dispatch(setIsShowModal({ modal: 'removeCompetence', isShow: true }));
	};

	const closeModal = () => {
		dispatch(setIsShowModal({ modal: 'addCompetence', isShow: false }));
		dispatch(setIsShowModal({ modal: 'editCompetence', isShow: false }));
		dispatch(setIsShowModal({ modal: 'removeCompetence', isShow: false }));
	};

	const handleRemove = (id: number) => {
		if (program) {
			const newData = {
				programId: program.id,
				competenceId: id,
			};
			dispatch(removeCompetenceFromProgram(newData));
		}
	};

	return (
		<Level
			title='Общепрофессиональные компетенции'
			count={competences ? competences.length : 0}
			icons={[{ icon: 'add', onClick: openAddCompetenceModal }]}>
			{competences && competences.length > 0 ? (
				<LevelList>
					{competences.map((elem: ICompetence, i: number) => (
						<LevelCard
							name={elem.name}
							id={elem.id}
							key={elem.id}
							badges={[{ text: `Компетенция ${i + 1}` }]}
							isActive={true}
							isOpen={elem.id === currentCompetence?.id}
							onOpen={() => handleOpenCompetence(elem)}
							icons={[
								{ icon: 'edit', onClick: () => openEditCompetenceModal(elem) },
								{
									icon: 'delete',
									onClick: () => openRemoveCompetenceModal(elem),
								},
							]}
						/>
					))}
				</LevelList>
			) : (
				<LevelEmpty text='Отсутствуют компетенции программы' />
			)}
			{isShowModal.addCompetence && (
				<Modal
					title='Создание компетенции'
					isOpen={isShowModal.addCompetence}
					onClose={closeModal}>
					<AddCompetenceForm />
				</Modal>
			)}
			{isShowModal.editCompetence && (
				<Modal
					title='Редактирование компетенции'
					isOpen={isShowModal.editCompetence}
					onClose={closeModal}>
					<EditCompetenceForm />
				</Modal>
			)}
			{isShowModal.removeCompetence && currentCompetence && (
				<ConfirmDelete
					isOpen={isShowModal.removeCompetence}
					onClose={closeModal}
					id={currentCompetence.id}
					onSubmit={handleRemove}
				/>
			)}
		</Level>
	);
};
