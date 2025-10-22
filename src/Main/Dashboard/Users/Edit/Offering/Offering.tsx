"use client";

import React from "react";
import { Input } from "@/Components/Shadcn/input";
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
import { OfferingProps, Offering as OfferingType } from "./types";
import { getDictionary } from "./i18n";
import OfferingDetail from "./Components/OfferingDetail";
import { Eye } from "lucide-react";

export default function Offering({ locale }: OfferingProps) {
  const dictionary = getDictionary(locale);
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  // Mock data matching the image
  const [offerings] = React.useState<OfferingType[]>([
    {
      id: "1",
      name: "Organic Apples",
      category: "fruits",
      quantity: 50,
      price: 2.99,
      location: "Berlin",
      date: "2024-03-15",
      status: "active",
      description: "Fresh organic apples from local farms",
      createdAt: "2024-03-15",
      updatedAt: "2024-03-15",
    },
    {
      id: "2",
      name: "Fresh Milk",
      category: "dairy",
      quantity: 30,
      price: 1.99,
      location: "Munich",
      date: "2024-03-14",
      status: "active",
      description: "Fresh whole milk from Bavarian dairy farms",
      createdAt: "2024-03-14",
      updatedAt: "2024-03-14",
    },
    {
      id: "3",
      name: "Whole Grain Bread",
      category: "bakery",
      quantity: 0,
      price: 3.49,
      location: "Hamburg",
      date: "2024-03-13",
      status: "outOfStock",
      description: "Artisan whole grain bread baked daily",
      createdAt: "2024-03-13",
      updatedAt: "2024-03-13",
    },
    {
      id: "4",
      name: "Fresh Tomatoes",
      category: "vegetables",
      quantity: 25,
      price: 2.49,
      location: "Frankfurt",
      date: "2024-03-12",
      status: "active",
      description: "Ripe red tomatoes from greenhouse",
      createdAt: "2024-03-12",
      updatedAt: "2024-03-12",
    },
    {
      id: "5",
      name: "Premium Coffee",
      category: "beverages",
      quantity: 15,
      price: 12.99,
      location: "Cologne",
      date: "2024-03-11",
      status: "active",
      description: "Single-origin premium coffee beans",
      createdAt: "2024-03-11",
      updatedAt: "2024-03-11",
    },
  ]);

  const [query, setQuery] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [selectedOffering, setSelectedOffering] =
    React.useState<OfferingType | null>(null);
  const pageSize = 5;

  const filtered = React.useMemo(() => {
    if (!query) return offerings;
    const q = query.toLowerCase();
    return offerings.filter(
      (offering) =>
        offering.name.toLowerCase().includes(q) ||
        offering.category.toLowerCase().includes(q) ||
        offering.location.toLowerCase().includes(q) ||
        offering.status.toLowerCase().includes(q)
    );
  }, [offerings, query]);

  const paged = React.useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, currentPage]);

  // Calculate metrics
  const totalItems = React.useMemo(() => {
    return offerings.length;
  }, [offerings]);

  const totalQuantity = React.useMemo(() => {
    return offerings.reduce((sum, offering) => sum + offering.quantity, 0);
  }, [offerings]);

  function getStatusVariant(status: string) {
    switch (status) {
      case "active":
        return "default" as const;
      case "inactive":
        return "outline" as const;
      case "outOfStock":
        return "destructive" as const;
      case "pending":
        return "secondary" as const;
      case "discontinued":
        return "outline" as const;
      default:
        return "secondary" as const;
    }
  }

  function formatCurrency(value: number) {
    try {
      return value.toLocaleString(locale, {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    } catch {
      return value.toLocaleString(undefined, {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }
  }

  function getCategoryLabel(category: string) {
    switch (category) {
      case "fruits":
        return dictionary.categories.fruits;
      case "dairy":
        return dictionary.categories.dairy;
      case "bakery":
        return dictionary.categories.bakery;
      case "vegetables":
        return dictionary.categories.vegetables;
      case "meat":
        return dictionary.categories.meat;
      case "beverages":
        return dictionary.categories.beverages;
      case "snacks":
        return dictionary.categories.snacks;
      default:
        return category;
    }
  }

  const columns: iResponsiveColumn<OfferingType>[] = [
    {
      label: dictionary.table.name,
      cell: ({ row }) => (
        <div className="space-y-1">
          <span className="font-medium">{row.name}</span>
          <div className="text-xs text-muted-foreground">
            {getCategoryLabel(row.category)}
          </div>
        </div>
      ),
    },
    {
      label: dictionary.table.quantity,
      cell: ({ row }) => (
        <div className="space-y-1">
          <span
            className={`font-medium ${row.quantity === 0 ? "text-red-600" : "text-green-600"}`}
          >
            {row.quantity}
          </span>
        </div>
      ),
    },
    {
      label: dictionary.table.price,
      cell: ({ row }) => (
        <div className="space-y-1">
          <span className="font-medium text-primary">
            {formatCurrency(row.price)}
          </span>
        </div>
      ),
    },
    {
      label: dictionary.table.location,
      cell: ({ row }) => (
        <div className="space-y-1">
          <span className="text-sm">{row.location}</span>
        </div>
      ),
    },
    {
      label: dictionary.table.date,
      cell: ({ row }) => (
        <div className="space-y-1">
          <span className="text-sm text-muted-foreground">
            {new Date(row.date).toLocaleDateString(locale)}
          </span>
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
      label: "",
      cell: ({ row }) => (
        <div className="flex items-center gap-2 justify-center">
          <Eye
            className="h-4 w-4  cursor-pointer"
            onClick={() => {
              setSelectedOffering(row);
              setSheetOpen(true);
            }}
          />
        </div>
      ),
    },
  ];

  if (!mounted) return null;

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle>{dictionary.title}</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">{dictionary.subtitle}</p>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {/* Metrics Bar */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {totalItems}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {dictionary.metrics.totalItems}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {totalQuantity}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {dictionary.metrics.totalQuantity}
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

          <ResponsiveTable<OfferingType>
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
                {dictionary.totalOfferings.replace(
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

      {/* Offering Detail Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="sm:max-w-lg p-4">
          <SheetHeader>
            <SheetTitle>
              {dictionary.table.name}: {selectedOffering?.name}
            </SheetTitle>
            <SheetDescription>
              {dictionary.table.category}:{" "}
              {selectedOffering && getCategoryLabel(selectedOffering.category)}
            </SheetDescription>
          </SheetHeader>
          {selectedOffering && (
            <div className="mt-6">
              <OfferingDetail offering={selectedOffering} locale={locale} />
            </div>
          )}
        </SheetContent>
      </Sheet>
    </Card>
  );
}
