import { iLocaleParam } from "@/Components/Entity/Locale/types";
import Products from "@/Main/Dashboard/UserManagement/Products/Products";

interface iProps {
  params: Promise<iLocaleParam>;
}

export default async function Page({ params }: iProps) {
  const { locale } = await params;
  return <Products locale={locale} />;
}
