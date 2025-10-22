"use client";

import React from "react";
import { Input } from "@/Components/Shadcn/input";
import { Button } from "@/Components/Shadcn/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/Components/Shadcn/card";
import ResponsiveTable from "@/Components/Entity/ResponsiveTable/ResponsiveTable";
import { iResponsiveColumn } from "@/Components/Entity/ResponsiveTable/types";
import { Pagination } from "@/Components/Entity/Pagination/Pagination";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/Components/Shadcn/sheet";
import { Badge } from "@/Components/Shadcn/badge";
import { UsersProps, UsersRow } from "./types";
import { getDictionary } from "./i18n";
import Detail from "./Components/Detail";
import { Eye, Edit, Plus, ShoppingCart, Building, Truck } from "lucide-react";
import { useRouter } from "next/navigation";
import { appRoutes } from "@/lib/routes/appRoutes";

export default function Users({ locale }: UsersProps) {
  const dictionary = getDictionary(locale);
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const router = useRouter();
  // Mock data
  const [rows] = React.useState<UsersRow[]>([
    {
      id: "1",
      userId: "100234567890",
      profileName: "@john_admin",
      type: ["shopping", "business"],
      activeLocations: 3,
      orders: 247,
      totalPurchaseAmount: 45678.9,
      listedArticles: 142,
      sales: 189,
      totalSalesAmount: 67834.5,
      joinDate: "15.01.2023",
      status: "active",
    },
    {
      id: "2",
      userId: "100234567891",
      profileName: "@jane_marketing",
      type: ["shopping"],
      activeLocations: 1,
      orders: 89,
      totalPurchaseAmount: 12345.5,
      listedArticles: 0,
      sales: 0,
      totalSalesAmount: 0,
      joinDate: "20.02.2023",
      status: "active",
    },
    {
      id: "3",
      userId: "100234567892",
      profileName: "@bob_sales_mgr",
      type: ["shopping", "business", "logistics"],
      activeLocations: 4,
      orders: 156,
      totalPurchaseAmount: 28750.25,
      listedArticles: 67,
      sales: 134,
      totalSalesAmount: 43621.75,
      joinDate: "10.03.2023",
      status: "inactive",
    },
    {
      id: "4",
      userId: "100234567893",
      profileName: "@alice_hr",
      type: ["shopping", "business", "logistics"],
      activeLocations: 2,
      orders: 78,
      totalPurchaseAmount: 18900.75,
      listedArticles: 23,
      sales: 45,
      totalSalesAmount: 15678.25,
      joinDate: "01.01.2024",
      status: "pending",
    },
    {
      id: "5",
      userId: "100234567894",
      profileName: "@charlie_it_admin",
      type: ["shopping", "logistics"],
      activeLocations: 5,
      orders: 312,
      totalPurchaseAmount: 67890.5,
      listedArticles: 89,
      sales: 234,
      totalSalesAmount: 89234.75,
      joinDate: "05.12.2022",
      status: "active",
    },
  ]);

  const [query, setQuery] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<UsersRow | null>(null);
  const pageSize = 10;

  const filtered = React.useMemo(() => {
    if (!query) return rows;
    const q = query.toLowerCase();
    return rows.filter(
      (r) =>
        r.userId.toLowerCase().includes(q) ||
        r.profileName.toLowerCase().includes(q)
    );
  }, [rows, query]);

  const paged = React.useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, currentPage]);

  function formatCurrency(value: number) {
    try {
      return value.toLocaleString(locale, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    } catch {
      return value.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }
  }

  function getTypeIcon(type: string) {
    switch (type) {
      case "shopping":
        return <ShoppingCart className="h-4 w-4 text-blue-600" />;
      case "business":
        return <Building className="h-4 w-4 text-green-600" />;
      case "logistics":
        return <Truck className="h-4 w-4 text-orange-600" />;
      default:
        return null;
    }
  }

  function getStatusVariant(status: string) {
    switch (status) {
      case "active":
        return "secondary" as const;
      case "inactive":
        return "outline" as const;
      case "pending":
        return "default" as const;
      default:
        return "secondary" as const;
    }
  }

  function getOrdersColor(orders: number) {
    if (orders <= 50) return "text-orange-600";
    if (orders <= 150) return "text-blue-600";
    return "text-green-600";
  }

  function getAmountColor(amount: number) {
    if (amount <= 15000) return "text-orange-600";
    if (amount <= 35000) return "text-blue-600";
    return "text-green-600";
  }

  function getArticlesColor(articles: number) {
    if (articles === 0) return "text-red-600";
    if (articles <= 50) return "text-orange-600";
    if (articles <= 100) return "text-blue-600";
    return "text-green-600";
  }

  function getSalesColor(sales: number) {
    if (sales === 0) return "text-red-600";
    if (sales <= 100) return "text-orange-600";
    if (sales <= 150) return "text-blue-600";
    return "text-green-600";
  }

  const columns: iResponsiveColumn<UsersRow>[] = [
    {
      label: dictionary.table.userId,
      cell: ({ row }) => (
        <div className="space-y-1">
          <a className="text-primary hover:underline font-medium" href="#">
            {row.userId}
          </a>
          <div className="text-xs text-muted-foreground">{row.joinDate}</div>
        </div>
      ),
    },
    {
      label: dictionary.table.profileName,
      cell: ({ row }) => (
        <div className="space-y-1">
          <a className="text-primary hover:underline font-medium" href="#">
            {row.profileName}
          </a>
          <div className="flex items-center gap-1">
            {row.type.map((type, index) => (
              <div key={index}>{getTypeIcon(type)}</div>
            ))}
          </div>
        </div>
      ),
    },
    {
      label: "Locations & Orders",
      cell: ({ row }) => (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Loc:</span>
            <span className="font-medium">{row.activeLocations}</span>
            <span className="text-sm text-muted-foreground">Orders:</span>
            <span className={`font-medium ${getOrdersColor(row.orders)}`}>
              {row.orders.toLocaleString()}
            </span>
          </div>
        </div>
      ),
    },
    {
      label: "Purchase Activity",
      cell: ({ row }) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Total:</span>
            <span
              className={`font-medium ${getAmountColor(row.totalPurchaseAmount)}`}
            >
              {formatCurrency(row.totalPurchaseAmount)} €
            </span>
          </div>
        </div>
      ),
    },
    {
      label: "Sales Activity",
      cell: ({ row }) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Sales:</span>
            <span className={`font-medium ${getSalesColor(row.sales)}`}>
              {row.sales.toLocaleString()}
            </span>
            <span className="text-sm text-muted-foreground">Revenue:</span>
            <span
              className={`font-medium ${getAmountColor(row.totalSalesAmount)}`}
            >
              {formatCurrency(row.totalSalesAmount)} €
            </span>
          </div>
        </div>
      ),
    },
    {
      label: "Articles",
      cell: ({ row }) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Listed:</span>
            <span
              className={`font-medium ${getArticlesColor(row.listedArticles)}`}
            >
              {row.listedArticles.toLocaleString()}
            </span>
          </div>
        </div>
      ),
    },
    {
      label: dictionary.table.status,
      cell: ({ row }) => (
        <div className="space-y-2">
          <Badge variant={getStatusVariant(row.status)}>
            {dictionary.status[row.status]}
          </Badge>
        </div>
      ),
    },
    {
      label: "",
      cell: ({ row }) => (
        <div className="flex items-center gap-2 justify-center">
          <Eye
            className="h-4 w-4 text-blue-600"
            onClick={() => {
              setSelectedUser(row);
              setSheetOpen(true);
            }}
          />
          <Edit
            className="h-4 w-4 text-green-600"
            onClick={() => {
              router.push(
                appRoutes.dashboard.userManagement.users.edit(locale, row.id)
              );
            }}
          />
        </div>
      ),
    },
  ];

  if (!mounted) return null;

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{dictionary.title}</CardTitle>
        <Button
          onClick={() => {
            router.push(appRoutes.dashboard.users.create(locale));
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          {dictionary.addUser}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 w-full max-w-xs">
              <Input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder={dictionary.searchPlaceholder}
              />
            </div>
            <div className="text-sm text-muted-foreground">
              {dictionary.found.replace("{count}", String(filtered.length))}
            </div>
          </div>

          <ResponsiveTable<UsersRow>
            data={paged}
            columns={columns}
            breakpoint="lg"
            rowKey="id"
            rowProps={({ row }) => ({
              onClick: () => {
                router.push(
                  appRoutes.dashboard.users.edit.root(locale, row.id)
                );
              },
              className: "cursor-pointer hover:bg-muted/50",
            })}
          />

          <Pagination
            currentPage={currentPage}
            totalItems={filtered.length}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            className="mt-2"
          />
        </div>
      </CardContent>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>
              {dictionary.table.userId}: {selectedUser?.userId}
            </SheetTitle>
            <SheetDescription>
              {dictionary.table.profileName}: {selectedUser?.profileName}
            </SheetDescription>
          </SheetHeader>
          {selectedUser && (
            <div className="mt-6">
              <Detail user={selectedUser} locale={locale} />
            </div>
          )}
        </SheetContent>
      </Sheet>
    </Card>
  );
}
