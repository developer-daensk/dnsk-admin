import { iLocaleParam } from "@/Components/Entity/Locale/types";
import Employees from "@/Main/Dashboard/Users/Edit/Employees/Employees";

interface iProps {
  params: Promise<iLocaleParam>;
}

export default async function Page({ params }: iProps) {
  const { locale } = await params;

  return <Employees locale={locale} />;
}
