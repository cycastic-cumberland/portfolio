import PageLayout from "../PageLayout.tsx";
import {Link, useLocation} from "react-router-dom";
import {useProjects} from "../../contexts/ProjectsContext.tsx";
import {useTranslation} from "../../contexts/TranslationContext.tsx";
import {useEffect, useState} from "react";

const IntroductoryComingSoon = () => {
    const { predefined } = useTranslation()
    const { projectInfos } = useProjects();
    const location = useLocation();
    const [repoUrl, setRepoUrl] = useState<string | undefined>(undefined)

    useEffect(() => {
        const pathArray = location.pathname.split('/');
        const lastSegment = pathArray[pathArray.length - 1];
        console.log('last segment:', lastSegment)

        for (let i = 0; i < projectInfos.length; i++){
            console.log("Iterating:", i, ": ID:", projectInfos[i].id)
            if (projectInfos[i].id === lastSegment){
                setRepoUrl(projectInfos[i].repoUrl)
                break;
            }
        }
    }, [location.pathname, projectInfos]);

    return (
        <PageLayout>
            <div className={"fixed top-0 left-0 w-screen h-screen flex justify-center items-center opacity-0 animate-slidein [--slidein-delay:100ms]"}>
                <div className={"sm:block hidden"}>
                    <div className={"flex flex-col text-center items-center"}>
                        <h1 className={"text-hero-highlight-1 pb-4"}>
                            { predefined.introductoryWIPTitle }
                        </h1>
                        { repoUrl === undefined ? undefined : (<h4 className={"project-description"}>
                            { predefined.introductoryWIPSubtext }
                            <span>
                                <Link className={'text-highlight'} to={repoUrl}>{predefined.introductoryWIPUrlText}</Link>
                            </span>
                        </h4>) }
                    </div>
                </div>
                <div className={"sm:hidden block"}>
                    <div className={"flex flex-col text-center items-center"}>
                        <h1 className={"text-hero-highlight-1-md pb-2"}>
                            { predefined.introductoryWIPTitle }
                        </h1>
                        { repoUrl === undefined ? undefined : (<h4 className={"project-description"}>
                            { predefined.introductoryWIPSubtext }
                            <span>
                                <Link className={'text-highlight'} to={repoUrl}>{predefined.introductoryWIPUrlText}</Link>
                            </span>
                        </h4>) }
                    </div>
                </div>
            </div>
        </PageLayout>
    )
}

export default IntroductoryComingSoon;