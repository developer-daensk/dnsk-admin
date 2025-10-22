"use client";

import React, { useState, useMemo } from "react";
import { Button } from "@/Components/Shadcn/button";
import { Input } from "@/Components/Shadcn/input";
import { Badge } from "@/Components/Shadcn/badge";
import { Separator } from "@/Components/Shadcn/separator";
import { X, Trash2 } from "lucide-react";
import { iLocale } from "@/Components/Entity/Locale/types";
import { getDictionary } from "./i18n";
import { appRoutes } from "@/lib/routes/appRoutes";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useProductStore } from "@/store/productStore";
import { ProductVariant } from "@/types/product.types";
import { PRODUCT_VARIANT_STATUS } from "@/lib/constants/product";

interface iProps {
  locale: iLocale;
}

const ProductVariantsForm: React.FC<iProps> = ({ locale }) => {
  const dictionary = getDictionary(locale);
  const router = useRouter();
  const params = useParams();
  const id = params?.productId as string;

  // Zustand store
  const { addProductVariant, clearProductVariants } = useProductStore();

  // Local inputs and tag lists
  const [attributeInput, setAttributeInput] = useState<string>("");
  const [optionInput, setOptionInput] = useState<string>("");
  const [attributeTags, setAttributeTags] = useState<string[]>([]);
  const [optionTags, setOptionTags] = useState<string[]>([]);
  const [excludedVariations, setExcludedVariations] = useState<Set<string>>(
    new Set()
  );

  const onCancel = () => {
    console.log("onCancel");
    router.push(appRoutes.dashboard.product.search.variants.root(locale, id));
  };

  const variations = useMemo(() => {
    const rows: { id: string; attribute: string; option: string }[] = [];
    attributeTags.forEach((attr) => {
      optionTags.forEach((opt) => {
        rows.push({ id: `${attr}||${opt}`, attribute: attr, option: opt });
      });
    });
    return rows.filter((v) => !excludedVariations.has(v.id));
  }, [attributeTags, optionTags, excludedVariations]);

  const addTag = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    setter((prev) => (prev.includes(trimmed) ? prev : [...prev, trimmed]));
  };

  const removeTag = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter((prev) => prev.filter((tag) => tag !== value));
  };

  const handleSave = () => {
    // Clear existing variants
    clearProductVariants();

    // Add new variants to store
    variations.forEach((v) => {
      const newVariant: ProductVariant = {
        id: v.id,
        attribute: v.attribute,
        option: v.option,
        baseDataStatus: PRODUCT_VARIANT_STATUS.OPEN,
        specificationsStatus: PRODUCT_VARIANT_STATUS.OPEN,
        listingsStatus: PRODUCT_VARIANT_STATUS.OPEN,
      };
      addProductVariant(newVariant);
    });

    console.log("Variants saved to store:", variations);
    router.push(appRoutes.dashboard.product.search.variants.edit.list(locale, id));
  };

  const deleteVariation = (id: string) => {
    setExcludedVariations((prev) => new Set([...prev, id]));
  };

  return (
    <div className="space-y-8">
      <div className=" p-6">
        <div className="space-y-8">
          {/* Header */}
          <h3 className="text-xl font-semibold text-foreground">
            {dictionary.title}
          </h3>

          {/* Attribute Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-foreground">
              {dictionary.attribute.title}
            </h4>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Input
                  value={attributeInput}
                  onChange={(e) => setAttributeInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      addTag(attributeInput, setAttributeTags);
                      setAttributeInput("");
                    }
                  }}
                  placeholder={dictionary.attribute.placeholder}
                  maxLength={parseInt(dictionary.attribute.maxLength)}
                />
                <div className="flex justify-between  text-muted-foreground">
                  <span>{dictionary.attribute.example}</span>
                  <span>
                    {attributeInput.length}/
                    {parseInt(dictionary.attribute.maxLength)}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {attributeTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-sm h-10 px-3 bg-muted text-muted-foreground border border-border group hover:bg-muted/80 flex items-center"
                  >
                    <span className="mr-2">{tag}</span>
                    <button
                      onClick={() => removeTag(tag, setAttributeTags)}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <Separator />

          {/* Option Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-foreground">
              {dictionary.option.title}
            </h4>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Input
                  value={optionInput}
                  onChange={(e) => setOptionInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      addTag(optionInput, setOptionTags);
                      setOptionInput("");
                    }
                  }}
                  placeholder={dictionary.option.placeholder}
                  maxLength={parseInt(dictionary.option.maxLength)}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{dictionary.option.example}</span>
                  <span>
                    {optionInput.length}/{dictionary.option.maxLength}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {optionTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-sm h-10 px-3 bg-muted text-muted-foreground border border-border group hover:bg-muted/80 flex items-center"
                  >
                    <span className="mr-2">{tag}</span>
                    <button
                      onClick={() => removeTag(tag, setOptionTags)}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Variants Table */}
          {variations.length > 0 && (
            <div className="space-y-4">
              <div className="grid grid-cols-12 gap-4 py-3 px-4 bg-muted/30 rounded-lg font-medium text-sm text-foreground">
                <div className="col-span-5">{dictionary.table.attribute}</div>
                <div className="col-span-5">{dictionary.table.option}</div>
                <div className="col-span-2">{dictionary.table.action}</div>
              </div>
              <div className="space-y-2">
                {variations.map((v) => (
                  <div
                    key={v.id}
                    className="grid grid-cols-12 gap-4 py-3 px-4 border border-border rounded-lg items-center"
                  >
                    <div className="col-span-5">
                      <Badge
                        variant="secondary"
                        className="text-sm h-10 px-3 bg-muted text-muted-foreground border border-border flex items-center"
                      >
                        {v.attribute}
                      </Badge>
                    </div>
                    <div className="col-span-5">
                      <Badge
                        variant="secondary"
                        className="text-sm h-10 px-3 bg-muted text-muted-foreground border border-border flex items-center"
                      >
                        {v.option}
                      </Badge>
                    </div>
                    <div className="col-span-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteVariation(v.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={onCancel}>
          {dictionary.actions.cancel}
        </Button>
        <Button onClick={handleSave}>{dictionary.actions.save}</Button>
      </div>
    </div>
  );
};

export default ProductVariantsForm;
