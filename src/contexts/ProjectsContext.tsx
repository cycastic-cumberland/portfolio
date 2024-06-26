import React, {createContext, useContext, useEffect, useState} from "react";
import {ProjectInfo, ProjectsContextType} from "./ProjectsContextsType.ts";

const ProjectsContext = createContext<ProjectsContextType>(null as never as ProjectsContextType)

export const useProjects = () => {
    return useContext(ProjectsContext)
}

export const ProjectsProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    const [projectInfos, setProjectInfos] = useState([] as ProjectInfo[])
    const [trigger1, setTrigger1] = useState(0)

    const invokeTrigger1 = () => setTrigger1(i => i + 1)

    useEffect(() => {
        setProjectInfos([
            {
                id: 'astra',
                capsuleUrl: '/assets/astra-capsule.png',
                link: '/astra',
                repoUrl: 'https://github.com/cycastic-cumberland/astra',
                translations: {
                    english: {
                        name: 'Astra',
                        shortDescription: 'Astra is a lightweight, tabular cache database, optimized for structured data queries.',

                        tagline1: 'Speed',
                        tagline2: 'meets',
                        tagline3: 'sophistication ',
                        // Technologies used: .NET Core 8, B+Tree, LZ4, Docker
                    },
                    vietnamese: {
                        name: 'Astra',
                        shortDescription: 'Astra là một cơ sở dữ liệu đệm được tối ưu hóa cho việc truy cập dữ liệu có cấu trúc.',

                        tagline1: 'Speed',
                        tagline2: 'meets',
                        tagline3: 'sophistication ',
                        // Công nghệ được sử dụng: .NET Core 8, B+Tree, LZ4, Docker
                    }
                }
            },
            {
                id: 'cumail',
                capsuleUrl: '/assets/cumail-capsule.png',
                link: '/cumail',
                repoUrl: 'https://github.com/cycastic-cumberland/cumail_next',
                translations: {
                    english: {
                        name: 'Cumail',
                        shortDescription: 'Cumail is a live chat service which allow users to instantly create chat rooms, invite and manage members.'
                        // Technologies used: ASP.NET, SignalR, PostgreSQL, Redis, ReactJS, Docker
                    },
                    vietnamese: {
                        name: 'Cumail',
                        shortDescription: 'Cumail là một ứng dụng nhắn tin trực tuyến, cho phép người dùng tạo phòng chat, mời và quản lý người dùng.'
                        // Công nghệ được sử dụng: ASP.NET, SignalR, PostgreSQL, Redis, ReactJS, Docker
                    }
                }
            },
            {
                id: 'libmanage',
                capsuleUrl: '/assets/libmanage-capsule.png',
                link: '/libmanage',
                repoUrl: 'https://github.com/cycastic-cumberland/libmanage-backend',
                translations: {
                    english: {
                        name: 'Library manager',
                        shortDescription: 'Library manager is a web application that allows librarians to manage members and borrow history.'
                        // Technologies used: Java, Spring Boot, jOOQ, MySQL, ReactJS, Docker
                    },
                    vietnamese: {
                        name: 'Quản lý thư viện',
                        shortDescription: 'Quản lý thư viện là ứng dụng web cho phép thủ thư quản lý thành viên và lịch sử mượn sách'
                        // Công nghệ được sử dụng: Java, Spring Boot, jOOQ, MySQL, ReactJS, Docker
                    }
                }
            },
            {
                id: 'newstalker',
                capsuleUrl: '/assets/newstalker-capsule.png',
                link: '/newstalker',
                repoUrl: 'https://github.com/cycastic-cumberland/newstalker',
                translations: {
                    english: {
                        name: 'Newstalker',
                        shortDescription: 'Newstalker is a crawler/summarizer that allows data extraction from news sites.'
                        // Technologies used: ASP.NET, PostgreSQL, Docker
                    },
                    vietnamese: {
                        name: 'Newstalker',
                        shortDescription: 'Newstalker là phần mềm crawler/tóm tắt văn bản dùng để trích xuất dữ liệu từ các trang báo'
                        // Công nghệ được sử dụng: ASP.NET, PostgreSQL, Docker
                    }
                },
            },
            {
                id: 'microjit',
                capsuleUrl: '/assets/microjit-capsule.png',
                link: '/microjit',
                repoUrl: 'https://github.com/cycastic-cumberland/microjit',
                translations: {
                    english: {
                        name: 'MicroJIT',
                        shortDescription: 'MicroJIT is a lightweight Dynamic Compilation Library written in C++.'
                        // Technologies used: C++, AsmJit
                    },
                    vietnamese: {
                        name: 'MicroJIT',
                        shortDescription: 'MicroJIT là một thư viện biên dịch động cỡ nhỏ được viết bằng C++.'
                        // Công nghệ được sử dụng: C++, AsmJit
                    }
                },
            },
        ])
    }, []);

    const findProject = (id: string) => {
        for (let i = 0; i < projectInfos.length; i++){
            if (projectInfos[i].id === id) return projectInfos[i];
        }
        return null;
    }

    const value: ProjectsContextType = {
        projectInfos,
        trigger1,
        invokeTrigger1,
        findProject
    }

    return (<ProjectsContext.Provider value={value} >
        { children }
    </ProjectsContext.Provider>)
}
