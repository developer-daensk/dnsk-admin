import Negotiator from "negotiator"
import { NextRequest, NextResponse } from "next/server"
import { IS_SERVER } from "../../../lib/configs/constants"
import { cookieStorage } from "../../../lib/utils/cookieStorage"
import { DEFAULT_LOCALE, LOCALE_COOKIE_NAME, LOCALES } from "./constants"
import {
    iDictionaries,
    iDictionaryBaseStructure,
    iGetDictionary,
    iLocale,
    iRemovedLocale
} from "./types"

export function isValidLocale(locale: string): locale is iLocale {
    return LOCALES.includes(locale as iLocale)
}

export function hasValidLocal(pathname: string): boolean {
    return LOCALES.some(locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)
}

export function getLocaleFromPathname(pathname: string): iLocale {
    const segments = pathname.split("/")
    const potentialLocale = segments[1]
    return isValidLocale(potentialLocale) ? potentialLocale : DEFAULT_LOCALE
}

export function removeLocaleFromPathname(pathname: string): iRemovedLocale {
    const segments = pathname.split("/")
    const locale = segments[1]
    const isValid = isValidLocale(locale)
    const purePathName = isValid ? `/${segments.slice(2).join("/")}` : pathname
    return { locale, purePathName, isValid }
}

export function addLocaleToPathname(pathname: string, locale: iLocale = DEFAULT_LOCALE): string {
    const isValid = isValidLocale(locale as string)
    return `/${isValid ? locale : DEFAULT_LOCALE}${pathname !== "/" ? pathname : ""}`
}

export function getDictionaryGenerator<T extends iDictionaryBaseStructure>(
    dictionaries: iDictionaries<T>
): iGetDictionary<T> {
    return (locale: string) => {
        const targetLocale = isValidLocale(locale) ? locale : DEFAULT_LOCALE
        return dictionaries[targetLocale]
    }
}

export function getLocalDate(date: string, locale: iLocale) {
    return new Date(date).toLocaleString(locale === "en" ? "en-US" : "de-DE", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
    })
}

export function getLocaleFromCookie(): iLocale | null {
    if (IS_SERVER) return null
    const value = cookieStorage.getItem(LOCALE_COOKIE_NAME)
    return value && isValidLocale(value) ? value : null
}

export function setLocaleToCookie(locale: iLocale): void {
    if (IS_SERVER) return
    cookieStorage.setItem(LOCALE_COOKIE_NAME, locale)
}

export function getLocaleFromRequest(Request: NextRequest) {
    // ead locale from cookie
    const cookieLocale = Request.cookies.get(LOCALE_COOKIE_NAME)?.value
    if (cookieLocale && isValidLocale(cookieLocale)) return { locale: cookieLocale, isCookie: true }

    // If no valid cookie, check browser headers
    const headers = Object.fromEntries(Request.headers.entries())
    const negotiator = new Negotiator({ headers })
    const availableLocales = [...LOCALES]
    const potentialLocale = negotiator.language(availableLocales) as iLocale
    const detectedLocale = isValidLocale(potentialLocale) ? potentialLocale : DEFAULT_LOCALE
    return { locale: detectedLocale, isCookie: false }
}

export function addLocaleToRequest(pathname: string, req: NextRequest) {
    const { locale, isCookie } = getLocaleFromRequest(req)

    // read from cookie
    req.nextUrl.pathname = addLocaleToPathname(pathname, locale)
    const response = NextResponse.redirect(req.nextUrl)
    if (isCookie) return response

    // set cookie
    response.cookies.set(LOCALE_COOKIE_NAME, locale, {
        path: "/",
        maxAge: 365 * 24 * 60 * 60, // 1 year
        sameSite: "lax"
    })
    return response
}
