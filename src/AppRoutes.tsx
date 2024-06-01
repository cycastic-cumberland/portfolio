import LandingPage from "./components/LandingPage.tsx";
import {ReactNode} from "react";
import IntroductoryComingSoon from "./components/projects/IntroductoryComingSoon.tsx";
import FeatureComingSoon from "./components/FeatureComingSoon.tsx";
import NotFound from "./components/NotFound.tsx";

export type RouteInfo = { index?: boolean, path?: string, element: ReactNode };

export const AppRoutes : RouteInfo[] = [
    {
        index: true,
        element: <LandingPage />,
    },
    {
        path: '/astra',
        element: <IntroductoryComingSoon/>
    },
    {
        path: '/cumail',
        element: <IntroductoryComingSoon/>
    },
    {
        path: '/libmanage',
        element: <IntroductoryComingSoon/>
    },
    {
        path: '/newstalker',
        element: <IntroductoryComingSoon/>
    },
    {
        path: '/microjit',
        element: <IntroductoryComingSoon/>
    },
    {
        path: '/blogs',
        element: <FeatureComingSoon/>
    },
    {
        path: '*',
        element: <NotFound/>
    }
];
