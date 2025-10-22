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
import { OrderHistoryProps, Order } from "./types";
import { getDictionary } from "./i18n";
import OrderDetail from "./Components/OrderDetail";
import { Calendar, Eye, ChevronsUpDown } from "lucide-react";

export default function OrderHistory({ locale }: OrderHistoryProps) {
  const dictionary = getDictionary(locale);
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  // Mock data
  const [orders] = React.useState<Order[]>([
    {
      id: "1",
      orderId: "ORD-2024-001",
      status: "delivered",
      date: "2024-01-15",
      totalAmount: 156.99,
      items: 3,
      customerName: "John Doe",
      shippingAddress: "123 Main St, New York, NY 10001",
      paymentMethod: "Credit Card",
      createdAt: "2024-01-15",
      updatedAt: "2024-01-20",
    },
    {
      id: "2",
      orderId: "ORD-2024-002",
      status: "shipped",
      date: "2024-01-10",
      totalAmount: 89.5,
      items: 2,
      customerName: "Jane Smith",
      shippingAddress: "456 Oak Ave, Los Angeles, CA 90210",
      paymentMethod: "PayPal",
      createdAt: "2024-01-10",
      updatedAt: "2024-01-18",
    },
    {
      id: "3",
      orderId: "ORD-2024-003",
      status: "processing",
      date: "2024-01-08",
      totalAmount: 234.75,
      items: 5,
      customerName: "Bob Johnson",
      shippingAddress: "789 Pine St, Chicago, IL 60601",
      paymentMethod: "Credit Card",
      createdAt: "2024-01-08",
      updatedAt: "2024-01-15",
    },
    {
      id: "4",
      orderId: "ORD-2023-156",
      status: "cancelled",
      date: "2023-12-28",
      totalAmount: 67.25,
      items: 1,
      customerName: "Alice Brown",
      shippingAddress: "321 Elm St, Miami, FL 33101",
      paymentMethod: "Credit Card",
      createdAt: "2023-12-28",
      updatedAt: "2023-12-30",
    },
    {
      id: "5",
      orderId: "ORD-2023-155",
      status: "refunded",
      date: "2023-12-25",
      totalAmount: 189.99,
      items: 4,
      customerName: "Charlie Wilson",
      shippingAddress: "654 Maple Dr, Seattle, WA 98101",
      paymentMethod: "PayPal",
      createdAt: "2023-12-25",
      updatedAt: "2024-01-05",
    },
  ]);

  const [query, setQuery] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [sortBy, setSortBy] = React.useState("newestFirst");
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [selectedOrder, setSelectedOrder] = React.useState<Order | null>(null);
  const pageSize = 5;

  const filtered = React.useMemo(() => {
    if (!query) return orders;
    const q = query.toLowerCase();
    return orders.filter(
      (order) =>
        order.orderId.toLowerCase().includes(q) ||
        order.customerName.toLowerCase().includes(q) ||
        order.status.toLowerCase().includes(q)
    );
  }, [orders, query]);

  const sorted = React.useMemo(() => {
    const sortedOrders = [...filtered];
    switch (sortBy) {
      case "newestFirst":
        return sortedOrders.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      case "oldestFirst":
        return sortedOrders.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
      case "highestAmount":
        return sortedOrders.sort((a, b) => b.totalAmount - a.totalAmount);
      case "lowestAmount":
        return sortedOrders.sort((a, b) => a.totalAmount - b.totalAmount);
      default:
        return sortedOrders;
    }
  }, [filtered, sortBy]);

  const paged = React.useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, currentPage]);

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

  const columns: iResponsiveColumn<Order>[] = [
    {
      label: dictionary.table.orderId,
      cell: ({ row }) => (
        <div className="space-y-1">
          <span className="font-medium">{row.orderId}</span>
          <div className="text-xs text-muted-foreground">
            {row.customerName}
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
      label: dictionary.table.totalAmount,
      cell: ({ row }) => (
        <div className="space-y-1">
          <span className="font-medium text-primary">
            {formatCurrency(row.totalAmount)}
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
              setSelectedOrder(row);
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

          <ResponsiveTable<Order>
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
                {dictionary.totalOrders.replace(
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

      {/* Order Detail Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="sm:max-w-lg p-4">
          <SheetHeader>
            <SheetTitle>
              {dictionary.table.orderId}: {selectedOrder?.orderId}
            </SheetTitle>
            <SheetDescription>
              {dictionary.table.customerName}: {selectedOrder?.customerName}
            </SheetDescription>
          </SheetHeader>
          {selectedOrder && (
            <div className="mt-6">
              <OrderDetail order={selectedOrder} locale={locale} />
            </div>
          )}
        </SheetContent>
      </Sheet>
    </Card>
  );
}
