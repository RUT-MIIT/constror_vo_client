import type { FC } from 'react';
import type { IFormFieldProps } from '../../types/types';

import styles from './form-field.module.scss';

export const FormField: FC<IFormFieldProps> = ({
	title,
	fieldError,
	withInfo = false,
	onInfo,
	children,
}) => {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h4 className={styles.title}>{title}</h4>
				{withInfo && <div className={styles.icon} onClick={onInfo}></div>}
			</div>
			{children}
			{fieldError && (
				<span
					className={`${styles.error} ${
						fieldError.isShow ? styles['error_status_show'] : ''
					}`}>
					{fieldError.text}
				</span>
			)}
		</div>
	);
};
