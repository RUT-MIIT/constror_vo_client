import type { FC } from 'react';
import type { IPublicLayoutProps } from '../types/types';

import { PublicLayoutFooter } from './public-layout-footer';

import styles from '../styles/public-layout.module.scss';

export const PublicLayout: FC<IPublicLayoutProps> = ({ children }) => {
	return (
		<div className={styles.container}>
			<div className={styles.background}></div>
			<div className={styles.overlay}></div>

			{children}

			<PublicLayoutFooter />
		</div>
	);
};
