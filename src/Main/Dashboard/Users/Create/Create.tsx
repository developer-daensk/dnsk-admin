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
import { Separator } from "@/Components/Shadcn/separator";
import { useRouter } from "next/navigation";
import { appRoutes } from "@/lib/routes/appRoutes";
import { getDictionary } from "./i18n";
import { CreateUserProps, CreateUserFormData } from "./types";

export default function CreateUser({ locale }: CreateUserProps) {
  const dictionary = getDictionary(locale);
  const router = useRouter();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const [formData, setFormData] = React.useState<CreateUserFormData>({
    firstName: "",
    profileName: "",
    role: "",
    email: "",
    phone: "",
    department: "",
    location: "",
    companyName: "",
    companyId: "",
    companyPhone: "",
    companyFax: "",
    companyEmail: "",
    address: "",
  });

  const handleInputChange = (
    field: keyof CreateUserFormData,
    value: string
  ) => {
    setFormData((prev: CreateUserFormData) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
  };

  const handleReset = () => {
    setFormData({
      firstName: "",
      profileName: "",
      role: "",
      email: "",
      phone: "",
      department: "",
      location: "",
      companyName: "",
      companyId: "",
      companyPhone: "",
      companyFax: "",
      companyEmail: "",
      address: "",
    });
  };

  const handleCancel = () => {
    router.push(appRoutes.dashboard.userManagement.users.root(locale));
  };

  if (!mounted) return null;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{dictionary.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* User Details Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold">
                {dictionary.userDetails}
              </h3>
              <Separator className="flex-1" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="flex items-center gap-1">
                  {dictionary.firstName}
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  placeholder={dictionary.firstNamePlaceholder}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="profileName"
                  className="flex items-center gap-1"
                >
                  {dictionary.profileName}
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="profileName"
                  value={formData.profileName}
                  onChange={(e) =>
                    handleInputChange("profileName", e.target.value)
                  }
                  placeholder={dictionary.profileNamePlaceholder}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role" className="flex items-center gap-1">
                  {dictionary.role}
                  <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.role}
                  onValueChange={(value: string) =>
                    handleInputChange("role", value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={dictionary.rolePlaceholder} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">
                      {dictionary.roles.admin}
                    </SelectItem>
                    <SelectItem value="manager">
                      {dictionary.roles.manager}
                    </SelectItem>
                    <SelectItem value="employee">
                      {dictionary.roles.employee}
                    </SelectItem>
                    <SelectItem value="customer">
                      {dictionary.roles.customer}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-1">
                  Email
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter email address"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-1">
                  Phone
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="Enter phone number"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="department" className="flex items-center gap-1">
                  Department
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="department"
                  value={formData.department}
                  onChange={(e) =>
                    handleInputChange("department", e.target.value)
                  }
                  placeholder="Enter department"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="flex items-center gap-1">
                  Location
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                  placeholder="Enter location"
                  required
                />
              </div>
            </div>
          </div>

          {/* Company Data Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold">
                {dictionary.companyData}
              </h3>
              <Separator className="flex-1" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="companyName"
                  className="flex items-center gap-1"
                >
                  Company Name
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) =>
                    handleInputChange("companyName", e.target.value)
                  }
                  placeholder="Enter company name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyId" className="flex items-center gap-1">
                  Company ID
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="companyId"
                  value={formData.companyId}
                  onChange={(e) =>
                    handleInputChange("companyId", e.target.value)
                  }
                  placeholder="Enter company ID"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="companyPhone"
                  className="flex items-center gap-1"
                >
                  Company Phone
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="companyPhone"
                  value={formData.companyPhone}
                  onChange={(e) =>
                    handleInputChange("companyPhone", e.target.value)
                  }
                  placeholder="Enter company phone number"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyFax">Company Fax</Label>
                <Input
                  id="companyFax"
                  value={formData.companyFax}
                  onChange={(e) =>
                    handleInputChange("companyFax", e.target.value)
                  }
                  placeholder="Enter company fax number"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="companyEmail"
                  className="flex items-center gap-1"
                >
                  Company Email
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="companyEmail"
                  type="email"
                  value={formData.companyEmail}
                  onChange={(e) =>
                    handleInputChange("companyEmail", e.target.value)
                  }
                  placeholder="Enter company email"
                  required
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address" className="flex items-center gap-1">
                  Address
                  <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Enter company address"
                  rows={3}
                  required
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="min-w-[100px]"
            >
              {dictionary.cancel}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              className="min-w-[100px]"
            >
              {dictionary.reset}
            </Button>
            <Button
              type="submit"
              className="min-w-[120px] bg-blue-600 hover:bg-blue-700"
            >
              {dictionary.createUser}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
