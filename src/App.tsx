import {TranslationProvider} from "./contexts/TranslationContext.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AppRoutes} from "./AppRoutes.tsx";
import {ProjectsProvider} from "./contexts/ProjectsContext.tsx";
import MigrationGate from "./components/MigrationGate.tsx";


const App = () =>  {
    return (<TranslationProvider>
        <ProjectsProvider>
            <BrowserRouter>
                <MigrationGate>
                    {/*<Route loader={(props) => {}}/>*/}
                    <Routes>
                        { AppRoutes.map((route, index) => {
                            const { element, ...rest } = route;
                            return <Route key={index} {...rest} element={element} />
                        }) }
                    </Routes>
                </MigrationGate>
            </BrowserRouter>
        </ProjectsProvider>
    </TranslationProvider>)
}

export default App
