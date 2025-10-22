"use client";
import React, { useState } from "react";
import { getDictionary } from "./i18n";
import { iProps } from "./types";
import { Input } from "@/Components/Shadcn/input";
import { ShoppingCart, Search } from "lucide-react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/Components/Shadcn/tabs";
import List from "./Components/List";
import Create from "./Components/Create";
import { Pagination } from "@/Components/Entity/Pagination/Pagination";
import { Card, CardContent, CardHeader } from "@/Components/Shadcn/card";

export default function Orders({ orders, locale, currentTab }: iProps) {
  const dictionary = getDictionary(locale);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;
  const [activeTab, setActiveTab] = useState(currentTab);

  const tabs = [
    { id: "overview", label: dictionary.tabs.overview },
    { id: "inProgress", label: dictionary.tabs.inProgress },
    { id: "inDelivery", label: dictionary.tabs.inDelivery },
    { id: "rejected", label: dictionary.tabs.rejected },
  ];

  const filteredOrders = orders.filter(
    (order) =>
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentOrders = filteredOrders.slice(startIndex, endIndex);

  return (
    <Card className="space-y-6 w-full">
      {/* Header */}
      <CardHeader className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShoppingCart className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-semibold">{dictionary.title}</h1>
        </div>
        <Create locale={locale} />
      </CardHeader>

      {/* Search Bar */}
      <CardContent className="space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={dictionary.search.placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-fit grid-cols-4">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {tabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id}>
              {/* Orders List */}
              <List orders={currentOrders} locale={locale} />
            </TabsContent>
          ))}
        </Tabs>

        {/* Pagination */}
        <div className="flex items-center justify-between w-full">
          <Pagination
            currentPage={currentPage}
            totalItems={filteredOrders.length}
            pageSize={ITEMS_PER_PAGE}
            onPageChange={setCurrentPage}
          />
        </div>
      </CardContent>
    </Card>
  );
}
