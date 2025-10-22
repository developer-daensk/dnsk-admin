"use client";

import React from "react";
import { Input } from "@/Components/Shadcn/input";
import { Button } from "@/Components/Shadcn/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/Components/Shadcn/card";
import ResponsiveTable from "@/Components/Entity/ResponsiveTable/ResponsiveTable";
import { iResponsiveColumn } from "@/Components/Entity/ResponsiveTable/types";
import { Pagination } from "@/Components/Entity/Pagination/Pagination";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/Components/Shadcn/sheet";
import { Badge } from "@/Components/Shadcn/badge";
import {
  LocationProps,
  Location as LocationType,
  LocationFormData,
  AssignLocationFormData,
} from "./types";
import { getDictionary } from "./i18n";
import LocationForm from "./Components/LocationForm";
import AssignLocationForm from "./Components/AssignLocationForm";
import { Plus, Link, Edit, Eye } from "lucide-react";

export default function Location({ locale }: LocationProps) {
  const dictionary = getDictionary(locale);
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  // Mock data
  const [locations] = React.useState<LocationType[]>([
    {
      id: "1",
      locationId: "LOC001",
      name: "Main Office",
      address: "123 Business Ave, New York, NY 10001",
      type: "office",
      status: "active",
      createdAt: "2023-01-15",
      updatedAt: "2023-12-01",
    },
    {
      id: "2",
      locationId: "LOC002",
      name: "Warehouse NYC",
      address: "456 Storage St, Brooklyn, NY 11201",
      type: "warehouse",
      status: "active",
      createdAt: "2023-02-20",
      updatedAt: "2023-11-15",
    },
    {
      id: "3",
      locationId: "LOC003",
      name: "Downtown Store",
      address: "789 Retail Blvd, Manhattan, NY 10002",
      type: "store",
      status: "active",
      createdAt: "2023-03-10",
      updatedAt: "2023-10-20",
    },
    {
      id: "4",
      locationId: "LOC004",
      name: "Factory Complex",
      address: "321 Industrial Way, Queens, NY 11101",
      type: "factory",
      status: "inactive",
      createdAt: "2022-08-15",
      updatedAt: "2023-09-30",
    },
    {
      id: "5",
      locationId: "LOC005",
      name: "Distribution Center",
      address: "654 Logistics Ln, Bronx, NY 10451",
      type: "distribution",
      status: "pending",
      createdAt: "2023-06-01",
      updatedAt: "2023-12-10",
    },
  ]);

  const [query, setQuery] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [locationSheetOpen, setLocationSheetOpen] = React.useState(false);
  const [assignSheetOpen, setAssignSheetOpen] = React.useState(false);
  const [editingLocation, setEditingLocation] =
    React.useState<LocationType | null>(null);
  const pageSize = 10;

  const filtered = React.useMemo(() => {
    if (!query) return locations;
    const q = query.toLowerCase();
    return locations.filter(
      (location) =>
        location.locationId.toLowerCase().includes(q) ||
        location.name.toLowerCase().includes(q) ||
        location.address.toLowerCase().includes(q) ||
        location.type.toLowerCase().includes(q)
    );
  }, [locations, query]);

  const paged = React.useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, currentPage]);

  function getStatusVariant(status: string) {
    switch (status) {
      case "active":
        return "secondary" as const;
      case "inactive":
        return "outline" as const;
      case "pending":
        return "default" as const;
      default:
        return "secondary" as const;
    }
  }

  function getTypeLabel(type: string) {
    switch (type) {
      case "office":
        return dictionary.types.office;
      case "warehouse":
        return dictionary.types.warehouse;
      case "store":
        return dictionary.types.store;
      case "factory":
        return dictionary.types.factory;
      case "distribution":
        return dictionary.types.distribution;
      default:
        return type;
    }
  }

  const columns: iResponsiveColumn<LocationType>[] = [
    {
      label: dictionary.table.locationId,
      cell: ({ row }) => (
        <div className="space-y-1">
          <span className="font-medium text-primary">{row.locationId}</span>
          <div className="text-xs text-muted-foreground">
            Created: {new Date(row.createdAt).toLocaleDateString(locale)}
          </div>
        </div>
      ),
    },
    {
      label: dictionary.table.name,
      cell: ({ row }) => (
        <div className="space-y-1">
          <span className="font-medium">{row.name}</span>
        </div>
      ),
    },
    {
      label: dictionary.table.address,
      cell: ({ row }) => (
        <div className="space-y-1">
          <span className="text-sm">{row.address}</span>
        </div>
      ),
    },
    {
      label: dictionary.table.type,
      cell: ({ row }) => (
        <div className="space-y-1">
          <span className="text-sm">{getTypeLabel(row.type)}</span>
        </div>
      ),
    },
    {
      label: dictionary.table.status,
      cell: ({ row }) => (
        <div className="space-y-2">
          <Badge variant={getStatusVariant(row.status)}>
            {dictionary.status[row.status as keyof typeof dictionary.status]}
          </Badge>
        </div>
      ),
    },
    {
      label: "",
      cell: ({ row }) => (
        <div className="flex items-center gap-2 justify-center">
          <Eye
            className="h-4 w-4  cursor-pointer"
            onClick={() => {
              setEditingLocation(row);
              setLocationSheetOpen(true);
            }}
          />
          <Edit
            className="h-4 w-4 cursor-pointer"
            onClick={() => {
              setEditingLocation(row);
              setLocationSheetOpen(true);
            }}
          />
        </div>
      ),
    },
  ];

  const handleLocationSubmit = (data: LocationFormData) => {
    if (editingLocation) {
      // Handle edit
      console.log("Editing location:", editingLocation.id, data);
      // Here you would typically make an API call
    } else {
      // Handle create
      console.log("Creating new location:", data);
      // Here you would typically make an API call
    }
    setLocationSheetOpen(false);
    setEditingLocation(null);
  };

  const handleAssignSubmit = (data: AssignLocationFormData) => {
    console.log("Assigning location:", data);
    // Here you would typically make an API call
    setAssignSheetOpen(false);
  };

  const handleAddLocation = () => {
    setEditingLocation(null);
    setLocationSheetOpen(true);
  };

  const handleAssignLocation = () => {
    setAssignSheetOpen(true);
  };

  if (!mounted) return null;

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{dictionary.title}</CardTitle>
        <div className="flex gap-2">
          <Button onClick={handleAddLocation}>
            <Plus className="h-4 w-4 mr-2" />
            {dictionary.addLocation}
          </Button>
          <Button variant="outline" onClick={handleAssignLocation}>
            <Link className="h-4 w-4 mr-2" />
            {dictionary.assignLocation}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 w-full max-w-xs">
              <Input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder={dictionary.searchPlaceholder}
              />
            </div>
            <div className="text-sm text-muted-foreground">
              {dictionary.found.replace("{count}", String(filtered.length))}
            </div>
          </div>

          <ResponsiveTable<LocationType>
            data={paged}
            columns={columns}
            breakpoint="lg"
            rowKey="id"
            rowProps={() => ({
              className: "cursor-pointer hover:bg-muted/50",
            })}
          />

          <Pagination
            currentPage={currentPage}
            totalItems={filtered.length}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            className="mt-2"
          />
        </div>
      </CardContent>

      {/* Location Form Sheet */}
      <Sheet open={locationSheetOpen} onOpenChange={setLocationSheetOpen}>
        <SheetContent className="sm:max-w-lg p-4">
          <SheetHeader>
            <SheetTitle>
              {editingLocation
                ? dictionary.form.editTitle
                : dictionary.form.addTitle}
            </SheetTitle>
            <SheetDescription>
              {editingLocation
                ? `Editing location: ${editingLocation.name}`
                : "Create a new location"}
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <LocationForm
              locale={locale}
              isEdit={!!editingLocation}
              initialData={editingLocation || undefined}
              onSubmit={handleLocationSubmit}
              onCancel={() => {
                setLocationSheetOpen(false);
                setEditingLocation(null);
              }}
            />
          </div>
        </SheetContent>
      </Sheet>

      {/* Assign Location Sheet */}
      <Sheet open={assignSheetOpen} onOpenChange={setAssignSheetOpen}>
        <SheetContent className="sm:max-w-lg p-4">
          <SheetHeader>
            <SheetTitle>{dictionary.assignForm.title}</SheetTitle>
            <SheetDescription>
              Assign an existing location to a user
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <AssignLocationForm
              locale={locale}
              locations={locations.filter((loc) => loc.status === "active")}
              onSubmit={handleAssignSubmit}
              onCancel={() => setAssignSheetOpen(false)}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Card>
  );
}
