import type { FC } from 'react';
import type { INode } from '../../../../../store/design/types';

import { useState, useEffect } from 'react';
import { useSelector } from '../../../../../store/store';

import { OrgChart } from '../../../../../widgets/OrgChart/ui/org-chart';
import { SelectProductChart } from '../../../../../widgets/SelectProductChart/ui/select-product-chart';

import styles from '../styles/design-discipline-spec.module.scss';

export const DesignDisciplineSpec: FC = () => {
	const { disciplineSpec } = useSelector((state) => state.design);

	const [currentProduct, setCurrentProduct] = useState<INode>(
		disciplineSpec[0].nodes[0]
	);
	const [currentNodes, setCurrentNodes] = useState<INode[]>(
		disciplineSpec[0].nodes
	);

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
		setCurrentNodes(disciplineSpec[0].nodes);
		setCurrentProduct(disciplineSpec[0].nodes[0]);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className={styles.container}>
			<h2 className={styles.title}>Проектирование ПД</h2>
			<p className={styles.subtitle}>продукт «{currentProduct.name}»</p>
			<SelectProductChart
				products={disciplineSpec.map((elem) => elem.nodes[0])}
				currentProduct={currentProduct}
				onSelect={handleSelectProduct}
			/>
			<OrgChart nodes={currentNodes} layout='normal' type='discipline' />
		</div>
	);
};
