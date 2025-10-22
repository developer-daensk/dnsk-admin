import { iLocaleParam } from "@/Components/Entity/Locale/types";
import { getDictionary } from "@/Main/Dashboard/Orders/i18n";
import { notFound } from "next/navigation";
import Orders from "@/Main/Dashboard/Orders/Orders";

interface iProps {
  searchParams?: Promise<{ tab?: string }>;
  params: Promise<iLocaleParam>;
}

export async function generateMetadata({ params }: iProps) {
  const { locale } = await params;
  const dictionary = getDictionary(locale);
  return {
    title: dictionary.seo.title,
    description: dictionary.seo.description,
  };
}

export default async function Page({ params, searchParams }: iProps) {
  const { locale } = await params;
  const queries = await searchParams;
  const currentTab = queries?.tab || "overview";
  const allowedTabs = ["overview", "inprogress", "indelivery", "rejected"];
  if (!allowedTabs.includes(currentTab)) notFound();

  const orders = [
    {
      id: "1",
      orderNumber: "ORD-2024-001",
      date: "Sep 01, 2025",
      address: "123 Main St, New York, NY 10001",
      total: 202.5,
      quantity: 3,
      status: "pending" as const,
    },
    {
      id: "2",
      orderNumber: "ORD-2024-002",
      date: "Aug 31, 2025",
      address: "456 Oak Ave, Los Angeles, CA 90001",
      total: 114.0,
      quantity: 3,
      status: "processing" as const,
    },
    {
      id: "3",
      orderNumber: "ORD-2024-003",
      date: "Aug 30, 2025",
      address: "789 Pine Rd, Chicago, IL 60601",
      total: 63.0,
      quantity: 1,
      status: "shipped" as const,
    },
  ];

  return <Orders orders={orders} locale={locale} currentTab={currentTab} />;
}
