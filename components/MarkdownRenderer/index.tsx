import ReactMarkdown from "react-markdown";

const MarkdownRenderer: React.FC<{ markdown: string }> = ({ markdown }) => (
    <ReactMarkdown
        source={markdown}
        renderers={{
            link: (props) => (
                <a href={props.href} target="_blank" rel="nofollow noreferrer">
                    {props.children}
                </a>
            ),
        }}
    />
);

export default MarkdownRenderer;
