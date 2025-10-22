import { iLocaleParam } from "@/Components/Entity/Locale/types";
import { redirect } from "next/navigation";

interface iProps {
  params: Promise<iLocaleParam & { id: string }>;
}

export default async function Page({ params }: iProps) {
  const { locale, id } = await params;

  // Redirect to details tab by default
  redirect(`/${locale}/dashboard/users/${id}/edit/details`);
}
