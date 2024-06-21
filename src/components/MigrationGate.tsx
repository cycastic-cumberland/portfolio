import {FC, ReactNode} from "react";
import RedirectPage from "./RedirectPage.tsx";

const CheckDomainName = (): "redirected" | "allowed" => {
    const loc = String(window.location);
    const mustRedirect = loc.search(/([a-zA-Z0-9-]+)?\.netlify\.app/) > -1;
    console.log("Must redirect: ", mustRedirect)
    return mustRedirect ? "redirected" : "allowed"
}

const MigrationGate: FC<{ children?: ReactNode }> = ({ children }) => {
    const state = CheckDomainName()

    return <>
        { state === "allowed" ? children : <RedirectPage/> }
    </>
}

export default MigrationGate;
