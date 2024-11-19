import type { FC } from 'react';
import type { IMainLayoutProps } from '../types/types';

import { MainMenu } from '../../../../../widgets/MainMenu/ui/main-menu';

import styles from '../styles/main-layout.module.scss';

export const MainLayout: FC<IMainLayoutProps> = ({ children }) => {
	return (
		<div className={styles.background}>
			<div className={styles.container}>
				<MainMenu />
				<div className={styles.main}>{children}</div>
			</div>
		</div>
	);
};
