import { iLocaleParam } from "@/Components/Entity/Locale/types";
import Logistics from "@/Main/Dashboard/UserManagement/Logistics/Logistics";

interface iProps {
  params: Promise<iLocaleParam>;
}

export default async function Page({ params }: iProps) {
  const { locale } = await params;
  return <Logistics locale={locale} />;
}
