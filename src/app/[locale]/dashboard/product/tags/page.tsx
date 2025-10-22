import { iLocaleParam } from "@/Components/Entity/Locale/types";
import Tags from "@/Main/Dashboard/Product/Tags/Tags";

interface iProps {
  params: Promise<iLocaleParam>;
}

export default async function Page({ params }: iProps) {
  const { locale } = await params;

  return <Tags locale={locale} />;
}
