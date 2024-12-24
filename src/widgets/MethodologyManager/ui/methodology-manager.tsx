import type { FC } from 'react';
import type { IMethodologyManagerProps } from '../types/types';

import { useState } from 'react';

import { Modal } from '../../../shared/components/Modal/ui/modal';
import { Button } from '../../../shared/components/Button/ui/button';
import { Field } from '../../../shared/components/Field/ui/field';
import { Icon } from '../../../shared/components/Icon/ui/icon';
import { AddMethodologyForm } from './add-methodology-form';
import { SelectMethodologyForm } from './select-methodology-form';

import styles from '../styles/methodology-manager.module.scss';

export const MethodologyManager: FC<IMethodologyManagerProps> = ({
	currentValues,
	onAdd,
	onRemove,
}) => {
	const [isAddMethodologyModalOpen, setIsAddMethodologyModalOpen] =
		useState<boolean>(false);
	const [isSelectMethodologyModalOpen, setIsSelectMethodologyModalOpen] =
		useState<boolean>(false);

	const handleAddMethodology = (value: string) => {
		onAdd(value);
		handleCloseModal();
	};

	const handleRemoveMethodology = (value: string) => {
		onRemove(value);
	};

	const openAddMethodologyModal = () => {
		setIsAddMethodologyModalOpen(true);
	};

	const openSelectMethodologyModal = () => {
		setIsSelectMethodologyModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsAddMethodologyModalOpen(false);
		setIsSelectMethodologyModalOpen(false);
	};

	return (
		<div className={styles.container}>
			<div className={styles.control}>
				<Button
					text='Выбрать модель'
					onClick={openSelectMethodologyModal}></Button>
				<Button
					text='Создать модель'
					onClick={openAddMethodologyModal}></Button>
			</div>
			<Field>
				<ul className={styles.list}>
					{currentValues.map((elem, i) => (
						<li className={styles.item} key={i}>
							<Icon
								icon='close'
								color='white'
								onClick={() => handleRemoveMethodology(elem)}
							/>
							<span className={styles.text}>{elem}</span>
						</li>
					))}
				</ul>
			</Field>
			{isAddMethodologyModalOpen && (
				<Modal isOpen={isAddMethodologyModalOpen} onClose={handleCloseModal}>
					<AddMethodologyForm onAdd={handleAddMethodology} />
				</Modal>
			)}
			{isSelectMethodologyModalOpen && (
				<Modal isOpen={isSelectMethodologyModalOpen} onClose={handleCloseModal}>
					<SelectMethodologyForm
						currentValues={currentValues}
						onSelect={handleAddMethodology}
					/>
				</Modal>
			)}
		</div>
	);
};
