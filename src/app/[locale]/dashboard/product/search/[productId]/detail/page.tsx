import { iLocaleParam } from "@/Components/Entity/Locale/types";
import Detail from "@/Main/Dashboard/Product/Search/Detail/Detail";

interface iProps {
  params: Promise<iLocaleParam>;
}

export default async function Page({ params }: iProps) {
  const { locale } = await params;
  return (
    <div className="w-full max-w-[1960px]">
      <Detail locale={locale} />
    </div>
  );
}
