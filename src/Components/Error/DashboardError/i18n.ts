import { getDictionaryGenerator } from "@/Components/Entity/Locale/utils"

const en = {
    title: "Something went wrong!",
    unknownError: "An unknown error occurred! Contact support."
}

const de: iDictionary = {
    title: "Etwas ist schief gelaufen!",
    unknownError: "Ein unbekannter Fehler ist aufgetreten! Bitte kontaktieren Sie den Support."
}
export type iDictionary = typeof en
export const getDictionary = getDictionaryGenerator<typeof en>({ en, de })
