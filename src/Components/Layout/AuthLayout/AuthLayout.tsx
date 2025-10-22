import { LanguageSwitcher } from "@/Components/Entity/Locale/LanguageSwitcher"
import { iLocale } from "@/Components/Entity/Locale/types"
import { ThemeSwitcher } from "@/Components/Entity/Theme/Components/ThemeSwitcher/ThemeSwitcher"
import Intro from "./Components/Intro"
import { getDictionary } from "./i18n"

interface iProps {
    children: React.ReactNode
    locale: iLocale
}

export default async function AuthLayout({ children, locale }: iProps) {
    const dictionary = getDictionary(locale)

    return (
        <div className="flex min-h-dvh bg-teal-50 dark:bg-gray-900">
            <div className="flex w-full flex-col items-center justify-center p-8 lg:w-1/2">
                <header className="mb-8 flex w-full items-center gap-2">
                    <ThemeSwitcher />
                    <LanguageSwitcher appearance="button" />
                </header>
                <div className="flex w-full grow-1 flex-col items-center justify-center">
                    <div className="mb-10 flex w-full items-center justify-center lg:hidden">
                        <Intro dictionary={dictionary} />
                    </div>
                    {children}
                </div>
            </div>
            <div className="text-foreground hidden items-center justify-center bg-gradient-to-r from-teal-300 to-teal-100 lg:flex lg:w-1/2 dark:from-gray-950 dark:to-gray-700">
                <Intro dictionary={dictionary} />
            </div>
        </div>
    )
}
