import type { FC } from 'react';
import type { IPreloaderWizardProps } from '../types/types';

import styles from '../styles/preloader-wizard.module.scss';

export const PreloaderWizard: FC<IPreloaderWizardProps> = ({
	text = 'Идёт загрузка...',
}) => {
	return (
		<figure className={styles.preloader}>
			<div className={styles.circle}></div>
			<figcaption className={styles.caption}>{text}</figcaption>
		</figure>
	);
};
