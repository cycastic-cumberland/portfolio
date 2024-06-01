import PageLayout from "./PageLayout.tsx";
import {Link} from "react-router-dom";
import {useTranslation} from "../contexts/TranslationContext.tsx";

const NotFound = () => {
    const { predefined } = useTranslation()

    return <PageLayout>
        <div className={"fixed top-0 left-0 w-screen h-screen flex justify-center items-center opacity-0 animate-slidein [--slidein-delay:100ms]"}>
            <div className={"sm:block hidden"}>
                <div className={"flex flex-col text-center items-center"}>
                    <h1 className={"text-hero-highlight-1 pb-4"}>
                        { predefined.notFoundTitle }
                    </h1>
                    <h4 className={"project-description"}>
                        { predefined.notFoundSubText }
                        <span>
                            <Link className={'text-highlight'} to={'/'}>{predefined.notFoundUrlText}</Link>
                        </span>
                    </h4>
                </div>
            </div>
            <div className={"sm:hidden block"}>
                <div className={"flex flex-col text-center items-center"}>
                    <h1 className={"text-hero-highlight-1-md pb-2"}>
                        { predefined.notFoundTitle }
                    </h1>
                    <h4 className={"project-description"}>
                        { predefined.notFoundSubText }
                        <span>
                            <Link className={'text-highlight'} to={'/'}>{predefined.notFoundUrlText}</Link>
                        </span>
                    </h4>
                </div>
            </div>
        </div>
    </PageLayout>
}

export default NotFound;