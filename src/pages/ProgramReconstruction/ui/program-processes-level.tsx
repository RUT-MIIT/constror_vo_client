import type { FC } from 'react';
import type { IReconstructionProcess } from '../../../store/reconstruction/types';

import { useDispatch, useSelector } from '../../../store/store';

import {
	setCurrentProcess,
	setIsShowModal,
	setIsShowLevel,
} from '../../../store/reconstruction/reducer';

import { removeProcessFromStage } from '../../../store/reconstruction/actions';

import {
	Level,
	LevelList,
	LevelCard,
	LevelEmpty,
} from '../../../shared/components/Level';
import { Modal } from '../../../shared/components/Modal/ui/modal';
import { ConfirmDelete } from '../../../features/ConfirmDelete/ui/confirm-delete';
import { AddProcessForm } from './add-process-form';
import { EditProcessForm } from './edit-process-form';

export const ProgramProcessesLevel: FC = () => {
	const dispatch = useDispatch();

	const { currentStage, currentProcess, isShowModal, isShowLevel } =
		useSelector((state) => state.reconstruction);

	const openAddProcessModal = () => {
		dispatch(setIsShowModal({ modal: 'addProcess', isShow: true }));
	};

	const openEditProcessModal = (process: IReconstructionProcess) => {
		dispatch(setCurrentProcess(process));
		dispatch(setIsShowModal({ modal: 'editProcess', isShow: true }));
	};

	const openRemoveProcessModal = (process: IReconstructionProcess) => {
		dispatch(setCurrentProcess(process));
		dispatch(setIsShowModal({ modal: 'removeProcess', isShow: true }));
	};

	const closeModal = () => {
		dispatch(setIsShowModal({ modal: 'addProcess', isShow: false }));
		dispatch(setIsShowModal({ modal: 'editProcess', isShow: false }));
		dispatch(setIsShowModal({ modal: 'removeProcess', isShow: false }));
	};

	const handleRemove = (id: number) => {
		if (currentStage) {
			const newData = {
				stageId: currentStage.id,
				processId: id,
			};
			dispatch(removeProcessFromStage(newData));
		}
	};

	const showLevel = () => {
		dispatch(setIsShowLevel({ product: false, stage: true, process: true }));
	};

	const hideLevel = () => {
		dispatch(setIsShowLevel({ ...isShowLevel, process: false }));
	};
	return (
		<Level
			isShow={isShowLevel.process}
			onShow={showLevel}
			title='Процессы'
			count={currentStage ? currentStage.processes.length : 0}
			icons={
				currentStage
					? [
							{ icon: 'add', onClick: openAddProcessModal },
							{ icon: 'close', onClick: hideLevel },
					  ]
					: [{ icon: 'close', onClick: hideLevel }]
			}>
			{currentStage && currentStage.processes.length > 0 ? (
				<LevelList>
					{currentStage.processes.map((elem, i) => (
						<LevelCard
							name={elem.name}
							id={elem.id}
							key={elem.id}
							badges={[{ text: `Этап ${i + 1}` }]}
							icons={[
								{ icon: 'edit', onClick: () => openEditProcessModal(elem) },
								{ icon: 'delete', onClick: () => openRemoveProcessModal(elem) },
							]}
						/>
					))}
				</LevelList>
			) : (
				<LevelEmpty text='Отсутствуют процессы этапа' />
			)}
			{isShowModal.addProcess && (
				<Modal
					title='Создание процесса'
					isOpen={isShowModal.addProcess}
					onClose={closeModal}>
					<AddProcessForm />
				</Modal>
			)}
			{isShowModal.editProcess && (
				<Modal
					title='Редактирование процесса'
					isOpen={isShowModal.editProcess}
					onClose={closeModal}>
					<EditProcessForm />
				</Modal>
			)}
			{isShowModal.removeProcess && currentProcess && (
				<ConfirmDelete
					isOpen={isShowModal.removeProcess}
					onClose={closeModal}
					id={currentProcess.id}
					onSubmit={handleRemove}
				/>
			)}
		</Level>
	);
};
