import type { FC } from 'react';
import type { ITableProps } from '../types/types';

import '../styles/table.scss';

export const Table: FC<ITableProps> = ({ marginTop = '0', children }) => {
	return (
		<div className={`table table_margin-top_${marginTop}`}>{children}</div>
	);
};
