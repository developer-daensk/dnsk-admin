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
import { EmployeeFormProps } from "../types";
import { getDictionary } from "../i18n";

export default function EmployeeForm({
  locale,
  isEdit,
  initialData,
  onSubmit,
  onCancel,
}: EmployeeFormProps) {
  const dictionary = getDictionary(locale);
  const [formData, setFormData] = React.useState({
    name: initialData?.name || "",
    position: initialData?.position || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    location: initialData?.location || "",
    department: initialData?.department || "",
    status: initialData?.status || "active",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="flex items-center gap-1">
            {dictionary.form.name}
            <span className="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder={dictionary.form.namePlaceholder}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="position" className="flex items-center gap-1">
            {dictionary.form.position}
            <span className="text-red-500">*</span>
          </Label>
          <Select
            value={formData.position}
            onValueChange={(value) => handleInputChange("position", value)}
            required
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={dictionary.form.positionPlaceholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="manager">
                {dictionary.positions.manager}
              </SelectItem>
              <SelectItem value="developer">
                {dictionary.positions.developer}
              </SelectItem>
              <SelectItem value="analyst">
                {dictionary.positions.analyst}
              </SelectItem>
              <SelectItem value="specialist">
                {dictionary.positions.specialist}
              </SelectItem>
              <SelectItem value="coordinator">
                {dictionary.positions.coordinator}
              </SelectItem>
              <SelectItem value="director">
                {dictionary.positions.director}
              </SelectItem>
              <SelectItem value="assistant">
                {dictionary.positions.assistant}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-1">
            {dictionary.form.email}
            <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            placeholder={dictionary.form.emailPlaceholder}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="flex items-center gap-1">
            {dictionary.form.phone}
            <span className="text-red-500">*</span>
          </Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            placeholder={dictionary.form.phonePlaceholder}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="location" className="flex items-center gap-1">
            {dictionary.form.location}
            <span className="text-red-500">*</span>
          </Label>
          <Select
            value={formData.location}
            onValueChange={(value) => handleInputChange("location", value)}
            required
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={dictionary.form.locationPlaceholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Main Office">Main Office</SelectItem>
              <SelectItem value="Warehouse NYC">Warehouse NYC</SelectItem>
              <SelectItem value="Downtown Store">Downtown Store</SelectItem>
              <SelectItem value="Factory Complex">Factory Complex</SelectItem>
              <SelectItem value="Distribution Center">
                Distribution Center
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="department" className="flex items-center gap-1">
            {dictionary.form.department}
            <span className="text-red-500">*</span>
          </Label>
          <Select
            value={formData.department}
            onValueChange={(value) => handleInputChange("department", value)}
            required
          >
            <SelectTrigger className="w-full">
              <SelectValue
                placeholder={dictionary.form.departmentPlaceholder}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="it">{dictionary.departments.it}</SelectItem>
              <SelectItem value="hr">{dictionary.departments.hr}</SelectItem>
              <SelectItem value="sales">
                {dictionary.departments.sales}
              </SelectItem>
              <SelectItem value="marketing">
                {dictionary.departments.marketing}
              </SelectItem>
              <SelectItem value="finance">
                {dictionary.departments.finance}
              </SelectItem>
              <SelectItem value="operations">
                {dictionary.departments.operations}
              </SelectItem>
              <SelectItem value="engineering">
                {dictionary.departments.engineering}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="status" className="flex items-center gap-1">
          {dictionary.form.status}
          <span className="text-red-500">*</span>
        </Label>
        <Select
          value={formData.status}
          onValueChange={(value) => handleInputChange("status", value)}
          required
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={dictionary.form.statusPlaceholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">{dictionary.status.active}</SelectItem>
            <SelectItem value="inactive">
              {dictionary.status.inactive}
            </SelectItem>
            <SelectItem value="pending">{dictionary.status.pending}</SelectItem>
            <SelectItem value="terminated">
              {dictionary.status.terminated}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          {dictionary.form.cancel}
        </Button>
        <Button type="submit">
          {isEdit ? dictionary.form.save : dictionary.form.add}
        </Button>
      </div>
    </form>
  );
}
