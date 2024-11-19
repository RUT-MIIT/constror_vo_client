export interface IIcon {
	icon: 'edit' | 'delete';
	type?: 'elem' | 'button';
	color?: string;
	onClick?: () => void;
}
