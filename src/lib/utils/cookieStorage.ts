import Cookies from "js-cookie"

export const cookieStorage = {
    getItem: (name: string): string | null => {
        const value = Cookies.get(name)
        return value ?? null
    },
    setItem: (name: string, value: string, path = "/", expires = 365): void => {
        Cookies.set(name, value, { path, expires })
    },
    removeItem: (name: string): void => {
        Cookies.remove(name)
    }
}
