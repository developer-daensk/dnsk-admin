"use client";

import React from "react";
import { Badge } from "@/Components/Shadcn/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/Components/Shadcn/card";
import { OrderDetailProps } from "../types";
import { getDictionary } from "../i18n";

export default function OrderDetail({ order, locale }: OrderDetailProps) {
  const dictionary = getDictionary(locale);

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

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{dictionary.table.orderId}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium">{order.orderId}</span>
              <Badge variant={getStatusVariant(order.status)}>
                {
                  dictionary.status[
                    order.status as keyof typeof dictionary.status
                  ]
                }
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground">
              {dictionary.table.date}:{" "}
              {new Date(order.date).toLocaleDateString(locale)}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{dictionary.table.summary}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {dictionary.table.items}:
              </span>
              <span className="font-medium">
                {order.items} {order.items === 1 ? "item" : "items"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {dictionary.table.totalAmount}:
              </span>
              <span className="font-medium text-primary">
                {formatCurrency(order.totalAmount)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {dictionary.table.customerName}:
              </span>
              <span className="font-medium">{order.customerName}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            {dictionary.table.shippingInformation}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-sm">
              <span className="text-muted-foreground">
                {dictionary.table.address}:{" "}
              </span>
              <span>{order.shippingAddress}</span>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">
                {dictionary.table.paymentMethod}:{" "}
              </span>
              <span>{order.paymentMethod}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
