"use client";

import React from "react";
import { Badge } from "@/Components/Shadcn/badge";
import { Order } from "../types";
import { iLocale } from "@/Components/Entity/Locale/types";
import { getDictionary } from "../i18n";

interface DetailProps {
  order: Order;
  locale: iLocale;
}

export default function Detail({ order, locale }: DetailProps) {
  const dictionary = getDictionary(locale);

  const getStatusBadgeVariant = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "secondary" as const;
      case "processing":
        return "default" as const;
      case "shipped":
        return "outline" as const;
      case "delivered":
        return "default" as const;
      case "rejected":
        return "destructive" as const;
      default:
        return "secondary" as const;
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="text-muted-foreground">
          {dictionary.table.orderNumber}
        </div>
        <div className="font-medium">{order.orderNumber}</div>

        <div className="text-muted-foreground">{dictionary.table.date}</div>
        <div>{order.date}</div>

        <div className="text-muted-foreground">{dictionary.table.address}</div>
        <div>{order.address}</div>

        <div className="text-muted-foreground">{dictionary.table.quantity}</div>
        <div>{order.quantity}</div>

        <div className="text-muted-foreground">{dictionary.table.total}</div>
        <div className="font-semibold">${order.total.toFixed(2)}</div>

        <div className="text-muted-foreground">{dictionary.table.status}</div>
        <div>
          <Badge variant={getStatusBadgeVariant(order.status)}>
            {dictionary.status[order.status]}
          </Badge>
        </div>
      </div>
    </div>
  );
}
