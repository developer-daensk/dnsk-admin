import { iLocaleParam } from "@/Components/Entity/Locale/types";
import { DashboardLayout } from "@/Components/Layout/DashboardLayout/DashboardLayout";
import "@/styles/globals.css";

interface iProps {
  children: React.ReactNode;
  params: Promise<iLocaleParam>;
}

export default async function Layout({ children, params }: iProps) {
  const { locale } = await params;
  return <DashboardLayout locale={locale}>{children}</DashboardLayout>;
}
