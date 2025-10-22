"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/Components/Shadcn/input";
import { Label } from "@/Components/Shadcn/label";
import { Button } from "@/Components/Shadcn/button";
import { Textarea } from "@/Components/Shadcn/textarea";
import { AttributeFormProps, AttributeFormData } from "../types";
import { getDictionary } from "../i18n";

export default function AttributeForm({
  initialData,
  onSubmit,
  onCancel,
  locale,
}: AttributeFormProps) {
  const dictionary = getDictionary(locale);
  const [formData, setFormData] = useState<AttributeFormData>({
    name: "",
    description: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleInputChange = (field: keyof AttributeFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="p-6 pb-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Attribute Name Field */}
        <div className="space-y-2">
          <Label className="font-medium">{dictionary.form.attributeName}</Label>
          <Input
            placeholder={dictionary.form.enterAttributeName}
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            required
            className="w-full"
          />
        </div>

        {/* Attribute Description Field */}
        <div className="space-y-2">
          <Label className="font-medium">
            {dictionary.form.attributeDescription}
          </Label>
          <Textarea
            placeholder={dictionary.form.enterAttributeDescription}
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            className="min-h-[100px] w-full resize-none"
          />
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
