import type { FC } from 'react';
import { useSelector } from '../../../../../store/store';
import styles from '../styles/design-annotation.module.scss';

export const DesignAnnotation: FC = () => {
	const { main } = useSelector((state) => state.design);

	const paragraphs = main?.annotation?.split('\n') || [];

	return (
		<div className={styles.container}>
			<h2 className={styles.title}>Аннотация</h2>
			{paragraphs.map((paragraph, index) => (
				<p key={index} className={styles.text}>
					{paragraph}
				</p>
			))}
		</div>
	);
};
