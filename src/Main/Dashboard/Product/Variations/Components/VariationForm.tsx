"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/Components/Shadcn/input";
import { Label } from "@/Components/Shadcn/label";
import { Button } from "@/Components/Shadcn/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/Shadcn/select";
import { Trash2, Plus } from "lucide-react";
import { VariationFormProps, VariationFormData, VariationItem } from "../types";
import { getDictionary } from "../i18n";

export default function VariationForm({
  initialData,
  onSubmit,
  onCancel,
  locale,
}: VariationFormProps) {
  const dictionary = getDictionary(locale);
  const [formData, setFormData] = useState<VariationFormData>({
    name: "",
    type: "",
    uiType: "",
    items: [],
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleInputChange = (field: keyof VariationFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleItemChange = (
    index: number,
    field: keyof VariationItem,
    value: string
  ) => {
    const newItems = [...formData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setFormData((prev) => ({ ...prev, items: newItems }));
  };

  const addItem = () => {
    const newItem: VariationItem = {
      id: Date.now().toString(),
      name: "",
      value: "",
    };
    setFormData((prev) => ({ ...prev, items: [...prev.items, newItem] }));
  };

  const removeItem = (index: number) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, items: newItems }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // Mock UI type options
  const uiTypeOptions = [
    { value: "dropdown", label: "Dropdown" },
    { value: "radio", label: "Radio Buttons" },
    { value: "checkbox", label: "Checkboxes" },
    { value: "text", label: "Text Input" },
    { value: "color", label: "Color Picker" },
  ];

  return (
    <div className="p-6 pb-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Variation Name Field */}
        <div className="space-y-2">
          <Label className="font-medium">{dictionary.form.variationName}</Label>
          <Input
            placeholder={dictionary.form.enterVariationName}
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            required
            className="w-full"
          />
        </div>

        {/* Type Field */}
        <div className="space-y-2">
          <Label className="font-medium">{dictionary.form.type}</Label>
          <Input
            placeholder={dictionary.form.enterType}
            value={formData.type}
            onChange={(e) => handleInputChange("type", e.target.value)}
            required
            className="w-full"
          />
        </div>

        {/* UI Type Field */}
        <div className="space-y-2">
          <Label className="font-medium">{dictionary.form.uiType}</Label>
          <Select
            value={formData.uiType}
            onValueChange={(value) => handleInputChange("uiType", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={dictionary.form.enterUiType} />
            </SelectTrigger>
            <SelectContent>
              {uiTypeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Items Section */}
        <div className="space-y-4">
          <Label className="font-medium">{dictionary.form.items}</Label>

          {/* Existing Items */}
          {formData.items.map((item, index) => (
            <div key={item.id} className="flex gap-3 items-start">
              <div className="flex-1">
                <Input
                  placeholder={dictionary.form.itemName}
                  value={item.name}
                  onChange={(e) =>
                    handleItemChange(index, "name", e.target.value)
                  }
                  className="w-full"
                />
              </div>
              <div className="flex-1">
                <Input
                  placeholder={dictionary.form.itemValue}
                  value={item.value}
                  onChange={(e) =>
                    handleItemChange(index, "value", e.target.value)
                  }
                  className="w-full"
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-10 w-10 p-0 text-red-600 hover:text-red-700"
                onClick={() => removeItem(index)}
                title="Remove item"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}

          {/* Add Item Button */}
          <Button
            type="button"
            variant="outline"
            className="w-full border-dashed border-2 border-gray-300 hover:border-gray-400"
            onClick={addItem}
          >
            <Plus className="w-4 h-4 mr-2" />
            {dictionary.form.addItem}
          </Button>
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
