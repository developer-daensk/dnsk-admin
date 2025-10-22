"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/Components/Shadcn/input";
import { Label } from "@/Components/Shadcn/label";
import { Button } from "@/Components/Shadcn/button";
import { Textarea } from "@/Components/Shadcn/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/Shadcn/select";
import { ContactPersonFormProps, ContactPersonFormData } from "../types";
import { getDictionary } from "../i18n";

export default function ContactPersonForm({
  initialData,
  onSubmit,
  onCancel,
  locale,
}: ContactPersonFormProps) {
  const dictionary = getDictionary(locale);
  const [formData, setFormData] = useState<ContactPersonFormData>({
    companyId: "",
    locationId: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    mobilePhone: "",
    address: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleInputChange = (
    field: keyof ContactPersonFormData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // Mock data for companies and locations
  const mockCompanies = [
    { id: "1", name: "TechCorp GmbH" },
    { id: "2", name: "GreenEnergy Solutions" },
    { id: "3", name: "LogisticsPro GmbH" },
    { id: "4", name: "HealthPlus Medical" },
    { id: "5", name: "FoodTech Innovations" },
  ];

  const mockLocations = [
    { id: "1", name: "Berlin" },
    { id: "2", name: "Hamburg" },
    { id: "3", name: "Munich" },
    { id: "4", name: "Frankfurt" },
    { id: "5", name: "Düsseldorf" },
  ];

  return (
    <div className="p-6 pb-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Company Section */}
        <div className="space-y-2">
          <Label className=" font-medium">{dictionary.form.company}</Label>
          <Select
            value={formData.companyId}
            onValueChange={(value) => handleInputChange("companyId", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={dictionary.form.selectCompany} />
            </SelectTrigger>
            <SelectContent>
              {mockCompanies.map((company) => (
                <SelectItem key={company.id} value={company.id}>
                  {company.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Location Section */}
        <div className="space-y-2">
          <Label className=" font-medium">{dictionary.form.location}</Label>
          <Select
            value={formData.locationId}
            onValueChange={(value) => handleInputChange("locationId", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={dictionary.form.selectLocation} />
            </SelectTrigger>
            <SelectContent>
              {mockLocations.map((location) => (
                <SelectItem key={location.id} value={location.id}>
                  {location.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Contact Person Information Section */}
        <div className="space-y-4">
          <Label className=" font-medium">
            {dictionary.form.contactPersonInformation}
          </Label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>
                {dictionary.form.firstName}{" "}
                <span className="text-red-500">*</span>
              </Label>
              <Input
                placeholder={dictionary.form.enterFirstName}
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>
                {dictionary.form.lastName}{" "}
                <span className="text-red-500">*</span>
              </Label>
              <Input
                placeholder={dictionary.form.enterLastName}
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>
              {dictionary.form.email} <span className="text-red-500">*</span>
            </Label>
            <Input
              type="email"
              placeholder={dictionary.form.enterEmail}
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>
                {dictionary.form.phoneNumber}{" "}
                <span className="text-red-500">*</span>
              </Label>
              <Input
                placeholder={dictionary.form.enterPhone}
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>
                {dictionary.form.mobileNumber}{" "}
                <span className="text-red-500">*</span>
              </Label>
              <Input
                placeholder={dictionary.form.enterMobile}
                value={formData.mobilePhone}
                onChange={(e) =>
                  handleInputChange("mobilePhone", e.target.value)
                }
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>
              {dictionary.form.address} <span className="text-red-500">*</span>
            </Label>
            <Textarea
              placeholder={dictionary.form.enterAddress}
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              className="min-h-[100px]"
              maxLength={200}
              required
            />
            <div className="text-sm text-gray-500 text-right">
              {formData.address.length}/200
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            {dictionary.form.cancel}
          </Button>
          <Button type="submit">{dictionary.form.save}</Button>
        </div>
      </form>
    </div>
  );
}
