import type { FC } from 'react';

import { useNavigate, Outlet } from 'react-router-dom';

import { Button } from '../../../Button/ui/button';
import { ProgramMenu } from '../../../../../widgets/ProgramMenu/ui/program-menu';

import { EROUTES } from '../../../../utils/routes';

import styles from '../styles/program-layout.module.scss';

export const ProgramLayout: FC = () => {
	const navigate = useNavigate();

	return (
		<div className={styles.layout}>
			<ProgramMenu />
			<div className={styles.main}>
				<div className={styles.header}>
					<Button
						text='Вернуться к программам'
						onClick={() => navigate(EROUTES.PROGRAMS)}
					/>
				</div>
				<div className={styles.container}>
					<Outlet />
				</div>
			</div>
		</div>
	);
};
