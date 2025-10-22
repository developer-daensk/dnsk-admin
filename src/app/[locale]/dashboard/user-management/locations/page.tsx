import { iLocaleParam } from "@/Components/Entity/Locale/types";
import Locations from "@/Main/Dashboard/UserManagement/Locations/Locations";

interface iProps {
  params: Promise<iLocaleParam>;
}

export default async function Page({ params }: iProps) {
  const { locale } = await params;
  return <Locations locale={locale} />;
}
