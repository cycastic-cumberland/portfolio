import {FC, ReactNode} from "react";
import {Link} from "react-router-dom";

const SocialMediaItem: FC<{ text: string, url: string, icon: ReactNode}> = ({ text, url, icon }) => {
    return (
        <Link to={url} className={`social-media-box group`}>
            <div className={"mr-2 w-8 h-8 bg-font rounded-full flex justify-center items-center"}>
                {icon}
            </div>
            <div className={"text-social-media"}>
                {text}
            </div>
        </Link>)
}

export default SocialMediaItem;