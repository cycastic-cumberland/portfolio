import React, {createContext, useContext, useState} from "react";
import {ProjectsContextType, SearchMode} from "./ProjectsContextsType.ts";
import {AllProjects, ProjectDetails, ProjectTag} from "../projects.ts";

const ProjectsContext = createContext<ProjectsContextType>(null as never as ProjectsContextType)

export const useProjects = () => {
    return useContext(ProjectsContext)
}

export const ProjectsProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    const topShelf = {"astra": 0, "bridge-serverless": 0, "cumail-be": 0, "newstalker": 0, "microjit": 0}
    const projectsOrdered: ProjectDetails[] = []
    const projectsById: Record<string, ProjectDetails> = {}
    const projectsByTags: Record<string, ProjectDetails[]> = {}
    const [trigger1, setTrigger1] = useState(0)

    for (const project of AllProjects) {
        projectsById[project.id] = project

        for (const tag of project.tags){
            if (tag in projectsByTags){
                projectsByTags[tag].push(project)
                continue
            }

            projectsByTags[tag] = [project]
        }
    }

    for (const topShelfId in topShelf){
        projectsOrdered.push(projectsById[topShelfId])
    }
    for (const project of AllProjects){
        if (project.id in topShelf){
            continue
        }

        projectsOrdered.push(project)
    }

    const invokeTrigger1 = () => setTrigger1(i => i + 1)


    const findProjectById = (id: string) => {
        if (id in projectsById){
            return projectsById[id]
        }

        return null
    }

    const findProjectsByTagsInclusive = (tags: string[]): ProjectDetails[] => {
        const results = {} as Record<string, ProjectDetails>
        for (const tag of tags){
            for (const project of projectsByTags[tag]){
                results[project.id] = project
            }
        }

        return Object.values(results)
    }

    const findProjectsByTags = (tags: string | string[] | undefined, searchMode: SearchMode): ProjectDetails[] => {
        if (tags === undefined) {
            return AllProjects
        }

        if (typeof tags === 'string'){
            return projectsByTags[tags] ?? []
        }

        if (searchMode === "Or"){
            return findProjectsByTagsInclusive(tags)
        }

        const results = [] as ProjectDetails[]
        for (const project of AllProjects) {
            let hasAllTags = true
            for (const tag of tags){
                if (project.tags.includes(tag as ProjectTag)){
                    continue
                }
                hasAllTags = false
                break
            }

            if (!hasAllTags){
                continue
            }

            results.push(project)
        }
        return results
    }

    const value: ProjectsContextType = {
        projectInfos: projectsOrdered,
        trigger1,
        invokeTrigger1,
        findProjectById,
        findProjectsByTags
    }

    return (<ProjectsContext.Provider value={value} >
        { children }
    </ProjectsContext.Provider>)
}
