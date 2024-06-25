import {FC, isValidElement, ReactNode, useEffect, useState} from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import {PrismLight as SyntaxHighlighter} from 'react-syntax-highlighter';
import {materialDark} from 'react-syntax-highlighter/dist/esm/styles/prism';

const extractTextFromReactNode = (node: string | number | ReactNode): string => {
    if (typeof node === 'string' || typeof node === 'number') {
        return node.toString();
    }

    if (Array.isArray(node)) {
        return node.map(extractTextFromReactNode).join('\n');
    }

    if (isValidElement(node)) {
        return extractTextFromReactNode(node.props.children);
    }

    return '';
};

const CodeMarkdown: FC<{ children: (string | ReactNode)[], language?: string }> = ({children, language}) => {
    const [code, setCode] = useState('')

    useEffect(() => {
        // console.log('Code: ', children)
        if (children.length === 0) return;
        if (typeof children[0] === "string") {
            setCode(children[0])
        }
        let str = ""
        for (let i = 0; i < children.length; i++) {
            const elem = children[i];
            str += extractTextFromReactNode(elem)
        }
        setCode(str)
    }, [children]);

    return (
        <div className="flex flex-col w-full bg-border my-4">
            <div className="flex flex-row w-full">
                <div className={"ml-5 mt-2 text-font"}>
                    {language}
                </div>
                <div className={"w-full"}/>
                <CopyToClipboard text={code}>
                    <button
                        className={"mr-5 mt-2 min-w-fit flex flex-row text-font min-h-full hover:text-highlight linear-animation"}>
                        Copy
                    </button>
                </CopyToClipboard>
            </div>
            <SyntaxHighlighter
                language={language}
                style={materialDark}
            >
                {code}
            </SyntaxHighlighter>
        </div>
    )
}

export default CodeMarkdown