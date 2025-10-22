"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  ChevronsUpDown,
  Filter,
  MapPin,
  Mail,
  Phone,
  Smartphone,
  Edit,
  FileText,
} from "lucide-react";
import { Input } from "@/Components/Shadcn/input";
import { Button } from "@/Components/Shadcn/button";
import { Badge } from "@/Components/Shadcn/badge";
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
import {
  ContactPerson,
  ContactPersonsProps,
  ContactPersonFormData,
} from "./types";
import ContactPersonForm from "./Components/ContactPersonForm";
import { Card, CardHeader, CardContent } from "@/Components/Shadcn/card";
export default function ContactPersons({ locale }: ContactPersonsProps) {
  const dictionary = getDictionary(locale);
  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<string>("userId");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedContact, setSelectedContact] = useState<ContactPerson | null>(
    null
  );

  React.useEffect(() => setMounted(true), []);

  // Mock data for contact persons
  const mockContactPersons: ContactPerson[] = [
    {
      id: "1",
      userId: "1",
      location: "Berlin",
      role: "Administrator",
      email: "john.smith@techcorp.com",
      phone: "+49 30 12345...",
      mobilePhone: "+49 170 12345...",
      status: "ACTIVE",
      firstName: "John",
      lastName: "Smith",
      address: "Alexanderplatz 1, 10178 Berlin, Germany",
      companyId: "1",
      locationId: "1",
    },
    {
      id: "2",
      userId: "2",
      location: "Hamburg",
      role: "Operations Manager",
      email: "maria.schmidt@greenenergy.com",
      phone: "+49 40 98765...",
      mobilePhone: "+49 170 9876...",
      status: "ACTIVE",
      firstName: "Maria",
      lastName: "Schmidt",
      address: "Hafenstraße 45, 20457 Hamburg, Germany",
      companyId: "2",
      locationId: "2",
    },
    {
      id: "3",
      userId: "3",
      location: "Munich",
      role: "Management",
      email: "thomas.weber@logisticspro.com",
      phone: "+49 89 45678...",
      mobilePhone: "+49 170 4567...",
      status: "PENDING",
      firstName: "Thomas",
      lastName: "Weber",
      address: "Marienplatz 8, 80331 München, Germany",
      companyId: "3",
      locationId: "3",
    },
    {
      id: "4",
      userId: "4",
      location: "Frankfurt",
      role: "Operations Manager",
      email: "sarah.mueller@healthplus.de",
      phone: "+49 69 23456...",
      mobilePhone: "+49 170 2345...",
      status: "INACTIVE",
      firstName: "Sarah",
      lastName: "Müller",
      address: "Zeil 123, 60313 Frankfurt, Germany",
      companyId: "4",
      locationId: "4",
    },
    {
      id: "5",
      userId: "5",
      location: "Düsseldorf",
      role: "Administrator",
      email: "michael.fischer@foodtech.de",
      phone: "+49 211 34567...",
      mobilePhone: "+49 170 34567...",
      status: "ACTIVE",
      firstName: "Michael",
      lastName: "Fischer",
      address: "Königsallee 92, 40212 Düsseldorf, Germany",
      companyId: "5",
      locationId: "5",
    },
  ];

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    const filtered = mockContactPersons.filter(
      (person) =>
        person.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort data
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "userId":
          return a.userId.localeCompare(b.userId);
        case "location":
          return a.location.localeCompare(b.location);
        case "role":
          return a.role.localeCompare(b.role);
        case "email":
          return a.email.localeCompare(b.email);
        case "phone":
          return a.phone.localeCompare(b.phone);
        case "mobilePhone":
          return a.mobilePhone.localeCompare(b.mobilePhone);
        case "status":
          return a.status.localeCompare(b.status);
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

  // Get status badge variant
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "default";
      case "PENDING":
        return "secondary";
      case "INACTIVE":
        return "destructive";
      default:
        return "outline";
    }
  };

  // Handle form submission
  const handleFormSubmit = (data: ContactPersonFormData) => {
    if (isEdit && selectedContact) {
      // Update existing contact person
      console.log("Updating contact person:", data);
    } else {
      // Create new contact person
      console.log("Creating new contact person:", data);
    }
    setSheetOpen(false);
    setIsEdit(false);
    setSelectedContact(null);
  };

  // Handle edit
  const handleEdit = (contact: ContactPerson) => {
    setSelectedContact(contact);
    setIsEdit(true);
    setSheetOpen(true);
  };

  // Handle create new
  const handleCreateNew = () => {
    setSelectedContact(null);
    setIsEdit(false);
    setSheetOpen(true);
  };

  // Handle cancel
  const handleCancel = () => {
    setSheetOpen(false);
    setIsEdit(false);
    setSelectedContact(null);
  };

  if (!mounted) return null;

  return (
    <Card className="space-y-6">
      {/* Header */}
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">{dictionary.title}</h1>
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button onClick={handleCreateNew}>{dictionary.createButton}</Button>
          </SheetTrigger>
          <SheetContent className="w-full sm:max-w-2xl">
            <SheetHeader>
              <SheetTitle>
                {isEdit ? dictionary.form.editTitle : dictionary.form.title}
              </SheetTitle>
            </SheetHeader>
            <ContactPersonForm
              initialData={
                selectedContact
                  ? {
                      companyId: selectedContact.companyId || "",
                      locationId: selectedContact.locationId || "",
                      firstName: selectedContact.firstName,
                      lastName: selectedContact.lastName,
                      email: selectedContact.email,
                      phone: selectedContact.phone,
                      mobilePhone: selectedContact.mobilePhone,
                      address: selectedContact.address,
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
          <div className="relative flex-1 max-w-md">
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
              <SelectItem value="userId">
                {dictionary.sortOptions.userId}
              </SelectItem>
              <SelectItem value="location">
                {dictionary.sortOptions.location}
              </SelectItem>
              <SelectItem value="role">
                {dictionary.sortOptions.role}
              </SelectItem>
              <SelectItem value="email">
                {dictionary.sortOptions.email}
              </SelectItem>
              <SelectItem value="phone">
                {dictionary.sortOptions.phone}
              </SelectItem>
              <SelectItem value="mobilePhone">
                {dictionary.sortOptions.mobilePhone}
              </SelectItem>
              <SelectItem value="status">
                {dictionary.sortOptions.status}
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
                  {dictionary.tableHeaders.userId}
                  <ChevronsUpDown className="w-4 h-4" />
                </div>
              ),
              cell: (params) => (
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-gray-500" />
                  <span className="font-medium">{params.row.userId}</span>
                </div>
              ),
            },
            {
              label: (
                <div className="flex items-center gap-2">
                  {dictionary.tableHeaders.location}
                  <ChevronsUpDown className="w-4 h-4" />
                </div>
              ),
              cell: (params) => (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span>{params.row.location}</span>
                </div>
              ),
            },
            {
              label: (
                <div className="flex items-center gap-2">
                  {dictionary.tableHeaders.role}
                  <ChevronsUpDown className="w-4 h-4" />
                  <Filter className="w-4 h-4" />
                </div>
              ),
              cell: (params) => params.row.role,
            },
            {
              label: (
                <div className="flex items-center gap-2">
                  {dictionary.tableHeaders.email}
                  <ChevronsUpDown className="w-4 h-4" />
                </div>
              ),
              cell: (params) => (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span className="truncate max-w-48">{params.row.email}</span>
                </div>
              ),
            },
            {
              label: dictionary.tableHeaders.phone,
              cell: (params) => (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span className="truncate max-w-32">{params.row.phone}</span>
                </div>
              ),
            },
            {
              label: dictionary.tableHeaders.mobilePhone,
              cell: (params) => (
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-gray-500" />
                  <span className="truncate max-w-32">
                    {params.row.mobilePhone}
                  </span>
                </div>
              ),
            },
            {
              label: (
                <div className="flex items-center gap-2">
                  {dictionary.tableHeaders.status}
                  <ChevronsUpDown className="w-4 h-4" />
                  <Filter className="w-4 h-4" />
                </div>
              ),
              cell: (params) => (
                <Badge variant={getStatusBadgeVariant(params.row.status)}>
                  {
                    dictionary.statuses[
                      params.row.status as keyof typeof dictionary.statuses
                    ]
                  }
                </Badge>
              ),
            },
            {
              label: dictionary.tableHeaders.actions,
              cell: (params) => (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  title={dictionary.actions.edit}
                  onClick={() => handleEdit(params.row)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
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
