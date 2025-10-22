import { ThemeSwitcher } from "@/Components/Entity/Theme/Components/ThemeSwitcher/ThemeSwitcher";
import { LanguageSwitcher } from "@/Components/Entity/Locale/LanguageSwitcher";
import { iLocale } from "@/Components/Entity/Locale/types";
import { getDictionary } from "./i18n";

interface AuthLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: iLocale;
  }>;
}

export default async function AuthLayout({
  children,
  params,
}: AuthLayoutProps) {
  const { locale } = await params;
  const dictionary = getDictionary(locale);

  return (
    <div className="bg-background min-h-screen">
      {/* Header with theme and language switchers */}
      <header className="absolute top-4 right-4 z-10 flex items-center gap-2">
        <LanguageSwitcher appearance="button" />
        <ThemeSwitcher />
      </header>

      {/* Main auth content */}
      <div className="flex min-h-screen">
        {/* Left side - Branding/Image */}
        <div className="from-primary to-primary/80 hidden items-center justify-center bg-gradient-to-br lg:flex lg:w-1/2">
          <div className="p-8 text-center text-white">
            <h1 className="mb-4 text-4xl font-bold">{dictionary.welcome}</h1>
            <p className="text-xl opacity-90">{dictionary.description}</p>
          </div>
        </div>

        {/* Right side - Auth forms */}
        <div className="flex w-full items-center justify-center p-8 lg:w-1/2">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </div>
    </div>
  );
}
