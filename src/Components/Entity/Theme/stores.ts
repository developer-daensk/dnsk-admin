import { cookieStorage } from "@/lib/utils/cookieStorage"
import { create } from "zustand"
import { persist } from "zustand/middleware"
import { INITIAL_INVISIBLE_CLASS, THEME_COOKIE_NAME, THEME_LOCALSTORAGE_NAME } from "./constants"
import { iResolvedTheme, iTheme, iThemeStore } from "./types"
import { isValidTheme, themes } from "./utils"

export const useThemeStore = create<iThemeStore>()(
    persist(
        (set, get) => ({
            theme: "system",
            resolvedTheme: "light",

            setTheme: (nextTheme: iTheme) => {
                if (!isValidTheme(nextTheme)) {
                    console.error(`Invalid nextTheme: ${nextTheme}`)
                    return
                }
                cookieStorage.removeItem(THEME_COOKIE_NAME)
                set({ theme: nextTheme })
            },

            initializeTheme: () => {
                const currentTheme = get().theme
                const root = document.documentElement
                const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
                const resolvedTheme: iResolvedTheme =
                    currentTheme !== "system" ? currentTheme : mediaQuery.matches ? "dark" : "light"

                root.classList.remove(...themes, INITIAL_INVISIBLE_CLASS)
                root.classList.add(resolvedTheme)
                cookieStorage.setItem(THEME_COOKIE_NAME, resolvedTheme)
                set({ resolvedTheme })

                if (currentTheme !== "system") return null

                const handleChange = () => {
                    const newTheme = mediaQuery.matches ? "dark" : "light"
                    root.classList.remove(...themes)
                    root.classList.add(newTheme)
                    set({ resolvedTheme: newTheme })
                }
                mediaQuery.addEventListener("change", handleChange)
                return () => mediaQuery.removeEventListener("change", handleChange)
            }
        }),
        {
            name: THEME_LOCALSTORAGE_NAME,
            partialize: s => ({ theme: s.theme })
        }
    )
)
