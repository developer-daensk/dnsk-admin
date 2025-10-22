"use client";

import { iLocale } from "@/Components/Entity/Locale/types";
import "@/styles/globals.css";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/Components/Shadcn/card";
import { getDictionary } from "./i18n";
import { Tabs, TabsList, TabsTrigger } from "@/Components/Shadcn/tabs";
import { usePathname, useRouter, useParams } from "next/navigation";
import { appRoutes } from "@/lib/routes/appRoutes";

interface iProps {
  children: React.ReactNode;
}

export default function Layout({ children }: iProps) {
  const { locale } = useParams<{ locale: iLocale }>();
  const dictionary = getDictionary(locale);
  const router = useRouter();
  const pathname = usePathname();

  const getCurrentTabFromPath = () => {
    if (pathname.endsWith("/user-management/overview")) return "overview";
    if (pathname.includes("/user-management/users")) return "users";
    if (pathname.includes("/user-management/products")) return "products";
    if (pathname.includes("/user-management/locations")) return "locations";
    if (pathname.includes("/user-management/logistics")) return "logistics";
    if (pathname.includes("/user-management/orders")) return "orders";
    return "overview";
  };

  const currentTab = getCurrentTabFromPath();

  const onTabChange = (value: string) => {
    switch (value) {
      case "overview":
        router.push(appRoutes.dashboard.userManagement.overview(locale));
        break;
      case "users":
        router.push(appRoutes.dashboard.userManagement.users.root(locale));
        break;
      case "products":
        router.push(appRoutes.dashboard.userManagement.products(locale));
        break;
      case "locations":
        router.push(appRoutes.dashboard.userManagement.locations(locale));
        break;
      case "logistics":
        router.push(appRoutes.dashboard.userManagement.logistics(locale));
        break;
      case "orders":
        router.push(appRoutes.dashboard.userManagement.orders(locale));
        break;
      default:
        router.push(appRoutes.dashboard.userManagement.overview(locale));
    }
  };

  return (
    <Card className="w-full max-w-[1960px]">
      <CardHeader className="flex justify-between items-center">
        <CardTitle>{dictionary.userManagement}</CardTitle>
      </CardHeader>
      <hr />
      <CardContent>
        <Tabs value={currentTab} onValueChange={onTabChange} className="w-full">
          <TabsList className="h-12">
            <TabsTrigger value="overview">
              {dictionary.tabs.overview}
            </TabsTrigger>
            <TabsTrigger value="orders">{dictionary.tabs.orders}</TabsTrigger>
            <TabsTrigger value="users">{dictionary.tabs.users}</TabsTrigger>
            <TabsTrigger value="products">
              {dictionary.tabs.products}
            </TabsTrigger>
            <TabsTrigger value="locations">
              {dictionary.tabs.locations}
            </TabsTrigger>
            <TabsTrigger value="logistics">
              {dictionary.tabs.logistics}
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="mt-4">{children}</div>
      </CardContent>
    </Card>
  );
}
