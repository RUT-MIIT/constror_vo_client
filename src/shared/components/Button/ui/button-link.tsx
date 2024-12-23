import type { FC } from 'react';
import type { IButtonLinkProps } from '../types/types';

import styles from '../styles/button.module.scss';

export const ButtonLink: FC<IButtonLinkProps> = ({
	width = 'default',
	style = 'default',
	isBlock = false,
	text,
	link,
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
		<a
			className={`${styles.button} ${styles[`button_width_${width}`]} ${
				styles[`button_style_${style}`]
			}`}
			href={link}
			target='_blank'
			rel='noreferrer'>
			{text || ''}
		</a>
	);
};
