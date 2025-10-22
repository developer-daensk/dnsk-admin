export interface iNavItem {
    title: string
    href: string
    icon?: React.ComponentType<{ className?: string }>
    badge?: string
    children?: iNavItem[]
}
