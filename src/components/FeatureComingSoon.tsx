import {useTranslation} from "../contexts/TranslationContext.tsx";
import PageLayout from "./PageLayout.tsx";
import {Link} from "react-router-dom";

const FeatureComingSoon = () => {
    const { predefined } = useTranslation()

    return (
        <PageLayout>
            <div className={"fixed top-0 left-0 w-screen h-screen flex justify-center items-center opacity-0 animate-slidein [--slidein-delay:100ms]"}>
                <div className={"flex flex-col text-center items-center"}>
                    <div className={"sm:block hidden"}>
                        <h1 className={"text-hero-highlight-1 pb-4"}>
                            { predefined.featureWIPTitle }
                        </h1>
                        <h4 className={"project-description"}>
                            { predefined.notFoundSubText }
                            <span>
                            <Link className={'text-highlight'} to={'/'}>{predefined.notFoundUrlText}</Link>
                        </span>
                        </h4>
                    </div>
                    <div className={"sm:hidden block"}>
                        <h1 className={"text-hero-highlight-1-md pb-2"}>
                            { predefined.featureWIPTitle }
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
    )
}

export default FeatureComingSoon