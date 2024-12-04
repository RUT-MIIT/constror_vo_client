import type { FC } from 'react';
import type { ISectionProps } from '../types/types';

import styles from '../styles/section.module.scss';

export const Section: FC<ISectionProps> = ({
	sectionWidth = 'default',
	sectionHeight = 'page',
	sectionTitle,
	sectionDescription,
	children,
}) => {
	return (
		<section
			className={`
				${styles.container}
				${styles[`container_width_${sectionWidth}`]}
				${styles[`container_height_${sectionHeight}`]}
			`}>
			{sectionTitle && <h2 className={styles.title}>{sectionTitle.text}</h2>}
			{sectionDescription && (
				<p className={styles.description}>{sectionDescription}</p>
			)}
			{children}
		</section>
	);
};
