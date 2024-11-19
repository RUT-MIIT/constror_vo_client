import type { FC } from 'react';
import type { IProgramItem } from '../../../store/program/types';

import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../../store/store';

import {
	getProgramsList,
	removeProgramFromList,
} from '../../../store/program/actions';
import { getEducationDirectionsList } from '../../../store/catalog/actions';
import {
	setIsAddProgram,
	setIsEditProgram,
	setIsRemoveProgram,
	setCurrentProgram,
} from '../../../store/program/reducer';

import { Section } from '../../../shared/components/Section/ui/section';
import { Modal } from '../../../shared/components/Modal/ui/modal';
import { Badge } from '../../../shared/components/Badge/ui/badge';
import { Icon } from '../../../shared/components/Icon/ui/icon';
import { AddProgramForm } from './add-program-form';
import { EditProgramForm } from './edit-program-form';
import { ConfirmDelete } from '../../../features/ConfirmDelete/ui/confirm-delete';
import { Preloader } from '../../../shared/components/Preloader/ui/preloader';

import styles from '../styles/programs.module.scss';

export const Programs: FC = () => {
	const dispatch = useDispatch();

	const openAddProgramModal = () => {
		dispatch(setIsAddProgram(true));
	};

	const openEditProgramModal = (item: IProgramItem) => {
		if (!item) return;
		dispatch(setCurrentProgram(item));
		dispatch(setIsEditProgram(true));
	};

	const openRemoveProgramModal = (item: IProgramItem) => {
		if (!item) return;
		dispatch(setCurrentProgram(item));
		dispatch(setIsRemoveProgram(true));
	};

	const handleClose = () => {
		dispatch(setIsAddProgram(false));
		dispatch(setIsEditProgram(false));
		dispatch(setIsRemoveProgram(false));
	};

	const handleRemoveProgram = (id: number) => {
		dispatch(removeProgramFromList(id));
	};

	const {
		programList,
		currentProgram,
		isAddProgram,
		isEditProgram,
		isRemoveProgram,
		loading: loadingPrograms,
		error: errorPrograms,
	} = useSelector((state) => state.program);
	const {
		educationDirections,
		loading: loadingCatalog,
		error: errorCatalog,
	} = useSelector((state) => state.catalog);

	const fetchInitialData = async () => {
		await Promise.all([
			dispatch(getProgramsList()),
			dispatch(getEducationDirectionsList()),
		]);
	};

	useEffect(() => {
		fetchInitialData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const isLoading = loadingPrograms || loadingCatalog;
	const isError = errorPrograms || errorCatalog;

	if (isLoading) {
		return <Preloader />;
	}

	if (isError) {
		return (
			<>
				{isLoading && <p>Ошибка при загрузке программ: {errorPrograms}</p>}
				{isError && <p>Ошибка при загрузке справочников: {errorCatalog}</p>}
			</>
		);
	}

	return (
		<Section sectionWidth='full'>
			<ul className={styles.list}>
				<li className={`${styles.card} ${styles.card_type_add}`}>
					<div className={styles.header}></div>
					<h3 className={styles.title}>Добавить новую программу</h3>
					<p className={styles.description}></p>
					<Badge
						text='Добавить'
						color='white'
						type='button'
						onClick={openAddProgramModal}
					/>
				</li>
				{programList.map((item, i) => (
					<li className={styles.card} key={i}>
						<div className={styles.header}>
							<div className={styles.control}>
								<Icon
									icon='edit'
									type='button'
									onClick={() => openEditProgramModal(item)}
								/>
								<Icon
									icon='delete'
									type='button'
									onClick={() => openRemoveProgramModal(item)}
								/>
							</div>
						</div>
						<h3 className={styles.title}>{item.profile || ''}</h3>
						<p className={styles.description}>id программы: {item.id || ''}</p>
						<Badge text={item.my_role} />
					</li>
				))}
			</ul>
			{isAddProgram && (
				<Modal
					isOpen={isAddProgram}
					onClose={handleClose}
					title='Добавление программы'>
					<AddProgramForm directions={educationDirections} />
				</Modal>
			)}
			{isEditProgram && currentProgram && (
				<Modal
					isOpen={isEditProgram}
					onClose={handleClose}
					title='Редактирование программы'>
					<EditProgramForm directions={educationDirections} />
				</Modal>
			)}
			{isRemoveProgram && currentProgram && (
				<ConfirmDelete
					isOpen={isRemoveProgram}
					onClose={handleClose}
					id={currentProgram.id}
					onSubmit={handleRemoveProgram}
				/>
			)}
		</Section>
	);
};
