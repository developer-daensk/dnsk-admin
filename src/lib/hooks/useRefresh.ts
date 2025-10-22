"use client"

import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"

// Global event target for refresh events
const refreshEventTarget = typeof window !== "undefined" ? new EventTarget() : null

export function useRefreshTrigger() {
    const router = useRouter()

    const refreshTrigger = useCallback(() => {
        router.refresh()
        if (refreshEventTarget) refreshEventTarget.dispatchEvent(new Event("refresh"))
    }, [router])

    return refreshTrigger
}

export function useRefreshTarget() {
    const [refreshTargetKey, setRefreshTargetKey] = useState(0)

    useEffect(() => {
        if (!refreshEventTarget) return

        const handleRefresh = () => {
            setRefreshTargetKey(prev => prev + 1)
        }

        refreshEventTarget.addEventListener("refresh", handleRefresh)

        return () => {
            refreshEventTarget.removeEventListener("refresh", handleRefresh)
        }
    }, [])

    return refreshTargetKey
}
