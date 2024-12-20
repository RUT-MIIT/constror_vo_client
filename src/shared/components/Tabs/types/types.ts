export interface ITab {
	label: string;
	content: React.ReactNode;
	disabled?: boolean;
}

export interface ITabsProps {
	tabs: ITab[];
}
