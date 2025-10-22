"use client";

import { iLocale } from "./types";
import {
  addLocaleToPathname,
  getLocaleFromCookie,
  removeLocaleFromPathname,
  setLocaleToCookie,
} from "./utils";
import { cn } from "../../Shadcn/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../Shadcn/select";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useEffect, useState } from "react";
import { LOCALE_FULLNAME, LOCALES } from "./constants";
import { getDictionary } from "./i18n";

interface iProps {
  className?: string;
  appearance: "button" | "select";
}

export function LanguageSwitcher({
  className = "",
  appearance = "button",
}: iProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();
  const { locale } = useParams<{ locale: iLocale }>();
  const dictionary = getDictionary(locale);
  const { purePathName } = removeLocaleFromPathname(pathname);
  const [currentLocale, setCurrentLocale] = useState<iLocale>(locale);

  useEffect(() => {
    const cookieLocale = getLocaleFromCookie();
    if (cookieLocale && cookieLocale !== locale) {
      const newPath = addLocaleToPathname(purePathName, cookieLocale);
      const hrefWithQuery = queryString ? `${newPath}?${queryString}` : newPath;
      router.replace(hrefWithQuery);
    } else if (!cookieLocale) {
      setLocaleToCookie(locale);
    }
    setCurrentLocale(locale);
  }, [locale, purePathName, queryString, router]);

  const handleLocaleChange = (newLocale: iLocale) => {
    setLocaleToCookie(newLocale);
    setCurrentLocale(newLocale);
    const href = addLocaleToPathname(purePathName, newLocale);
    const hrefWithQuery = queryString ? `${href}?${queryString}` : href;
    router.push(hrefWithQuery);
  };

  /**
   * appearance: "button"
   */
  if (appearance === "button")
    return (
      <div className={cn("flex items-center", className)}>
        <div className="bg-muted flex rounded-sm p-1">
          {LOCALES.map((locale) => (
            <button
              key={locale}
              onClick={() => handleLocaleChange(locale)}
              className={cn(
                "relative cursor-pointer rounded-sm border-none bg-transparent px-2 py-0.5 text-xs font-medium transition-all duration-200",
                currentLocale === locale
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {locale.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    );

  /**
   * appearance: "select"
   */
  return (
    <Select value={currentLocale} onValueChange={handleLocaleChange}>
      <SelectTrigger className="mt-2 w-40">
        <SelectValue placeholder={dictionary.placeholder} />
      </SelectTrigger>
      <SelectContent>
        {LOCALES.map((locale) => (
          <SelectItem key={locale} value={locale}>
            {LOCALE_FULLNAME[locale]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
