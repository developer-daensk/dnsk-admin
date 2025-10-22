"use client";

import React from "react";
import { Badge } from "@/Components/Shadcn/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/Components/Shadcn/card";
import { OfferingDetailProps } from "../types";
import { getDictionary } from "../i18n";

export default function OfferingDetail({
  offering,
  locale,
}: OfferingDetailProps) {
  const dictionary = getDictionary(locale);

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

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{dictionary.table.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium">{offering.name}</span>
              <Badge variant={getStatusVariant(offering.status)}>
                {
                  dictionary.status[
                    offering.status as keyof typeof dictionary.status
                  ]
                }
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground">
              {dictionary.table.date}:{" "}
              {new Date(offering.date).toLocaleDateString(locale)}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Offering Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {dictionary.table.category}:
              </span>
              <span className="font-medium">
                {getCategoryLabel(offering.category)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {dictionary.table.quantity}:
              </span>
              <span className="font-medium">{offering.quantity}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {dictionary.table.price}:
              </span>
              <span className="font-medium text-primary">
                {formatCurrency(offering.price)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {dictionary.table.location}:
              </span>
              <span className="font-medium">{offering.location}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {offering.description && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Description</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm">
              <span>{offering.description}</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
