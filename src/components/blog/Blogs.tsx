import PageLayout from "../PageLayout.tsx";
import {FC, useEffect, useState} from "react";
import {RecordModel} from "pocketbase";
import {Link, useSearchParams} from "react-router-dom";
import PocketbaseApp from "../../pocketbase_app.ts";
import {BlogsPerPage} from "../../constants.ts";
import {useTranslation} from "../../contexts/TranslationContext.tsx";

const getPageNo = (str: string) => {
    try {
        return Number(str)
    } catch (e){
        return 1
    }
}

const PageCell: FC<{ pageNo: number, content: number | string, highlighted?: boolean, hidden?: boolean }> = ({ pageNo, content, highlighted, hidden }) => {
    return <Link to={`/blog?pageNo=${pageNo}`} className={`${hidden ? 'invisible' : ''} mx-1 w-12 aspect-square rounded-2xl content-center text-center linear-animation ${highlighted ? 'bg-highlight text-primary hover:bg-font cursor-pointer' : ' text-font hover:text-primary hover:bg-highlight cursor-pointer'}`}>
        { content }
    </Link>
}

const Tag: FC<{ tag: string }> = ({ tag }) => {
    return <Link to={`/blog?tag=${encodeURIComponent(tag)}`} className={"mb-2 mr-2 p-2 rounded-2xl border border-highlight linear-animation hover:bg-highlight hover:text-primary"}>
        { tag }
    </Link>
}

const Entry: FC<{ post: RecordModel }> = ({ post }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, setLoading] = useState(false)
    const [author, setAuthor] = useState({} as RecordModel)
    const [translations, setTranslations] = useState({} as Record<string, RecordModel | null>)
    const {predefined} = useTranslation()

    useEffect(() => {
        setLoading(i => {
            if (i) return true;
            const callFetch = async () => {
                const app = PocketbaseApp()
                try {
                    setAuthor(await app.collection("users").getOne(post.author))
                    const translations = (await app.collection("post_content").getList(1, 50, {
                        filter: app.filter('post_id = {:postId}', { postId: post.id })
                    })).items
                    const transMap = {} as Record<string, RecordModel>
                    for (let i = 0; i < translations.length; i++){
                        const t = translations[i]
                        transMap[(t.post_language as string)] = t
                    }
                    setTranslations(transMap)
                } finally {
                    setLoading(false)
                }
            }

            callFetch().then(() => {})
            return true;
        })
    }, [post]);

    return <>
        { Object.keys(translations).length ? <Link to={post.seo_id} className={"w-full flex flex-col p-6 linear-animation rounded-2xl hover:bg-border"}>
            <h2 className={"text-blog-entry-title"}>
                { translations[predefined.id]?.title ?? translations['english']?.title ?? (translations[Object.keys(translations)[0]]) }
            </h2>
            <div className={"w-full flex flex-wrap mt-4"}>
                <h3 className={"text-author flex flex-row"}>
                    { predefined.blogBy }
                    <span>
                        <img className={"mt-0 w-8 aspect-square rounded-full mx-2"} alt={"avatar"} src={PocketbaseApp().files.getUrl(author, author.avatar, { thumb: "50x50" })} />
                    </span>
                    <span className={"text-author text-highlight"}>
                        { author.name }
                    </span>
                    <span className={"text-author ml-1"}>
                        {`${predefined.blogAt} ${new Date((translations[predefined.id] as RecordModel | undefined)?.updated ?? post.updated).toLocaleString(predefined.locale)}`}
                    </span>
                </h3>
            </div>
            <div className={"w-full flex flex-wrap"}>
                { (post.tags as string[]).map((r, index) => {
                    return <Tag tag={r} key={index}/>
                }) }
            </div>
        </Link> : undefined }
    </>
}

const BlogNoItem: FC<{ tag?: string }> = ({ tag }) => {
    const {predefined} = useTranslation()

    return <div className={"fixed top-0 left-0 w-screen h-screen flex justify-center items-center opacity-0 animate-slidein [--slidein-delay:100ms]"}>
        <div className={"flex flex-col text-center items-center"}>
            <div className={"sm:block hidden"}>
                <h1 className={"text-hero-highlight-1 pb-4"}>
                    { tag ? predefined.blogNoTag : predefined.blogNoBlogTitle }
                </h1>
                { tag ? undefined : <h4 className={"project-description"}>
                    { predefined.blogNoBlogSubtext }
                </h4> }
            </div>
            <div className={"sm:hidden block"}>
                <h1 className={"text-hero-highlight-1-md pb-2"}>
                    { tag ? predefined.blogNoTag : predefined.blogNoBlogTitle }
                </h1>
                { tag ? undefined : <h4 className={"project-description"}>
                    { predefined.blogNoBlogSubtext }
                </h4> }
            </div>
        </div>
    </div>
}

const Blogs = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, setLoading] = useState(false)
    const [pageNo, setPageNo] = useState(0)
    const [records, setRecords] = useState([] as RecordModel[])
    const [totalPages, setTotalPages] = useState(0)
    const [tag, setTag] = useState("")
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [searchParams, __] = useSearchParams();

    useEffect(() => {
        let paramPageNo = searchParams.get("pageNo")
        const paramTag = searchParams.get("tag")

        if (!paramPageNo){
            paramPageNo = "1"
        }

        if (paramTag){
            setTag(paramTag)
        }

        setPageNo(getPageNo(paramPageNo))
    }, [searchParams]);

    useEffect(() => {
        setLoading(i => {
            if (i) return i;
            if (pageNo === 0) return i;
            const fetchAsync = async () => {
                const app = PocketbaseApp()
                try {
                    const options: Record<string, string> = {
                        sort: '-updated',
                    }
                    if (tag){
                        options.filter = app.filter('tags ~ {:tag}', { tag })
                    }
                    const records = await app.collection("posts")
                        .getList(pageNo, BlogsPerPage, options)
                    setRecords(records.items)
                    setTotalPages(records.totalPages)
                } finally {
                    setLoading(false)
                }
            }

            fetchAsync().then(() => {})
            return true
        })
    }, [pageNo, tag]);

    const Paginator = () => {
        return <div className={"w-full flex flex-row justify-center mt-4"}>
            <PageCell pageNo={1} content={'<<'} highlighted={false} hidden={pageNo <= 1}/>
            <PageCell pageNo={pageNo - 1} content={'<'} highlighted={false} hidden={pageNo <= 1}/>
            <PageCell pageNo={pageNo - 1} content={pageNo - 1} highlighted={false} hidden={pageNo <= 1}/>
            <PageCell pageNo={pageNo} content={pageNo} highlighted={true}/>
            <PageCell pageNo={pageNo + 1} content={pageNo + 1} highlighted={false} hidden={pageNo >= totalPages}/>
            <PageCell pageNo={pageNo + 1} content={'>'} highlighted={false} hidden={pageNo >= totalPages}/>
            <PageCell pageNo={totalPages} content={'>>'} highlighted={false} hidden={pageNo >= totalPages}/>
        </div>
    }

    const Render = () => {
        return <div className={"w-full flex flex-col mt-4"}>
            { records.map((rec, id) => {
                return <Entry post={rec} key={id}/>
            }) }
            { records.length ? <Paginator/> : undefined }
        </div>
    }

    return <PageLayout>
        <div className={"text-font"}>
            { records.length ? <Render/> : <BlogNoItem tag={tag}/> }
        </div>
    </PageLayout>
}

export default Blogs;