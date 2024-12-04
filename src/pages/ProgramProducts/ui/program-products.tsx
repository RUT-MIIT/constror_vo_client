import type { FC } from 'react';

import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../../store/store';

import {
	getInitialData,
	getProductsWizardData,
} from '../../../store/product/actions';

import { getProgramNsiList } from '../../../store/catalog/actions';

import {
	setIsShowProductWizard,
	setCurrentProduct,
} from '../../../store/product/reducer';

import { Section } from '../../../shared/components/Section/ui/section';
import { Button } from '../../../shared/components/Button/ui/button';
import { Modal } from '../../../shared/components/Modal/ui/modal';
import { ProgramProductsLevel } from './program-products-level';
import { ProgramNsiLevel } from './program-nsi-level';
import { CreateProductsWizard } from '../../../widgets/CreateProductsWizard/ui/create-products-wizard';
import { Preloader } from '../../../shared/components/Preloader/ui/preloader';

import styles from '../styles/program-products.module.scss';

export const ProgramProducts: FC = () => {
	const dispatch = useDispatch();
	const { program } = useSelector((state) => state.programDetail);
	const { isShowProductWizard } = useSelector((state) => state.product);

	const { loadingData, errorData } = useSelector((state) => state.product);

	const fetchInitialData = async () => {
		if (program) {
			await Promise.all([
				dispatch(getInitialData(program.id)),
				dispatch(getProductsWizardData(program.id)),
				dispatch(getProgramNsiList(program.id)),
			]);
		}
	};

	const openProductWizard = () => {
		dispatch(setIsShowProductWizard(true));
	};

	const handleCloseModal = () => {
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
			<Section
				sectionWidth='full'
				sectionHeight='card'
				sectionTitle={{ text: 'Исходные данные' }}
				sectionDescription='При помощи искусственного интеллекта, на основе методологии и описания предметной области создаются продукты программы
и перечень НСИ, которые можно редактировать, удалять или добавлять.'>
				<Button
					text='Создать продукты'
					style='magic'
					onClick={openProductWizard}
				/>
			</Section>
			<Section
				sectionWidth='full'
				sectionTitle={{ text: 'Подбор исходных данных' }}>
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
		</div>
	);
};
