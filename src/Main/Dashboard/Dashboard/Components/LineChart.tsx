"use client";

import React from "react";

interface LineChartProps {
  data: {
    date: string;
    count: number;
  }[];
  maxValue: number;
  minValue: number;
}

export default function LineChart({
  data,
  maxValue,
  minValue,
}: LineChartProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const range = maxValue - minValue;
  const width = 160;
  const height = 80;
  const padding = 15;

  // Generate SVG path for the line
  const points = data
    .map((item, index) => {
      const x = padding + (index / (data.length - 1)) * (width - 2 * padding);
      const y =
        padding + ((maxValue - item.count) / range) * (height - 2 * padding);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="h-full flex flex-col justify-center">
      {/* Y-axis labels */}
      <div className="flex justify-between text-xs text-gray-500 mb-2 px-2">
        <span>{maxValue}</span>
        <span>{Math.round((maxValue + minValue) / 2)}</span>
        <span>{minValue}</span>
      </div>

      {/* Chart */}
      <div className="flex-1 flex items-center justify-center">
        <svg
          className="w-full h-full max-w-full max-h-full"
          viewBox={`0 0 ${width} ${height}`}
        >
          {/* Grid lines */}
          <line
            x1={padding}
            y1={padding + (height - 2 * padding) / 2}
            x2={width - padding}
            y2={padding + (height - 2 * padding) / 2}
            stroke="var(--border)"
            strokeWidth="1"
          />
          <line
            x1={padding}
            y1={padding + (height - 2 * padding) / 4}
            x2={width - padding}
            y2={padding + (height - 2 * padding) / 4}
            stroke="var(--border)"
            strokeWidth="1"
          />
          <line
            x1={padding}
            y1={padding + (3 * (height - 2 * padding)) / 4}
            x2={width - padding}
            y2={padding + (3 * (height - 2 * padding)) / 4}
            stroke="var(--border)"
            strokeWidth="1"
          />

          {/* Line path */}
          <polyline
            points={points}
            fill="none"
            stroke="var(--chart-1)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data points */}
          {data.map((item, index) => {
            const x =
              padding + (index / (data.length - 1)) * (width - 2 * padding);
            const y =
              padding +
              ((maxValue - item.count) / range) * (height - 2 * padding);
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="3"
                fill="var(--chart-1)"
                stroke="var(--background)"
                strokeWidth="1"
              />
            );
          })}
        </svg>
      </div>

      {/* X-axis labels */}
      <div className="flex justify-between text-xs text-gray-500 mt-2 px-2">
        {data.map((item, index) => (
          <span key={index}>{formatDate(item.date)}</span>
        ))}
      </div>
    </div>
  );
}
