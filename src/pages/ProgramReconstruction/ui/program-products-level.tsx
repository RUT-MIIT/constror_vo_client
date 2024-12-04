import type { FC } from 'react';
import type { IReconstructionProduct } from '../../../store/reconstruction/types';

import { useDispatch, useSelector } from '../../../store/store';

import {
	setCurrentProduct,
	setCurrentStage,
	setCurrentProcess,
	setIsShowLevel,
} from '../../../store/reconstruction/reducer';

import {
	Level,
	LevelList,
	LevelCard,
	LevelEmpty,
} from '../../../shared/components/Level';

export const ProgramProductsLevel: FC = () => {
	const dispatch = useDispatch();

	const { initialData, currentProduct, isShowLevel } = useSelector(
		(state) => state.reconstruction
	);

	const handleOpenProduct = (item: IReconstructionProduct) => {
		dispatch(setCurrentProduct(item));
		dispatch(setCurrentStage(null));
		dispatch(setCurrentProcess(null));
	};

	const showLevel = () => {
		dispatch(setIsShowLevel({ ...isShowLevel, product: true, process: false }));
	};

	const hideLevel = () => {
		dispatch(setIsShowLevel({ ...isShowLevel, product: false }));
	};

	return (
		<Level
			isShow={isShowLevel.product}
			onShow={showLevel}
			title='Продукты'
			count={initialData ? initialData.length : 0}
			icons={[{ icon: 'close', onClick: hideLevel }]}>
			{initialData && initialData.length > 0 ? (
				<LevelList>
					{initialData.map((elem, i) => (
						<LevelCard
							name={elem.name}
							id={elem.id}
							key={elem.id}
							badges={[{ text: `Продукт ${i + 1}` }]}
							isActive={true}
							isOpen={elem.id === currentProduct?.id}
							onOpen={() => handleOpenProduct(elem)}
							icons={[]}
						/>
					))}
				</LevelList>
			) : (
				<LevelEmpty text='Отсутствуют продукты программы' />
			)}
		</Level>
	);
};
