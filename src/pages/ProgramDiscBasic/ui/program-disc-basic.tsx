import type { FC } from 'react';

import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../../store/store';

import { EROUTES } from '../../../shared/utils/routes';

import { getInitialData } from '../../../store/discBasic/actions';

import {
	setCurrentCompetence,
	setCurrentDiscipline,
} from '../../../store/discBasic/reducer';

import { Section, SectionImg } from '../../../shared/components/Section';
import { Preloader } from '../../../shared/components/Preloader/ui/preloader';
import { ProgramCompetenceLevel } from './program-competence-level';
import { ProgramDisciplineLevel } from './program-discipline-level';
import { Button } from '../../../shared/components/Button/ui/button';

import styles from '../styles/program-disc-basic.module.scss';

export const ProgramDiscBasic: FC = () => {
	const navigate = useNavigate();
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
			<SectionImg
				sectionWidth='full'
				sectionTitle={{ text: 'Общепрофессиональные дисциплины' }}
				sectionDescription='Процесс последовательного проектирования общепрофессиональных дисицплин с использованием искусственного интеллекта, направленный на оптимизацию работы за счёт поэтапного заполнения данных и автоматической генерации решений.'>
				<div className={styles.buttons}>
					<Button
						width='auto'
						text='Создать общепрофессиональные дисциплины'
						isBlock={true}
					/>
					{program ? (
						<Button
							text='Следующий этап'
							style='light'
							onClick={() =>
								navigate(`${EROUTES.PROGRAM}/${program.id}/education-plan`)
							}
						/>
					) : (
						<Button text='Следующий этап' isBlock={true} />
					)}
				</div>
			</SectionImg>
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
