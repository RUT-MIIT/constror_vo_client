export interface IIcon {
	icon: 'add' | 'edit' | 'delete' | 'close';
	type?: 'elem' | 'button';
	color?: string;
	onClick?: (arg?: number | object) => void;
}
