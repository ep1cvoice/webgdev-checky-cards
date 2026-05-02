import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styles from './MarkdownRenderer.module.css';

interface MarkdownRendererProps {
	content: string;
}

const codeComponents: Components = {
	code({ className, children, ...props }) {
		const match = /language-(\w+)/.exec(className ?? '');

		return match ? (
			<SyntaxHighlighter
				style={oneDark}
				language={match[1]}
				PreTag='div'
				customStyle={{
					background: 'transparent',
					padding: 0,
					margin: 0,
					fontSize: '15px',
					lineHeight: '1.6',
				}}
				codeTagProps={{
					style: {
						background: 'transparent',
						padding: 0,
						margin: 0,
						display: 'block',
						maxWidth: '100%',
						overflowX: 'auto',
						whiteSpace: 'pre-wrap',
						wordBreak: 'break-word',
					},
				}}>
				{String(children).replace(/\n$/, '')}
			</SyntaxHighlighter>
		) : (
			<code className={className} {...props}>
				{children}
			</code>
		);
	},
};

const MarkdownRenderer = ({ content }: MarkdownRendererProps) => {
	if (!content) return null;

	return (
		<div className={styles.markdown}>
			<ReactMarkdown components={codeComponents}>{content}</ReactMarkdown>
		</div>
	);
};

export default MarkdownRenderer;
