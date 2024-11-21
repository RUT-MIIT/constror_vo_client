import type { FC } from 'react';

import { useEffect } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../../store/store';

import { getProgramDetail } from '../../../store/programDetail/actions';
import { EProgramRoutes } from '../lib/program-routes';

import { ProgramInfo } from '../../ProgramInfo/ui/program-info';
import { Preloader } from '../../../shared/components/Preloader/ui/preloader';

export const Program: FC = () => {
	const params = useParams();
	const dispatch = useDispatch();

	const { loadingDetail, errorDetail } = useSelector(
		(state) => state.programDetail
	);

	useEffect(() => {
		if (params.id) {
			dispatch(getProgramDetail(params.id));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (loadingDetail) {
		return <Preloader />;
	}

	if (errorDetail) {
		return <>{errorDetail && <p>Ошибка при загрузке программы</p>}</>;
	}

	return (
		<Routes>
			<Route path={`${EProgramRoutes.INFO}/*`} element={<ProgramInfo />} />
		</Routes>
	);
};
