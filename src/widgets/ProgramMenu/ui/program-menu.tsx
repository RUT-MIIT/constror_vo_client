import type { FC } from 'react';

import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../../store/store';

import { EROUTES } from '../../../shared/utils/routes';

import styles from '../styles/program-menu.module.scss';

const links = [
	{
		id: 'info',
		title: 'О программе',
		description: 'Общая информация о программе, участники и их роли',
	},
	{
		id: 'data',
		title: 'Исходные данные',
		description: 'Проектирование продуктов и добавление НСИ',
	},
	{
		id: 'reconstruction',
		title: 'Реконструкция',
		description: 'Создание этапов жизненного цикла и процессов',
	},
	{
		id: 'discipline-specialized',
		title: 'Проф. дисциплины',
		description: 'Преобразование реконструкции деятельности в дисциплины',
	},
	{
		id: 'discipline-basic',
		title: 'Общепроф. дисциплины',
		description: 'Добавление общепрофессиональных дисцпилин',
	},
	{
		id: 'education-plan',
		title: 'Учебный план',
		description: 'Планирование учебного плана программы',
	},
	{
		id: 'design-plan',
		title: 'Дизайн-концепт',
		description: 'Настройка концептуального проекта программы',
	},
];

export const ProgramMenu: FC = () => {
	const path = useLocation();
	const navigate = useNavigate();
	const { program } = useSelector((state) => state.programDetail);

	function handleChangeSection(section: string) {
		if (program) {
			navigate(EROUTES.PROGRAM + '/' + program.id + '/' + section);
		}
	}

	return (
		<nav className={styles.nav}>
			<ul className={styles.menu}>
				{links.map((elem) => (
					<li
						key={elem.id}
						id={elem.id}
						className={`${styles.item} ${
							path.pathname.includes(elem.id) ? styles.item_active : ''
						} `}
						onClick={() => handleChangeSection(elem.id)}>
						<div className={styles.icon__container}>
							<div
								className={`${styles.icon} ${
									styles[`icon_type_${elem.id}`]
								}`}></div>
						</div>
						<div className={styles.card}>
							<h3 className={styles.title}>{elem.title}</h3>
							<p className={styles.description}>{elem.description}</p>
						</div>
					</li>
				))}
			</ul>
		</nav>
	);
};
