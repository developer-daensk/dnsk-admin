import { iLocaleParam } from "@/Components/Entity/Locale/types";
import Attributes from "@/Main/Dashboard/Product/Attributes/Attributes";

interface iProps {
  params: Promise<iLocaleParam>;
}

export default async function Page({ params }: iProps) {
  const { locale } = await params;

  return <Attributes locale={locale} />;
}
