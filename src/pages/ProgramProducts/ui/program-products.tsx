import type { FC } from 'react';

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../../store/store';

import { EROUTES } from '../../../shared/utils/routes';

import {
	getInitialData,
	getProductsWizardData,
} from '../../../store/product/actions';
import { getProgramNsiList } from '../../../store/catalog/actions';

import {
	setIsShowProductWizard,
	setCurrentProduct,
} from '../../../store/product/reducer';

import { Section, SectionImg } from '../../../shared/components/Section';
import { Button } from '../../../shared/components/Button/ui/button';
import { Modal } from '../../../shared/components/Modal/ui/modal';
import { ProgramProductsLevel } from './program-products-level';
import { ProgramNsiLevel } from './program-nsi-level';
import { CreateProductsWizard } from '../../../widgets/CreateProductsWizard/ui/create-products-wizard';
import { ProductsInfoDetail } from './products-info-detail';
import { Preloader } from '../../../shared/components/Preloader/ui/preloader';

import styles from '../styles/program-products.module.scss';

export const ProgramProducts: FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { program } = useSelector((state) => state.programDetail);
	const { isShowProductWizard } = useSelector((state) => state.product);

	const { loadingData, errorData } = useSelector((state) => state.product);

	const [isOpenProductsInfoModal, setIsOpenProductsInfoModal] =
		useState<boolean>();

	const fetchInitialData = async () => {
		if (program) {
			await Promise.all([
				dispatch(getInitialData(program.id)),
				dispatch(getProductsWizardData(program.id)),
				dispatch(getProgramNsiList(program.id)),
			]);
		}
	};

	const openProductsInfoModal = () => {
		setIsOpenProductsInfoModal(true);
	};

	const openProductWizard = () => {
		dispatch(setIsShowProductWizard(true));
	};

	const handleCloseModal = () => {
		setIsOpenProductsInfoModal(false);
		dispatch(setIsShowProductWizard(false));
	};

	useEffect(() => {
		fetchInitialData();
		return () => {
			dispatch(setCurrentProduct(null));
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (loadingData) {
		return <Preloader />;
	}

	if (errorData) {
		return <>{errorData && <p>Ошибка при загрузке исходных данных</p>}</>;
	}

	return (
		<div className={styles.container}>
			<SectionImg
				sectionWidth='full'
				sectionTitle={{ text: 'Исходные данные' }}
				sectionDescription='При помощи искусственного интеллекта, на основе методологии и описания предметной области создаются продукты программы
и перечень НСИ, которые можно редактировать, удалять или добавлять.'
				withIcon
				onIconClick={openProductsInfoModal}>
				<div className={styles.buttons}>
					<Button
						text='Создать продукты'
						style='magic'
						onClick={openProductWizard}
					/>
					{program ? (
						<Button
							text='Следующий этап'
							style='light'
							onClick={() =>
								navigate(`${EROUTES.PROGRAM}/${program.id}/reconstruction`)
							}
						/>
					) : (
						<Button text='Следующий этап' isBlock={true} />
					)}
				</div>
			</SectionImg>
			<Section sectionWidth='full'>
				<div className={styles.levels}>
					<ProgramProductsLevel />
					<ProgramNsiLevel />
				</div>
			</Section>
			{isShowProductWizard && (
				<Modal
					isOpen={isShowProductWizard}
					onClose={handleCloseModal}
					modalWidth='wizard'>
					<CreateProductsWizard />
				</Modal>
			)}
			{isOpenProductsInfoModal && (
				<Modal
					title='Описание замысла (идеи) образовательной программы'
					modalWidth='large'
					isOpen={isOpenProductsInfoModal}
					onClose={handleCloseModal}>
					<ProductsInfoDetail />
				</Modal>
			)}
		</div>
	);
};
