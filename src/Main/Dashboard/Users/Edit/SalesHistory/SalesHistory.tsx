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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/Shadcn/select";
import { SalesHistoryProps, Sale } from "./types";
import { getDictionary } from "./i18n";
import SaleDetail from "./Components/SaleDetail";
import { Calendar, Eye, ChevronsUpDown } from "lucide-react";

export default function SalesHistory({ locale }: SalesHistoryProps) {
  const dictionary = getDictionary(locale);
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  // Mock data
  const [sales] = React.useState<Sale[]>([
    {
      id: "1",
      saleId: "SALE-2024-001",
      date: "2024-01-16",
      buyer: "Alice Johnson",
      status: "delivered",
      amount: 89.99,
      items: 2,
      productDetails: "Premium Wireless Headphones & Phone Case",
      paymentMethod: "Credit Card",
      createdAt: "2024-01-16",
      updatedAt: "2024-01-20",
    },
    {
      id: "2",
      saleId: "SALE-2024-002",
      date: "2024-01-12",
      buyer: "Bob Smith",
      status: "shipped",
      amount: 156.5,
      items: 1,
      productDetails: "Smart Watch Pro Series",
      paymentMethod: "PayPal",
      createdAt: "2024-01-12",
      updatedAt: "2024-01-18",
    },
    {
      id: "3",
      saleId: "SALE-2024-003",
      date: "2024-01-09",
      buyer: "Carol Davis",
      status: "processing",
      amount: 45.75,
      items: 3,
      productDetails: "Phone Accessories Bundle",
      paymentMethod: "Credit Card",
      createdAt: "2024-01-09",
      updatedAt: "2024-01-15",
    },
    {
      id: "4",
      saleId: "SALE-2023-198",
      date: "2023-12-29",
      buyer: "David Wilson",
      status: "delivered",
      amount: 234.25,
      items: 4,
      productDetails: "Gaming Console & Games Collection",
      paymentMethod: "Credit Card",
      createdAt: "2023-12-29",
      updatedAt: "2024-01-05",
    },
    {
      id: "5",
      saleId: "SALE-2023-189",
      date: "2023-12-25",
      buyer: "Emma Brown",
      status: "cancelled",
      amount: 67.5,
      items: 1,
      productDetails: "Bluetooth Speaker",
      paymentMethod: "Credit Card",
      createdAt: "2023-12-25",
      updatedAt: "2023-12-30",
    },
  ]);

  const [query, setQuery] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [sortBy, setSortBy] = React.useState("newestFirst");
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [selectedSale, setSelectedSale] = React.useState<Sale | null>(null);
  const pageSize = 5;

  const filtered = React.useMemo(() => {
    if (!query) return sales;
    const q = query.toLowerCase();
    return sales.filter(
      (sale) =>
        sale.saleId.toLowerCase().includes(q) ||
        sale.buyer.toLowerCase().includes(q) ||
        sale.status.toLowerCase().includes(q)
    );
  }, [sales, query]);

  const sorted = React.useMemo(() => {
    const sortedSales = [...filtered];
    switch (sortBy) {
      case "newestFirst":
        return sortedSales.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      case "oldestFirst":
        return sortedSales.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
      case "highestAmount":
        return sortedSales.sort((a, b) => b.amount - a.amount);
      case "lowestAmount":
        return sortedSales.sort((a, b) => a.amount - b.amount);
      default:
        return sortedSales;
    }
  }, [filtered, sortBy]);

  const paged = React.useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, currentPage]);

  // Calculate metrics
  const completedSales = React.useMemo(() => {
    return sales.filter((sale) => sale.status === "delivered").length;
  }, [sales]);

  const totalRevenue = React.useMemo(() => {
    return sales
      .filter(
        (sale) => sale.status === "delivered" || sale.status === "shipped"
      )
      .reduce((sum, sale) => sum + sale.amount, 0);
  }, [sales]);

  function getStatusVariant(status: string) {
    switch (status) {
      case "delivered":
        return "default" as const;
      case "shipped":
        return "secondary" as const;
      case "processing":
        return "secondary" as const;
      case "pending":
        return "outline" as const;
      case "cancelled":
        return "destructive" as const;
      case "refunded":
        return "outline" as const;
      default:
        return "secondary" as const;
    }
  }

  function formatCurrency(value: number) {
    try {
      return value.toLocaleString(locale, {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    } catch {
      return value.toLocaleString(undefined, {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }
  }

  const columns: iResponsiveColumn<Sale>[] = [
    {
      label: dictionary.table.saleId,
      cell: ({ row }) => (
        <div className="space-y-1">
          <span className="font-medium">{row.saleId}</span>
          <div className="text-xs text-muted-foreground">{row.buyer}</div>
        </div>
      ),
    },
    {
      label: dictionary.table.date,
      cell: ({ row }) => (
        <div className="space-y-1">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3 text-muted-foreground" />
            <span className="text-sm">
              {new Date(row.date).toLocaleDateString(locale)}
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
            {dictionary.status[row.status as keyof typeof dictionary.status]}
          </Badge>
        </div>
      ),
    },
    {
      label: dictionary.table.amount,
      cell: ({ row }) => (
        <div className="space-y-1">
          <span className="font-medium text-primary">
            {formatCurrency(row.amount)}
          </span>
        </div>
      ),
    },
    {
      label: dictionary.table.items,
      cell: ({ row }) => (
        <div className="space-y-1">
          <span className="text-sm text-muted-foreground">
            {row.items} {row.items === 1 ? "item" : "items"}
          </span>
        </div>
      ),
    },
    {
      label: "",
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSelectedSale(row);
              setSheetOpen(true);
            }}
            className="text-primary hover:text-primary/80"
          >
            <Eye className="h-4 w-4 mr-1" />
          </Button>
        </div>
      ),
    },
  ];

  if (!mounted) return null;

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <CardTitle>{dictionary.title}</CardTitle>
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-48">
            <SelectValue />
            <ChevronsUpDown className="h-4 w-4 ml-2" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newestFirst">
              {dictionary.sortOptions.newestFirst}
            </SelectItem>
            <SelectItem value="oldestFirst">
              {dictionary.sortOptions.oldestFirst}
            </SelectItem>
            <SelectItem value="highestAmount">
              {dictionary.sortOptions.highestAmount}
            </SelectItem>
            <SelectItem value="lowestAmount">
              {dictionary.sortOptions.lowestAmount}
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {/* Metrics Bar */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {completedSales}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {dictionary.metrics.completedSales}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {formatCurrency(totalRevenue)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {dictionary.metrics.totalRevenue}
                  </div>
                </div>
              </div>
            </div>
          </div>

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

          <ResponsiveTable<Sale>
            data={paged}
            columns={columns}
            breakpoint="lg"
            rowKey="id"
            rowProps={() => ({
              className: "cursor-pointer hover:bg-muted/50",
            })}
          />

          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {dictionary.subtitle}
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-muted-foreground">
                {dictionary.totalSales.replace(
                  "{count}",
                  String(filtered.length)
                )}
              </div>
              <Pagination
                currentPage={currentPage}
                totalItems={filtered.length}
                pageSize={pageSize}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </CardContent>

      {/* Sale Detail Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="sm:max-w-lg p-4">
          <SheetHeader>
            <SheetTitle>
              {dictionary.table.saleId}: {selectedSale?.saleId}
            </SheetTitle>
            <SheetDescription>
              {dictionary.table.buyer}: {selectedSale?.buyer}
            </SheetDescription>
          </SheetHeader>
          {selectedSale && (
            <div className="mt-6">
              <SaleDetail sale={selectedSale} locale={locale} />
            </div>
          )}
        </SheetContent>
      </Sheet>
    </Card>
  );
}
