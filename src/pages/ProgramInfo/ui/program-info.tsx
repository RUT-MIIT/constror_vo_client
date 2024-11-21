import type { FC } from 'react';

import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../../store/store';

import {
	getProgramRolesList,
	getUsersList,
} from '../../../store/catalog/actions';

import { Section } from '../../../shared/components/Section/ui/section';
import { Field } from '../../../shared/components/Field/ui/field';
import { ProgramParticipants } from '../../Program/components/ProgramParticipants/ui/program-participants';
import { Preloader } from '../../../shared/components/Preloader/ui/preloader';

import styles from '../styles/program-info.module.scss';

export const ProgramInfo: FC = () => {
	const dispatch = useDispatch();
	const { program } = useSelector((state) => state.programDetail);

	const { loading: loadingCatalog, error: errorCatalog } = useSelector(
		(state) => state.catalog
	);

	const fetchInitialData = async () => {
		await Promise.all([
			dispatch(getProgramRolesList()),
			dispatch(getUsersList()),
		]);
	};

	useEffect(() => {
		fetchInitialData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (loadingCatalog) {
		return <Preloader />;
	}

	if (errorCatalog) {
		return (
			<>
				{errorCatalog && (
					<p>Ошибка при загрузке справочников: {errorCatalog}</p>
				)}
			</>
		);
	}

	return (
		<div className={styles.container}>
			<Section
				sectionWidth='full'
				sectionTitle={{ text: 'Информация о программе' }}
				sectionDescription='Основные параметры вашей образовательной программы: направление и
					форматы обучения.'>
				<div className={styles.fields}>
					<Field text={program?.direction.name || ''} />
					<Field text={program?.form || ''} />
					<Field text={program?.profile || ''} />
				</div>
			</Section>
			<Section
				sectionWidth='full'
				sectionTitle={{ text: 'Участники программы' }}
				sectionDescription='Список участников и их роли.'>
				<div className={styles.participants}>
					<ProgramParticipants />
				</div>
			</Section>
		</div>
	);
};
