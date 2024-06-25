import {FC} from "react";
import Markdown from "markdown-to-jsx";
import CodeMarkdown from "./CodeMarkdown.tsx";
import "./blog.css"
import ImageRender from "./ImageRender.tsx";

const MarkdownRender: FC<{ text: string }> = ({ text }) => {
    return <Markdown options={{
        overrides: {
            Code: {
                component: CodeMarkdown
            },
            Image: {
                component: ImageRender
            }
        }
    }}>
        { text }
    </Markdown>
}

export default MarkdownRender
