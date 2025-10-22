"use client";

import React, { useState, useMemo } from "react";
import { getDictionary } from "./i18n";
import { DashboardProps, DashboardData } from "./types";
import ChartCard from "./Components/ChartCard";
import VisitorsChart from "./Components/VisitorsChart";
import HorizontalBarChart from "./Components/HorizontalBarChart";
import LineChart from "./Components/LineChart";
import { Card, CardHeader, CardContent } from "@/Components/Shadcn/card";

export default function Dashboard({ locale }: DashboardProps) {
  const dictionary = getDictionary(locale);
  const [mounted, setMounted] = useState(false);
  const [timeRange, setTimeRange] = useState("last7Days");

  React.useEffect(() => setMounted(true), []);

  // Mock dashboard data
  const dashboardData: DashboardData = useMemo(
    () => ({
      visitors: {
        new: 75,
        returning: 25,
      },
      newSellers: [
        { date: "2023-10-01", count: 4 },
        { date: "2023-10-02", count: 2 },
        { date: "2023-10-03", count: 7 },
        { date: "2023-10-04", count: 2 },
        { date: "2023-10-05", count: 5 },
        { date: "2023-10-06", count: 6 },
      ],
      newBuyers: [
        { date: "2023-10-01", count: 10 },
        { date: "2023-10-02", count: 15 },
        { date: "2023-10-03", count: 12 },
        { date: "2023-10-04", count: 8 },
        { date: "2023-10-05", count: 18 },
        { date: "2023-10-06", count: 16 },
      ],
      activeOrders: [
        { date: "2023-10-01", count: 50 },
        { date: "2023-10-02", count: 46 },
        { date: "2023-10-03", count: 58 },
        { date: "2023-10-04", count: 53 },
        { date: "2023-10-05", count: 68 },
        { date: "2023-10-06", count: 63 },
      ],
    }),
    []
  );

  // Calculate max values for charts
  const maxSellers = Math.max(
    ...dashboardData.newSellers.map((item) => item.count)
  );
  const maxBuyers = Math.max(
    ...dashboardData.newBuyers.map((item) => item.count)
  );
  const maxOrders = Math.max(
    ...dashboardData.activeOrders.map((item) => item.count)
  );
  const minOrders = Math.min(
    ...dashboardData.activeOrders.map((item) => item.count)
  );

  const handleRefresh = () => {
    // In a real app, this would fetch fresh data
    console.log("Refreshing dashboard data...");
  };

  const handleTimeRangeChange = (range: string) => {
    setTimeRange(range);
    // In a real app, this would fetch data for the new time range
    console.log("Changing time range to:", range);
  };

  if (!mounted) return null;

  return (
    <Card className="space-y-6 w-full">
      {/* Header */}
      <CardHeader className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">{dictionary.title}</h1>
      </CardHeader>

      {/* Charts Grid */}
      <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visitors Chart */}
        <ChartCard
          title={dictionary.charts.visitors.title}
          timeRange={timeRange}
          onRefresh={handleRefresh}
          onTimeRangeChange={handleTimeRangeChange}
        >
          <VisitorsChart data={dashboardData.visitors} locale={locale} />
        </ChartCard>

        {/* New Sellers Chart */}
        <ChartCard
          title={dictionary.charts.newSellers.title}
          timeRange={timeRange}
          onRefresh={handleRefresh}
          onTimeRangeChange={handleTimeRangeChange}
        >
          <HorizontalBarChart
            data={dashboardData.newSellers}
            maxValue={maxSellers}
            color="sellers"
          />
        </ChartCard>

        {/* New Buyers Chart */}
        <ChartCard
          title={dictionary.charts.newBuyers.title}
          timeRange={timeRange}
          onRefresh={handleRefresh}
          onTimeRangeChange={handleTimeRangeChange}
        >
          <HorizontalBarChart
            data={dashboardData.newBuyers}
            maxValue={maxBuyers}
            color="buyers"
          />
        </ChartCard>

        {/* Active Orders Chart */}
        <ChartCard
          title={dictionary.charts.activeOrders.title}
          timeRange={timeRange}
          onRefresh={handleRefresh}
          onTimeRangeChange={handleTimeRangeChange}
        >
          <LineChart
            data={dashboardData.activeOrders}
            maxValue={maxOrders}
            minValue={minOrders}
          />
        </ChartCard>
      </CardContent>
    </Card>
  );
}
