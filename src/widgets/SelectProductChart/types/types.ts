import type { INode } from '../../../store/design/types';

export interface ISelectProductChartProps {
	products: INode[];
	currentProduct: INode;
	onSelect: (node: INode) => void;
}
