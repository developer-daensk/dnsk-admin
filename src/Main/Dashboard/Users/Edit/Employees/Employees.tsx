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
  EmployeeProps,
  Employee as EmployeeType,
  EmployeeFormData,
} from "./types";
import { getDictionary } from "./i18n";
import EmployeeForm from "./Components/EmployeeForm";
import { Plus, Edit } from "lucide-react";

export default function Employees({ locale }: EmployeeProps) {
  const dictionary = getDictionary(locale);
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  // Mock data
  const [employees] = React.useState<EmployeeType[]>([
    {
      id: "1",
      name: "John Doe",
      position: "manager",
      email: "john@example.com",
      phone: "+1234567890",
      location: "Main Office",
      department: "it",
      status: "active",
      hireDate: "2023-01-15",
      createdAt: "2023-01-15",
      updatedAt: "2023-12-01",
    },
    {
      id: "2",
      name: "Jane Smith",
      position: "developer",
      email: "jane@example.com",
      phone: "+1234567891",
      location: "Main Office",
      department: "engineering",
      status: "active",
      hireDate: "2023-02-20",
      createdAt: "2023-02-20",
      updatedAt: "2023-11-15",
    },
    {
      id: "3",
      name: "Bob Johnson",
      position: "analyst",
      email: "bob@example.com",
      phone: "+1234567892",
      location: "Downtown Store",
      department: "sales",
      status: "active",
      hireDate: "2023-03-10",
      createdAt: "2023-03-10",
      updatedAt: "2023-10-20",
    },
    {
      id: "4",
      name: "Alice Brown",
      position: "specialist",
      email: "alice@example.com",
      phone: "+1234567893",
      location: "Warehouse NYC",
      department: "operations",
      status: "inactive",
      hireDate: "2022-08-15",
      createdAt: "2022-08-15",
      updatedAt: "2023-09-30",
    },
    {
      id: "5",
      name: "Charlie Wilson",
      position: "coordinator",
      email: "charlie@example.com",
      phone: "+1234567894",
      location: "Distribution Center",
      department: "logistics",
      status: "pending",
      hireDate: "2023-06-01",
      createdAt: "2023-06-01",
      updatedAt: "2023-12-10",
    },
  ]);

  const [query, setQuery] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [employeeSheetOpen, setEmployeeSheetOpen] = React.useState(false);

  const [editingEmployee, setEditingEmployee] =
    React.useState<EmployeeType | null>(null);
  const pageSize = 10;

  const filtered = React.useMemo(() => {
    if (!query) return employees;
    const q = query.toLowerCase();
    return employees.filter(
      (employee) =>
        employee.name.toLowerCase().includes(q) ||
        employee.email.toLowerCase().includes(q) ||
        employee.position.toLowerCase().includes(q) ||
        employee.department.toLowerCase().includes(q) ||
        employee.location.toLowerCase().includes(q)
    );
  }, [employees, query]);

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
      case "terminated":
        return "destructive" as const;
      default:
        return "secondary" as const;
    }
  }

  function getDepartmentLabel(department: string) {
    switch (department) {
      case "it":
        return dictionary.departments.it;
      case "hr":
        return dictionary.departments.hr;
      case "sales":
        return dictionary.departments.sales;
      case "marketing":
        return dictionary.departments.marketing;
      case "finance":
        return dictionary.departments.finance;
      case "operations":
        return dictionary.departments.operations;
      case "engineering":
        return dictionary.departments.engineering;
      default:
        return department;
    }
  }

  function getPositionLabel(position: string) {
    switch (position) {
      case "manager":
        return dictionary.positions.manager;
      case "developer":
        return dictionary.positions.developer;
      case "analyst":
        return dictionary.positions.analyst;
      case "specialist":
        return dictionary.positions.specialist;
      case "coordinator":
        return dictionary.positions.coordinator;
      case "director":
        return dictionary.positions.director;
      case "assistant":
        return dictionary.positions.assistant;
      default:
        return position;
    }
  }

  const columns: iResponsiveColumn<EmployeeType>[] = [
    {
      label: dictionary.table.name,
      cell: ({ row }) => (
        <div className="space-y-1">
          <span className="font-medium">{row.name}</span>
          <div className="text-xs text-muted-foreground">
            Hired: {new Date(row.hireDate).toLocaleDateString(locale)}
          </div>
        </div>
      ),
    },
    {
      label: dictionary.table.position,
      cell: ({ row }) => (
        <div className="space-y-1">
          <span className="text-sm">{getPositionLabel(row.position)}</span>
        </div>
      ),
    },
    {
      label: dictionary.table.email,
      cell: ({ row }) => (
        <div className="space-y-1">
          <span className="text-sm">{row.email}</span>
        </div>
      ),
    },
    {
      label: dictionary.table.phone,
      cell: ({ row }) => (
        <div className="space-y-1">
          <span className="text-sm">{row.phone}</span>
        </div>
      ),
    },
    {
      label: dictionary.table.location,
      cell: ({ row }) => (
        <div className="space-y-1">
          <span className="text-sm">{row.location}</span>
        </div>
      ),
    },
    {
      label: dictionary.table.department,
      cell: ({ row }) => (
        <div className="space-y-1">
          <span className="text-sm">{getDepartmentLabel(row.department)}</span>
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
          <Edit
            className="h-4 w-4  cursor-pointer"
            onClick={() => {
              setEditingEmployee(row);
              setEmployeeSheetOpen(true);
            }}
          />
        </div>
      ),
    },
  ];

  const handleEmployeeSubmit = (data: EmployeeFormData) => {
    if (editingEmployee) {
      // Handle edit
      console.log("Editing employee:", editingEmployee.id, data);
      // Here you would typically make an API call
    } else {
      // Handle create
      console.log("Creating new employee:", data);
      // Here you would typically make an API call
    }
    setEmployeeSheetOpen(false);
    setEditingEmployee(null);
  };

  const handleAddEmployee = () => {
    setEditingEmployee(null);
    setEmployeeSheetOpen(true);
  };

  if (!mounted) return null;

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{dictionary.title}</CardTitle>
        <div className="flex gap-2">
          <Button onClick={handleAddEmployee}>
            <Plus className="h-4 w-4 mr-2" />
            {dictionary.addEmployee}
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

          <ResponsiveTable<EmployeeType>
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

      {/* Employee Form Sheet */}
      <Sheet open={employeeSheetOpen} onOpenChange={setEmployeeSheetOpen}>
        <SheetContent className="sm:max-w-lg p-4">
          <SheetHeader>
            <SheetTitle>
              {editingEmployee
                ? dictionary.form.editTitle
                : dictionary.form.addTitle}
            </SheetTitle>
            <SheetDescription>
              {editingEmployee
                ? `Editing employee: ${editingEmployee.name}`
                : "Create a new employee"}
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <EmployeeForm
              locale={locale}
              isEdit={!!editingEmployee}
              initialData={editingEmployee || undefined}
              onSubmit={handleEmployeeSubmit}
              onCancel={() => {
                setEmployeeSheetOpen(false);
                setEditingEmployee(null);
              }}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Card>
  );
}
