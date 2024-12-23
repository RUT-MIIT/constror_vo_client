import type { FC } from 'react';
import type { INode } from '../../../../../store/design/types';

import { useState, useEffect } from 'react';
import { useSelector } from '../../../../../store/store';

import { OrgChart } from '../../../../../widgets/OrgChart/ui/org-chart';
import { SelectProductChart } from '../../../../../widgets/SelectProductChart/ui/select-product-chart';

import styles from '../styles/design-discipline-spec.module.scss';

export const DesignDisciplineSpec: FC = () => {
	const { disciplineSpec } = useSelector((state) => state.design);

	const [currentProduct, setCurrentProduct] = useState<INode | null>(null);
	const [currentNodes, setCurrentNodes] = useState<INode[]>([]);

	const handleSelectProduct = (item: INode) => {
		setCurrentProduct(item);
		const selectedSpec = disciplineSpec.find(
			(spec) => String(spec.id) === String(item.id)
		);
		if (selectedSpec) {
			setCurrentNodes(selectedSpec.nodes);
		}
	};

	useEffect(() => {
		if (disciplineSpec.length > 0 && disciplineSpec[0].nodes.length > 0) {
			setCurrentNodes(disciplineSpec[0].nodes);
			setCurrentProduct(disciplineSpec[0].nodes[0]);
		}
	}, [disciplineSpec]);

	return (
		<div className={styles.container}>
			<h2 className={styles.title}>Проектирование ПД</h2>
			{currentProduct && (
				<>
					<p className={styles.subtitle}>продукт «{currentProduct.name}»</p>
					<SelectProductChart
						products={disciplineSpec.map((elem) => elem.nodes[0])}
						currentProduct={currentProduct}
						onSelect={handleSelectProduct}
					/>
				</>
			)}
			{currentNodes.length > 0 && (
				<OrgChart nodes={currentNodes} layout='normal' type='discipline' />
			)}
		</div>
	);
};
