import { HTMLAttributes, ReactNode } from "react"

export interface iRowData {
    id?: string | number
}

export interface iParams<TData> {
    row: TData
    index: number
    isMobile: boolean
}

export type iBreakpoint = "sm" | "md" | "lg" | "xl"

export type iPolymorphicString = string | ((isMobile: boolean) => string)
export type iPolymorphicLabel =
    | string
    | ((isMobile: boolean) => string)
    | ReactNode
    | ((isMobile: boolean) => ReactNode)

export interface iResponsiveColumn<T extends iRowData> {
    label: iPolymorphicLabel
    isMobile?: boolean
    labelClassName?: iPolymorphicString
    cell: (params: iParams<T>) => ReactNode
}

export interface iResponsiveTableProps<T extends iRowData> {
    data: Array<T>
    columns: Array<iResponsiveColumn<T>>
    breakpoint?: iBreakpoint
    className?: iPolymorphicString
    rowKey?: keyof T
    rowProps?: (params: iParams<T>) => HTMLAttributes<HTMLTableRowElement>
}
