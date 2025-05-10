import {FC, ReactNode, useEffect, useState} from "react";
import PageLayout from "./PageLayout.tsx";
import {Link, useSearchParams} from "react-router-dom";
import {ProjectDetails, ProjectTag} from "../projects.ts";
import {useProjects} from "../contexts/ProjectsContext.tsx";
import {useTranslation} from "../contexts/TranslationContext.tsx";
import {SearchMode} from "../contexts/ProjectsContextsType.ts";
import {FaGithub, FaExternalLinkAlt} from "react-icons/fa";

type UpdateTagFn = (tag: ProjectTag, isRemoved: boolean) => void

interface TagChipProps<T> {
    tag: T
    tagDisplay?: string,
    selected: boolean,
    onClick?: (tag: T) => void,
}

function TagChip<T>({ tag, tagDisplay, selected, onClick }: TagChipProps<T>) {
    return (
        <button
            onClick={(e) => {
                e.stopPropagation();
                if (onClick !== undefined){
                    onClick(tag)
                }
            }}
            className={`px-3 py-1 text-sm rounded-full font-medium transition-all duration-200 cursor-pointer linear-animation 
        ${selected ? 'bg-highlight text-white shadow-md hover:bg-highlight-light' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
      `}
        >
            {tagDisplay ?? String(tag)}

        </button>
    );
}

const LinkChip: FC<{ text: string, url: string, icon: ReactNode}> = ({ text, url, icon }) => {
    return (
        <Link to={url} target={"_blank"} className={`link-chip-box m-1 group`}>
            <div className={"w-8 h-6 bg-font rounded-full flex justify-center items-center"}>
                {icon}
            </div>
            <div className={"text-link-chip"}>
                {text}
            </div>
        </Link>)
}


const ProjectInfo: FC<{ project: ProjectDetails, updateTag: UpdateTagFn }> = ({ project, updateTag }) => {
    const {selectedLanguage, predefined} = useTranslation()

    return <>
        <div className={"sm:block hidden group w-full h-56 cursor-pointer"}>
            <div className={"px-2 py-2 w-full h-full"}>
                <div className={"full-project-card"}>
                    <div className={"w-48 aspect-square"}>
                        <img className={"rounded-bl-2xl rounded-tl-2xl w-full h-full object-cover"} alt={project.id} src={project.capsuleUrl} />
                    </div>
                    <div className={"flex flex-col mt-2 mx-2"}>
                        <h1 className={"project-name"}>
                            { project.shortDescriptions[selectedLanguage].name }
                        </h1>
                        <p className={"project-description mt-2"}>
                            { project.shortDescriptions[selectedLanguage].description }
                        </p>
                        <div className={"flex flex-wrap mt-2"}>
                            { project.tags.map((tag, i) => <div className={"mr-1"}>
                                <TagChip key={i} tag={tag} selected={false} onClick={(tag) => updateTag(tag, false)} />
                            </div>) }
                        </div>
                        <div className={"flex flex-wrap mt-2"}>
                            { project.repoUrl === undefined
                                ? <></>
                                : <LinkChip text={predefined.smItem1}
                                                   url={project.repoUrl}
                                                   icon={<FaGithub size={20}/>}/> }
                            { project.link === undefined
                                ? <></>
                                : <LinkChip text={predefined.projectShowreelExtenalLink}
                                            url={project.link}
                                            icon={<FaExternalLinkAlt size={20}/>}/> }
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className={"sm:hidden block group w-full min-h-fit"}>
            <div className={"px-2 py-2 w-full h-full"}>
                <div className={"project-card"}>
                    <img className={"rounded-tl-2xl rounded-tr-2xl h-1/3 object-cover"} alt={project.id} src={project.capsuleUrl} />
                    <div className={"mt-2 mx-2"}>
                        <h1 className={"project-name"}>
                            { project.shortDescriptions[selectedLanguage].name }
                        </h1>
                        <h5 className={"project-description my-2"}>
                            { project.shortDescriptions[selectedLanguage].description }
                        </h5>
                    </div>
                    <div className={"flex flex-wrap my-2"}>
                        { project.tags.map((tag, i) => <div className={"m-1"}>
                            <TagChip key={i} tag={tag} selected={false} onClick={(tag) => updateTag(tag, false)} />
                        </div>) }
                    </div>
                    <div className={"flex flex-col my-2"}>
                        { project.repoUrl === undefined
                            ? <></>
                            : <LinkChip text={predefined.smItem1}
                                        url={project.repoUrl}
                                        icon={<FaGithub size={20}/>}/> }
                        { project.link === undefined
                            ? <></>
                            : <LinkChip text={predefined.projectShowreelExtenalLink}
                                        url={project.link}
                                        icon={<FaExternalLinkAlt size={20}/>}/> }
                    </div>
                </div>
            </div>
        </div>
    </>
}

const Projects: FC<{ projects: ProjectDetails[], updateTag: UpdateTagFn }> = ({ projects, updateTag }) => {
    return <div className={"mt-5"}>
        { projects.map((project, i) => <ProjectInfo key={i} project={project} updateTag={updateTag} />) }
    </div>
}

