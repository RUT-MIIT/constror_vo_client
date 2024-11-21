import type { FC } from 'react';
import type { ITableProps } from '../types/types';

import '../styles/table.scss';

export const Table: FC<ITableProps> = ({ children }) => {
	return <div className='table'>{children}</div>;
};
