import type { FC } from 'react';

import { NavLink } from 'react-router-dom';

import { useDispatch, useSelector } from '../../../store/store';

import { getUser } from '../../../store/user/reducer';
import { logoutUser } from '../../../store/user/actions';

import { Avatar } from '../../../shared/components/Avatar/ui/avatar';

import { EROUTES } from '../../../shared/utils/routes';

import styles from '../styles/main-menu.module.scss';

export const MainMenu: FC = () => {
	const user = useSelector(getUser);
	const dispatch = useDispatch();

	const links = [
		{ name: 'Профиль', url: EROUTES.PROFILE, icon: 'profile' },
		{ name: 'Программы', url: EROUTES.PROGRAMS, icon: 'program' },
	];

	const handleLogout = () => {
		dispatch(logoutUser());
	};

	return (
		<section className={styles.container}>
			<Avatar />
			{user && (
				<p className={styles.name}>
					{user.last_name} {user.first_name} {user.middle_name}
				</p>
			)}
			<nav className={styles.nav}>
				{links.map((elem, i) => (
					<NavLink
						to={elem.url}
						key={i}
						className={({ isActive }) =>
							`${styles.link} ${isActive ? styles.link_active : ''}`
						}>
						<div className={styles.icon__container}>
							<div
								className={`${styles.icon} ${
									styles[`icon_type_${elem.icon}`]
								}`}></div>
						</div>
						<p className={styles.icon__text}>{elem.name}</p>
					</NavLink>
				))}
			</nav>
			<button
				onClick={handleLogout}
				className={`${styles.link} ${styles.link_type_logout}`}>
				<div className={styles.icon__container}>
					<div className={`${styles.icon} ${styles.icon_type_logout}`}></div>
				</div>
				<p className={styles.icon__text}>Выход</p>
			</button>
		</section>
	);
};
