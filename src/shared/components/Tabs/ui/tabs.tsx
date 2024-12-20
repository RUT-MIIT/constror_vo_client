import type { FC } from 'react';
import type { ITabsProps } from '../types/types';

import { useState } from 'react';

import styles from '../styles/tabs.module.scss';

export const Tabs: FC<ITabsProps> = ({ tabs }) => {
	const [activeTab, setActiveTab] = useState(0);
	return (
		<div className={styles.container}>
			<div className={styles.tabs}>
				{tabs.map((tab, index) => (
					<div key={index}>
						{tab.disabled ? (
							<div className={styles.tab_disabled}>{tab.label}</div>
						) : (
							<button
								key={index}
								className={activeTab === index ? styles.tab_active : styles.tab}
								onClick={() => setActiveTab(index)}>
								{tab.label}
							</button>
						)}
					</div>
				))}
			</div>
			<div className={styles.content}>{tabs[activeTab].content}</div>
		</div>
	);
};
