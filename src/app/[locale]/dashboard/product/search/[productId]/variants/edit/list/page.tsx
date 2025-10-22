import { iLocaleParam } from "@/Components/Entity/Locale/types";
import List from "@/Main/Dashboard/Product/Search/Variants/Edit/List/List";

interface iProps {
  params: Promise<iLocaleParam>;
}

export default async function Page({ params }: iProps) {
  const { locale } = await params;
  return (
    <div className="w-full max-w-[1960px]">
      <List locale={locale} />
    </div>
  );
}
