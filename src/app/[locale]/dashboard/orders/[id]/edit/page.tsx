import { iLocaleParam } from "@/Components/Entity/Locale/types";
import { getDictionary } from "@/Main/Dashboard/Orders/i18n";
import Edit from "@/Main/Dashboard/Orders/Edit/Edit";

interface iProps {
  searchParams?: Promise<{ tab?: string }>;
  params: Promise<iLocaleParam>;
}

export async function generateMetadata({ params }: iProps) {
  const { locale } = await params;
  const dictionary = getDictionary(locale);
  return {
    title: dictionary.seo.title,
    description: dictionary.seo.description,
  };
}

export default async function Page({ params }: iProps) {
  const { locale } = await params;

  return <Edit locale={locale} />;
}
