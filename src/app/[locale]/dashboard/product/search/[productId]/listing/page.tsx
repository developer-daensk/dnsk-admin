import { iLocaleParam } from "@/Components/Entity/Locale/types";
import Listing from "@/Main/Dashboard/Product/Search/Listing/Listing";

interface iProps {
  params: Promise<iLocaleParam>;
}

export default async function Page({ params }: iProps) {
  const { locale } = await params;
  return (
    <div className="w-full max-w-[1960px]">
      <Listing locale={locale} />
    </div>
  );
}
