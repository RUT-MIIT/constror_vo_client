import type { FC } from 'react';
import type { IButtonProps } from '../types/types';

import styles from '../styles/button.module.scss';

export const Button: FC<IButtonProps> = ({
	type = 'button',
	width = 'default',
	style = 'default',
	isBlock = false,
	text,
	onClick,
}) => {
	if (isBlock) {
		return (
			<div
				className={`${styles.button} ${styles[`button_width_${width}`]} ${
					styles.button_block
				}`}>
				{text || ''}
			</div>
		);
	}
	return (
		<button
			className={`${styles.button} ${styles[`button_width_${width}`]} ${
				styles[`button_style_${style}`]
			}`}
			onClick={onClick}
			type={type}>
			{text || ''}
		</button>
	);
};
