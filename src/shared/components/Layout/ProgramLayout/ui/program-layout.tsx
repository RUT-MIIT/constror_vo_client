import type { FC } from 'react';

import { Outlet } from 'react-router-dom';

import { ProgramMenu } from '../../../../../widgets/ProgramMenu/ui/program-menu';

import styles from '../styles/program-layout.module.scss';

export const ProgramLayout: FC = () => {
	return (
		<div className={styles.layout}>
			<ProgramMenu />
			<div className={styles.main}>
				<div className={styles.header}></div>
				<div className={styles.container}>
					<Outlet />
				</div>
			</div>
		</div>
	);
};
