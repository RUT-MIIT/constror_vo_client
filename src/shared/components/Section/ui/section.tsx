import type { FC } from 'react';
import type { ISectionProps } from '../types/types';

import styles from '../styles/section.module.scss';

export const Section: FC<ISectionProps> = ({
	sectionWidth = 'default',
	children,
}) => {
	return (
		<section
			className={`${styles.container} ${
				styles[`container_width_${sectionWidth}`]
			}`}>
			{children}
		</section>
	);
};
