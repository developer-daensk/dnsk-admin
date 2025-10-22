"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  ChevronsUpDown,
  Filter,
  User,
  MapPin,
  Mail,
  Calendar,
  Edit,
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
import { Badge } from "@/Components/Shadcn/badge";
import ResponsiveTable from "@/Components/Entity/ResponsiveTable/ResponsiveTable";
import { Pagination } from "@/Components/Entity/Pagination/Pagination";
import { getDictionary } from "./i18n";
import { ContactPerson, ContactPersonsProps } from "./types";
import { Card, CardHeader, CardContent } from "@/Components/Shadcn/card";

export default function ContactPersons({ locale }: ContactPersonsProps) {
  const dictionary = getDictionary(locale);
  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<string>("name");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  React.useEffect(() => setMounted(true), []);

  // Mock data for contact persons
  const mockContactPersons: ContactPerson[] = [
    {
      id: "1",
      name: "John Smith",
      role: "Administrator",
      companyName: "TechCorp GmbH",
      companyAddress: "Alexanderplatz 1, 10178 Berlin, Germany",
      email: "john.smith@techcorp.com",
      registrationDate: "2023-01-15",
      status: "ACTIVE",
    },
    {
      id: "2",
      name: "Maria Schmidt",
      role: "Operations Manager",
      companyName: "GreenEnergy Solutions",
      companyAddress: "Hafenstraße 45, 20457 Hamburg, Germany",
      email: "maria.schmidt@greenenergy.com",
      registrationDate: "2023-03-20",
      status: "ACTIVE",
    },
    {
      id: "3",
      name: "Thomas Weber",
      role: "Management",
      companyName: "LogisticsPro GmbH",
      companyAddress: "Marienplatz 8, 80331 München, Germany",
      email: "thomas.weber@logisticspro.com",
      registrationDate: "2024-01-10",
      status: "PENDING",
    },
    {
      id: "4",
      name: "Sarah Müller",
      role: "Operations Manager",
      companyName: "HealthPlus Medical",
      companyAddress: "Zeil 123, 60313 Frankfurt, Germany",
      email: "sarah.mueller@healthplus.de",
      registrationDate: "2023-06-15",
      status: "INACTIVE",
    },
    {
      id: "5",
      name: "Michael Fischer",
      role: "Administrator",
      companyName: "FoodTech Innovations",
      companyAddress: "Königsallee 92, 40212 Düsseldorf, Germany",
      email: "michael.fischer@foodtech.de",
      registrationDate: "2023-09-01",
      status: "ACTIVE",
    },
  ];

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    const filtered = mockContactPersons.filter(
      (person) =>
        person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort data
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "role":
          return a.role.localeCompare(b.role);
        case "companyName":
          return a.companyName.localeCompare(b.companyName);
        case "companyAddress":
          return a.companyAddress.localeCompare(b.companyAddress);
        case "email":
          return a.email.localeCompare(b.email);
        case "registrationDate":
          return (
            new Date(a.registrationDate).getTime() -
            new Date(b.registrationDate).getTime()
          );
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

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === "de" ? "de-DE" : "en-US");
  };

  if (!mounted) return null;

  return (
    <Card className="space-y-6">
      {/* Header */}
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">{dictionary.title}</h1>
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
              <SelectItem value="name">
                {dictionary.sortOptions.name}
              </SelectItem>
              <SelectItem value="role">
                {dictionary.sortOptions.role}
              </SelectItem>
              <SelectItem value="companyName">
                {dictionary.sortOptions.companyName}
              </SelectItem>
              <SelectItem value="companyAddress">
                {dictionary.sortOptions.companyAddress}
              </SelectItem>
              <SelectItem value="email">
                {dictionary.sortOptions.email}
              </SelectItem>
              <SelectItem value="registrationDate">
                {dictionary.sortOptions.registrationDate}
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
                  {dictionary.tableHeaders.name}
                  <ChevronsUpDown className="w-4 h-4" />
                </div>
              ),
              cell: (params) => (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <span className="font-medium">{params.row.name}</span>
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
                  {dictionary.tableHeaders.companyName}
                  <ChevronsUpDown className="w-4 h-4" />
                  <Filter className="w-4 h-4" />
                </div>
              ),
              cell: (params) => params.row.companyName,
            },
            {
              label: (
                <div className="flex items-center gap-2">
                  {dictionary.tableHeaders.companyAddress}
                  <ChevronsUpDown className="w-4 h-4" />
                  <Filter className="w-4 h-4" />
                </div>
              ),
              cell: (params) => (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="truncate max-w-48">
                    {params.row.companyAddress}
                  </span>
                </div>
              ),
            },
            {
              label: (
                <div className="flex items-center gap-2">
                  {dictionary.tableHeaders.email}
                  <ChevronsUpDown className="w-4 h-4" />
                  <Filter className="w-4 h-4" />
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
              label: (
                <div className="flex items-center gap-2">
                  {dictionary.tableHeaders.registrationDate}
                  <ChevronsUpDown className="w-4 h-4" />
                  <Filter className="w-4 h-4" />
                </div>
              ),
              cell: (params) => (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  {formatDate(params.row.registrationDate)}
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
              cell: () => (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  title={dictionary.actions.edit}
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
