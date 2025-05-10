import {ProjectDetails} from "../projects.ts";

export type SearchMode = "And" | "Or"

export type ProjectsContextType = {
    projectInfos: ProjectDetails[],
    trigger1: number,
    invokeTrigger1: () => void,
    findProjectById: (id: string) => ProjectDetails | null,
    findProjectsByTags: (tags: string | string[] | undefined, searchMode: SearchMode) => ProjectDetails[],
}
