import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import PocketbaseApp, {blogReplaceImagePlaceholders} from "../../pocketbase_app.ts";
import {RecordModel} from "pocketbase";
import PageLayout from "../PageLayout.tsx";
import {useTranslation} from "../../contexts/TranslationContext.tsx";
import MarkdownRender from "./MarkdownRender.tsx";

const BlogLoading = () => {
    return <></>
}


const BlogNotFound = () => {
    const {predefined} = useTranslation()

    return <div className={"fixed top-0 left-0 w-screen h-screen flex justify-center items-center opacity-0 animate-slidein [--slidein-delay:100ms]"}>
        <div className={"flex flex-col text-center items-center"}>
            <div className={"sm:block hidden"}>
                <h1 className={"text-hero-highlight-1 pb-4"}>
                    { predefined.blogNotFoundTitle }
                </h1>
                <h4 className={"project-description"}>
                    { predefined.blogNotFoundSubtext1 }
                    <span>
                            <Link className={'text-highlight'} to={'/blog'}>{predefined.blogNotFoundSubtext2}</Link>
                        </span>
                </h4>
            </div>
            <div className={"sm:hidden block"}>
                <h1 className={"text-hero-highlight-1-md pb-2"}>
                    { predefined.blogNotFoundTitle }
                </h1>
                <h4 className={"project-description"}>
                    { predefined.blogNotFoundSubtext1 }
                    <span>
                            <Link className={'text-highlight'} to={'/blog'}>{predefined.blogNotFoundSubtext2}</Link>
                        </span>
                </h4>
            </div>
        </div>
    </div>
}

const BlogNoLang = () => {
    const {predefined} = useTranslation()

    return <div className={"fixed top-0 left-0 w-screen h-screen flex justify-center items-center opacity-0 animate-slidein [--slidein-delay:100ms]"}>
        <div className={"flex flex-col text-center items-center"}>
            <div className={"sm:block hidden"}>
                <h1 className={"text-hero-highlight-1 pb-4"}>
                    { predefined.blogNoLang }
                </h1>
            </div>
            <div className={"sm:hidden block"}>
                <h1 className={"text-hero-highlight-1-md pb-2"}>
                    { predefined.blogNoLang }
                </h1>
            </div>
        </div>
    </div>
}

const BlogRender = () => {
    const [state, setState] = useState<"pending" | "not_found" | "no_lang" | "loaded">("pending")
    const [post, setPost] = useState(null as { post: RecordModel, author: RecordModel } | null)
    const [translations, setTranslations] = useState({} as Record<string, RecordModel | null>)
    const [isLoading, setLoading] = useState(false)
    const {predefined} = useTranslation()
    const params = useParams();

    useEffect(() => {
        const postId = params.blogId;
        if (!postId){
            setState("not_found")
        }

        const fetchPost = async () => {
            const app = PocketbaseApp()
            try {
                const posts = await app.collection("posts").getList(1, 50, {
                    filter: `seo_id = '${postId}'`
                });
                if (!posts.items.length){
                    setState("not_found")
                    return
                }

                const post = posts.items[0];
                const author = await app.collection("users").getOne(post.author)
                const synthesized = {
                    post: post,
                    author
                }

                setPost(synthesized)
            } catch (e){
                setState("not_found")
                console.log(e)
            }
        }

        fetchPost().then(() => {})
    }, [params]);

    useEffect(() => {
        if (isLoading) return;
        if (!post){
            return
        }

        if (predefined.id in translations){
            setState(translations[predefined.id] === null ? "no_lang" : 'loaded')
            return
        }

        setLoading(true)

        const fetchTranslation = async () => {
            const app = PocketbaseApp()
            try {
                const translation = (await app.collection("post_content").getList(1, 50, {
                    filter: app.filter('post_language = {:lang} && post_id = {:postId}', { lang: predefined.id, postId: post.post.id })
                })).items
                if (translation.length === 0){
                    setTranslations(old => {
                        const {...rec} = old;
                        const newTranslations = {
                            ...rec
                        }
                        newTranslations[predefined.id] = null
                        return newTranslations;
                    })
                    setState("no_lang")
                    return
                }
                const t = translation[0]
                t.markdown = blogReplaceImagePlaceholders(post.post, t.markdown)
                setTranslations(old => {
                    return {
                        ...old,
                        [predefined.id]: t
                    }
                })
                setState("loaded")
            } catch (e) {
                setState("no_lang")
            } finally {
                setLoading(false)
            }
        }
        fetchTranslation().then(() => {})
    }, [predefined, post]);

    const InnerBlog = () => {
        return translations[predefined.id] ? <div className={"flex flex-col w-full opacity-0 animate-slidein [--slidein-delay:100ms]"}>
            <div className={"text-hero-uncommon mt-16"}>
                { (translations[predefined.id] as RecordModel).title }
            </div>
            <div className={"mt-4"}>
                <h1 className={"text-author flex flex-row"}>
                    {predefined.blogBy}
                    <span>
                        <img className={"mt-0 w-8 aspect-square rounded-full mx-2"} alt={"avatar"} src={PocketbaseApp().files.getUrl(post!.author, post!.author.avatar, { thumb: "50x50" })} />
                    </span>
                    <span className={"text-author text-highlight"}>
                        { post!.author.name }
                    </span>
                    <span className={"text-author ml-1"}>
                        {`${predefined.blogAt} ${new Date((translations[predefined.id] as RecordModel).updated).toLocaleString(predefined.locale)}`}
                    </span>
                </h1>
            </div>
            <div className={"mt-8"}>
                <MarkdownRender text={(translations[predefined.id] as RecordModel).markdown}/>
            </div>
        </div> : undefined
    }

    return <PageLayout>
        <div className={"text-font"}>
            { state === "pending" ? <BlogLoading/> : state === "not_found" ? <BlogNotFound/> : state === "no_lang" ? <BlogNoLang/> : <InnerBlog/> }
        </div>
    </PageLayout>
}

export default BlogRender