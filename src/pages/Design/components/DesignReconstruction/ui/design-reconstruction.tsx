import type { FC } from 'react';
import type { INode } from '../../../../../store/design/types';

import { useState, useEffect } from 'react';
import { useSelector } from '../../../../../store/store';

import { OrgChart } from '../../../../../widgets/OrgChart/ui/org-chart';
import { SelectProductChart } from '../../../../../widgets/SelectProductChart/ui/select-product-chart';

import styles from '../styles/design-reconstruction.module.scss';

export const DesignReconstruction: FC = () => {
	const { reconstruction } = useSelector((state) => state.design);

	const [currentProduct, setCurrentProduct] = useState<INode>(
		reconstruction[0].nodes[0]
	);
	const [currentNodes, setCurrentNodes] = useState<INode[]>(
		reconstruction[0].nodes
	);

	const handleSelectProduct = (item: INode) => {
		setCurrentProduct(item);
		setCurrentNodes(reconstruction[Number(item.id) - 1].nodes);
	};

	useEffect(() => {
		setCurrentNodes(reconstruction[0].nodes);
		setCurrentProduct(reconstruction[0].nodes[0]);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className={styles.container}>
			<h2 className={styles.title}>Реконструкция деятельности</h2>
			<p className={styles.subtitle}>продукт «{currentProduct.name}»</p>
			<SelectProductChart
				products={reconstruction.map((elem) => elem.nodes[0])}
				currentProduct={currentProduct}
				onSelect={handleSelectProduct}
			/>
			<OrgChart nodes={currentNodes} layout='mixed' type='default' />
		</div>
	);
};
