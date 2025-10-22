"use client";

import { iLocale } from "@/Components/Entity/Locale/types";
import "@/styles/globals.css";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/Components/Shadcn/card";
import { Tabs, TabsList, TabsTrigger } from "@/Components/Shadcn/tabs";
import { usePathname, useRouter, useParams } from "next/navigation";
import { appRoutes } from "@/lib/routes/appRoutes";
import { Checkbox } from "@/Components/Shadcn/checkbox";
import { Badge } from "@/Components/Shadcn/badge";
import { Input } from "@/Components/Shadcn/input";
import {
  ShoppingCart,
  Building,
  Truck,
  User,
  Package,
  Folder,
} from "lucide-react";
import { getDictionary } from "./i18n";

interface iProps {
  children: React.ReactNode;
}

export default function EditUserLayout({ children }: iProps) {
  const { locale, id } = useParams<{ locale: iLocale; id: string }>();
  const dictionary = getDictionary(locale);
  const router = useRouter();
  const pathname = usePathname();

  const getCurrentTabFromPath = () => {
    if (pathname.includes("/details")) return "details";
    if (pathname.includes("/location")) return "location";
    if (pathname.includes("/employees")) return "employees";
    if (pathname.includes("/order-history")) return "order-history";
    if (pathname.includes("/sales-history")) return "sales-history";
    if (pathname.includes("/offerings")) return "offerings";
    if (pathname.includes("/organizational-chart"))
      return "organizational-chart";
    return "details";
  };

  const currentTab = getCurrentTabFromPath();

  const onTabChange = (value: string) => {
    switch (value) {
      case "details":
        router.push(appRoutes.dashboard.users.edit.details(locale, id));
        break;
      case "location":
        router.push(appRoutes.dashboard.users.edit.location(locale, id));
        break;
      case "employees":
        router.push(appRoutes.dashboard.users.edit.employees(locale, id));
        break;
      case "order-history":
        router.push(appRoutes.dashboard.users.edit.orderHistory(locale, id));
        break;
      case "sales-history":
        router.push(appRoutes.dashboard.users.edit.salesHistory(locale, id));
        break;
      case "offerings":
        router.push(appRoutes.dashboard.users.edit.offerings(locale, id));
        break;
      case "organizational-chart":
        router.push(
          appRoutes.dashboard.users.edit.organizationalChart(locale, id)
        );
        break;
      default:
        router.push(appRoutes.dashboard.users.edit.details(locale, id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{dictionary.title}</h1>
      </div>

      {/* Main Content - Two Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User ID Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{dictionary.userID.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              value="100234567890"
              className="text-lg font-mono bg-gray-50"
              readOnly
            />
            <p className="text-sm text-gray-600 mt-2">
              {dictionary.userID.description}
            </p>
          </CardContent>
        </Card>

        {/* Type of User Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {dictionary.typeOfUser.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Buyer */}
            <div className="flex items-center gap-3 p-3 border-2 border-green-200 rounded-lg bg-green-50">
              <Checkbox checked className="data-[state=checked]:bg-blue-600" />
              <ShoppingCart className="h-5 w-5 text-blue-600" />
              <div className="flex-1">
                <p className="font-medium">
                  {dictionary.typeOfUser.buyer.title}
                </p>
                <p className="text-sm text-gray-600">
                  {dictionary.typeOfUser.buyer.description}
                </p>
              </div>
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800"
              >
                {dictionary.typeOfUser.buyer.status}
              </Badge>
            </div>

            {/* Seller */}
            <div className="flex items-center gap-3 p-3 border-2 border-blue-200 rounded-lg bg-blue-50">
              <Checkbox checked className="data-[state=checked]:bg-blue-600" />
              <Building className="h-5 w-5 text-green-600" />
              <div className="flex-1">
                <p className="font-medium">
                  {dictionary.typeOfUser.seller.title}
                </p>
                <p className="text-sm text-gray-600">
                  {dictionary.typeOfUser.seller.description}
                </p>
              </div>
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800"
              >
                {dictionary.typeOfUser.seller.status}
              </Badge>
            </div>

            {/* Logistic Company */}
            <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
              <Checkbox className="data-[state=checked]:bg-blue-600" />
              <Truck className="h-5 w-5 text-orange-600" />
              <div className="flex-1">
                <p className="font-medium">
                  {dictionary.typeOfUser.logisticCompany.title}
                </p>
                <p className="text-sm text-gray-600">
                  {dictionary.typeOfUser.logisticCompany.description}
                </p>
              </div>
            </div>

            {/* Summary Bar */}
            <div className="bg-blue-100 text-blue-800 p-3 rounded-lg text-center font-medium">
              {dictionary.typeOfUser.summary}
            </div>
          </CardContent>
        </Card>

        {/* Notification / Status / Information Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {dictionary.notificationStatus.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Seller Application */}
            <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
              <User className="h-5 w-5 text-blue-600" />
              <div className="flex-1">
                <p className="font-medium">
                  {dictionary.notificationStatus.sellerApplication.title}
                </p>
                <p className="text-sm text-gray-600">
                  {dictionary.notificationStatus.sellerApplication.subtitle}
                </p>
              </div>
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800"
              >
                {dictionary.notificationStatus.sellerApplication.status}
              </Badge>
            </div>

            {/* Goods Listing */}
            <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
              <Package className="h-5 w-5 text-green-600" />
              <div className="flex-1">
                <p className="font-medium">
                  {dictionary.notificationStatus.goodsListing.title}
                </p>
                <p className="text-sm text-gray-600">
                  {dictionary.notificationStatus.goodsListing.subtitle}
                </p>
              </div>
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800"
              >
                {dictionary.notificationStatus.goodsListing.status}
              </Badge>
            </div>

            {/* Documents */}
            <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
              <Folder className="h-5 w-5 text-orange-600" />
              <div className="flex-1">
                <p className="font-medium">
                  {dictionary.notificationStatus.documents.title}
                </p>
                <p className="text-sm text-gray-600">
                  {dictionary.notificationStatus.documents.subtitle}
                </p>
              </div>
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800"
              >
                {dictionary.notificationStatus.documents.status}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation Tabs */}

      <Tabs value={currentTab} onValueChange={onTabChange} className="w-full">
        <TabsList className="h-12 w-fit justify-start">
          <TabsTrigger value="details">{dictionary.tabs.details}</TabsTrigger>
          <TabsTrigger value="location">{dictionary.tabs.location}</TabsTrigger>
          <TabsTrigger value="employees">
            {dictionary.tabs.employees}
          </TabsTrigger>
          <TabsTrigger value="order-history">
            {dictionary.tabs.orderHistory}
          </TabsTrigger>
          <TabsTrigger value="sales-history">
            {dictionary.tabs.salesHistory}
          </TabsTrigger>
          <TabsTrigger value="offerings">
            {dictionary.tabs.offerings}
          </TabsTrigger>
          <TabsTrigger value="organizational-chart">
            {dictionary.tabs.organizationalChart}
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="mt-4">{children}</div>
    </div>
  );
}
