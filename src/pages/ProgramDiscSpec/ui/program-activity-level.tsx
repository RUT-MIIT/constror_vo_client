import { Fragment, useCallback, useMemo } from 'react';
import type { FC } from 'react';
import {
	type IDiscProduct,
	type IDiscStage,
	type IDiscProcess,
	ELevel,
} from '../../../store/discSpec/types';

import { useDispatch, useSelector } from '../../../store/store';
import {
	removeElemFromActivity,
	setIsShowModal,
	setIsShowLevel,
} from '../../../store/discSpec/reducer';

import {
	Level,
	LevelList,
	LevelItem,
	LevelEmpty,
} from '../../../shared/components/Level';
import { Modal } from '../../../shared/components/Modal/ui/modal';
import { Button } from '../../../shared/components/Button/ui/button';
import { AddDisciplineForm } from './add-discipline-form';

export const ProgramActivityLevel: FC = () => {
	const dispatch = useDispatch();

	const { activity, isShowModal, isShowLevel } = useSelector(
		(state) => state.discSpec
	);

	const openAddDisciplineModal = useCallback(() => {
		dispatch(setIsShowModal({ modal: 'addDiscipline', isShow: true }));
	}, [dispatch]);

	const closeModal = useCallback(() => {
		dispatch(setIsShowModal({ modal: 'addDiscipline', isShow: false }));
		dispatch(setIsShowModal({ modal: 'editDiscipline', isShow: false }));
		dispatch(setIsShowModal({ modal: 'removeDiscipline', isShow: false }));
	}, [dispatch]);

	const handleRemoveItemFromActivity = useCallback(
		(id: number) => {
			dispatch(removeElemFromActivity(id));
		},
		[dispatch]
	);

	const showLevel = useCallback(() => {
		dispatch(
			setIsShowLevel({
				...isShowLevel,
				activity: true,
			})
		);
	}, [dispatch, isShowLevel]);

	const hideLevel = useCallback(() => {
		dispatch(setIsShowLevel({ ...isShowLevel, activity: false }));
	}, [dispatch, isShowLevel]);

	const multiplicityMessage = useMemo(() => {
		if (activity) {
			if (activity.level === ELevel.PRODUCT) {
				return <span>Кратность 1. Один продукт - одна дисциплина.</span>;
			}
			if (activity.level === ELevel.STAGE) {
				if (activity.items.length > 1) {
					return <span>Кратность 2. Несколько этапов - одна дисциплина.</span>;
				}
				return <span>Кратность 3. Один этап - одна дисциплина.</span>;
			}
			if (activity.level === ELevel.PROCESS) {
				if (activity.items.length > 1) {
					return (
						<span>Кратность 4. Несколько процессов - одна дисциплина.</span>
					);
				}
				return <span>Кратность 5. Один процесс - одна дисциплина.</span>;
			}
		}
		return <span>Кратность не определена</span>;
	}, [activity]);

	const renderLevels = useMemo(() => {
		if (!activity || activity.items.length === 0) {
			return <LevelEmpty text='Отсутствуют элементы' />;
		}

		const renderProcesses = (processes: IDiscProcess[]) =>
			processes.map((process, processIndex) => (
				<LevelItem
					name={process.name}
					id={process.id}
					key={process.id}
					badge={{
						text: `Процесс ${processIndex + 1}`,
						color: 'blue-light',
					}}
					controlColor='red'
					level='third'
					icons={[]}
				/>
			));

		const renderStages = (stages: IDiscStage[]) =>
			stages.map((stage, stageIndex) => (
				<Fragment key={stage.id}>
					<LevelItem
						name={stage.name}
						id={stage.id}
						badge={{
							text: `Этап ${stageIndex + 1}`,
							color: 'blue',
						}}
						controlColor='red'
						level='second'
						icons={[]}
					/>
					{renderProcesses(stage.processes)}
				</Fragment>
			));

		const renderProducts = () => {
			if (activity.level === 'product') {
				return (activity.items as IDiscProduct[]).map(
					(product, productIndex) => (
						<Fragment key={product.id}>
							<LevelItem
								name={product.name}
								id={product.id}
								badge={{
									text: `Продукт ${productIndex + 1}`,
									color: 'blue-dark',
								}}
								controlColor='red'
								icons={[
									{
										icon: 'remove',
										color: 'white',
										onClick: () => handleRemoveItemFromActivity(product.id),
									},
								]}
							/>
							{renderStages(product.stages)}
						</Fragment>
					)
				);
			}

			if (activity.level === 'stage') {
				return (activity.items as IDiscStage[]).map((stage, stageIndex) => (
					<Fragment key={stage.id}>
						<LevelItem
							name={stage.name}
							id={stage.id}
							badge={{
								text: `Этап ${stageIndex + 1}`,
								color: 'blue',
							}}
							controlColor='red'
							level='first'
							icons={[
								{
									icon: 'remove',
									color: 'white',
									onClick: () => handleRemoveItemFromActivity(stage.id),
								},
							]}
						/>
						{renderProcesses(stage.processes)}
					</Fragment>
				));
			}

			if (activity.level === 'process') {
				return (activity.items as IDiscProcess[]).map(
					(process, processIndex) => (
						<Fragment key={process.id}>
							<LevelItem
								name={process.name}
								id={process.id}
								badge={{
									text: `Процесс ${processIndex + 1}`,
									color: 'blue-light',
								}}
								controlColor='red'
								level='first'
								icons={[
									{
										icon: 'remove',
										color: 'white',
										onClick: () => handleRemoveItemFromActivity(process.id),
									},
								]}
							/>
						</Fragment>
					)
				);
			}
		};

		return (
			<>
				{multiplicityMessage}
				<LevelList>{renderProducts()}</LevelList>
				<Button
					text='Сформировать дисциплину'
					width='full'
					onClick={openAddDisciplineModal}
				/>
			</>
		);
	}, [
		activity,
		multiplicityMessage,
		handleRemoveItemFromActivity,
		openAddDisciplineModal,
	]);

	return (
		<Level
			isShow={isShowLevel.activity}
			onShow={showLevel}
			title='Деятельность'
			count={activity?.items.length || 0}
			icons={[{ icon: 'close', onClick: hideLevel }]}>
			{renderLevels}
			{isShowModal.addDiscipline && (
				<Modal
					title='Создание дисциплины'
					isOpen={isShowModal.addDiscipline}
					onClose={closeModal}>
					<AddDisciplineForm />
				</Modal>
			)}
		</Level>
	);
};
