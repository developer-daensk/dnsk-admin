import { INITIAL_INVISIBLE_CLASS } from "./constants"
import { themes } from "./utils"

export type iTheme = (typeof themes)[number]

export type iResolvedTheme = Exclude<iTheme, "system">

export interface iThemeStore {
    theme: iTheme
    resolvedTheme: "light" | "dark"
    setTheme: (theme: iTheme) => void
    initializeTheme: () => null | (() => void)
}

export type iGetLayoutTheme = iResolvedTheme | typeof INITIAL_INVISIBLE_CLASS
