import { API_BASE_PATH } from "./constants"

type QueryParams = Record<string, string | number | boolean | undefined>

export function apiRoute(
    apiBasePathKey: keyof typeof API_BASE_PATH,
    path: string,
    params?: QueryParams
): string {
    const fullPath = `${API_BASE_PATH[apiBasePathKey]}${path}`
    return buildRoute(fullPath, params)
}

export function buildRoute(path: string, params?: QueryParams): string {
    if (!params) return path

    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
            searchParams.append(key, value.toString())
        }
    })

    const queryString = searchParams.toString()
    return queryString ? `${path}?${queryString}` : path
}
