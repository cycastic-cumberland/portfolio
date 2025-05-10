import React, {createContext, useContext, useState} from "react";
import English from "../translations/english.ts"
import Vietnamese from "../translations/vietnamese.ts";
import {SupportedLanguage, TranslationContextType} from "./TranslationContextType.ts";

const TranslationContext = createContext<TranslationContextType>(null as never as TranslationContextType);

const SupportedLanguages: Record<SupportedLanguage, Record<string, string>> = {
    'english': English,
    'vietnamese': Vietnamese
}

export const useTranslation = () => {
    return useContext(TranslationContext)
}

export const TranslationProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    const [selectedLanguage, setSelectedLanguage] = useState("english" as SupportedLanguage)
    const [currentPredefinedSet, setPredefinedSet] = useState<Record<string, string>>(English)

    const setLanguageFromPredefined = (name: SupportedLanguage) => {
        setSelectedLanguage(name)
        setPredefinedSet(SupportedLanguages[name])
    }

    const value: TranslationContextType = {
        predefined: currentPredefinedSet,
        selectedLanguage,
        setLanguageFromPredefined
    }

    return (<TranslationContext.Provider value={value}>
        { children }
    </TranslationContext.Provider>)
}