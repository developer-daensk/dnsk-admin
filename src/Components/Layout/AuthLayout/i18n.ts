import { getDictionaryGenerator } from "@/Components/Entity/Locale/utils"

const en = {
    intro: {
        title: "B2B Dashboard",
        description: "Easy control of complex operations"
    }
}

const de: iDictionary = {
    intro: {
        title: "B2B Dashboard",
        description: "Einfache Steuerung komplexer Vorgänge"
    }
}

export type iDictionary = typeof en
export const getDictionary = getDictionaryGenerator<typeof en>({ en, de })
