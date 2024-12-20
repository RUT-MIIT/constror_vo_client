import type { FC } from 'react';
import { NavLink, useParams } from 'react-router-dom'; // Импортируем useParams для получения параметров URL.
import { links } from '../mock/links';
import styles from '../styles/design-menu.module.scss';

export const DesignMenu: FC = () => {
	const { programId } = useParams<{ programId: string }>();

	return (
		<div className={styles.menu}>
			<div className={styles.header}>
				<div className={styles.header__logo}></div>
			</div>
			<nav className={styles.nav}>
				<div className={styles.section}>
					<ul className={styles.list}>
						{links.map((item) => (
							<li key={item.id} className={styles.item}>
								<NavLink
									to={`/design/${programId}${item.path}`}
									className={({ isActive }) =>
										`${isActive ? styles.item__link_active : styles.item__link}`
									}>
									<div
										className={`${styles.item__icon} ${
											styles[`item__icon_type_${item.type}`]
										}`}></div>
									<p className={styles.item__text}>{item.text}</p>
								</NavLink>
							</li>
						))}
					</ul>
				</div>
			</nav>
		</div>
	);
};
