import { iLocaleParam } from "@/Components/Entity/Locale/types";
import Details from "@/Main/Dashboard/Users/Edit/Details/Details";

interface iProps {
  params: Promise<iLocaleParam>;
}

export default async function Page({ params }: iProps) {
  const { locale } = await params;

  return <Details locale={locale} />;
}
