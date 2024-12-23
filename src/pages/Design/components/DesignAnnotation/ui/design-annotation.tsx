import type { FC } from 'react';

import { useSelector } from '../../../../../store/store';

import styles from '../styles/design-annotation.module.scss';

export const DesignAnnotation: FC = () => {
	const { main } = useSelector((state) => state.design);

	return (
		<div className={styles.container}>
			<h2 className={styles.title}>Аннотация</h2>
			<p className={styles.text}>{main?.annotation || ''}</p>
		</div>
	);
};
