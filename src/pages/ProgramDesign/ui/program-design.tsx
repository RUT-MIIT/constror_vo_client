import type { FC } from 'react';

import { useNavigate } from 'react-router-dom';
import { useSelector } from '../../../store/store';

import { SectionImg } from '../../../shared/components/Section';
import { Button } from '../../../shared/components/Button/ui/button';

import styles from '../styles/program-design.module.scss';

export const ProgramDesign: FC = () => {
	const navigate = useNavigate();
	const { program } = useSelector((state) => state.programDetail);

	return (
		<div className={styles.container}>
			<SectionImg
				sectionWidth='full'
				sectionTitle={{ text: 'Учебный план' }}
				sectionDescription='Процесс настройки дизайн концепта программы.'>
				<div className={styles.buttons}>
					<Button width='auto' text='Создать дизайн концепт' isBlock={true} />
					{program ? (
						<Button
							text='Открыть дизайн концепт'
							style='light'
							onClick={() => navigate(`/design/${program.id}/main`)}
						/>
					) : (
						<Button text='Следующий этап' isBlock={true} />
					)}
				</div>
			</SectionImg>
		</div>
	);
};
