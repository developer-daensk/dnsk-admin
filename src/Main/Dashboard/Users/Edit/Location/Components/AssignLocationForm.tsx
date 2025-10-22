"use client";

import React from "react";
import { Button } from "@/Components/Shadcn/button";
import { Label } from "@/Components/Shadcn/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/Shadcn/select";
import { AssignLocationFormProps } from "../types";
import { getDictionary } from "../i18n";

export default function AssignLocationForm({
  locale,
  locations,
  onSubmit,
  onCancel,
}: AssignLocationFormProps) {
  const dictionary = getDictionary(locale);
  const [formData, setFormData] = React.useState({
    locationId: "",
    assignmentType: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.locationId && formData.assignmentType) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="locationId" className="flex items-center gap-1">
          {dictionary.assignForm.location}
          <span className="text-red-500">*</span>
        </Label>
        <Select
          value={formData.locationId}
          onValueChange={(value) => handleInputChange("locationId", value)}
          required
        >
          <SelectTrigger>
            <SelectValue
              placeholder={dictionary.assignForm.locationPlaceholder}
            />
          </SelectTrigger>
          <SelectContent>
            {locations.map((location) => (
              <SelectItem key={location.id} value={location.id}>
                {location.name} - {location.locationId}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="assignmentType" className="flex items-center gap-1">
          {dictionary.assignForm.assignmentType}
          <span className="text-red-500">*</span>
        </Label>
        <Select
          value={formData.assignmentType}
          onValueChange={(value) => handleInputChange("assignmentType", value)}
          required
        >
          <SelectTrigger>
            <SelectValue
              placeholder={dictionary.assignForm.assignmentTypePlaceholder}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="primary">Primary</SelectItem>
            <SelectItem value="secondary">Secondary</SelectItem>
            <SelectItem value="temporary">Temporary</SelectItem>
            <SelectItem value="visitor">Visitor</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          {dictionary.form.cancel}
        </Button>
        <Button type="submit">{dictionary.assignForm.assign}</Button>
      </div>
    </form>
  );
}
