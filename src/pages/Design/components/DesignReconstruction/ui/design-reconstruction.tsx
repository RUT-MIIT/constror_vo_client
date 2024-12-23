import type { FC } from 'react';
import type { INode } from '../../../../../store/design/types';

import { useState, useEffect } from 'react';
import { useSelector } from '../../../../../store/store';

import { OrgChart } from '../../../../../widgets/OrgChart/ui/org-chart';
import { SelectProductChart } from '../../../../../widgets/SelectProductChart/ui/select-product-chart';

import styles from '../styles/design-reconstruction.module.scss';

export const DesignReconstruction: FC = () => {
	const { reconstruction } = useSelector((state) => state.design);

	const [currentProduct, setCurrentProduct] = useState<INode | null>(null);
	const [currentNodes, setCurrentNodes] = useState<INode[]>([]);

	const handleSelectProduct = (item: INode) => {
		setCurrentProduct(item);
		setCurrentNodes(reconstruction[Number(item.id) - 1].nodes);
	};

	useEffect(() => {
		if (reconstruction.length > 0 && reconstruction[0].nodes.length > 0) {
			setCurrentNodes(reconstruction[0].nodes);
			setCurrentProduct(reconstruction[0].nodes[0]);
		}
	}, [reconstruction]);

	return (
		<div className={styles.container}>
			<h2 className={styles.title}>Реконструкция деятельности</h2>
			{currentProduct && (
				<>
					<p className={styles.subtitle}>продукт «{currentProduct.name}»</p>
					<SelectProductChart
						products={reconstruction.map((elem) => elem.nodes[0])}
						currentProduct={currentProduct}
						onSelect={handleSelectProduct}
					/>
				</>
			)}
			{currentNodes.length > 0 && (
				<OrgChart nodes={currentNodes} layout='mixed' type='default' />
			)}
		</div>
	);
};
