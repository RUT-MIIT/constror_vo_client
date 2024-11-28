export interface IButtonProps {
	type?: 'button' | 'submit';
	width?: 'full' | 'large' | 'medium' | 'small';
	style?: 'default' | 'cancel' | 'magic';
	form?: string;
	isBlock?: boolean;
	text: string;
	onClick?: () => void;
}
