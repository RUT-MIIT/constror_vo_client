import type { FC } from 'react';
import { IProduct, IRemoveProductRequest } from '../../../store/product/types';

import { useSelector, useDispatch } from '../../../store/store';

import { removeProductFromList } from '../../../store/product/actions';
import {
	setCurrentProduct,
	setIsAddProduct,
	setIsEditProduct,
	setIsRemoveProduct,
} from '../../../store/product/reducer';

import {
	Level,
	LevelList,
	LevelCard,
	LevelEmpty,
} from '../../../shared/components/Level';
import { Modal } from '../../../shared/components/Modal/ui/modal';
import { AddProductForm } from './add-product-form';
import { EditProductForm } from './edit-product-form';
import { ConfirmDelete } from '../../../features/ConfirmDelete/ui/confirm-delete';

export const ProgramProductsLevel: FC = () => {
	const dispatch = useDispatch();
	const { program } = useSelector((state) => state.programDetail);
	const {
		productList,
		currentProduct,
		isAddProduct,
		isEditProduct,
		isRemoveProduct,
	} = useSelector((state) => state.product);

	const handleOpenProduct = (item: IProduct) => {
		dispatch(setCurrentProduct(item));
	};

	const openAddProductModal = () => {
		dispatch(setIsAddProduct(true));
	};

	const openEditProductModal = (item: IProduct) => {
		if (!item) return;
		dispatch(setCurrentProduct(item));
		dispatch(setIsEditProduct(true));
	};

	const openRemoveProductModal = (item: IProduct) => {
		if (!item) return;
		dispatch(setCurrentProduct(item));
		dispatch(setIsRemoveProduct(true));
	};

	const handleClose = () => {
		dispatch(setIsAddProduct(false));
		dispatch(setIsEditProduct(false));
		dispatch(setIsRemoveProduct(false));
	};

	const handleRemoveProduct = (id: number) => {
		if (program) {
			const requestData: IRemoveProductRequest = {
				programId: program.id,
				productId: id,
			};
			dispatch(removeProductFromList(requestData));
		}
	};

	return (
		<Level
			title='Продукты программы'
			count={productList.length}
			icons={[{ icon: 'add', onClick: openAddProductModal }]}>
			{productList.length > 0 ? (
				<LevelList>
					{productList.map((elem, i) => (
						<LevelCard
							name={elem.name}
							id={elem.id}
							key={elem.id}
							badges={[{ text: `Продукт ${i + 1}` }]}
							isActive={true}
							isOpen={elem.id === currentProduct?.id}
							onOpen={() => handleOpenProduct(elem)}
							icons={[
								{ icon: 'edit', onClick: () => openEditProductModal(elem) },
								{ icon: 'delete', onClick: () => openRemoveProductModal(elem) },
							]}
						/>
					))}
				</LevelList>
			) : (
				<LevelEmpty text='Отсутствуют продукты программы' />
			)}
			{isAddProduct && (
				<Modal
					isOpen={isAddProduct}
					onClose={handleClose}
					title='Создание продукта'>
					<AddProductForm />
				</Modal>
			)}
			{isEditProduct && (
				<Modal
					isOpen={isEditProduct}
					onClose={handleClose}
					title='Редактирование продукта'>
					<EditProductForm />
				</Modal>
			)}
			{isRemoveProduct && currentProduct && (
				<ConfirmDelete
					isOpen={isRemoveProduct}
					onClose={handleClose}
					onSubmit={handleRemoveProduct}
					id={currentProduct.id}
				/>
			)}
		</Level>
	);
};
