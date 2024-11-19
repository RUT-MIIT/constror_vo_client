import type { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { MainLayout } from '../../../shared/components/Layout/MainLayout/ui/main-layout';
import { Profile } from '../../Profile/ui/profile';
import { Programs } from '../../Programs/ui/programs';

import { EROUTES } from '../../../shared/utils/routes';

export const Main: FC = () => {
	return (
		<MainLayout>
			<Routes>
				<Route path={EROUTES.PROFILE} element={<Profile />} />
				<Route path={EROUTES.PROGRAMS} element={<Programs />} />
			</Routes>
		</MainLayout>
	);
};
