"use client";
import React from "react";
import { Eye, Edit } from "lucide-react";
import { Button } from "@/Components/Shadcn/button";
import { Badge } from "@/Components/Shadcn/badge";
import ResponsiveTable from "@/Components/Entity/ResponsiveTable/ResponsiveTable";
import { Order } from "../types";
import { iLocale } from "@/Components/Entity/Locale/types";
import { getDictionary } from "../i18n";
import { iResponsiveColumn } from "@/Components/Entity/ResponsiveTable/types";
import { useRouter } from "next/navigation";
import { appRoutes } from "@/lib/routes/appRoutes";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/Components/Shadcn/sheet";
import Detail from "./Detial";

interface ListProps {
  orders: Order[];
  locale: iLocale;
}

export default function List({ orders, locale }: ListProps) {
  const dictionary = getDictionary(locale);
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<Order | null>(null);

  const getStatusBadgeVariant = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "secondary";
      case "processing":
        return "default";
      case "shipped":
        return "outline";
      case "delivered":
        return "default";
      case "rejected":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const getStatusText = (status: Order["status"]) => {
    return dictionary.status[status];
  };

  const columns: iResponsiveColumn<Order>[] = [
    {
      label: dictionary.table.orderNumber,
      cell: ({ row }) => <div className="font-medium">{row.orderNumber}</div>,
    },
    {
      label: dictionary.table.date,
      cell: ({ row }) => (
        <div className="text-muted-foreground">{row.date}</div>
      ),
    },
    {
      label: dictionary.table.address,
      cell: ({ row }) => (
        <div className="text-muted-foreground">{row.address}</div>
      ),
    },
    {
      label: dictionary.table.total,
      cell: ({ row }) => (
        <div className="font-semibold">${row.total.toFixed(2)}</div>
      ),
    },
    {
      label: dictionary.table.quantity,
      cell: ({ row }) => (
        <div className="text-muted-foreground">{row.quantity}</div>
      ),
    },
    {
      label: dictionary.table.status,
      cell: ({ row }) => (
        <Badge variant={getStatusBadgeVariant(row.status)}>
          {getStatusText(row.status)}
        </Badge>
      ),
    },
    {
      label: dictionary.table.actions,
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              setSelected(row);
              setOpen(true);
            }}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={(event) => {
              router.push(appRoutes.dashboard.orders.edit(locale, row.id));
              event.preventDefault();
            }}
          >
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <ResponsiveTable
        rowProps={({ row }) => ({
          onClick: () => {
            router.push(appRoutes.dashboard.orders.edit(locale, row.id));
          },
        })}
        data={orders}
        columns={columns}
        breakpoint="lg"
        rowKey="id"
      />

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="sm:max-w-lg p-4">
          <SheetHeader>
            <SheetTitle>
              {dictionary.table.orderNumber}: {selected?.orderNumber}
            </SheetTitle>
            <SheetDescription>
              {dictionary.table.date}: {selected?.date}
            </SheetDescription>
          </SheetHeader>
          {selected && (
            <div className="mt-6">
              <Detail order={selected} locale={locale} />
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
