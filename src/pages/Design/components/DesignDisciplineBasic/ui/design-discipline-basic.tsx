import type { FC } from 'react';
import type {
	IDesignDisciplineBasic,
	IDisciplineBasic,
} from '../../../../../store/design/types';

import { useState } from 'react';
import { useSelector } from '../../../../../store/store';

import { Modal } from '../../../../../shared/components/Modal/ui/modal';
import { Tabs } from '../../../../../shared/components/Tabs/ui/tabs';
import { TextTemplate } from '../../../../../features/TextTemplate/ui/text-template';

import styles from '../styles/design-discipline-basic.module.scss';

export const DesignDisciplineBasic: FC = () => {
	const { disciplineBasic } = useSelector((state) => state.design);

	const [activeCodes, setActiveCodes] = useState<number[]>(
		disciplineBasic.map((code) => code.id)
	);

	const [currentDiscipline, setCurrentDiscipline] =
		useState<IDisciplineBasic | null>(null);

	const handleSelectCode = (code: IDesignDisciplineBasic) => {
		if (activeCodes.includes(code.id)) {
			setActiveCodes(activeCodes.filter((id) => id !== code.id));
		} else {
			setActiveCodes([...activeCodes, code.id]);
		}
	};

	const openModal = (discipline: IDisciplineBasic) => {
		setCurrentDiscipline(discipline);
	};

	const closeModal = () => {
		setCurrentDiscipline(null);
	};

	const disciplineTabs = [
		{
			label: 'Описание дисциплины',
			content: <TextTemplate text={currentDiscipline?.description || ''} />,
		},
	];

	return (
		<div className={styles.container}>
			<div className={styles.spyrale}></div>
			<h2 className={styles.title}>Проектирование ОПД</h2>

			<ul className={styles.codes}>
				{disciplineBasic.map((elem) => (
					<li
						key={elem.id}
						className={`${styles.code} ${styles[`code_${elem.type}`]} ${
							activeCodes.includes(elem.id) ? '' : styles.code_disabled
						}`}
						onClick={() => handleSelectCode(elem)}>
						<p className={styles.code_text}>
							<span className={styles.code_text_bold}>{elem.code}. </span>
							{elem.name}
						</p>
					</li>
				))}
			</ul>

			<ul className={styles.list}>
				{disciplineBasic
					.filter((elem) => activeCodes.includes(elem.id))
					.reduce<IDisciplineBasic[]>((acc, elem) => {
						const transformedDisciplines = elem.disciplines.map(
							(discipline) => ({
								id: discipline.id,
								name: discipline.name,
								description: discipline.description,
								type: discipline.type,
								position: discipline.position,
								program: discipline.program,
								area: discipline.area,
								competence: 0,
							})
						);
						return acc.concat(transformedDisciplines);
					}, [])
					.map((item) => (
						<li
							className={`${styles.item} ${styles[`item_${item.type}`]}`}
							key={item.id}
							onClick={() => openModal(item)}>
							<span className={styles.tag}>
								Общепрофессиональная дисциплина
							</span>
							<h4 className={styles.name}>{item.name}</h4>
							<p className={styles.caption}>{item.area}</p>
							<span className={styles.count}>{item.position}</span>
						</li>
					))}
			</ul>

			{currentDiscipline && (
				<Modal
					isOpen={currentDiscipline !== null}
					onClose={closeModal}
					title={currentDiscipline.name}>
					<Tabs tabs={disciplineTabs} />
				</Modal>
			)}
		</div>
	);
};
