import type { FC } from 'react';

import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../../store/store';

import { getInitialData } from '../../../store/discSpec/actions';

import { setIsShowLevel } from '../../../store/discSpec/reducer';

import { Section } from '../../../shared/components/Section/ui/section';
import { Preloader } from '../../../shared/components/Preloader/ui/preloader';
import { ProgramDisciplineLevel } from './program-discipline-level';
import { ProgramActivityLevel } from './program-activity-level';
import { ProgramReconstructionLevel } from './program-reconstruction-level';

import styles from '../styles/program-disc-spec.module.scss';

export const ProgramDiscSpec: FC = () => {
	const dispatch = useDispatch();
	const { program } = useSelector((state) => state.programDetail);

	const { loadingData, errorData } = useSelector((state) => state.discSpec);

	const fetchInitialData = async () => {
		if (program) {
			await Promise.all([dispatch(getInitialData(program.id))]);
		}
	};

	useEffect(() => {
		fetchInitialData();
		return () => {
			setIsShowLevel({
				reconstruction: true,
				activity: true,
				discipline: false,
			});
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
				sectionTitle={{
					text: 'Проектирование профессиональных дисциплин учебного плана',
				}}>
				<div className={styles.levels}>
					<ProgramReconstructionLevel />
					<ProgramActivityLevel />
					<ProgramDisciplineLevel />
				</div>
			</Section>
		</div>
	);
};
