import type { FC } from 'react';
import type { ISelectProductChartProps } from '../types/types';

import styles from '../styles/select-product-chart.module.scss';

export const SelectProductChart: FC<ISelectProductChartProps> = ({
	products,
	currentProduct,
	onSelect,
}) => {
	return (
		<ul className={styles.list}>
			{products.map((elem, i) => {
				return (
					<li
						key={i}
						onClick={() => onSelect(elem)}
						className={`${styles.item} ${
							elem.id === currentProduct.id ? styles.item_active : ''
						}`}>
						{elem.id === currentProduct.id ? (
							<>
								<span className={styles.tag}>Продукт</span>
								<h4 className={styles.name}>{elem.name}</h4>
								<span className={styles.count}>{i + 1}</span>
							</>
						) : (
							<>
								<span className={styles.tag}>Продукт</span>
								<span className={styles.count}>{i + 1}</span>
							</>
						)}
					</li>
				);
			})}
		</ul>
	);
};
