"use client";

import React from "react";

interface HorizontalBarChartProps {
  data: {
    date: string;
    count: number;
  }[];
  maxValue: number;
  color: string;
}

export default function HorizontalBarChart({
  data,
  maxValue,
  color,
}: HorizontalBarChartProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  // Map color prop to CSS variables
  const getBarColor = (color: string) => {
    switch (color) {
      case "sellers":
        return "var(--chart-3)";
      case "buyers":
        return "var(--chart-4)";
      default:
        return "var(--chart-1)";
    }
  };

  return (
    <div className="h-full flex flex-col justify-between">
      {data.map((item, index) => (
        <div key={index} className="flex items-center gap-3">
          {/* Date Label */}
          <div className="w-20 text-sm text-gray-600 text-right">
            {formatDate(item.date)}
          </div>

          {/* Bar */}
          <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${(item.count / maxValue) * 100}%`,
                backgroundColor: getBarColor(color),
              }}
            />
            {/* Value Label */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-medium text-white">
                {item.count}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
