import { iLocaleParam } from "@/Components/Entity/Locale/types";
import Variants from "@/Main/Dashboard/Product/Search/Variants/Variants";

interface iProps {
  params: Promise<iLocaleParam>;
}

export default async function Page({ params }: iProps) {
  const { locale } = await params;
  return (
    <div className="w-full max-w-[1960px]">
      <Variants locale={locale} />
    </div>
  );
}
