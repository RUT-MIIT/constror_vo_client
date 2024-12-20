import type { FC } from 'react';

import { useEffect } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../../store/store';

import { getProgramDetail } from '../../../store/programDetail/actions';
import { EProgramRoutes } from '../lib/program-routes';

import { ProgramInfo } from '../../ProgramInfo/ui/program-info';
import { ProgramProducts } from '../../ProgramProducts/ui/program-products';
import { ProgramReconstruction } from '../../ProgramReconstruction/ui/program-reconstruction';
import { ProgramDiscSpec } from '../../ProgramDiscSpec/ui/program-disc-spec';
import { ProgramDiscBasic } from '../../ProgramDiscBasic/ui/program-disc-basic';
import { ProgramEduPlan } from '../../ProgramEduPlan/ui/program-edu-plan';
import { ProgramDesign } from '../../ProgramDesign/ui/program-design';
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
			<Route
				path={`${EProgramRoutes.PRODUCTS}/*`}
				element={<ProgramProducts />}
			/>
			<Route
				path={`${EProgramRoutes.RECONSTRUCTION}/*`}
				element={<ProgramReconstruction />}
			/>
			<Route
				path={`${EProgramRoutes.DISC_SPEC}/*`}
				element={<ProgramDiscSpec />}
			/>
			<Route
				path={`${EProgramRoutes.DISC_BASIC}/*`}
				element={<ProgramDiscBasic />}
			/>
			<Route
				path={`${EProgramRoutes.EDU_PLAN}/*`}
				element={<ProgramEduPlan />}
			/>
			<Route path={`${EProgramRoutes.DESIGN}/*`} element={<ProgramDesign />} />
		</Routes>
	);
};
