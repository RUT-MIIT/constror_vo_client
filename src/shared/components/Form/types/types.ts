import type { ReactNode, FormEventHandler, ChangeEvent } from 'react';

export interface IFormProps {
	title?: string;
	titleAlign?: 'center' | 'left';
	formWidth?: 'full' | 'large' | 'default' | 'small';
	name: string;
	onSubmit?: FormEventHandler<HTMLFormElement>;
	children?: ReactNode;
}

export interface IFormFieldProps {
	title?: string;
	fieldError?: IFormFieldError;
	children?: ReactNode;
}

export interface IFormFieldError {
	text: string;
	isShow: boolean;
}

export interface IFormInputProps {
	type?: 'text' | 'number';
	name: string;
	placeholder?: string;
	value: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface IFormTextareaProps {
	name: string;
	placeholder?: string;
	value: string;
	onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export interface IFormButtonsProps {
	children?: ReactNode;
}

export interface IFormLink {
	text: string;
	label: string;
	url: string;
}

export interface IFormLinksProps {
	links: IFormLink[];
}

export type TFormValidationErrors = Record<string, string | undefined>;
