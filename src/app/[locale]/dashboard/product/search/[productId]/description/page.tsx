import { iLocaleParam } from "@/Components/Entity/Locale/types";
import Description from "@/Main/Dashboard/Product/Search/Description/Description";

interface iProps {
  params: Promise<iLocaleParam>;
}

export default async function Page({ params }: iProps) {
  const { locale } = await params;
  return (
    <div className="w-full max-w-[1960px]">
      <Description locale={locale} />
    </div>
  );
}
