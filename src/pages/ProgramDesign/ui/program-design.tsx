import type { FC } from 'react';

import { useNavigate } from 'react-router-dom';
import { useSelector } from '../../../store/store';

import { API_URL } from '../../../shared/config';
import { EditAnnotationForm } from './edit-annotation-form';

import { SectionImg, Section } from '../../../shared/components/Section';
import { Button } from '../../../shared/components/Button/ui/button';
import { ButtonLink } from '../../../shared/components/Button/ui/button-link';

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
					{program && (
						<ButtonLink
							style='magic'
							text='Экспорт программы'
							link={`${API_URL}/programs/${program.id}/export-data/`}
						/>
					)}
				</div>
			</SectionImg>
			<Section
				sectionWidth='full'
				sectionTitle={{ text: 'Аннотация' }}
				sectionDescription='Введите аннотацию для программы.'>
				<EditAnnotationForm />
			</Section>
		</div>
	);
};
