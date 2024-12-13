import type { ReactNode } from 'react';

export interface ISectionProps {
	sectionWidth?: 'default' | 'full' | 'large' | 'small';
	sectionHeight?: 'page' | 'card';
	sectionTitle?: ISectionTitle;
	sectionDescription?: string;
	children?: ReactNode;
}

export interface ISectionImgProps {
	sectionWidth?: 'default' | 'full' | 'large' | 'small';
	sectionTitle?: ISectionTitle;
	sectionDescription?: string;
	children?: ReactNode;
}

interface ISectionTitle {
	text: string;
	size?: 'default' | 'large' | 'small';
}
