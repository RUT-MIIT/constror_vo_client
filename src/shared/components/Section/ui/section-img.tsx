import type { FC } from 'react';
import type { ISectionImgProps } from '../types/types';

import styles from '../styles/section-img.module.scss';

export const SectionImg: FC<ISectionImgProps> = ({
	sectionWidth = 'default',
	sectionTitle,
	sectionDescription,
	children,
}) => {
	return (
		<section
			className={`${styles.section} ${
				styles[`section_width_${sectionWidth}`]
			}`}>
			<div className={styles.container}>
				{sectionTitle && <h2 className={styles.title}>{sectionTitle.text}</h2>}
				{sectionDescription && (
					<p className={styles.description}>{sectionDescription}</p>
				)}
				{children}
			</div>
			<div className={styles.img}></div>
		</section>
	);
};
