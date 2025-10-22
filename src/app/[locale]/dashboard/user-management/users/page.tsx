import { iLocaleParam } from "@/Components/Entity/Locale/types";
import Users from "@/Main/Dashboard/UserManagement/Users/Users";

interface iProps {
  params: Promise<iLocaleParam>;
}

export default async function Page({ params }: iProps) {
  const { locale } = await params;
  return <Users locale={locale} />;
}
