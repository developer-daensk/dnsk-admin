"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/Components/Shadcn/input";
import { Label } from "@/Components/Shadcn/label";
import { Button } from "@/Components/Shadcn/button";
import { Textarea } from "@/Components/Shadcn/textarea";
import { TagFormProps, TagFormData } from "../types";
import { getDictionary } from "../i18n";

export default function TagForm({
  initialData,
  onSubmit,
  onCancel,
  locale,
}: TagFormProps) {
  const dictionary = getDictionary(locale);
  const [formData, setFormData] = useState<TagFormData>({
    name: "",
    description: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleInputChange = (field: keyof TagFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="p-6 pb-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Tag Name Field */}
        <div className="space-y-2">
          <Label className="font-medium">{dictionary.form.tagName}</Label>
          <Input
            placeholder={dictionary.form.enterTagName}
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            required
            className="w-full"
          />
        </div>

        {/* Tag Description Field */}
        <div className="space-y-2">
          <Label className="font-medium">
            {dictionary.form.tagDescription}
          </Label>
          <Textarea
            placeholder={dictionary.form.enterTagDescription}
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
          <Button type="submit">{dictionary.form.ok}</Button>
        </div>
      </form>
    </div>
  );
}
