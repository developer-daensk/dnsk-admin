"use client";

import React from "react";
import { Button } from "@/Components/Shadcn/button";
import { Input } from "@/Components/Shadcn/input";
import { Label } from "@/Components/Shadcn/label";
import { Textarea } from "@/Components/Shadcn/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/Shadcn/select";
import { LocationFormProps } from "../types";
import { getDictionary } from "../i18n";

export default function LocationForm({
  locale,
  isEdit,
  initialData,
  onSubmit,
  onCancel,
}: LocationFormProps) {
  const dictionary = getDictionary(locale);
  const [formData, setFormData] = React.useState({
    name: initialData?.name || "",
    address: initialData?.address || "",
    type: initialData?.type || "",
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
        <Label htmlFor="address" className="flex items-center gap-1">
          {dictionary.form.address}
          <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="address"
          value={formData.address}
          onChange={(e) => handleInputChange("address", e.target.value)}
          placeholder={dictionary.form.addressPlaceholder}
          required
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="type" className="flex items-center gap-1">
          {dictionary.form.type}
          <span className="text-red-500">*</span>
        </Label>
        <Select
          value={formData.type}
          onValueChange={(value) => handleInputChange("type", value)}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder={dictionary.form.typePlaceholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="office">{dictionary.types.office}</SelectItem>
            <SelectItem value="warehouse">
              {dictionary.types.warehouse}
            </SelectItem>
            <SelectItem value="store">{dictionary.types.store}</SelectItem>
            <SelectItem value="factory">{dictionary.types.factory}</SelectItem>
            <SelectItem value="distribution">
              {dictionary.types.distribution}
            </SelectItem>
          </SelectContent>
        </Select>
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
          <SelectTrigger>
            <SelectValue placeholder={dictionary.form.statusPlaceholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">{dictionary.status.active}</SelectItem>
            <SelectItem value="inactive">
              {dictionary.status.inactive}
            </SelectItem>
            <SelectItem value="pending">{dictionary.status.pending}</SelectItem>
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
