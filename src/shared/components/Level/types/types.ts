import type { ReactNode } from 'react';
import type { IBadge } from '../../Badge/types/types';
import type { IIcon } from '../../Icon/types/types';

export interface ILevelProps {
	title?: string;
	count?: number;
	icons?: IIcon[];
	children?: ReactNode;
}

export interface ILevelCardProps {
	id: number;
	name: string;
	description?: string;
	badges?: IBadge[];
	icons?: IIcon[];
	isActive?: boolean;
	isOpen?: boolean;
	onOpen?: (arg?: number | object) => void;
	children?: ReactNode;
}

export interface ILevelListProps {
	children?: ReactNode;
}

export interface ILevelEmptyProps {
	text: string;
}
