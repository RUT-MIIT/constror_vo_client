import type { FC } from 'react';
import type { IDesignProduct } from '../../../../../store/design/types';

import { useState } from 'react';
import { useSelector } from '../../../../../store/store';

import { ContentTemplate } from '../../../../../features/ContentTemplate/ui/content-template';
import { TextTemplate } from '../../../../../features/TextTemplate/ui/text-template';
import { Modal } from '../../../../../shared/components/Modal/ui/modal';
import { Tabs } from '../../../../../shared/components/Tabs/ui/tabs';

import styles from '../styles/design-product.module.scss';

export const DesignProduct: FC = () => {
	const { products } = useSelector((state) => state.design);

	const [currentProduct, setCurrentProduct] = useState<IDesignProduct | null>(
		null
	);

	const openModal = (item: IDesignProduct) => {
		setCurrentProduct(item);
	};

	const closeModal = () => {
		setCurrentProduct(null);
	};

	const modalTabs = [
		{
			label: 'Нормативные акты',
			content: currentProduct?.nsis.map((item, i) => (
				<ContentTemplate key={i} type='nsi' text={item} id={i + 1} />
			)),
		},
		{
			label: 'Описание продукта',
			content: <TextTemplate text={currentProduct?.description || ''} />,
		},
	];

	return (
		<div className={styles.container}>
			<div className={styles.spiral}></div>
			<h2 className={styles.title}>Список продуктов</h2>
			<ul className={styles.list}>
				{products.map((elem, i) => (
					<li
						key={i}
						onClick={() => openModal(elem)}
						className={`${styles.item} ${styles['item_color_dark']}`}>
						<span className={styles.count}>{i + 1}</span>
						<div className={styles.icon_container}>
							<div
								className={`${styles.icon} ${styles['icon_type_politic']}`}></div>
						</div>
						<div className={styles.name}>{elem.name}</div>
						<div className={styles.nsi}>{elem.nsis.length} НСИ</div>
					</li>
				))}
			</ul>
			{currentProduct && (
				<Modal
					isOpen={currentProduct !== null}
					onClose={closeModal}
					title={currentProduct.name}
					modalWidth='large'>
					<Tabs tabs={modalTabs} />
				</Modal>
			)}
		</div>
	);
};
