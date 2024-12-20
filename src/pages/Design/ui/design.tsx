import type { FC } from 'react';

import { Routes, Route, useParams } from 'react-router-dom';

import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../../store/store';

import { EROUTESDESIGN } from '../../../shared/utils/routes';
import { getInitialData } from '../../../store/design/actions';

import { DesignMenu } from '../../../widgets/DesignMenu/ui/design-menu';
import { DesignMain } from '../components/DesignMain/ui/design-main';
import { DesignTeam } from '../components/DesignTeam/ui/design-team';
import { DesignProduct } from '../components/DesignProduct/ui/design-product';
import { DesignReconstruction } from '../components/DesignReconstruction/ui/design-reconstruction';
import { DesignDisciplineSpec } from '../components/DesignDisciplineSpec/ui/design-discipline-spec';
import { DesignDisciplineBasic } from '../components/DesignDisciplineBasic/ui/design-discipline-basic';
import { DesignPlan } from '../components/DesignPlan/ui/design-plan';
import { DesignAnnotation } from '../components/DesignAnnotation/ui/design-annotation';
import { Preloader } from '../../../shared/components/Preloader/ui/preloader';

import styles from '../styles/design.module.scss';

export const Design: FC = () => {
	const { programId } = useParams<{ programId: string }>();
	const dispatch = useDispatch();

	const { loadingData, errorData } = useSelector((state) => state.design);

	useEffect(() => {
		if (programId) {
			dispatch(getInitialData(Number(programId)));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (loadingData) {
		return <Preloader />;
	}

	if (errorData) {
		return <>{errorData && <p>Ошибка при загрузке данных</p>}</>;
	}

	return (
		<main className={styles.main}>
			<DesignMenu />
			<div className={styles.container}>
				<Routes>
					<Route path={EROUTESDESIGN.MAIN} element={<DesignMain />} />
					<Route path={EROUTESDESIGN.TEAM} element={<DesignTeam />} />
					<Route path={EROUTESDESIGN.PRODUCT} element={<DesignProduct />} />
					<Route
						path={EROUTESDESIGN.RECONSTRUCTION}
						element={<DesignReconstruction />}
					/>
					<Route
						path={EROUTESDESIGN.DISCIPLINE_SPEC}
						element={<DesignDisciplineSpec />}
					/>
					<Route
						path={EROUTESDESIGN.DISCIPLINE_BASIC}
						element={<DesignDisciplineBasic />}
					/>
					<Route path={EROUTESDESIGN.PLAN} element={<DesignPlan />} />
					<Route
						path={EROUTESDESIGN.ANNOTATION}
						element={<DesignAnnotation />}
					/>
				</Routes>
			</div>
		</main>
	);
};
