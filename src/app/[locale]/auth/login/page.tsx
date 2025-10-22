import { iLocale } from "@/Components/Entity/Locale/types";
import LoginFormContainer from "@/Main/Auth/Login/LoginFormContainer";
import { AuthRedirectWrapper } from "@/Components/Layout/AuthLayout/AuthRedirectWrapper";

interface LoginPageProps {
  params: Promise<{
    locale: iLocale;
  }>;
}

export default async function LoginPage({ params }: LoginPageProps) {
  const { locale } = await params;
  return (
    <AuthRedirectWrapper locale={locale}>
      <LoginFormContainer locale={locale} />
    </AuthRedirectWrapper>
  );
}
