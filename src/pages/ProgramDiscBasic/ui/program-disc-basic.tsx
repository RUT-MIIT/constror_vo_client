import type { FC } from 'react';

import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../../store/store';

import { getInitialData } from '../../../store/discBasic/actions';

import {
	setCurrentCompetence,
	setCurrentDiscipline,
} from '../../../store/discBasic/reducer';

import { Section } from '../../../shared/components/Section/ui/section';
import { Preloader } from '../../../shared/components/Preloader/ui/preloader';
import { ProgramCompetenceLevel } from './program-competence-level';
import { ProgramDisciplineLevel } from './program-discipline-level';

import styles from '../styles/program-disc-basic.module.scss';

export const ProgramDiscBasic: FC = () => {
	const dispatch = useDispatch();
	const { program } = useSelector((state) => state.programDetail);

	const { loadingData, errorData } = useSelector((state) => state.discBasic);

	const fetchInitialData = async () => {
		if (program) {
			await Promise.all([dispatch(getInitialData(program.id))]);
		}
	};

	useEffect(() => {
		fetchInitialData();
		return () => {
			setCurrentCompetence(null);
			setCurrentDiscipline(null);
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
					text: 'Проектирование общепрофессиональных дисциплин учебного плана',
				}}>
				<div className={styles.levels}>
					<ProgramCompetenceLevel />
					<ProgramDisciplineLevel />
				</div>
			</Section>
		</div>
	);
};
