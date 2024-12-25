import type { FC } from 'react';

import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../../store/store';

import { EROUTES } from '../../../shared/utils/routes';

import { getInitialData } from '../../../store/reconstruction/actions';

import {
	setCurrentProduct,
	setCurrentStage,
	setCurrentProcess,
	setIsShowLevel,
} from '../../../store/reconstruction/reducer';

import { Section, SectionImg } from '../../../shared/components/Section';
import { ProgramProductsLevel } from './program-products-level';
import { ProgramStagesLevel } from './program-stages-level';
import { ProgramProcessesLevel } from './program-processes-level';
import { Preloader } from '../../../shared/components/Preloader/ui/preloader';
import { Button } from '../../../shared/components/Button/ui/button';

import styles from '../styles/program-reconstruction.module.scss';

export const ProgramReconstruction: FC = () => {
	const navigate = useNavigate();
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
			<SectionImg
				sectionWidth='full'
				sectionTitle={{ text: 'Реконструкция деятельности' }}
				sectionDescription='Реконструкция деятельности профессиональной деятельности выпускника ОП – это процесс декомпозиции жизненного цикла продуктов на этапы, процессы и результаты деятельности по каждому процессу, проводимая по стандартам, установленным для соответствующей области профессиональной деятельности (при наличии).'>
				<div className={styles.buttons}>
					<Button width='auto' text='Создать этапы и процессы' isBlock={true} />
					{program ? (
						<Button
							text='Следующий этап'
							style='light'
							onClick={() =>
								navigate(
									`${EROUTES.PROGRAM}/${program.id}/discipline-specialized`
								)
							}
						/>
					) : (
						<Button text='Следующий этап' isBlock={true} />
					)}
				</div>
			</SectionImg>
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
