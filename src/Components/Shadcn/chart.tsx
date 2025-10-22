"use client";

import * as React from "react";
import { Bar, BarChart, Cell, Line, LineChart, Pie, PieChart } from "recharts";

import { cn } from "./lib/utils";

export interface ChartConfig {
  [key: string]: {
    label?: string;
    color: string;
  };
}

interface ChartContainerProps {
  config: ChartConfig;
  children: React.ReactNode;
  className?: string;
}

export function ChartContainer({
  config,
  children,
  className,
}: ChartContainerProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        {Object.entries(config).map(([key, value]) => {
          if (key === "label" || !value.label) return null;
          return (
            <div key={key} className="flex items-center space-x-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: value.color }}
              />
              <span className="text-muted-foreground text-sm">
                {value.label}
              </span>
            </div>
          );
        })}
      </div>
      <div className="h-[300px] w-full">{children}</div>
    </div>
  );
}

interface ChartTooltipProps {
  children?: React.ReactNode;
  className?: string;
  content?: React.ReactNode;
}

export function ChartTooltip({
  children,
  className,
  content,
}: ChartTooltipProps) {
  return (
    <div className={cn("", className)}>
      {children}
      {content}
    </div>
  );
}

interface ChartTooltipContentProps {
  indicator?: "line" | "dot";
  className?: string;
  children?: React.ReactNode;
}

export function ChartTooltipContent({
  className,
  children,
}: ChartTooltipContentProps) {
  return (
    <div
      className={cn("bg-background rounded-lg border p-2 shadow-sm", className)}
    >
      {children}
    </div>
  );
}

// Re-export Recharts components for convenience
export { Bar, BarChart, Cell, Line, LineChart, Pie, PieChart };
