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
import { Badge } from "@/Components/Shadcn/badge";
import { Pagination } from "@/Components/Entity/Pagination/Pagination";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/Components/Shadcn/sheet";
import { LocationsProps, LocationRow } from "./types";
import { getDictionary } from "./i18n";
import Detail from "./Components/Detail";
import { Eye } from "lucide-react";

export default function Locations({ locale }: LocationsProps) {
  const dictionary = getDictionary(locale);
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  // Mock data
  const [rows] = React.useState<LocationRow[]>([
    {
      id: "1",
      code: "LOC-001",
      user: "@john_admin",
      area: "DE_22",
      cover: "JA",
      articles: 45,
      logistic: "Express",
      salesVolume: 125670.5,
      createdAt: "15.03.2022",
    },
    {
      id: "2",
      code: "LOC-002",
      user: "@jane_marketing",
      area: "DE_25",
      cover: "NE",
      articles: 0,
      logistic: "Standard",
      salesVolume: 0,
      createdAt: "10.01.2023",
    },
    {
      id: "3",
      code: "LOC-003",
      user: "@bob_sales_mgr",
      area: "DE_26",
      cover: "JA",
      articles: 127,
      logistic: "Premium",
      salesVolume: 287340.25,
      createdAt: "22.08.2021",
    },
    {
      id: "4",
      code: "LOC-004",
      user: "@alice_hr",
      area: "DE_27",
      cover: "NE",
      articles: 23,
      logistic: "Economy",
      salesVolume: 45210.8,
      createdAt: "05.06.2023",
    },
    {
      id: "5",
      code: "LOC-005",
      user: "@charlie_it_admin",
      area: "DE_28",
      cover: "JA",
      articles: 89,
      logistic: "Express",
      salesVolume: 198760.15,
      createdAt: "18.11.2022",
    },
  ]);

  const [query, setQuery] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [selectedLocation, setSelectedLocation] =
    React.useState<LocationRow | null>(null);
  const pageSize = 10;

  const filtered = React.useMemo(() => {
    if (!query) return rows;
    const q = query.toLowerCase();
    return rows.filter(
      (r) =>
        r.code.toLowerCase().includes(q) ||
        r.user.toLowerCase().includes(q) ||
        r.area.toLowerCase().includes(q)
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

  const columns: iResponsiveColumn<LocationRow>[] = [
    {
      label: dictionary.table.code,
      cell: ({ row }) => (
        <a className="text-primary hover:underline" href="#">
          {row.code}
        </a>
      ),
    },
    {
      label: dictionary.table.user,
      cell: ({ row }) => (
        <a className="text-primary hover:underline" href="#">
          {row.user}
        </a>
      ),
    },
    {
      label: dictionary.table.area,
      cell: ({ row }) => <Badge variant="outline">{row.area}</Badge>,
    },
    {
      label: dictionary.table.cover,
      cell: ({ row }) => (
        <Badge variant={row.cover === "JA" ? "secondary" : "destructive"}>
          {row.cover}
        </Badge>
      ),
    },
    {
      label: dictionary.table.articles,
      cell: ({ row }) => (
        <span className="text-emerald-600 font-medium">{row.articles}</span>
      ),
    },
    {
      label: dictionary.table.logistic,
      cell: ({ row }) => <Badge variant="outline">{row.logistic}</Badge>,
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
      label: dictionary.table.createdAt,
      cell: ({ row }) => (
        <span className="text-orange-500">{row.createdAt}</span>
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

          <ResponsiveTable<LocationRow>
            data={paged}
            columns={columns}
            breakpoint="lg"
            rowKey="id"
            rowProps={({ row }) => ({
              onClick: () => {
                setSelectedLocation(row);
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
              {dictionary.table.code}: {selectedLocation?.code}
            </SheetTitle>
            <SheetDescription>
              {dictionary.table.user}: {selectedLocation?.user}
            </SheetDescription>
          </SheetHeader>
          {selectedLocation && (
            <div className="mt-6">
              <Detail location={selectedLocation} locale={locale} />
            </div>
          )}
        </SheetContent>
      </Sheet>
    </Card>
  );
}
