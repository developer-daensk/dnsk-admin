import { iLocaleParam } from "@/Components/Entity/Locale/types";
import Location from "@/Main/Dashboard/Users/Edit/Location/Location";

interface iProps {
  params: Promise<iLocaleParam>;
}

export default async function Page({ params }: iProps) {
  const { locale } = await params;

  return <Location locale={locale} />;
}
