import { iLocaleParam } from "@/Components/Entity/Locale/types";
import SalesHistory from "@/Main/Dashboard/Users/Edit/SalesHistory/SalesHistory";

interface iProps {
  params: Promise<iLocaleParam>;
}

export default async function Page({ params }: iProps) {
  const { locale } = await params;

  return <SalesHistory locale={locale} />;
}
