import type { FC } from 'react';
import type { IFormProps } from '../types/types';

import styles from '../styles/form.module.scss';

export const Form: FC<IFormProps> = ({
	title,
	titleAlign = 'left',
	formWidth = 'full',
	name,
	onSubmit,
	children,
}) => {
	return (
		<form
			className={`${styles.container} ${
				styles[`container_width_${formWidth}`]
			}`}
			name={name}
			id={name}
			onSubmit={onSubmit}
			noValidate>
			{title && (
				<h2
					className={`${styles.title} ${styles[`title_align_${titleAlign}`]}`}>
					{title}
				</h2>
			)}
			{children}
		</form>
	);
};
