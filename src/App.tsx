import {TranslationProvider} from "./contexts/TranslationContext.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AppRoutes} from "./AppRoutes.tsx";
import {ProjectsProvider} from "./contexts/ProjectsContext.tsx";


const App = () =>  {
    return (<TranslationProvider>
        <ProjectsProvider>
            <BrowserRouter>
                <Routes>
                    { AppRoutes.map((route, index) => {
                        const { element, ...rest } = route;
                        return <Route key={index} {...rest} element={element}/>
                    }) }
                </Routes>
            </BrowserRouter>
        </ProjectsProvider>
    </TranslationProvider>)
}

export default App
