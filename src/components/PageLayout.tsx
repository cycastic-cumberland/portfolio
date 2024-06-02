import {FC, ReactNode} from "react";
import NavBar from "./NavBar.tsx";

const PageLayout: FC<{ children?: ReactNode[] | ReactNode }> = ({ children }) => {
    return (
        <div className={"min-h-screen h-full flex flex-col bg-primary"}>
            <div className={"w-full h-full"}>
                <NavBar/>
                <div className={"w-full h-full flex flex-col items-center"}>
                    <div className={"w-3/4"}>
                        { children }
                        <div className={"h-10 bg-primary"} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PageLayout;