import {useTranslation} from "../contexts/TranslationContext.tsx";
import {Dispatch, FC, MutableRefObject, ReactNode, SetStateAction, useEffect, useRef, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {GithubPage, MailtoURL} from "../constants.ts";
import {FaGithub, FaRss} from "react-icons/fa";
import {MdOutlineMail} from "react-icons/md";
import {ProjectInfo} from "../contexts/ProjectsContextsType.ts";
import {useProjects} from "../contexts/ProjectsContext.tsx";
import PageLayout from "./PageLayout.tsx";
import pfp from '../assets/its-a-me.png'

const getGreeting = (languageSet: Record<string, string>) => {
    const hours = new Date().getHours();

    if (hours >= 18 || hours < 3){
        return languageSet.heroHeaderEvening;
    }
    if (hours >= 12){
        return languageSet.heroHeaderAfternoon;
    }
    else {
        return languageSet.heroHeaderMorning;
    }
}

const HeroSection = () => {
    const { predefined } = useTranslation();

    return <div>
        <div className={"mt-20 hidden sm:block"}>
            <div className={"flex flex-row opacity-0 animate-slidein [--slidein-delay:300ms] mt-3 pb-3"}>
                <h1 className="text-hero-uncommon">
                    {getGreeting(predefined)}
                </h1>
            </div>
            <div className={"flex flex-row opacity-0 animate-slidein [--slidein-delay:500ms] mt-3 pb-3"}>
                <h1 className="text-hero-uncommon">
                    {`${predefined.heroHeader2} `}
                    <span className="text-hero-highlight-1">
                        {predefined.heroHeader2inline1}
                    </span>
                    <span className="text-hero-uncommon">
                        {predefined.heroHeader2inline2}
                    </span>
                </h1>
            </div>
            <div className={"flex flex-row opacity-0 animate-slidein [--slidein-delay:700ms] mt-3 pb-3"}>
                <h1 className="text-hero-uncommon">
                    {`${predefined.heroHeader3} `}
                    <span className="text-hero-highlight-1">
                        {`${predefined.heroHeader3inline1} `}
                    </span>
                    <span className="text-hero-uncommon">
                        {predefined.heroHeader3inline2}
                    </span>
                </h1>
            </div>
            <div className={"flex flex-row opacity-0 animate-slidein [--slidein-delay:900ms] mt-3 pb-3"}>
                <h1 className="text-hero-uncommon">
                    {predefined.heroHeader4}
                </h1>
            </div>
        </div>
        <div className={"my-5 sm:hidden block"}>
            <div className={"flex flex-row opacity-0 animate-slidein [--slidein-delay:300ms]"}>
                <h1 className="text-hero-uncommon-sm">
                    {getGreeting(predefined)}
                    <span className="text-hero-uncommon-sm">
                        {predefined.heroHeader2}
                    </span>
                    <span className="text-hero-highlight-1-sm">
                        {predefined.heroHeader2inline1}
                    </span>
                    <span className="text-hero-uncommon-sm">
                        {predefined.heroHeader2inline2}
                    </span>
                    <span className="text-hero-uncommon-sm">
                        {predefined.heroHeader3}
                    </span>
                        <span className="text-hero-highlight-1-sm">
                        {predefined.heroHeader3inline1}
                    </span>
                    <span className="text-hero-uncommon-sm">
                        {predefined.heroHeader3inline2}
                    </span>
                    <span className="text-hero-uncommon-sm">
                        {predefined.heroHeader4}
                    </span>
                </h1>
            </div>
        </div>
    </div>
}

const SocialMediaItem: FC<{ text: string, url: string, icon: ReactNode }> = ({ text, url, icon }) => {
    return (
        <Link to={url} className={"social-media-box group"}>
            <div className={"mr-2 w-8 h-8 bg-font rounded-full flex justify-center items-center"}>
                {icon}
            </div>
            <div className={"text-social-media"}>
                {text}
            </div>
        </Link>)
}

const SocialMedia = () => {
    const { predefined } = useTranslation();

    return <>
        <div className={"hidden sm:block"}>
            <div className={"flex flex-wrap mb-5 opacity-0 animate-slidein [--slidein-delay:900ms]"}>
                <SocialMediaItem text={predefined.smItem1} url={GithubPage} icon={<FaGithub size={20}/>}/>
                <SocialMediaItem text={predefined.smItem2} url={'/blogs'} icon={<FaRss size={20}/>}/>
                <SocialMediaItem text={predefined.smItem3} url={MailtoURL} icon={<MdOutlineMail size={20}/>}/>
            </div>
        </div>
        <div className={"sm:hidden block"}>
            <div className={"flex flex-wrap justify-center mb-5 opacity-0 animate-slidein [--slidein-delay:500ms]"}>
                <SocialMediaItem text={predefined.smItem1} url={GithubPage} icon={<FaGithub size={16}/>}/>
                <SocialMediaItem text={predefined.smItem2} url={'/blogs'} icon={<FaRss size={16}/>}/>
                <SocialMediaItem text={predefined.smItem3} url={MailtoURL} icon={<MdOutlineMail size={16}/>}/>
            </div>
        </div>
    </>
}

const ProjectShowcase: FC<{ info: ProjectInfo }> = ({ info }) => {
    const { predefined } = useTranslation()

    return (
        <>
            <Link to={info.link} className={"sm:block hidden group w-96 aspect-square"}>
                <div className={"px-2 py-2 w-full h-full"}>
                    <div className={"project-card"}>
                        <img className={"rounded-tl-2xl rounded-tr-2xl h-48 object-cover"} alt={info.id} src={info.capsuleUrl} />
                        <div className={"mt-2 mx-2"}>
                            <h1 className={"project-name"}>
                                { info.translations[predefined.id].name }
                            </h1>
                            <p className={"project-description mt-2"}>
                                { info.translations[predefined.id].shortDescription }
                            </p>
                        </div>
                    </div>
                </div>
            </Link>
            <Link to={info.link} className={"sm:hidden block group w-full min-h-fit aspect-square"}>
                <div className={"px-2 py-2 w-full h-full"}>
                    <div className={"project-card"}>
                        <img className={"rounded-tl-2xl rounded-tr-2xl h-1/2 object-cover"} alt={info.id} src={info.capsuleUrl} />
                        <div className={"mt-2 mx-2"}>
                            <h1 className={"project-name"}>
                                { info.translations[predefined.id].name }
                            </h1>
                            <h5 className={"project-description my-2"}>
                                { info.translations[predefined.id].shortDescription }
                            </h5>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    )
}

const GithubShowcase = () => {
    const { predefined } = useTranslation()

    return <>
        <Link to={GithubPage} className={"sm:block hidden group w-96 aspect-square"}>
            <div className={"px-2 py-2 w-full h-full"}>
                <div className={"project-card justify-center items-center text-center"}>
                    <div className={"flex flex-col justify-center items-center text-center"}>
                        <div className={"mr-2 w-16 h-16 bg-font rounded-full flex justify-center items-center"}>
                            <FaGithub size={50}/>
                        </div>
                        <p className={"project-description mt-2"}>
                            { predefined.myWorksFullRepo }
                        </p>
                    </div>
                </div>
            </div>
        </Link>
        <Link to={GithubPage} className={"sm:hidden block group w-full aspect-square"}>
            <div className={"px-2 py-2 w-full h-full"}>
                <div className={"project-card justify-center items-center text-center"}>
                    <div className={"mr-2 w-16 h-16 bg-font rounded-full flex justify-center items-center"}>
                        <FaGithub size={50}/>
                    </div>
                    <p className={"project-description my-2"}>
                        { predefined.myWorksFullRepo }
                    </p>
                </div>
            </div>
        </Link>
    </>
}

const MyProjects = () => {
    const { predefined } = useTranslation();
    const { projectInfos } = useProjects();

    return <div className={"mt-4"}>
        <div className={"sm:block hidden opacity-0 animate-slidein [--slidein-delay:900ms]"}>
            <div className={"flex flex-col w-full"}>
                <div className={"flex flex-row mt-2"}>
                    <div className={"text-hero-highlight-1-md"}>
                        {predefined.myWorksTitle}
                    </div>
                </div>
                <div className={"mt-4 flex flex-wrap"}>
                    { projectInfos.slice(0, 5).map((value, index) => <ProjectShowcase info={value} key={index} />) }
                    <GithubShowcase/>
                </div>
            </div>
        </div>
        <div className={"sm:hidden block opacity-0 animate-slidein [--slidein-delay:500ms]"}>
            <div className={"flex flex-col w-full"}>
                <div className={"flex flex-row justify-center mt-2"}>
                    <div className={"text-hero-highlight-1-sm"}>
                        {predefined.myWorksTitle}
                    </div>
                </div>
                <div className={"mt-4 flex flex-col"}>
                    { projectInfos.slice(0, 3).map((value, index) => <ProjectShowcase info={value} key={index} />) }
                    <GithubShowcase/>
                </div>
            </div>
        </div>
    </div>
}

const ProfilePictureDisplay = () => {
    return <>
        <img className={"sm:block hidden w-96 aspect-square rounded-full"} alt={'profile-picture'} src={pfp} />
        <img className={"sm:hidden block w-64 aspect-square rounded-full"} alt={'profile-picture'} src={pfp} />
    </>
}

const About = () => {
    const { predefined } = useTranslation()
    return (<div>
        <div className={"sm:block hidden opacity-0 animate-slidein [--slidein-delay:900ms]"}>
            <div className={"flex flex-col w-full"}>
                <div className={"flex flex-row mt-10"}>
                    <div className={"text-hero-highlight-1-md"}>
                        {predefined.introTitle}
                    </div>
                </div>
                <div className={"flex flex-wrap w-full mt-4"}>
                    <div className={"max-w-4xl mr-8"}>
                        <h4 className={"text-about"}>
                            {predefined.introDesc1p1}
                            <span className={"text-about-highlighted"}>
                                {predefined.introDesc1p2}
                            </span>
                            <span className={"text-about"}>
                                {predefined.introDesc1p3}
                            </span>
                            <span className={"text-about-highlighted"}>
                                {predefined.introDesc1p4}
                            </span>
                            <span className={"text-about"}>
                                {predefined.introDesc1p5}
                            </span>
                            <span className={"text-about-highlighted"}>
                                {predefined.introDesc1p6}
                            </span>
                            <span className={"text-about"}>
                                {predefined.introDesc1p7}
                            </span>
                            <span className={"text-about-highlighted"}>
                                {predefined.introDesc1p8}
                            </span>
                            <span className={"text-about"}>
                                {predefined.introDesc1p9}
                            </span>
                        </h4>
                        <h4 className={"text-about mt-4"}>
                            {predefined.introDesc2p1}
                        </h4>
                        <div className={"h-32"}/> { /* Padding */ }
                    </div>
                    <div>
                        <ProfilePictureDisplay/>
                    </div>
                </div>
            </div>
        </div>
        <div className={"sm:hidden block opacity-0 animate-slidein [--slidein-delay:500ms]"}>
            <div className={"flex flex-col w-full"}>
                <div className={"flex flex-row justify-center mt-8"}>
                    <div className={"text-hero-highlight-1-sm"}>
                        {predefined.introTitle}
                    </div>
                </div>
                <div className={"flex flex-col w-full mt-4 items-center"}>
                    <ProfilePictureDisplay/>
                    <div className={"mt-4"}>
                        <h4 className={"text-about-sm"}>
                            {predefined.introDesc1p1}
                            <span className={"text-about-highlighted-sm"}>
                                {predefined.introDesc1p2}
                            </span>
                            <span className={"text-about-sm"}>
                                {predefined.introDesc1p3}
                            </span>
                            <span className={"text-about-highlighted-sm"}>
                                {predefined.introDesc1p4}
                            </span>
                            <span className={"text-about-sm"}>
                                {predefined.introDesc1p5}
                            </span>
                            <span className={"text-about-highlighted-sm"}>
                                {predefined.introDesc1p6}
                            </span>
                            <span className={"text-about-sm"}>
                                {predefined.introDesc1p7}
                            </span>
                            <span className={"text-about-highlighted-sm"}>
                                {predefined.introDesc1p8}
                            </span>
                            <span className={"text-about-sm"}>
                                {predefined.introDesc1p9}
                            </span>
                        </h4>
                        <h4 className={"text-about-sm mt-2"}>
                            {predefined.introDesc2p1}
                        </h4>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}

const Skills = () => {
    const { predefined } = useTranslation()
    const [languages, setLanguages] = useState([] as string[])
    const [technologies, setTechnologies] = useState([] as string[])
    const [databases, setDatabases] = useState([] as string[])
    const [tools, setTools] = useState([] as string[])

    useEffect(() => {
        const quickSet = (initial: string, setter: Dispatch<SetStateAction<string[]>>) => {
            const arr = []
            for (let i = 1; ; i++){
                const key = `${initial}${i}`
                if (predefined[key] !== undefined) {
                    arr.push(predefined[key])
                    continue
                }
                break
            }
            setter(arr)
        }

        quickSet('skillsLanguage', setLanguages)
        quickSet('skillsTechnology', setTechnologies)
        quickSet('skillsDatabase', setDatabases)
        quickSet('skillsTool', setTools)
    }, [predefined]);

    return <>
        <div className={"sm:block hidden opacity-0 animate-slidein [--slidein-delay:900ms]"}>
            <div className={"flex flex-col w-full"}>
                <div className={"flex flex-row mt-2"}>
                    <div className={"text-hero-highlight-1-md"}>
                        {predefined.skillsTitle}
                    </div>
                </div>
                <div className={"flex flex-row w-full mt-4"}>
                    <div className={"w-full flex flex-col text-center"}>
                        <h4 className={"skills-title"}>
                            { predefined.skillsLanguages }
                        </h4>
                        { languages.map((value, index) => {
                            return <p key={index} className={"project-description"}>{ value }</p>
                        }) }
                    </div>
                    <div className={"w-full flex flex-col text-center"}>
                        <h4 className={"skills-title"}>
                            { predefined.skillsTechnologies }
                        </h4>
                        { technologies.map((value, index) => {
                            return <p key={index} className={"project-description"}>{ value }</p>
                        }) }
                    </div>
                    <div className={"w-full flex flex-col text-center"}>
                        <h4 className={"skills-title"}>
                            { predefined.skillsDatabases }
                        </h4>
                        { databases.map((value, index) => {
                            return <p key={index} className={"project-description"}>{ value }</p>
                        }) }
                    </div>
                    <div className={"w-full flex flex-col text-center"}>
                        <h4 className={"skills-title"}>
                            { predefined.skillsTools }
                        </h4>
                        { tools.map((value, index) => {
                            return <p key={index} className={"project-description"}>{ value }</p>
                        }) }
                    </div>
                </div>
            </div>
        </div>
        <div className={"sm:hidden block opacity-0 animate-slidein [--slidein-delay:500ms] mt-4"}>
            <div className={"flex flex-col w-full"}>
                <div className={"flex flex-row justify-center mt-2"}>
                    <div className={"text-hero-highlight-1-sm"}>
                        {predefined.skillsTitle}
                    </div>
                </div>
                <div className={"flex flex-wrap w-full mt-4"}>
                    <div className={"w-full flex flex-col text-center"}>
                        <h4 className={"skills-title-sm"}>
                            { predefined.skillsLanguages }
                        </h4>
                        { languages.map((value, index) => {
                            return <p key={index} className={"project-description"}>{ value }</p>
                        }) }
                    </div>
                    <div className={"w-full flex flex-col text-center"}>
                        <h4 className={"skills-title-sm"}>
                            { predefined.skillsTechnologies }
                        </h4>
                        { technologies.map((value, index) => {
                            return <p key={index} className={"project-description"}>{ value }</p>
                        }) }
                    </div>
                    <div className={"w-full flex flex-col text-center"}>
                        <h4 className={"skills-title-sm"}>
                            { predefined.skillsDatabases }
                        </h4>
                        { databases.map((value, index) => {
                            return <p key={index} className={"project-description"}>{ value }</p>
                        }) }
                    </div>
                    <div className={"w-full flex flex-col text-center"}>
                        <h4 className={"skills-title-sm"}>
                            { predefined.skillsTools }
                        </h4>
                        { tools.map((value, index) => {
                            return <p key={index} className={"project-description"}>{ value }</p>
                        }) }
                    </div>
                </div>
            </div>
        </div>
    </>
}

const Footer = () => {
    const { predefined } = useTranslation()
    return <>
        <div className={"h-40 bg-primary"} />
        <h4 className={"sm:block hidden footer-text p-6 border-border border-t-2"}>
            { predefined.credit }
        </h4>
        <div className={"sm:hidden block w-full text-center"}>
            <h4 className={"footer-text p-6 border-border border-t-2"}>
                { predefined.credit }
            </h4>
        </div>
    </>
}

const LandingPage = () => {
    const location = useLocation()
    const topDivRef = useRef<HTMLDivElement | null>(null)
    const projectsRef = useRef<HTMLDivElement | null>(null)
    const aboutRef = useRef<HTMLDivElement | null>(null)
    const focusMap: Record<string, MutableRefObject<HTMLDivElement | null>> = {
        'topDiv': topDivRef,
        'projects': projectsRef,
        'about': aboutRef
    }

    useEffect(() => {
        const hash = location.hash;
        let target: HTMLDivElement | null
        switch (hash){
            case '#projects': {
                target = focusMap.projects.current
                break;
            }
            case '#about': {
                target = focusMap.about.current
                break;
            }
            default: {
                target = focusMap.topDiv.current;
                break;
            }
        }
        target?.scrollIntoView({
            behavior: "smooth"
        })
    }, [focusMap.about, focusMap.projects, focusMap.topDiv, location.hash]);

    return (
        <>
            <div ref={topDivRef}/>
            <PageLayout>
                <HeroSection/>
                <div ref={projectsRef}/>
                <SocialMedia/>
                <MyProjects/>
                <div ref={aboutRef}/>
                <About/>
                <Skills/>
                <Footer/>
            </PageLayout>
        </>
    )
}

export default LandingPage
