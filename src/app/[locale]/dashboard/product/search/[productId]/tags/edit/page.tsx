import { iLocaleParam } from "@/Components/Entity/Locale/types";
import Edit from "@/Main/Dashboard/Product/Search/Tags/Edit/Edit";

interface iProps {
  params: Promise<iLocaleParam>;
}

export default async function Page({ params }: iProps) {
  const { locale } = await params;
  return (
    <div className="w-full max-w-[1960px]">
      <Edit locale={locale} />
    </div>
  );
}
