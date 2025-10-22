import { LOCALES } from "./constants"

export type iLocale = (typeof LOCALES)[number]

export interface iLocaleParam {
    locale: iLocale
}

export type iDictionaryBaseStructure = {
    [key: string]: string | iDictionaryBaseStructure
}

export type iDictionaries<T extends iDictionaryBaseStructure> = {
    [L in iLocale]: T
}

export type iGetDictionary<T> = (locale: string) => T

export type iRemovedLocale = { locale: string; purePathName: string; isValid: boolean }

export type iLanguageList = Record<iLocale, { name: string; flag: string }>
