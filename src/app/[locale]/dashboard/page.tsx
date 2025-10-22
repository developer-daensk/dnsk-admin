import { iLocaleParam } from "@/Components/Entity/Locale/types";
import Dashboard from "@/Main/Dashboard/Dashboard/Dashboard";

interface iProps {
  params: Promise<iLocaleParam>;
}

export default async function Page({ params }: iProps) {
  const { locale } = await params;

  return <Dashboard locale={locale} />;
}
