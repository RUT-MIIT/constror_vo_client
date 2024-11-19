import type { FC } from 'react';

import { useSelector } from '../../../store/store';

import { getUser } from '../../../store/user/reducer';

import { Section } from '../../../shared/components/Section/ui/section';

import styles from '../styles/profile.module.scss';

export const Profile: FC = () => {
	const user = useSelector(getUser);

	return (
		<Section sectionWidth='full'>
			{user && (
				<h1 className={styles.title}>
					Добро пожаловать, {user.last_name} {user.first_name}{' '}
					{user.middle_name}
				</h1>
			)}
		</Section>
	);
};
