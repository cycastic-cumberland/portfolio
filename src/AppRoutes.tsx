import LandingPage from "./components/LandingPage.tsx";
import {ReactNode} from "react";
import FeatureComingSoon from "./components/FeatureComingSoon.tsx";
import NotFound from "./components/NotFound.tsx";
import FirestoreTest from "./components/FirestoreTest.tsx";

export type RouteInfo = { index?: boolean, path?: string, element: ReactNode };

export const AppRoutes : RouteInfo[] = [
    {
        index: true,
        element: <LandingPage />,
    },
    {
        path: '/blogs',
        element: <FeatureComingSoon/>
    },
    {
        path: "/firestore_state",
        element: <FirestoreTest/>
    },
    {
        path: '*',
        element: <NotFound/>
    }
];
