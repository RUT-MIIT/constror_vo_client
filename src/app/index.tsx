import { Route, Routes } from 'react-router-dom';

import { Login } from '../pages/Login/ui/login';
import { Registration } from '../pages/Registration/ui/registration';
import { ForgotPassword } from '../pages/ForgotPassword/ui/forgot-password';

import styles from './app.module.scss';

export const App = () => {
	return (
		<div className={styles.page}>
			<Routes>
				<Route path='/' element={<Login />} />
				<Route path='/registration' element={<Registration />} />
				<Route path='/forgot-password' element={<ForgotPassword />} />
			</Routes>
			<div id='modal-root'></div>
		</div>
	);
};
