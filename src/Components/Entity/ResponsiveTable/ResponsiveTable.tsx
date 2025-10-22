"use client";

import { Card, CardContent } from "../../Shadcn/card";
import { cn } from "../../Shadcn/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../Shadcn/table";
import { Fragment, useEffect, useState } from "react";
import { BREAKPOINT_PIXELS } from "./constants";
import {
  iBreakpoint,
  iParams,
  iResponsiveColumn,
  iResponsiveTableProps,
  iRowData,
} from "./types";

export default function ResponsiveTable<T extends iRowData>(
  props: iResponsiveTableProps<T>
) {
  const { data, columns, className, rowKey = "id", rowProps } = props;
  const breakpoint: iBreakpoint = props.breakpoint || "lg";
  const [isMobileView, setIsMobileView] = useState<boolean>(true);

  useEffect(() => {
    function onVisibility() {
      if (!document.hidden) evaluate();
    }
    function evaluate() {
      const bp = BREAKPOINT_PIXELS[breakpoint];
      setIsMobileView(window.innerWidth < bp);
    }
    evaluate();

    window.addEventListener("resize", evaluate);
    window.addEventListener("focus", evaluate);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.removeEventListener("resize", evaluate);
      window.removeEventListener("focus", evaluate);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [breakpoint]);

  function rowKeyProvider(row: T, index: number) {
    const key = row[rowKey];
    return typeof key === "string" ? key : index;
  }

  function rowPropsProvider(params: iParams<T>) {
    return rowProps ? rowProps(params) : {};
  }

  function classNameProvider(isMobile: boolean) {
    if (!className) return "";
    return typeof className === "string" ? className : className(isMobile);
  }

  function labelClassNameProvider(
    isMobile: boolean,
    col?: iResponsiveColumn<T>
  ) {
    if (!col || !col.labelClassName) return "";
    return typeof col.labelClassName === "string"
      ? col.labelClassName
      : col.labelClassName(isMobile);
  }

  function labelProvider(isMobile: boolean, col?: iResponsiveColumn<T>) {
    if (!col || !col.label) return "";
    if (typeof col.label === "string") return col.label;
    if (typeof col.label === "function") return col.label(isMobile);
    return col.label;
  }

  if (isMobileView)
    return (
      <div
        className={cn(
          "animate-in fade-in w-full space-y-3 duration-300",
          classNameProvider(true)
        )}
      >
        {data.map((row, index) => {
          const params: iParams<T> = { row, index, isMobile: true };
          return (
            <Card
              className="hover:bg-muted/50"
              key={rowKeyProvider(row, index)}
              {...rowPropsProvider(params)}
            >
              <CardContent className="grid gap-1 sm:grid-cols-[max-content_1fr] sm:gap-4">
                {columns.map((col, colIndex) => {
                  if (col.isMobile === false) return null;
                  return (
                    <Fragment key={colIndex}>
                      <div
                        className={cn(
                          "flex items-center text-xs not-first:mt-4 sm:not-first:mt-0",
                          labelClassNameProvider(true, col)
                        )}
                      >
                        {labelProvider(true, col)}
                      </div>
                      <div className="flex items-center">
                        {col.cell(params)}
                      </div>
                    </Fragment>
                  );
                })}
              </CardContent>
            </Card>
          );
        })}
      </div>
    );

  return (
    <Table
      className={cn(
        "animate-in fade-in w-full duration-300",
        classNameProvider(false)
      )}
    >
      <TableHeader>
        <TableRow>
          {columns.map((col, colIndex) => {
            if (col.isMobile === true) return null;
            return (
              <TableHead
                key={colIndex}
                className={labelClassNameProvider(false, col)}
              >
                {labelProvider(false, col)}
              </TableHead>
            );
          })}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, index) => {
          const params: iParams<T> = { row, index, isMobile: false };
          return (
            <TableRow
              key={rowKeyProvider(row, index)}
              {...rowPropsProvider(params)}
            >
              {columns.map((col, colIndex) => {
                if (col.isMobile === true) return null;
                return <TableCell key={colIndex}>{col.cell(params)}</TableCell>;
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
