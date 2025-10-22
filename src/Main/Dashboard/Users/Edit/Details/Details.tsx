"use client";

import React from "react";
import { Button } from "@/Components/Shadcn/button";
import { Input } from "@/Components/Shadcn/input";
import { Label } from "@/Components/Shadcn/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/Shadcn/select";
import { Textarea } from "@/Components/Shadcn/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/Components/Shadcn/card";
import { getDictionary } from "./i18n";
import { DetailsProps, UserDetailsFormData } from "./types";
import { X, Save } from "lucide-react";

export default function Details({ locale }: DetailsProps) {
  const dictionary = getDictionary(locale);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const [formData, setFormData] = React.useState<UserDetailsFormData>({
    firstName: "John Doe",
    profileName: "john_admin",
    role: "Admin",
    email: "john.doe@example.com",
    phone: "+1 234 567 8900",
    department: "IT",
    location: "New York",
    companyName: "",
    companyId: "",
    companyPhone: "",
    companyFax: "",
    companyEmail: "",
    address: "",
  });

  const handleInputChange = (
    field: keyof UserDetailsFormData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
  };

  const handleCancel = () => {
    // Handle cancel logic here
    console.log("Form cancelled");
  };

  if (!mounted) return null;

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* User Details Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              {dictionary.details.userDetails.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="flex items-center gap-1">
                  {dictionary.details.userDetails.firstName}
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  placeholder={
                    dictionary.details.userDetails.firstNamePlaceholder
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="profileName"
                  className="flex items-center gap-1"
                >
                  {dictionary.details.userDetails.profileName}
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="profileName"
                  value={formData.profileName}
                  onChange={(e) =>
                    handleInputChange("profileName", e.target.value)
                  }
                  placeholder={
                    dictionary.details.userDetails.profileNamePlaceholder
                  }
                  required
                />
              </div>

              <div className="space-y-2 w-full">
                <Label htmlFor="role" className="flex items-center gap-1">
                  {dictionary.details.userDetails.role}
                  <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.role}
                  onValueChange={(value: string) =>
                    handleInputChange("role", value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder={
                        dictionary.details.userDetails.rolePlaceholder
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">
                      {dictionary.details.userDetails.roles.admin}
                    </SelectItem>
                    <SelectItem value="Manager">
                      {dictionary.details.userDetails.roles.manager}
                    </SelectItem>
                    <SelectItem value="Employee">
                      {dictionary.details.userDetails.roles.employee}
                    </SelectItem>
                    <SelectItem value="Customer">
                      {dictionary.details.userDetails.roles.customer}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-1">
                  {dictionary.details.userDetails.email}
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder={dictionary.details.userDetails.emailPlaceholder}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-1">
                  {dictionary.details.userDetails.phone}
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder={dictionary.details.userDetails.phonePlaceholder}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="department" className="flex items-center gap-1">
                  {dictionary.details.userDetails.department}
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="department"
                  value={formData.department}
                  onChange={(e) =>
                    handleInputChange("department", e.target.value)
                  }
                  placeholder={
                    dictionary.details.userDetails.departmentPlaceholder
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="flex items-center gap-1">
                  {dictionary.details.userDetails.location}
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                  placeholder={
                    dictionary.details.userDetails.locationPlaceholder
                  }
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Company Data Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              {dictionary.details.companyData.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="companyName"
                  className="flex items-center gap-1"
                >
                  {dictionary.details.companyData.companyName}
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) =>
                    handleInputChange("companyName", e.target.value)
                  }
                  placeholder={
                    dictionary.details.companyData.companyNamePlaceholder
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyId" className="flex items-center gap-1">
                  {dictionary.details.companyData.companyId}
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="companyId"
                  value={formData.companyId}
                  onChange={(e) =>
                    handleInputChange("companyId", e.target.value)
                  }
                  placeholder={
                    dictionary.details.companyData.companyIdPlaceholder
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="companyPhone"
                  className="flex items-center gap-1"
                >
                  {dictionary.details.companyData.companyPhone}
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="companyPhone"
                  value={formData.companyPhone}
                  onChange={(e) =>
                    handleInputChange("companyPhone", e.target.value)
                  }
                  placeholder={
                    dictionary.details.companyData.companyPhonePlaceholder
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyFax">
                  {dictionary.details.companyData.companyFax}
                </Label>
                <Input
                  id="companyFax"
                  value={formData.companyFax}
                  onChange={(e) =>
                    handleInputChange("companyFax", e.target.value)
                  }
                  placeholder={
                    dictionary.details.companyData.companyFaxPlaceholder
                  }
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="companyEmail"
                  className="flex items-center gap-1"
                >
                  {dictionary.details.companyData.companyEmail}
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="companyEmail"
                  type="email"
                  value={formData.companyEmail}
                  onChange={(e) =>
                    handleInputChange("companyEmail", e.target.value)
                  }
                  placeholder={
                    dictionary.details.companyData.companyEmailPlaceholder
                  }
                  required
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address" className="flex items-center gap-1">
                  {dictionary.details.companyData.address}
                  <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder={
                    dictionary.details.companyData.addressPlaceholder
                  }
                  rows={3}
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            className="min-w-[100px]"
          >
            <X className="h-4 w-4 mr-2" />
            {dictionary.details.actions.cancel}
          </Button>
          <Button
            type="submit"
            className="min-w-[100px] bg-blue-600 hover:bg-blue-700"
          >
            <Save className="h-4 w-4 mr-2" />
            {dictionary.details.actions.save}
          </Button>
        </div>
      </form>
    </div>
  );
}
