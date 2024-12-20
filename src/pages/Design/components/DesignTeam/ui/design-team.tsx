import type { FC } from 'react';

import { team } from '../mock/team';

import styles from '../styles/design-team.module.scss';

export const DesignTeam: FC = () => {
	return (
		<div className={styles.container}>
			<div className={styles.background}></div>
			<div className={styles.decore}></div>
			<h4 className={styles.list_title}>Команда проектирования</h4>
			<ul className={styles.list}>
				{team.map((elem) => (
					<li className={styles.list_item} key={elem.id}>
						<span
							className={`${
								elem.tag === 'Методист'
									? styles.item_tag_red
									: styles.item_tag_blue
							}`}>
							{elem.tag}
						</span>
						{elem.img ? (
							<img
								className={styles.item_img}
								src={elem.img}
								alt='изображение участника'></img>
						) : (
							<div className={styles.item_img_stub}></div>
						)}
						<h6 className={styles.item_name}>{elem.name}</h6>
						<p className={styles.item_job}>{elem.job}</p>
					</li>
				))}
			</ul>
		</div>
	);
};
