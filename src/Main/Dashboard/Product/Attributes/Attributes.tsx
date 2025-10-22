"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  ChevronsUpDown,
  Filter,
  Edit,
  Trash2,
  Tag,
} from "lucide-react";
import { Input } from "@/Components/Shadcn/input";
import { Button } from "@/Components/Shadcn/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/Shadcn/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/Components/Shadcn/sheet";
import ResponsiveTable from "@/Components/Entity/ResponsiveTable/ResponsiveTable";
import { Pagination } from "@/Components/Entity/Pagination/Pagination";
import { getDictionary } from "./i18n";
import { ProductAttribute, AttributesProps, AttributeFormData } from "./types";
import AttributeForm from "./Components/AttributeForm";
import { Card, CardHeader, CardContent } from "@/Components/Shadcn/card";

export default function Attributes({ locale }: AttributesProps) {
  const dictionary = getDictionary(locale);
  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<string>("name");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedAttribute, setSelectedAttribute] =
    useState<ProductAttribute | null>(null);

  React.useEffect(() => setMounted(true), []);

  // Mock data for product attributes
  const mockAttributes: ProductAttribute[] = [
    {
      id: "1",
      name: "Color",
      description: "Product color variations like red, blue, green, etc.",
      createdAt: "2024-01-15",
      updatedAt: "2024-01-15",
    },
    {
      id: "2",
      name: "Size",
      description: "Product size options such as small, medium, large, XL",
      createdAt: "2024-01-10",
      updatedAt: "2024-01-12",
    },
    {
      id: "3",
      name: "Material",
      description: "Product material type like cotton, polyester, leather",
      createdAt: "2024-01-08",
      updatedAt: "2024-01-08",
    },
    {
      id: "4",
      name: "Weight",
      description: "Product weight specifications in grams or kilograms",
      createdAt: "2024-01-05",
      updatedAt: "2024-01-06",
    },
    {
      id: "5",
      name: "Brand",
      description: "Product brand or manufacturer information",
      createdAt: "2024-01-01",
      updatedAt: "2024-01-03",
    },
  ];

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    const filtered = mockAttributes.filter(
      (attribute) =>
        attribute.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        attribute.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort data
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "description":
          return a.description.localeCompare(b.description);
        case "createdAt":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        case "updatedAt":
          return (
            new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
          );
        default:
          return 0;
      }
    });

    return sorted;
  }, [searchTerm, sortBy]);

  // Pagination
  const totalItems = filteredAndSortedData.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredAndSortedData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === "de" ? "de-DE" : "en-US");
  };

  // Handle form submission
  const handleFormSubmit = (data: AttributeFormData) => {
    if (isEdit && selectedAttribute) {
      // Update existing attribute
      console.log("Updating attribute:", data);
    } else {
      // Create new attribute
      console.log("Creating new attribute:", data);
    }
    setSheetOpen(false);
    setIsEdit(false);
    setSelectedAttribute(null);
  };

  // Handle edit
  const handleEdit = (attribute: ProductAttribute) => {
    setSelectedAttribute(attribute);
    setIsEdit(true);
    setSheetOpen(true);
  };

  // Handle create new
  const handleCreateNew = () => {
    setSelectedAttribute(null);
    setIsEdit(false);
    setSheetOpen(true);
  };

  // Handle cancel
  const handleCancel = () => {
    setSheetOpen(false);
    setIsEdit(false);
    setSelectedAttribute(null);
  };

  if (!mounted) return null;

  return (
    <Card className="space-y-6 w-full">
      {/* Header */}
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">{dictionary.title}</h1>
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button onClick={handleCreateNew}>{dictionary.createButton}</Button>
          </SheetTrigger>
          <SheetContent className="w-full sm:max-w-lg">
            <SheetHeader>
              <SheetTitle>
                {isEdit ? dictionary.form.editTitle : dictionary.form.title}
              </SheetTitle>
            </SheetHeader>
            <AttributeForm
              initialData={
                selectedAttribute
                  ? {
                      name: selectedAttribute.name,
                      description: selectedAttribute.description,
                    }
                  : undefined
              }
              onSubmit={handleFormSubmit}
              onCancel={handleCancel}
              locale={locale}
            />
          </SheetContent>
        </Sheet>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search and Sort Controls */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 ">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder={dictionary.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder={dictionary.sortBy} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">
                {dictionary.sortOptions.name}
              </SelectItem>
              <SelectItem value="description">
                {dictionary.sortOptions.description}
              </SelectItem>
              <SelectItem value="createdAt">
                {dictionary.sortOptions.createdAt}
              </SelectItem>
              <SelectItem value="updatedAt">
                {dictionary.sortOptions.updatedAt}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results Count */}
        <div className="text-sm text-gray-600">
          {totalItems} {dictionary.foundText}
        </div>

        {/* Table */}
        <ResponsiveTable
          data={paginatedData}
          columns={[
            {
              label: (
                <div className="flex items-center gap-2">
                  {dictionary.tableHeaders.name}
                  <ChevronsUpDown className="w-4 h-4" />
                </div>
              ),
              cell: (params) => (
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-gray-500" />
                  <span className="font-medium">{params.row.name}</span>
                </div>
              ),
            },
            {
              label: (
                <div className="flex items-center gap-2">
                  {dictionary.tableHeaders.description}
                  <ChevronsUpDown className="w-4 h-4" />
                  <Filter className="w-4 h-4" />
                </div>
              ),
              cell: (params) => (
                <span className="truncate max-w-64">
                  {params.row.description}
                </span>
              ),
            },
            {
              label: (
                <div className="flex items-center gap-2">
                  {dictionary.tableHeaders.createdAt}
                  <ChevronsUpDown className="w-4 h-4" />
                </div>
              ),
              cell: (params) => formatDate(params.row.createdAt),
            },
            {
              label: (
                <div className="flex items-center gap-2">
                  {dictionary.tableHeaders.updatedAt}
                  <ChevronsUpDown className="w-4 h-4" />
                </div>
              ),
              cell: (params) => formatDate(params.row.updatedAt),
            },
            {
              label: dictionary.tableHeaders.actions,
              cell: (params) => (
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    title={dictionary.actions.edit}
                    onClick={() => handleEdit(params.row)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                    title={dictionary.actions.delete}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ),
            },
          ]}
          rowProps={(params) => ({
            key: params.row.id,
            className: "hover:bg-gray-50",
          })}
        />

        {/* Pagination */}
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            {dictionary.pagination.total} {totalItems}
          </div>
          <Pagination
            currentPage={currentPage}
            totalItems={totalItems}
            pageSize={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </CardContent>
    </Card>
  );
}
