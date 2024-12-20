import { Route, Routes, useLocation } from 'react-router-dom';

import { useEffect } from 'react';
import { useDispatch } from '../store/store';

import {
	OnlyUnAuth,
	OnlyAuth,
} from '../shared/components/ProtectedRoute/protected-route';
import { Login } from '../pages/Login/ui/login';
import { Registration } from '../pages/Registration/ui/registration';
import { ForgotPassword } from '../pages/ForgotPassword/ui/forgot-password';
import { NotFound } from '../pages/NotFound/ui/not-found';
import { Main } from '../pages/Main/ui/main';
import { Design } from '../pages/Design/ui/design';

import { EROUTES } from '../shared/utils/routes';
import { checkUserAuth } from '../store/user/actions';

import styles from './app.module.scss';

export const App = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const background = location.state && location.state.background;

	const fetchInitialData = async () => {
		await Promise.all([dispatch(checkUserAuth())]);
	};

	useEffect(() => {
		fetchInitialData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className={styles.page}>
			<Routes location={background || location}>
				<Route
					path={EROUTES.LOGIN}
					element={<OnlyUnAuth component={<Login />} />}
				/>
				<Route
					path={EROUTES.REGISTRATION}
					element={<OnlyUnAuth component={<Registration />} />}
				/>
				<Route
					path={EROUTES.FORGOT_PASSWORD}
					element={<OnlyUnAuth component={<ForgotPassword />} />}
				/>
				<Route
					path={`${EROUTES.HOME}*`}
					element={<OnlyAuth component={<Main />} />}
				/>
				<Route path={`${EROUTES.DESIGN}/:programId/*`} element={<Design />} />
				<Route path={EROUTES.NOT_FOUND} element={<NotFound />} />
			</Routes>
			<div id='modal-root'></div>
		</div>
	);
};
