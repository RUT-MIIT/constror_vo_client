export interface IButtonProps {
	type?: 'button' | 'submit';
	width?: 'full' | 'large' | 'medium' | 'small' | 'auto';
	style?: 'default' | 'cancel' | 'magic' | 'light';
	form?: string;
	isBlock?: boolean;
	text: string;
	onClick?: () => void;
}
