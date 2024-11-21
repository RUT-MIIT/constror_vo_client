import type { FC } from 'react';

import { Route, Routes } from 'react-router-dom';

import { MainLayout } from '../../../shared/components/Layout/MainLayout/ui/main-layout';
import { ProgramLayout } from '../../../shared/components/Layout/ProgramLayout/ui/program-layout';
import { Profile } from '../../Profile/ui/profile';
import { Programs } from '../../Programs/ui/programs';
import { Program } from '../../Program/ui/program';

import { EROUTES } from '../../../shared/utils/routes';

export const Main: FC = () => {
	return (
		<Routes>
			<Route element={<MainLayout />}>
				<Route path={EROUTES.PROFILE} element={<Profile />} />
				<Route path={EROUTES.PROGRAMS} element={<Programs />} />
			</Route>

			<Route element={<ProgramLayout />}>
				<Route path={`${EROUTES.PROGRAM}/:id/*`} element={<Program />} />
			</Route>
		</Routes>
	);
};
