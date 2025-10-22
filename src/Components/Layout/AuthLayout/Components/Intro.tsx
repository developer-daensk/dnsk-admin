import { PanelsLeftBottom } from "lucide-react"
import { getDictionary } from "../i18n"

interface iProps {
    dictionary: ReturnType<typeof getDictionary>
}

export default function Intro({ dictionary }: iProps) {
    return (
        <div className="justify-cente xs:flex-row xs:text-left flex flex-col items-center text-center">
            <PanelsLeftBottom className="text-primary animate-in zoom-in size-30 duration-700" />
            <div className="animate-in fade-in pl-4 duration-2000">
                <h1 className="mb-4 text-4xl font-bold">{dictionary.intro.title}</h1>
                <p className="text-xl opacity-90">{dictionary.intro.description}</p>
            </div>
        </div>
    )
}
