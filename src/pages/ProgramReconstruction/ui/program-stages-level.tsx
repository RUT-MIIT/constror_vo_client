import type { FC } from 'react';
import type { IReconstructionStage } from '../../../store/reconstruction/types';

import { useDispatch, useSelector } from '../../../store/store';

import {
	setCurrentStage,
	setCurrentProcess,
	setIsShowModal,
	setIsShowLevel,
} from '../../../store/reconstruction/reducer';

import { removeStageFromProduct } from '../../../store/reconstruction/actions';

import {
	Level,
	LevelList,
	LevelCard,
	LevelEmpty,
} from '../../../shared/components/Level';
import { Modal } from '../../../shared/components/Modal/ui/modal';
import { ConfirmDelete } from '../../../features/ConfirmDelete/ui/confirm-delete';
import { AddStageForm } from './add-stage-form';
import { EditStageForm } from './edit-stage-form';

export const ProgramStagesLevel: FC = () => {
	const dispatch = useDispatch();

	const { currentProduct, currentStage, isShowModal, isShowLevel } =
		useSelector((state) => state.reconstruction);

	const openStage = (item: IReconstructionStage) => {
		dispatch(setCurrentStage(item));
		dispatch(setCurrentProcess(null));
		dispatch(setIsShowLevel({ product: false, stage: true, process: true }));
	};

	const openAddStageModal = () => {
		dispatch(setIsShowModal({ modal: 'addStage', isShow: true }));
	};

	const openEditStageModal = (stage: IReconstructionStage) => {
		dispatch(setCurrentStage(stage));
		dispatch(setIsShowModal({ modal: 'editStage', isShow: true }));
	};

	const openRemoveStageModal = (stage: IReconstructionStage) => {
		dispatch(setCurrentStage(stage));
		dispatch(setIsShowModal({ modal: 'removeStage', isShow: true }));
	};

	const closeModal = () => {
		dispatch(setIsShowModal({ modal: 'addStage', isShow: false }));
		dispatch(setIsShowModal({ modal: 'editStage', isShow: false }));
		dispatch(setIsShowModal({ modal: 'removeStage', isShow: false }));
	};

	const handleRemove = (id: number) => {
		if (currentProduct) {
			const newData = {
				productId: currentProduct.id,
				stageId: id,
			};
			dispatch(removeStageFromProduct(newData));
		}
	};

	const showLevel = () => {
		dispatch(setIsShowLevel({ ...isShowLevel, stage: true }));
	};

	const hideLevel = () => {
		dispatch(setIsShowLevel({ ...isShowLevel, stage: false }));
	};

	return (
		<Level
			isShow={isShowLevel.stage}
			onShow={showLevel}
			title='Этапы'
			count={currentProduct ? currentProduct.stages.length : 0}
			icons={
				currentProduct
					? [
							{ icon: 'add', onClick: openAddStageModal },
							{ icon: 'close', onClick: hideLevel },
					  ]
					: [{ icon: 'close', onClick: hideLevel }]
			}>
			{currentProduct && currentProduct.stages.length > 0 ? (
				<LevelList>
					{currentProduct.stages.map((elem, i) => (
						<LevelCard
							name={elem.name}
							id={elem.id}
							key={elem.id}
							badges={[{ text: `Этап ${i + 1}` }]}
							isActive={true}
							isOpen={elem.id === currentStage?.id}
							onOpen={() => openStage(elem)}
							icons={[
								{ icon: 'edit', onClick: () => openEditStageModal(elem) },
								{ icon: 'delete', onClick: () => openRemoveStageModal(elem) },
							]}
						/>
					))}
				</LevelList>
			) : (
				<LevelEmpty text='Отсутствуют этапы продукта' />
			)}
			{isShowModal.addStage && (
				<Modal
					title='Создание этапа'
					isOpen={isShowModal.addStage}
					onClose={closeModal}>
					<AddStageForm />
				</Modal>
			)}
			{isShowModal.editStage && (
				<Modal
					title='Редактирование этапа'
					isOpen={isShowModal.editStage}
					onClose={closeModal}>
					<EditStageForm />
				</Modal>
			)}
			{isShowModal.removeStage && currentStage && (
				<ConfirmDelete
					isOpen={isShowModal.removeStage}
					onClose={closeModal}
					id={currentStage.id}
					onSubmit={handleRemove}
				/>
			)}
		</Level>
	);
};
