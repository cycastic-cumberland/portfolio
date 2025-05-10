// src/Navbar.js
import {FC, useEffect, useState} from 'react';
import {useTranslation} from "../contexts/TranslationContext.tsx";
import {Link} from "react-router-dom";
import {MailtoURL} from "../constants.ts";
import {SupportedLanguage} from "../contexts/TranslationContextType.ts";

type Preset = {
    flag: string,
    languageName: SupportedLanguage
}

const PredefinedLanguages: Preset[] = [
    {
        flag: '🇺🇸',
        languageName: 'english',
    },
    {
        flag: '🇻🇳',
        languageName: 'vietnamese',
    },
]

const getPredefinedLanguage = (index: number) => PredefinedLanguages[index % PredefinedLanguages.length];

const InnerNavbar: FC<{ isPhantom: boolean, preset: Preset, toggleLanguage: () => void }> = ({ isPhantom, preset, toggleLanguage }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOnTop, setIsOnTop] = useState(true)
    const { predefined } = useTranslation();

    const handleScroll = () => {
        setIsOnTop(document.documentElement.scrollTop === 0)
    };

    useEffect(() => {

        document.addEventListener('scroll', handleScroll)
        return () => document.removeEventListener('scroll', handleScroll);

    }, []);


    return (
        <nav className={`${!isPhantom ? "fixed top-0 left-0 w-screen z-50" : "invisible"} bg-primary pt-10 flex items-center justify-center ${ isOnTop ? "" : "shadow border-b-2 border-border"}`}>
            <div className="w-3/4">
                <div className="relative flex w-full items-center justify-between h-16">
                    <div className="flex-1 flex items-center justify-center">
                        <div className="inset-y-0 left-0 flex items-center sm:hidden mr-4">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                type="button"
                                className="hamburger-button"
                                aria-controls="mobile-menu"
                                aria-expanded="false"
                            >
                                {isOpen ? (
                                    <svg className="block h-6 w-6 animation-slidein-rev [--slidein-delay:0ms]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                ) : (
                                    <svg className="block h-6 w-6 animation-slideout [--slidein-delay:0ms]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                )}
                            </button>
                        </div>
                        <div className={"w-full flex flex-row"}>
                            <Link className="navbar-title" to={"/"}>
                                { predefined.navTitle }
                            </Link>
                        </div>
                        <div className={"w-full"}></div>
                        <div className="min-w-fit hidden sm:block sm:ml-6">
                            <div className="flex space-x-4">
                                <Link to="/" className="navbar-section-light">{ predefined.navHome }</Link>
                                <Link to="/projects" className="navbar-section-light">{ predefined.navWork }</Link>
                                {/*<Link to="/blog" className="navbar-section-light">{ predefined.navBlogs }</Link>*/}
                                <Link to="/#about" className="navbar-section-light">{ predefined.navAbout }</Link>
                                <Link to={MailtoURL} className="navbar-section-light">{ predefined.navContact }</Link>
                                <button onClick={toggleLanguage} className="navbar-section">{ preset.flag }</button>
                            </div>
                        </div>
                        { isOpen ? undefined : (<div className={"flex w-full sm:hidden"}>
                            <div className={"w-full"}/>
                            <button onClick={toggleLanguage} className="navbar-section">{ preset.flag }</button>
                        </div>) }
                    </div>
                </div>
                <div className={`sm:hidden ${isOpen ? 'block' : 'hidden'} shadow-left shadow-bottom rounded-md mx-2 bg-primary`} id="mobile-menu">
                    <div className={`px-2 pt-2 pb-3 space-y-1 ${isOnTop ? "border-b-2 border-border" : ""}`}>
                        <Link to="/" className="navbar-section-mobile">{ predefined.navHome }</Link>
                        <Link to="/projects" className="navbar-section-mobile">{ predefined.navWork }</Link>
                        {/*<Link to="/blog" className="navbar-section-mobile">{ predefined.navBlogs }</Link>*/}
                        <Link to="/#about" className="navbar-section-mobile">{ predefined.navAbout }</Link>
                        <Link to={MailtoURL} className="navbar-section-mobile">{ predefined.navContact }</Link>
                        <div onClick={toggleLanguage} className="w-full navbar-section-mobile cursor-pointer">
                            { `${predefined.miscLangText} ${preset.flag}` }
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

const NavBar = () => {
    const [languageIndex, setLanguageIndex] = useState(0);
    const [preset, setPreset] = useState(PredefinedLanguages[0]);
    const { predefined, setLanguageFromPredefined } = useTranslation();

    useEffect(() => {
        setPreset(PredefinedLanguages[languageIndex % PredefinedLanguages.length])
    }, [languageIndex]);

    useEffect(() => {
        for (let i = 0; i < PredefinedLanguages.length; i++){
            if (PredefinedLanguages[i].languageName === predefined.id){
                setLanguageIndex(i);
                setLanguageFromPredefined(getPredefinedLanguage(i).languageName);
                return;
            }
        }
    }, [predefined]);

    const toggleLanguage = () => {
        setLanguageFromPredefined(getPredefinedLanguage(languageIndex + 1).languageName);
        setLanguageIndex(i => i + 1)
    }
    return <>
        <InnerNavbar isPhantom={false} preset={preset} toggleLanguage={toggleLanguage} />
        <InnerNavbar isPhantom={true} preset={preset} toggleLanguage={toggleLanguage} />
    </>
}

export default NavBar;
