import type { FC } from 'react';

import { useSelector } from '../../../../../store/store';

import styles from '../styles/design-home.module.scss';

export const DesignMain: FC = () => {
	const { main } = useSelector((state) => state.design);

	return (
		<div className={styles.container}>
			<div className={styles.background}></div>
			<div className={styles.description}>
				<h1 className={styles.title}>КОНЦЕПТУАЛЬНЫЙ ПРОЕКТ</h1>
				<p className={styles.subtitle}>
					основной профессиональной образовательной программы высшего
					образования
				</p>
				<p
					className={`${styles.subtitle} ${styles.subtitle_color} ${styles.subtitle_bold}`}>
					«{main?.profile}»
				</p>
				<p className={styles.subtitle}>
					направление подготовки <br></br>
					{main?.direction.name}
				</p>
			</div>
		</div>
	);
};
