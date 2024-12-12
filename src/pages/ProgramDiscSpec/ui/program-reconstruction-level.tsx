import type { FC } from 'react';
import {
	ELevel,
	IDiscProduct,
	IDiscStage,
	IDiscProcess,
} from '../../../store/discSpec/types';

import { Fragment, useState, useEffect, useCallback } from 'react';

import { useDispatch, useSelector } from '../../../store/store';

import {
	addElemToActivity,
	setIsShowLevel,
} from '../../../store/discSpec/reducer';

import {
	Level,
	LevelList,
	LevelItem,
	LevelEmpty,
} from '../../../shared/components/Level';

export const ProgramReconstructionLevel: FC = () => {
	const dispatch = useDispatch();

	const { products, activity, isShowLevel } = useSelector(
		(state) => state.discSpec
	);
	const [openProductId, setOpenProductId] = useState<number | null>(null);

	const handleOpenProduct = useCallback((id: number) => {
		setOpenProductId((prevId) => (prevId === id ? null : id));
	}, []);

	const handleAddItemToActivity = useCallback(
		(type: ELevel, item: IDiscProduct | IDiscStage | IDiscProcess) => {
			dispatch(addElemToActivity({ type, item }));
			dispatch(
				setIsShowLevel({
					...isShowLevel,
					reconstruction: true,
					activity: true,
					discipline: false,
				})
			);
		},
		[dispatch, isShowLevel]
	);

	const showLevel = useCallback(() => {
		dispatch(
			setIsShowLevel({
				...isShowLevel,
				reconstruction: true,
				discipline: false,
			})
		);
	}, [dispatch, isShowLevel]);

	const hideLevel = useCallback(() => {
		dispatch(setIsShowLevel({ ...isShowLevel, reconstruction: false }));
	}, [dispatch, isShowLevel]);

	const validateProductBlock = useCallback(
		(product: IDiscProduct): boolean => {
			if (product.discipline) return true;

			if (product.stages.some((stage) => stage.discipline)) return true;

			if (
				product.stages.some((stage) =>
					stage.processes.some((process) => process.discipline)
				)
			)
				return true;

			if (!activity) return false;

			return (
				activity.level === ELevel.PRODUCT ||
				activity.level === ELevel.STAGE ||
				activity.level === ELevel.PROCESS
			);
		},
		[activity]
	);

	const validateStageBlock = useCallback(
		(product: IDiscProduct, stage: IDiscStage): boolean => {
			if (product.discipline || stage.discipline) return true;

			if (stage.processes.some((process) => process.discipline)) return true;

			if (!activity) return false;

			if (activity.level === ELevel.PRODUCT) return true;

			if (activity.level === ELevel.STAGE) {
				if (stage.product !== activity.items[0].product) return true;

				return activity.items.some((item) => item.id === stage.id);
			}

			return activity.level === ELevel.PROCESS;
		},
		[activity]
	);

	const validateProcessBlock = useCallback(
		(
			product: IDiscProduct,
			stage: IDiscStage,
			process: IDiscProcess
		): boolean => {
			if (product.discipline || stage.discipline || process.discipline)
				return true;

			if (!activity) return false;

			if (activity.level === ELevel.PRODUCT || activity.level === ELevel.STAGE)
				return true;

			if (activity.level === ELevel.PROCESS) {
				if (process.stage !== activity.items[0].stage) return true;

				return activity.items.some((item) => item.id === process.id);
			}

			return false;
		},
		[activity]
	);

	useEffect(() => {
		return () => setOpenProductId(null);
	}, []);

	return (
		<Level
			isShow={isShowLevel.reconstruction}
			onShow={showLevel}
			title='Реконструкция деятельности'
			count={products ? products.length : 0}
			icons={[{ icon: 'close', onClick: hideLevel }]}>
			{products && products.length > 0 ? (
				<LevelList>
					{products.map((product: IDiscProduct, productIndex: number) => (
						<Fragment key={product.id}>
							<LevelItem
								name={product.name}
								id={product.id}
								key={product.id}
								badge={{
									text: `Продукт ${productIndex + 1}`,
									color: 'blue-dark',
								}}
								controlColor='green'
								isActive={true}
								onOpen={() => handleOpenProduct(product.id)}
								isBlock={validateProductBlock(product)}
								icons={[
									{
										icon: 'add',
										color: 'white',
										onClick: () => {
											handleAddItemToActivity(ELevel.PRODUCT, product);
										},
									},
								]}
							/>
							{openProductId === product.id &&
								product.stages.map((stage: IDiscStage, stageIndex: number) => (
									<Fragment key={stage.id}>
										<LevelItem
											name={stage.name}
											id={stage.id}
											key={stage.id}
											badge={{
												text: `Этап ${stageIndex + 1}`,
												color: 'blue',
											}}
											controlColor='green'
											level='second'
											isBlock={validateStageBlock(product, stage)}
											icons={[
												{
													icon: 'add',
													color: 'white',
													onClick: () =>
														handleAddItemToActivity(ELevel.STAGE, stage),
												},
											]}
										/>
										{stage.processes.map(
											(process: IDiscProcess, processIndex: number) => (
												<LevelItem
													name={process.name}
													id={process.id}
													key={process.id}
													badge={{
														text: `Процесс ${processIndex + 1}`,
														color: 'blue-light',
													}}
													controlColor='green'
													level='third'
													isBlock={validateProcessBlock(
														product,
														stage,
														process
													)}
													icons={[
														{
															icon: 'add',
															color: 'white',
															onClick: () =>
																handleAddItemToActivity(
																	ELevel.PROCESS,
																	process
																),
														},
													]}
												/>
											)
										)}
									</Fragment>
								))}
						</Fragment>
					))}
				</LevelList>
			) : (
				<LevelEmpty text='Отсутствуют продукты программы' />
			)}
		</Level>
	);
};
