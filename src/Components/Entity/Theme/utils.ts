import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies"
import { INITIAL_INVISIBLE_CLASS, THEME_COOKIE_NAME } from "./constants"
import { iGetLayoutTheme, iResolvedTheme, iTheme } from "./types"

export const themes = ["light", "dark", "system"] as const

export function isValidTheme(theme?: string | null): theme is iTheme {
    if (!theme) return false
    return themes.includes(theme as iTheme)
}

export function isValidResolvedTheme(theme?: string | null): theme is iResolvedTheme {
    if (!theme || theme === "system") return false
    return themes.includes(theme as iResolvedTheme)
}

export function getLayoutTheme(cookieStore: ReadonlyRequestCookies): iGetLayoutTheme {
    const cookieTheme = cookieStore.get(THEME_COOKIE_NAME)?.value

    if (isValidResolvedTheme(cookieTheme)) return cookieTheme === "dark" ? "dark" : "light"
    else return INITIAL_INVISIBLE_CLASS
}
