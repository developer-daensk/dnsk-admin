import { iLocaleParam } from "@/Components/Entity/Locale/types";
import Price from "@/Main/Dashboard/Product/Search/Price/Price";

interface iProps {
  params: Promise<iLocaleParam>;
}

export default async function Page({ params }: iProps) {
  const { locale } = await params;
  return (
    <div className="w-full max-w-[1960px]">
      <Price locale={locale} />
    </div>
  );
}
