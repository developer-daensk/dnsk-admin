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
import { LogisticsProps, LogisticsRow } from "./types";
import { getDictionary } from "./i18n";
import Detail from "./Components/Detail";
import { Truck, Bell, MapPin, Eye } from "lucide-react";

export default function Logistics({ locale }: LogisticsProps) {
  const dictionary = getDictionary(locale);
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  // Mock data
  const [rows] = React.useState<LogisticsRow[]>([
    {
      id: "1",
      logisticNr: "1234567890",
      name: "DHL Express Service",
      type: "truck",
      region: 15,
      location: 127,
      tours: 1842,
      salesVolume: 2845670.5,
    },
    {
      id: "2",
      logisticNr: "2345678901",
      name: "UPS Premium Logistics",
      type: "alarm",
      region: 8,
      location: 89,
      tours: 956,
      salesVolume: 1567890.25,
    },
    {
      id: "3",
      logisticNr: "3456789012",
      name: "FedEx International",
      type: "location",
      region: 22,
      location: 245,
      tours: 2367,
      salesVolume: 3912456.75,
    },
    {
      id: "4",
      logisticNr: "4567890123",
      name: "Regional Express GmbH",
      type: "location",
      region: 5,
      location: 34,
      tours: 456,
      salesVolume: 678923.4,
    },
  ]);

  const [query, setQuery] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [selectedLogistics, setSelectedLogistics] =
    React.useState<LogisticsRow | null>(null);
  const pageSize = 10;

  const filtered = React.useMemo(() => {
    if (!query) return rows;
    const q = query.toLowerCase();
    return rows.filter(
      (r) =>
        r.logisticNr.toLowerCase().includes(q) ||
        r.name.toLowerCase().includes(q)
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
      case "truck":
        return <Truck className="h-4 w-4 text-blue-600" />;
      case "alarm":
        return <Bell className="h-4 w-4 text-orange-600" />;
      case "location":
        return <MapPin className="h-4 w-4 text-green-600" />;
      default:
        return <MapPin className="h-4 w-4 text-gray-600" />;
    }
  }

  const columns: iResponsiveColumn<LogisticsRow>[] = [
    {
      label: dictionary.table.logisticNr,
      cell: ({ row }) => (
        <a className="text-primary hover:underline" href="#">
          {row.logisticNr}
        </a>
      ),
    },
    {
      label: dictionary.table.name,
      cell: ({ row }) => (
        <a className="text-primary hover:underline" href="#">
          {row.name}
        </a>
      ),
    },
    {
      label: dictionary.table.type,
      cell: ({ row }) => (
        <div className="flex items-center gap-2">{getTypeIcon(row.type)}</div>
      ),
    },
    {
      label: dictionary.table.region,
      cell: ({ row }) => (
        <span className="text-blue-600 font-medium">{row.region}</span>
      ),
    },
    {
      label: dictionary.table.location,
      cell: ({ row }) => (
        <span className="text-blue-600 font-medium">{row.location}</span>
      ),
    },
    {
      label: dictionary.table.tours,
      cell: ({ row }) => (
        <span className="text-emerald-600 font-medium">
          {row.tours.toLocaleString()}
        </span>
      ),
    },
    {
      label: dictionary.table.salesVolume,
      cell: ({ row }) => (
        <span className="text-emerald-600 font-medium">
          {formatCurrency(row.salesVolume)} €
        </span>
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

          <ResponsiveTable<LogisticsRow>
            data={paged}
            columns={columns}
            breakpoint="lg"
            rowKey="id"
            rowProps={({ row }) => ({
              onClick: () => {
                setSelectedLogistics(row);
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
              {dictionary.table.logisticNr}: {selectedLogistics?.logisticNr}
            </SheetTitle>
            <SheetDescription>
              {dictionary.table.name}: {selectedLogistics?.name}
            </SheetDescription>
          </SheetHeader>
          {selectedLogistics && (
            <div className="mt-6">
              <Detail logistics={selectedLogistics} locale={locale} />
            </div>
          )}
        </SheetContent>
      </Sheet>
    </Card>
  );
}
