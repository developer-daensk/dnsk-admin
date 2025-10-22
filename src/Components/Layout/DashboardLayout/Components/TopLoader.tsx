"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export function TopLoader() {
    const [isLoading, setIsLoading] = useState(false)
    const [progress, setProgress] = useState(0)
    const pathname = usePathname()

    useEffect(() => {
        let progressInterval: NodeJS.Timeout
        let completeTimeout: NodeJS.Timeout

        const startLoading = () => {
            setIsLoading(true)
            setProgress(0)

            // Smooth progress animation
            progressInterval = setInterval(() => {
                setProgress(prev => {
                    if (prev < 30) {
                        return prev + Math.random() * 8 + 3
                    } else if (prev < 60) {
                        return prev + Math.random() * 5 + 2
                    } else if (prev < 85) {
                        return prev + Math.random() * 3 + 1
                    }
                    // Slow down near the end
                    return prev + Math.random() * 1
                })
            }, 120)

            // Force complete after reasonable time
            completeTimeout = setTimeout(() => {
                completeLoading()
            }, 4000)
        }

        const completeLoading = () => {
            clearInterval(progressInterval)
            clearTimeout(completeTimeout)

            setProgress(100)
            setTimeout(() => {
                setIsLoading(false)
                setProgress(0)
            }, 200)
        }

        // Handle navigation detection
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            const anchor = target.closest("a")

            if (anchor && anchor.href) {
                try {
                    const url = new URL(anchor.href)
                    const currentUrl = new URL(window.location.href)

                    // Check if it's an internal navigation to a different page
                    if (
                        url.origin === currentUrl.origin &&
                        url.pathname !== currentUrl.pathname &&
                        !anchor.target && // Not opening in new tab
                        !anchor.download && // Not a download link
                        !anchor.href.startsWith("mailto:") &&
                        !anchor.href.startsWith("tel:")
                    ) {
                        startLoading()
                    }
                } catch {
                    // Invalid URL, ignore
                }
            }
        }

        // Handle form submissions that might navigate
        const handleSubmit = (e: SubmitEvent) => {
            const form = e.target as HTMLFormElement
            if (form.method === "GET" || form.action) {
                startLoading()
            }
        }

        // Handle browser back/forward
        const handlePopstate = () => {
            startLoading()
        }

        document.addEventListener("click", handleClick)
        document.addEventListener("submit", handleSubmit)
        window.addEventListener("popstate", handlePopstate)

        return () => {
            clearInterval(progressInterval)
            clearTimeout(completeTimeout)
            document.removeEventListener("click", handleClick)
            document.removeEventListener("submit", handleSubmit)
            window.removeEventListener("popstate", handlePopstate)
        }
    }, [])

    // Complete loading when pathname changes
    useEffect(() => {
        if (isLoading) {
            const timer = setTimeout(() => {
                setProgress(100)
                setTimeout(() => {
                    setIsLoading(false)
                    setProgress(0)
                }, 200)
            }, 50)

            return () => clearTimeout(timer)
        }
    }, [pathname, isLoading])

    if (!isLoading) return null

    return (
        <div className="fixed top-0 right-0 left-0 z-[9999]">
            <div className="bg-border h-1">
                <div
                    className="from-primary via-primary to-primary/80 h-full bg-gradient-to-r shadow-[0_0_8px_hsl(var(--primary)/0.4)] transition-all duration-300 ease-out"
                    style={{
                        width: `${Math.min(progress, 100)}%`
                    }}
                />
            </div>
        </div>
    )
}
