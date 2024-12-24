import type { FC } from 'react';
import type { ITextProps } from '../../types/types';

import styles from '../../styles/typography.module.scss';

export const Text: FC<ITextProps> = ({ text }) => {
	return <p className={styles.text}>{text}</p>;
};
