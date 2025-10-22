import { iLocaleParam } from "@/Components/Entity/Locale/types";
import Tags from "@/Main/Dashboard/Product/Search/Tags/Tags";

interface iProps {
  params: Promise<iLocaleParam>;
}

export default async function Page({ params }: iProps) {
  const { locale } = await params;
  return (
    <div className="w-full max-w-[1960px]">
      <Tags locale={locale} />
    </div>
  );
}
