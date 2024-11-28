import type { FC } from 'react';
import type { IProgramNsi, IAddProgramNsi } from '../../../store/catalog/types';

import { useState } from 'react';
import { useDispatch, useSelector } from '../../../store/store';

import {
	addNsiToList,
	editNsiFromList,
	removeNsiFromList,
} from '../../../store/catalog/actions';
import { setProductNsiList } from '../../../store/product/actions';
import { updateProductFromList } from '../../../store/product/reducer';

import {
	Level,
	LevelList,
	LevelCard,
	LevelEmpty,
} from '../../../shared/components/Level';
import { Modal } from '../../../shared/components/Modal/ui/modal';
import { AddNsiForm } from './add-nsi-form';
import { EditNsiForm } from './edit-nsi-form';
import { ConfirmDelete } from '../../../features/ConfirmDelete/ui/confirm-delete';

export const ProgramNsiLevel: FC = () => {
	const dispatch = useDispatch();
	const { program } = useSelector((state) => state.programDetail);
	const { currentProduct } = useSelector((state) => state.product);
	const { programNsi } = useSelector((state) => state.catalog);
	const [isOpenAddNsiModal, setIsOpenAddNsiModal] = useState<boolean>(false);
	const [isOpenEditNsiModal, setIsOpenEditNsiModal] = useState<boolean>(false);
	const [isOpenRemoveNsiModal, setIsOpenRemoveNsiModal] =
		useState<boolean>(false);
	const [currentNsi, setCurrentNsi] = useState<IProgramNsi | null>(null);

	const productNsis = currentProduct?.nsis
		.map((id) => programNsi.find((nsi) => nsi.id === id))
		.filter(Boolean);

	const openAddNsiModal = () => {
		setIsOpenAddNsiModal(true);
	};

	const handleAddNsi = async (nsi: IAddProgramNsi) => {
		if (!program || !currentProduct) return;

		const nsiProgram = { programId: program.id, nsi };

		try {
			const addedNsi = await dispatch(addNsiToList(nsiProgram)).unwrap();

			if (!addedNsi?.id) {
				console.error('Failed to retrieve ID of the newly added NSI');
				return;
			}
			const newNsi = [...currentProduct.nsis, addedNsi.id];
			await dispatch(
				setProductNsiList({ productId: currentProduct.id, nsis: newNsi })
			);
			const updatedProduct = { ...currentProduct, nsis: newNsi };
			await dispatch(updateProductFromList(updatedProduct));
			handleCloseModal();
		} catch (error) {
			console.error('Error:', error);
		}
	};

	const handleEditNsi = async (nsi: IProgramNsi) => {
		if (!program || !currentProduct) return;

		const nsiProgram = { programId: program.id, nsi };

		try {
			await dispatch(editNsiFromList(nsiProgram));

			const newNsi = currentProduct.nsis.map((elem) =>
				elem === nsi.id ? nsi.id : elem
			);
			await dispatch(
				setProductNsiList({ productId: currentProduct.id, nsis: newNsi })
			);
			const updatedProduct = { ...currentProduct, nsis: newNsi };
			await dispatch(updateProductFromList(updatedProduct));
			handleCloseModal();
		} catch (error) {
			console.error('Error:', error);
		}
	};

	const handleRemoveNsi = async (id: number) => {
		if (!program || !currentProduct) return;

		const nsiProgram = { programId: program.id, nsiId: id };

		try {
			await dispatch(removeNsiFromList(nsiProgram));
			const newNsi = currentProduct.nsis.filter((elem) => elem !== id);
			await dispatch(
				setProductNsiList({ productId: currentProduct.id, nsis: newNsi })
			);
			const updatedProduct = { ...currentProduct, nsis: newNsi };
			await dispatch(updateProductFromList(updatedProduct));
			handleCloseModal();
		} catch (error) {
			console.error('Error:', error);
		}
	};

	const openEditNsiModal = (nsi: IProgramNsi) => {
		setCurrentNsi(nsi);
		setIsOpenEditNsiModal(true);
	};

	const openRemoveNsiModal = (nsi: IProgramNsi) => {
		setCurrentNsi(nsi);
		setIsOpenRemoveNsiModal(true);
	};

	const handleCloseModal = () => {
		setIsOpenAddNsiModal(false);
		setIsOpenEditNsiModal(false);
		setIsOpenRemoveNsiModal(false);
	};

	return (
		<Level
			title='Нормативно-справочная информация'
			count={productNsis?.length || 0}
			icons={currentProduct ? [{ icon: 'add', onClick: openAddNsiModal }] : []}>
			{productNsis && productNsis.length > 0 ? (
				<LevelList>
					{productNsis.map((elem, i) =>
						elem ? (
							<LevelCard
								name={elem.nsiFullName || ''}
								id={elem.id}
								key={elem.id}
								badges={[{ text: `${i + 1}` }]}
								icons={[
									{ icon: 'edit', onClick: () => openEditNsiModal(elem) },
									{ icon: 'delete', onClick: () => openRemoveNsiModal(elem) },
								]}
							/>
						) : (
							<LevelCard name='Элемент не найден' id={i} key={i} />
						)
					)}
				</LevelList>
			) : (
				<LevelEmpty
					text={currentProduct ? 'Список пуст' : 'Выберите продукт'}
				/>
			)}
			{isOpenAddNsiModal && (
				<Modal
					isOpen={isOpenAddNsiModal}
					onClose={handleCloseModal}
					title='Создание НСИ'>
					<AddNsiForm onSubmit={handleAddNsi} />
				</Modal>
			)}
			{isOpenEditNsiModal && currentNsi && (
				<Modal
					isOpen={isOpenEditNsiModal}
					onClose={handleCloseModal}
					title='Редактирование НСИ'>
					<EditNsiForm currentNsi={currentNsi} onSubmit={handleEditNsi} />
				</Modal>
			)}
			{isOpenRemoveNsiModal && currentNsi && (
				<ConfirmDelete
					isOpen={isOpenRemoveNsiModal}
					onClose={handleCloseModal}
					id={currentNsi.id}
					onSubmit={handleRemoveNsi}
				/>
			)}
		</Level>
	);
};
