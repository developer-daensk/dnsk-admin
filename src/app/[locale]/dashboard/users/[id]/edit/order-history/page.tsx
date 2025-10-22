import { iLocaleParam } from "@/Components/Entity/Locale/types";
import OrderHistory from "@/Main/Dashboard/Users/Edit/OrderHistory/OrderHistory";

interface iProps {
  params: Promise<iLocaleParam>;
}

export default async function Page({ params }: iProps) {
  const { locale } = await params;

  return <OrderHistory locale={locale} />;
}
