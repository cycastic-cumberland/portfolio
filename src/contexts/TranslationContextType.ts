export type SupportedLanguage = "english" | "vietnamese"

export type TranslationContextType = {
    predefined: Record<string, string>
    selectedLanguage: SupportedLanguage,
    setLanguageFromPredefined: (name: SupportedLanguage) => void
}