import type { FC } from 'react';
import type { IDisciplineSpec } from '../../../store/discSpec/types';

import { useCallback } from 'react';
import { useDispatch, useSelector } from '../../../store/store';

import {
	setCurrentDiscipline,
	setIsShowLevel,
	setIsShowModal,
} from '../../../store/discSpec/reducer';

import { removeDisciplineFromProgram } from '../../../store/discSpec/actions';

import {
	Level,
	LevelList,
	LevelCard,
	LevelEmpty,
} from '../../../shared/components/Level';
import { Modal } from '../../../shared/components/Modal/ui/modal';
import { ConfirmDelete } from '../../../features/ConfirmDelete/ui/confirm-delete';
import { EditDisciplineForm } from './edit-discipline-form';

export const ProgramDisciplineLevel: FC = () => {
	const dispatch = useDispatch();

	const { program } = useSelector((state) => state.programDetail);
	const { disciplines, currentDiscipline, isShowLevel, isShowModal } =
		useSelector((state) => state.discSpec);

	const showLevel = useCallback(() => {
		dispatch(
			setIsShowLevel({
				...isShowLevel,
				discipline: true,
			})
		);
	}, [dispatch, isShowLevel]);

	const hideLevel = useCallback(() => {
		dispatch(setIsShowLevel({ ...isShowLevel, discipline: false }));
	}, [dispatch, isShowLevel]);

	const openEditDisciplineModal = (discipline: IDisciplineSpec) => {
		dispatch(setCurrentDiscipline(discipline));
		dispatch(setIsShowModal({ modal: 'editDiscipline', isShow: true }));
	};

	const openRemoveDisciplineModal = (discipline: IDisciplineSpec) => {
		dispatch(setCurrentDiscipline(discipline));
		dispatch(setIsShowModal({ modal: 'removeDiscipline', isShow: true }));
	};

	const closeModal = () => {
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
			isShow={isShowLevel.discipline}
			onShow={showLevel}
			title='Профессиональные дисциплины'
			count={disciplines ? disciplines.length : 0}
			icons={[{ icon: 'close', onClick: hideLevel }]}>
			{disciplines && disciplines.length > 0 ? (
				<LevelList>
					{disciplines.map((elem: IDisciplineSpec, i: number) => (
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
					))}
				</LevelList>
			) : (
				<LevelEmpty text='Отсутствуют дисциплины программы' />
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
