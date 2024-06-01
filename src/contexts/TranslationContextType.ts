export type TranslationContextType = {
    predefined: Record<string, string>,
    setLanguageFromPredefined: (name: string) => void
}