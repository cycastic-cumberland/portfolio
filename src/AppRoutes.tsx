import LandingPage from "./components/LandingPage.tsx";
import {ReactNode} from "react";
import NotFound from "./components/NotFound.tsx";
import ProjectShowreel from "./components/ProjectShowreel.tsx";

export type RouteInfo = { index?: boolean, path?: string, element: ReactNode };

export const AppRoutes : RouteInfo[] = [
    {
        index: true,
        element: <LandingPage />,
    },
    {
        path: "/projects",
        element: <ProjectShowreel/>
    },
    {
        path: '*',
        element: <NotFound/>
    }
];
