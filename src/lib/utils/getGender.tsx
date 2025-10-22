import { iLocale } from "@/Components/Entity/Locale/types"

export function getGender(genderIndex: number = 0, locale: iLocale) {
    const GENDER = {
        en: ["Unknown", "Male", "Female"],
        de: ["Unbekannt", "Männlich", "Weiblich"]
    }
    return GENDER[locale][genderIndex]
}
