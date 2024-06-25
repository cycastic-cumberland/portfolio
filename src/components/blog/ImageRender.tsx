import {FC} from "react";

const ImageRender: FC<{ src: string, alt?: string }> = ({ src, alt }) => {
    return <div className={"w-full flex justify-center"}>
        <img src={src} alt={alt}/>
    </div>
}

export default ImageRender;
