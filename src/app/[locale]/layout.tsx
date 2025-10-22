import { LOCALES } from "@/Components/Entity/Locale/constants";
import { iLocaleParam } from "@/Components/Entity/Locale/types";
import { ThemeInit } from "@/Components/Entity/Theme/Components/ThemeInit";
import { getLayoutTheme } from "@/Components/Entity/Theme/utils";
import { Toaster } from "@/Components/Shadcn/sonner";
import { roboto } from "@/lib/configs/fonts";
import { getDictionary } from "@/lib/configs/i18n";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { cookies } from "next/headers";

interface iProps {
  children: React.ReactNode;
  params: Promise<iLocaleParam>;
}

export async function generateMetadata({ params }: iProps): Promise<Metadata> {
  const { locale } = await params;
  const dictionary = getDictionary(locale);
  return dictionary.seo;
}

export async function generateStaticParams(): Promise<iLocaleParam[]> {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function Layout({ children, params }: iProps) {
  const { locale } = await params;
  const cookieStore = await cookies();
  const theme = getLayoutTheme(cookieStore);

  return (
    <html lang={locale} className={theme}>
      <body
        className={`${roboto.variable} font-roboto bg-background text-foreground antialiased`}
      >
        <ThemeInit />
        <Toaster />
        {children}
      </body>
    </html>
  );
}
