export interface ISelectProps<T extends { id: string | number; name: string }> {
	options: T[];
	currentOption: T;
	onChooseOption: (option: T) => void;
}
