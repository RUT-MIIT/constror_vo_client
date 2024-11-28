import type { FC } from 'react';
import type { IFieldProps } from '../types/types';

import styles from '../styles/field.module.scss';

export const Field: FC<IFieldProps> = ({ text, children }) => {
	return (
		<div className={styles.field}>
			{text && <p className={styles.text}>{text}</p>}
			{children}
		</div>
	);
};
