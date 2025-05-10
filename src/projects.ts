export type ProjectTag = "Fullstack" | "Backend" | "Database" | "Research" | ".NET" | "Typescript" | "Rust" | "C++" | "Java" |
    "ASP.NET Core" | "Spring Boot" | "React" | "TailwindCSS" | "AWS Lambda" | "S3" |
    "Postgres" |"MongoDB" | "MySQL" | "Redis" | "DynamoDB"

export type ShortDescription = {
    name: string,
    groupName: string,
    description: string,
}

export type ProjectDetails = {
    id: string
    tags: ProjectTag[],
    link?: string,
    capsuleUrl?: string,
    repoUrl?: string,
    shortDescriptions : Record<string, ShortDescription>,
}

export const AllProjects: ProjectDetails[] = [
    {
        id: 'astra',
        capsuleUrl: '/assets/astra-capsule.png',
        tags: [".NET", "Database", "Research"],
        repoUrl: 'https://github.com/cycastic-cumberland/astra',
        shortDescriptions: {
            english: {
                name: 'Astra',
                groupName: 'Astra',
                description: 'Astra is a lightweight, tabular cache database, optimized for structured data queries.',
            },
            vietnamese: {
                name: 'Astra',
                groupName: 'Astra',
                description: 'Astra là một cơ sở dữ liệu đệm được tối ưu hóa cho việc truy cập dữ liệu có cấu trúc.',
            }
        }
    },
    {
        id: 'cumail-be',
        capsuleUrl: '/assets/cumail-capsule.png',
        tags: [".NET", "ASP.NET Core", "Postgres", "MongoDB", "Redis"],
        repoUrl: 'https://github.com/cycastic-cumberland/cumail_next',
        shortDescriptions: {
            english: {
                name: 'Cumail (Backend)',
                groupName: 'Cumail',
                description: 'Cumail is a live chat service which allow users to instantly create chat rooms, invite and manage members.'
            },
            vietnamese: {
                name: 'Cumail (Backend)',
                groupName: 'Cumail',
                description: 'Cumail là một ứng dụng nhắn tin trực tuyến, cho phép người dùng tạo phòng chat, mời và quản lý người dùng.'
            }
        }
    },
    {
        id: 'cumail-fe',
        capsuleUrl: '/assets/cumail-capsule.png',
        tags: ["Typescript", "React", "TailwindCSS"],
        repoUrl: 'https://github.com/cycastic-cumberland/cumail_next_client',
        shortDescriptions: {
            english: {
                name: 'Cumail (Frontend)',
                groupName: 'Cumail',
                description: 'Cumail is a live chat service which allow users to instantly create chat rooms, invite and manage members.'
            },
            vietnamese: {
                name: 'Cumail (Frontend)',
                groupName: 'Cumail',
                description: 'Cumail là một ứng dụng nhắn tin trực tuyến, cho phép người dùng tạo phòng chat, mời và quản lý người dùng.'
            }
        }
    },
    {
        id: 'libmanage-be',
        capsuleUrl: '/assets/libmanage-capsule.png',
        tags: ["Java", "Spring Boot", "MySQL"],
        repoUrl: 'https://github.com/cycastic-cumberland/libmanage-backend',
        shortDescriptions: {
            english: {
                name: 'Library manager (Backend)',
                groupName: 'Library manager',
                description: 'Library manager is a web application that allows librarians to manage members and borrow history.'
            },
            vietnamese: {
                name: 'Quản lý thư viện (Backend)',
                groupName: 'Quản lý thư viện',
                description: 'Quản lý thư viện là ứng dụng web cho phép thủ thư quản lý thành viên và lịch sử mượn sách'
            }
        }
    },
    {
        id: 'libmanage-fe',
        capsuleUrl: '/assets/libmanage-capsule.png',
        tags: ["Typescript", "React", "TailwindCSS"],
        repoUrl: 'https://github.com/cycastic-cumberland/libmanage-frontend',
        shortDescriptions: {
            english: {
                name: 'Library manager (Frontend)',
                groupName: 'Library manager',
                description: 'Library manager is a web application that allows librarians to manage members and borrow history.'
            },
            vietnamese: {
                name: 'Quản lý thư viện (Frontend)',
                groupName: 'Quản lý thư viện',
                description: 'Quản lý thư viện là ứng dụng web cho phép thủ thư quản lý thành viên và lịch sử mượn sách'
            }
        }
    },
    {
        id: 'newstalker',
        capsuleUrl: '/assets/newstalker-capsule.png',
        tags: [".NET", "ASP.NET Core", "Postgres", "Research"],
        repoUrl: 'https://github.com/cycastic-cumberland/newstalker',
        shortDescriptions: {
            english: {
                name: 'Newstalker',
                groupName: 'Newstalker',
                description: 'Newstalker is a crawler/summarizer that allows data extraction from news sites.'
            },
            vietnamese: {
                name: 'Newstalker',
                groupName: 'Newstalker',
                description: 'Newstalker là phần mềm crawler/tóm tắt văn bản dùng để trích xuất dữ liệu từ các trang báo'
            }
        },
    },
    {
        id: 'microjit',
        capsuleUrl: '/assets/microjit-capsule.png',
        tags: ["C++", "Research"],
        repoUrl: 'https://github.com/cycastic-cumberland/microjit',
        shortDescriptions: {
            english: {
                name: 'MicroJIT',
                groupName: 'MicroJIT',
                description: 'MicroJIT is a lightweight Dynamic Compilation Library written in C++.'
            },
            vietnamese: {
                name: 'MicroJIT',
                groupName: 'MicroJIT',
                description: 'MicroJIT là một thư viện biên dịch động cỡ nhỏ được viết bằng C++.'
            }
        },
    },
    {
        id: 'bridge-be',
        capsuleUrl: '/assets/bridge-capsule.png',
        tags: [".NET", "ASP.NET Core", "Postgres", "S3"],
        repoUrl: 'https://github.com/cycastic-cumberland/bridge-backend',
        link: "https://bridge.cycastic.net/",
        shortDescriptions: {
            english: {
                name: 'Bridge (Backend)',
                groupName: 'Bridge',
                description: 'Bridge is a multi-platform file/paste sharing application.'
            },
            vietnamese: {
                name: 'Bridge (Backend)',
                groupName: 'Bridge',
                description: 'Bridge là một ứng dụng chia sẻ tập tin và dán đa nền tảng.'
            }
        },
    },
    {
        id: 'bridge-serverless',
        capsuleUrl: '/assets/bridge-capsule.png',
        tags: [".NET", "ASP.NET Core", "AWS Lambda", "DynamoDB", "S3"],
        repoUrl: 'https://github.com/cycastic-cumberland/bridge-serverless',
        link: "https://bridge.cycastic.net/",
        shortDescriptions: {
            english: {
                name: 'Bridge (Serverless)',
                groupName: 'Bridge',
                description: 'Bridge is a multi-platform file/paste sharing application.'
            },
            vietnamese: {
                name: 'Bridge (Phi máy chủ)',
                groupName: 'Bridge',
                description: 'Bridge là một ứng dụng chia sẻ tập tin và dán đa nền tảng.'
            }
        },
    },
    {
        id: 'bridge-fe',
        capsuleUrl: '/assets/bridge-capsule.png',
        tags: ["Typescript", "React", "TailwindCSS"],
        repoUrl: 'https://github.com/cycastic-cumberland/bridge-frontend',
        link: "https://bridge.cycastic.net/",
        shortDescriptions: {
            english: {
                name: 'Bridge (Frontend)',
                groupName: 'Bridge',
                description: 'Bridge is a multi-platform file/paste sharing application.'
            },
            vietnamese: {
                name: 'Bridge (Frontend)',
                groupName: 'Bridge',
                description: 'Bridge là một ứng dụng chia sẻ tập tin và dán đa nền tảng.'
            }
        },
    },
]
