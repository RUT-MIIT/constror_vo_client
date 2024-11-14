import type { ReactNode } from 'react';

export interface ISectionProps {
	sectionWidth?: 'default' | 'full' | 'large' | 'small';
	children?: ReactNode;
}
