import { iLocale } from "./types"

export const LOCALE_COOKIE_NAME = "user-locale"

export const LOCALES = ["en", "de"] as const

export const DEFAULT_LOCALE: iLocale = "en"

export const LOCALE_FULLNAME: Record<iLocale, string> = {
    en: "English",
    de: "Deutsch"
}
