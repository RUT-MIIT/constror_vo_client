import type { FC } from 'react';

import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../../store/store';

import { getInitialData } from '../../../store/reconstruction/actions';

import {
	setCurrentProduct,
	setCurrentStage,
	setCurrentProcess,
	setIsShowLevel,
} from '../../../store/reconstruction/reducer';

import { Section } from '../../../shared/components/Section/ui/section';
import { ProgramProductsLevel } from './program-products-level';
import { ProgramStagesLevel } from './program-stages-level';
import { ProgramProcessesLevel } from './program-processes-level';
import { Preloader } from '../../../shared/components/Preloader/ui/preloader';

import styles from '../styles/program-reconstruction.module.scss';

export const ProgramReconstruction: FC = () => {
	const dispatch = useDispatch();
	const { program } = useSelector((state) => state.programDetail);

	const { loadingData, errorData } = useSelector(
		(state) => state.reconstruction
	);

	const fetchInitialData = async () => {
		if (program) {
			await Promise.all([dispatch(getInitialData(program.id))]);
		}
	};

	useEffect(() => {
		fetchInitialData();
		return () => {
			setCurrentProduct(null);
			setCurrentStage(null);
			setCurrentProcess(null);
			setIsShowLevel({ product: true, stage: true, process: false });
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
				sectionTitle={{ text: 'Реконструкция деятельности' }}>
				<div className={styles.levels}>
					<ProgramProductsLevel />
					<ProgramStagesLevel />
					<ProgramProcessesLevel />
				</div>
			</Section>
		</div>
	);
};
