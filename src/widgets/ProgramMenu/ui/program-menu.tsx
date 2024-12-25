import type { FC } from 'react';

import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../../store/store';

import { EROUTES } from '../../../shared/utils/routes';

import { Badge } from '../../../shared/components/Badge/ui/badge';

import styles from '../styles/program-menu.module.scss';

const links = [
	{
		id: 'info',
		title: 'О программе',
		description: 'Общая информация о программе, участники и их роли',
	},
	{
		id: 'products',
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
		title: 'Профессиональные дисциплины',
		description: 'Преобразование реконструкции деятельности в дисциплины',
	},
	{
		id: 'discipline-basic',
		title: 'Общепрофессиональные дисциплины',
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

	const handleChangeSection = (section: string) => {
		if (program) {
			navigate(EROUTES.PROGRAM + '/' + program.id + '/' + section);
		}
	};

	const handleClickLogo = () => {
		navigate(EROUTES.PROGRAMS);
	};

	return (
		<nav className={styles.nav}>
			<div className={styles.header} onClick={handleClickLogo}>
				<div className={styles.logo}></div>
				<span className={styles.header__caption}>Конструктор ВО</span>
			</div>
			<ul className={styles.menu}>
				{links.map((elem) => (
					<li
						key={elem.id}
						id={elem.id}
						className={`${styles.item} ${
							path.pathname.includes(elem.id) ? styles.item_active : ''
						} `}
						onClick={() => handleChangeSection(elem.id)}>
						<div className={styles.card}>
							<div className={styles.info}>
								<div
									className={`${styles.icon} ${
										styles[`icon_type_${elem.id}`]
									}`}></div>
								<h3 className={styles.title}>{elem.title}</h3>
							</div>
							<Badge
								text='В работе'
								color={path.pathname.includes(elem.id) ? 'white' : 'blue'}
							/>
						</div>
					</li>
				))}
			</ul>
			<div className={styles.control}>
				<div
					className={styles.control__btn}
					onClick={() => navigate(EROUTES.PROGRAMS)}>
					<div
						className={`${styles.control__icon} ${styles.control__icon_type_back}`}></div>
					<p className={styles.control__title}>Вернуться в программы</p>
				</div>
				<div
					className={styles.control__btn}
					onClick={() => navigate(EROUTES.PROFILE)}>
					<div
						className={`${styles.control__icon} ${styles.control__icon_type_user}`}></div>
					<p className={styles.control__title}>Личный кабинет</p>
				</div>
			</div>
		</nav>
	);
};
