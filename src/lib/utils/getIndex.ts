import { ChangeEvent, KeyboardEvent, MouseEvent } from "react"
type iE = HTMLElement | MouseEvent | ChangeEvent | KeyboardEvent

export function getIndex(e: iE, forceToNumber: true): number | null
export function getIndex(e: iE, forceToNumber?: false): string | number | null
export function getIndex(e: iE, forceToNumber: boolean = false) {
    if (!e || typeof e !== "object" || e === null) {
        console.error("getIndex > invalid parameter!", e)
        return null
    }
    const elm = e instanceof HTMLElement ? e : (e.currentTarget as HTMLElement)
    const index = elm.getAttribute("data-index")
    if (index === null) return null
    const result = Number(index)
    if (isNaN(result)) {
        if (forceToNumber) return null
        else return index
    }
    return result
}
