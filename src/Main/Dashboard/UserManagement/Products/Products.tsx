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
import { Switch } from "@/Components/Shadcn/switch";
import { ProductsProps, ProductsRow } from "./types";
import { getDictionary } from "./i18n";
import Detail from "./Components/Detail";
import { Eye } from "lucide-react";

export default function Products({ locale }: ProductsProps) {
  const dictionary = getDictionary(locale);
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  // Mock data
  const [rows] = React.useState<ProductsRow[]>([
    {
      id: "1",
      artNr: "12345678",
      pictures: 3,
      title: "Premium Steel Wrench Set",
      location: 12,
      crowd: 145,
      salesVolume: 28500.75,
      status: "active",
    },
    {
      id: "2",
      artNr: "87654321",
      pictures: 2,
      title: "Industrial Safety Helmet",
      location: 8,
      crowd: 67,
      salesVolume: 15200.3,
      status: "active",
    },
    {
      id: "3",
      artNr: "11223344",
      pictures: 0,
      title: "Electric Motor 220V",
      location: 5,
      crowd: 23,
      salesVolume: 45300.0,
      status: "inactive",
    },
    {
      id: "4",
      artNr: "99887766",
      pictures: 1,
      title: "Hydraulic Pump Assembly",
      location: 15,
      crowd: 89,
      salesVolume: 67850.25,
      status: "active",
    },
    {
      id: "5",
      artNr: "55443322",
      pictures: 5,
      title: "Professional Tool Cabinet with Drawers",
      location: 3,
      crowd: 12,
      salesVolume: 8750.5,
      status: "active",
    },
  ]);

  const [query, setQuery] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [selectedProduct, setSelectedProduct] =
    React.useState<ProductsRow | null>(null);
  const pageSize = 10;

  const filtered = React.useMemo(() => {
    if (!query) return rows;
    const q = query.toLowerCase();
    return rows.filter(
      (r) =>
        r.artNr.toLowerCase().includes(q) || r.title.toLowerCase().includes(q)
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

  function getPicturesColor(pictures: number) {
    if (pictures === 0) return "text-red-600";
    if (pictures <= 2) return "text-orange-600";
    if (pictures <= 4) return "text-blue-600";
    return "text-green-600";
  }

  function getLocationColor(location: number) {
    if (location <= 5) return "text-orange-600";
    if (location <= 10) return "text-blue-600";
    return "text-green-600";
  }

  function getCrowdColor(crowd: number) {
    if (crowd <= 25) return "text-orange-600";
    if (crowd <= 100) return "text-blue-600";
    return "text-green-600";
  }

  function getSalesVolumeColor(salesVolume: number) {
    if (salesVolume <= 20000) return "text-orange-600";
    if (salesVolume <= 50000) return "text-blue-600";
    return "text-green-600";
  }

  const columns: iResponsiveColumn<ProductsRow>[] = [
    {
      label: dictionary.table.artNr,
      cell: ({ row }) => (
        <a className="text-primary hover:underline" href="#">
          {row.artNr}
        </a>
      ),
    },
    {
      label: dictionary.table.pictures,
      cell: ({ row }) => (
        <span className={`font-medium ${getPicturesColor(row.pictures)}`}>
          {row.pictures}
        </span>
      ),
    },
    {
      label: dictionary.table.title,
      cell: ({ row }) => (
        <a className="text-primary hover:underline" href="#">
          {row.title}
        </a>
      ),
    },
    {
      label: dictionary.table.location,
      cell: ({ row }) => (
        <span className={`font-medium ${getLocationColor(row.location)}`}>
          {row.location}
        </span>
      ),
    },
    {
      label: dictionary.table.crowd,
      cell: ({ row }) => (
        <span className={`font-medium ${getCrowdColor(row.crowd)}`}>
          {row.crowd}
        </span>
      ),
    },
    {
      label: dictionary.table.salesVolume,
      cell: ({ row }) => (
        <span className={`font-medium ${getSalesVolumeColor(row.salesVolume)}`}>
          {formatCurrency(row.salesVolume)} €
        </span>
      ),
    },
    {
      label: dictionary.table.status,
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Switch checked={row.status === "active"} disabled />
          <span
            className={
              row.status === "active" ? "text-blue-600" : "text-gray-600"
            }
          >
            {dictionary.status[row.status]}
          </span>
        </div>
      ),
    },
    {
      label: "",
      cell: () => (
        <div className="flex justify-center">
          <Eye className="h-4 w-4 text-blue-600" />
        </div>
      ),
    },
  ];

  if (!mounted) return null;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{dictionary.title}</CardTitle>
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

          <ResponsiveTable<ProductsRow>
            data={paged}
            columns={columns}
            breakpoint="lg"
            rowKey="id"
            rowProps={({ row }) => ({
              onClick: () => {
                setSelectedProduct(row);
                setSheetOpen(true);
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
              {dictionary.table.artNr}: {selectedProduct?.artNr}
            </SheetTitle>
            <SheetDescription>
              {dictionary.table.title}: {selectedProduct?.title}
            </SheetDescription>
          </SheetHeader>
          {selectedProduct && (
            <div className="mt-6">
              <Detail product={selectedProduct} locale={locale} />
            </div>
          )}
        </SheetContent>
      </Sheet>
    </Card>
  );
}
