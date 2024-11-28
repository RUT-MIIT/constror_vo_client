export interface IMethodologyManagerProps {
	currentValues: string[];
	onAdd: (item: string) => void;
	onRemove: (item: string) => void;
}

export interface IAddMethodologyValues {
	name: string;
}

export interface IAddMethodologyFormProps {
	onAdd: (name: string) => void;
}

export interface ISelectMethodologyFormProps {
	currentValues: string[];
	onSelect: (name: string) => void;
}

export interface IMethodology {
	id: number;
	name: string;
}
