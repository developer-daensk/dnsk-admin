"use client";

import React from "react";
import { getDictionary } from "../i18n";

interface VisitorsChartProps {
  data: {
    new: number;
    returning: number;
  };
  locale: string;
}

export default function VisitorsChart({ data, locale }: VisitorsChartProps) {
  const dictionary = getDictionary(locale);
  const total = data.new + data.returning;
  const newPercentage = Math.round((data.new / total) * 100);
  const returningPercentage = Math.round((data.returning / total) * 100);

  return (
    <div className="flex items-center justify-center h-full">
      <div className="relative w-48 h-48">
        {/* Pie Chart */}
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {/* New Visitors (Chart-1) */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="var(--chart-1)"
            strokeWidth="20"
            strokeDasharray={`${(newPercentage / 100) * 251.2} 251.2`}
            transform="rotate(-90 50 50)"
          />
          {/* Returning Visitors (Chart-2) */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="var(--chart-2)"
            strokeWidth="20"
            strokeDasharray={`${(returningPercentage / 100) * 251.2} 251.2`}
            transform={`rotate(${(newPercentage / 100) * 360 - 90} 50 50)`}
          />
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{total}</div>
            <div className="text-sm text-gray-600">Total</div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="ml-8 space-y-3">
        <div className="flex items-center gap-3">
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: "var(--chart-1)" }}
          ></div>
          <div>
            <div className="font-medium text-gray-900">
              {dictionary.charts.visitors.newVisitors}
            </div>
            <div className="text-sm text-gray-600">
              {data.new} ({newPercentage}%)
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: "var(--chart-2)" }}
          ></div>
          <div>
            <div className="font-medium text-gray-900">
              {dictionary.charts.visitors.returningVisitors}
            </div>
            <div className="text-sm text-gray-600">
              {data.returning} ({returningPercentage}%)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
