import React, {createContext, useContext, useState} from "react";
import {English, Vietnamese} from "../i18n.ts";
import {TranslationContextType} from "./TranslationContextType.ts";

const TranslationContext = createContext<TranslationContextType>(null as never as TranslationContextType);

const SupportedLanguages: Record<string, Record<string, string>> = {
    'english': English,
    'vietnamese': Vietnamese
}

export const useTranslation = () => {
    return useContext(TranslationContext)
}

export const TranslationProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    const [currentPredefinedSet, setPredefinedSet] = useState<Record<string, string>>(English)

    const setLanguageFromPredefined = (name: string) => {
        setPredefinedSet(SupportedLanguages[name])
    }

    const value: TranslationContextType = {
        predefined: currentPredefinedSet,
        setLanguageFromPredefined
    }

    return (<TranslationContext.Provider value={value}>
        { children }
    </TranslationContext.Provider>)
}