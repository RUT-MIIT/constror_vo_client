import type { INode } from '../../../store/design/types';

export interface ITreeProps {
	nodes: INode[];
	onClickNode: (node: unknown) => void;
	layout: string;
}

export interface IOrgChartProps {
	nodes: INode[];
	layout?: string;
	type?: 'default' | 'discipline';
}
