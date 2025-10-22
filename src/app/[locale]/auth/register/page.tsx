import { iLocale } from "@/Components/Entity/Locale/types";
import RegisterForm from "@/Main/Auth/Register/RegisterForm";

interface RegisterPageProps {
  params: Promise<{
    locale: iLocale;
  }>;
}

export default async function RegisterPage({ params }: RegisterPageProps) {
  const { locale } = await params;
  return <RegisterForm locale={locale} />;
}
