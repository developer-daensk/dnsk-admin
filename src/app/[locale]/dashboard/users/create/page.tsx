import CreateUser from "@/Main/Dashboard/Users/Create/Create";
import { iLocale } from "@/Components/Entity/Locale/types";

interface CreateUserPageProps {
  params: {
    locale: iLocale;
  };
}

export default function CreateUserPage({ params }: CreateUserPageProps) {
  return <CreateUser locale={params.locale} />;
}
