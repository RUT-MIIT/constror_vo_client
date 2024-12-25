import type { FC } from 'react';

import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../../store/store';

import { EROUTES } from '../../../shared/utils/routes';

import { getInitialData } from '../../../store/discSpec/actions';

import { setIsShowLevel } from '../../../store/discSpec/reducer';

import { Section, SectionImg } from '../../../shared/components/Section';
import { Preloader } from '../../../shared/components/Preloader/ui/preloader';
import { ProgramDisciplineLevel } from './program-discipline-level';
import { ProgramActivityLevel } from './program-activity-level';
import { ProgramReconstructionLevel } from './program-reconstruction-level';
import { Button } from '../../../shared/components/Button/ui/button';

import styles from '../styles/program-disc-spec.module.scss';

export const ProgramDiscSpec: FC = () => {
	const navigate = useNavigate();
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
			<SectionImg
				sectionWidth='full'
				sectionTitle={{ text: 'Профессиональные дисциплины' }}
				sectionDescription='Преобразование реконструкции профессиональной деятельности выпускника ОП в дисциплины (модули) учебного плана (в части ПД и ОПД) - это процесс проектирования содержания образовательной программы на основе реконструкции профессиональной деятельности выпускника ОП.'>
				<div className={styles.buttons}>
					<Button
						width='auto'
						text='Создать профессиольные дисциплины'
						isBlock={true}
					/>
					{program ? (
						<Button
							text='Следующий этап'
							style='light'
							onClick={() =>
								navigate(`${EROUTES.PROGRAM}/${program.id}/discipline-basic`)
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
