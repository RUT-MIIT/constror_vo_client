import type { FC } from 'react';

import ReactMarkdown from 'react-markdown';

import { Field } from '../../../shared/components/Field/ui/field';

import styles from '../styles/markdown.module.scss';

interface IMarkdownProps {
	text: string;
}

export const Markdown: FC<IMarkdownProps> = ({ text }) => {
	return (
		<Field>
			<ReactMarkdown className={styles.markdown}>{text}</ReactMarkdown>
		</Field>
	);
};
