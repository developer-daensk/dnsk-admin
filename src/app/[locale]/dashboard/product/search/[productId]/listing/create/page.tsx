import { iLocaleParam } from "@/Components/Entity/Locale/types";
import Create from "@/Main/Dashboard/Product/Search/Listing/Create/Create";

interface iProps {
  params: Promise<iLocaleParam>;
}

export default async function Page({ params }: iProps) {
  const { locale } = await params;
  return (
    <div className="w-full max-w-[1960px]">
      <Create locale={locale} />
    </div>
  );
}
