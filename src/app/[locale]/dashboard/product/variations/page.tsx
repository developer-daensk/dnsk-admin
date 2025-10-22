import { iLocaleParam } from "@/Components/Entity/Locale/types";
import { getDictionary } from "@/Main/Dashboard/Orders/i18n";
import Variations from "@/Main/Dashboard/Product/Variations/Variations";

interface iProps {
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

  return <Variations locale={locale} />;
}
