import type { FC } from 'react';

import { Outlet } from 'react-router-dom';

import { MainMenu } from '../../../../../widgets/MainMenu/ui/main-menu';

import styles from '../styles/main-layout.module.scss';

export const MainLayout: FC = () => {
	return (
		<div className={styles.container}>
			<MainMenu />
			<div className={styles.main}>
				<Outlet />
			</div>
		</div>
	);
};
