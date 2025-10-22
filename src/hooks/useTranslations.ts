"use client";

import { useParams } from "next/navigation";
import { Locale } from "@/lib/config/i18n";
import { getTranslations } from "../lib/translations";

export function useTranslations() {
  const params = useParams();
  const locale = params.locale as Locale;
  const translations = getTranslations(locale);

  return {
    locale,
    t: translations.common,
    seo: translations.seo,
  };
}
