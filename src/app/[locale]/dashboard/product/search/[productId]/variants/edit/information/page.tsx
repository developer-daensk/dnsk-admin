import { iLocaleParam } from "@/Components/Entity/Locale/types";
import Information from "@/Main/Dashboard/Product/Search/Variants/Edit/Information/Information";

interface iProps {
  params: Promise<iLocaleParam>;
}

export default async function Page({ params }: iProps) {
  const { locale } = await params;
  return (
    <div className="w-full max-w-[1960px]">
      <Information locale={locale} />
    </div>
  );
}
