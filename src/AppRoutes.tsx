import LandingPage from "./components/LandingPage.tsx";
import {ReactNode} from "react";
import NotFound from "./components/NotFound.tsx";
import PocketbaseTest from "./components/PocketbaseTest.tsx";
import BlogRender from "./components/blog/BlogRender.tsx";
import Blogs from "./components/blog/Blogs.tsx";

export type RouteInfo = { index?: boolean, path?: string, element: ReactNode };

export const AppRoutes : RouteInfo[] = [
    {
        index: true,
        element: <LandingPage />,
    },
    {
        path: '/blog',
        element: <Blogs/>
    },
    {
        path: '/blog/:blogId',
        element: <BlogRender/>
    },
    {
        path: "/pocketbase-state",
        element: <PocketbaseTest/>
    },
    {
        path: '*',
        element: <NotFound/>
    }
];
