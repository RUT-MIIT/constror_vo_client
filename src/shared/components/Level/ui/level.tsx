import type { FC } from 'react';
import type { ILevelProps } from '../types/types';

import { Icon } from '../../Icon/ui/icon';

import styles from '../styles/level.module.scss';

export const Level: FC<ILevelProps> = ({ title, count, icons, children }) => {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h4 className={styles.title}>{title}</h4>
				<span className={styles.count}>{count}</span>
				<div className={styles.control}>
					{icons?.map((elem, i) => (
						<Icon key={i} icon={elem.icon} onClick={elem.onClick} />
					))}
				</div>
			</div>
			<div className={styles.main}>{children}</div>
		</div>
	);
};