const ProjectShowreel: FC = () => {
    const [params, setParams] = useSearchParams()
    const [tags, setTags] = useState(undefined as ProjectTag[] | undefined)
    const [searchMode, setSearchMode] = useState(undefined as SearchMode | undefined)
    const [projects, setProjects] = useState([] as ProjectDetails[])
    const {findProjectsByTags} = useProjects()
    const {selectedLanguage, predefined} = useTranslation()

    useEffect(() => {
        let tags: ProjectTag[] | undefined = undefined
        for (const [key, value] of params.entries()){
            if (key === "tag"){
                if (tags === undefined){
                    tags = []
                }

                tags.push(value as ProjectTag)
            }
            if (key === "searchMode") {
                setSearchMode(value as SearchMode)
            }
        }

        setTags(tags)
    }, [params]);

    useEffect(() => {
        let projects = findProjectsByTags(tags, searchMode ?? "And")
        projects = projects.sort((a, b) => {
            const nameA = a.shortDescriptions[selectedLanguage].name.toLowerCase();
            const nameB = b.shortDescriptions[selectedLanguage].name.toLowerCase();
            return nameA.localeCompare(nameB);
        });

        setProjects(projects)
    }, [findProjectsByTags, searchMode, selectedLanguage, tags]);


    const updateTag = (tag: ProjectTag, isRemoved: boolean) => {
        setTags(oldTags => {
            let newTags: ProjectTag[]
            if (oldTags === undefined){
                if (isRemoved){
                    newTags = []
                } else{
                    newTags = [tag]
                }
            } else {
                if (isRemoved){
                    newTags = oldTags.filter((v) => v != tag)
                } else {
                    if (oldTags.includes(tag)){
                        newTags = oldTags
                    } else {
                        newTags = oldTags.concat(tag)
                    }
                }
            }
            const newParams = new URLSearchParams(params);
            newParams.delete("tag")
            for (const tag of newTags){
                newParams.append("tag", tag)
            }

            setParams(newParams)
            if (newTags.length === 0){
                return undefined
            }
            return newTags
        })
    }

    const clearTags = () => {
        const newParams = new URLSearchParams(params);
        newParams.delete("tag")
        setParams(newParams)
        setTags(undefined)
    }

    const updateSearchMode = (newMode: SearchMode) => {
        const newParams = new URLSearchParams(params);
        newParams.set("searchMode", newMode)
        setParams(newParams)
        setSearchMode(newMode)
    }


    return <PageLayout>
        <div className={"w-full flex flex-col"}>
            <div className={"opacity-0 animate-slidein [--slidein-delay:300ms]"}>
                <div className={"mt-20 hidden sm:block"}>
                    <div className={"flex flex-row mt-3 pb-3"}>
                        <h1 className="text-hero-uncommon">
                            {predefined.projectShowreelTitle}
                        </h1>
                    </div>
                </div>
                <div className={"mt-5 sm:hidden block"}>
                    <div className={"flex flex-row mt-3 pb-3"}>
                        <h1 className="text-hero-uncommon-sm">
                            {predefined.projectShowreelTitle}
                        </h1>
                    </div>
                </div>
            </div>
            <div className={"opacity-0 animate-slidein [--slidein-delay:500ms]"}>
                { tags === undefined ? <></> : <>
                    <div className={"mt-5 hidden sm:block"}>
                        <div className={"flex flex-wrap flex-shrink-0 text-font text-xl font-bold"}>
                            <div className={"m-1"}>
                                {predefined.projectShowreelSelectedTags}:
                            </div>
                            {tags.map((tag, i) => <div className={"m-1"}>
                                <TagChip key={i} tag={tag} selected={true} onClick={t => updateTag(t, true)}/>
                            </div>)}
                            <div className={"m-1"}>
                                <TagChip tag={"×"} selected={false} onClick={() => clearTags()}/>
                            </div>
                        </div>
                    </div>
                    <div className={"mt-2 sm:hidden block"}>
                        <div className={"flex flex-wrap flex-shrink-0 text-font text-md font-bold"}>
                            <div className={"m-1"}>
                                {predefined.projectShowreelSelectedTags}:
                            </div>
                            {tags.map((tag, i) => <div className={"m-1"}>
                                <TagChip key={i} tag={tag} selected={true} onClick={t => updateTag(t, true)}/>
                            </div>)}
                            <div className={"m-1"}>
                                <TagChip tag={"×"} selected={false} onClick={() => clearTags()}/>
                            </div>
                        </div>
                    </div>
                </> }
                <div className={"mt-5 hidden sm:block"}>
                    <div className={"flex flex-wrap flex-shrink-0 text-font text-xl font-bold"}>
                        <div className={"m-1"}>
                            {predefined.projectShowreelSearchMode}:
                        </div>
                        <div className={"m-1"}>
                            <TagChip tag={"And" as SearchMode}
                                     tagDisplay={predefined.projectShowreelSearchModeAnd}
                                     selected={searchMode === undefined || searchMode === "And"}
                                     onClick={updateSearchMode} />
                        </div>
                        <div className={"m-1"}>
                            <TagChip tag={"Or" as SearchMode}
                                     tagDisplay={predefined.projectShowreelSearchModeOr}
                                     selected={searchMode === "Or"}
                                     onClick={updateSearchMode} />
                        </div>
                    </div>
                </div>
                <div className={"mt-2 sm:hidden block"}>
                    <div className={"flex flex-wrap flex-shrink-0 text-font text-md font-bold"}>
                        <div className={"m-1"}>
                            {predefined.projectShowreelSearchMode}:
                        </div>
                        <div className={"m-1"}>
                            <TagChip tag={"And" as SearchMode}
                                     tagDisplay={predefined.projectShowreelSearchModeAnd}
                                     selected={searchMode === undefined || searchMode === "And"}
                                     onClick={updateSearchMode} />
                        </div>
                        <div className={"m-1"}>
                            <TagChip tag={"Or" as SearchMode}
                                     tagDisplay={predefined.projectShowreelSearchModeOr}
                                     selected={searchMode === "Or"}
                                     onClick={updateSearchMode} />
                        </div>
                    </div>
                </div>
                <Projects projects={projects} updateTag={updateTag}/>
            </div>
        </div>
    </PageLayout>
}

export default ProjectShowreel;