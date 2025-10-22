import { iLocaleParam } from "@/Components/Entity/Locale/types";
import Offering from "@/Main/Dashboard/Users/Edit/Offering/Offering";

interface iProps {
  params: Promise<iLocaleParam>;
}

export default async function Page({ params }: iProps) {
  const { locale } = await params;

  return <Offering locale={locale} />;
}
