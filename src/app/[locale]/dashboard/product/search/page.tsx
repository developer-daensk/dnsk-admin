import { iLocaleParam } from "@/Components/Entity/Locale/types";
import ProductSearch from "@/Main/Dashboard/Product/Search/ProductSearch";

interface iProps {
  params: Promise<iLocaleParam>;
}

export default async function Page({ params }: iProps) {
  const { locale } = await params;
  return (
    <div className="w-full max-w-[1960px]">
      <ProductSearch locale={locale} />
    </div>
  );
}
