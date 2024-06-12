export type ProjectInfo = {
    id: string,
    link: string,
    repoUrl: string,
    capsuleUrl: string,
    translations: Record<string, Record<string, string>>
}

export type ProjectsContextType = {
    projectInfos: ProjectInfo[],
    trigger1: number,
    invokeTrigger1: () => void,
    findProject: (id: string) => ProjectInfo | null
}
