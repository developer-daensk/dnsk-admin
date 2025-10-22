"use client";

import React, { useState } from "react";
import { Button } from "@/Components/Shadcn/button";
import { Input } from "@/Components/Shadcn/input";
import { Label } from "@/Components/Shadcn/label";
import { Textarea } from "@/Components/Shadcn/textarea";
import { Separator } from "@/Components/Shadcn/separator";
import { Plus, Trash2 } from "lucide-react";
import { iLocale } from "@/Components/Entity/Locale/types";
import { getDictionary } from "./i18n";
import { ProductDescriptionFormData, Specification } from "./types";
import { appRoutes } from "@/lib/routes/appRoutes";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

interface iProps {
  locale: iLocale;
}

const ProductDescriptionForm: React.FC<iProps> = ({ locale }) => {
  const dictionary = getDictionary(locale);
  const router = useRouter();
  const params = useParams();
  const id = params?.productId as string;
  // Default German description if none provided
  const defaultDescription = `Europalette 800 x 1200 UIC/EPAL - Gebraucht 1. Wahl

Diese hochwertige Europalette entspricht den internationalen UIC/EPAL Standards und ist ideal für den professionellen Einsatz. Die Palette verfügt über fünf Oberbretter und präzise gefräste Unterbretter für optimale Stabilität und Belastbarkeit.

Grundlegende Produkteigenschaften:
• Klasse: 1. Wahl (sehr guter Zustand)
• Tragfähigkeit: bis zu ca. 1500 kg
• Maße: 1200 x 800 x 144 mm

Diese Europalette wird weltweit im Handel, der Logistik und der Industrie eingesetzt und bietet eine zuverlässige Lösung für den sicheren Transport und die Lagerung von Waren.`;

  // Default specifications if none provided
  const defaultSpecifications: Specification[] = [
    { id: "1", name: "Material", value: "Holz" },
    { id: "2", name: "Entspricht", value: "ISPM15" },
  ];

  // State for form data
  const [mainDescription, setMainDescription] = useState(defaultDescription);
  const [specifications, setSpecifications] = useState<Specification[]>(
    defaultSpecifications.length > 0
      ? defaultSpecifications
      : defaultSpecifications
  );

  // Handle adding new specification
  const handleAddSpecification = () => {
    const newSpecification: Specification = {
      id: Date.now().toString(),
      name: "",
      value: "",
    };
    setSpecifications([...specifications, newSpecification]);
  };

  // Handle removing specification
  const handleRemoveSpecification = (id: string) => {
    if (specifications.length > 1) {
      setSpecifications(specifications.filter((spec) => spec.id !== id));
    } else {
      console.warn(dictionary.specifications.deleteWarning);
    }
  };

  // Handle specification field changes
  const handleSpecificationChange = (
    id: string,
    field: "name" | "value",
    value: string
  ) => {
    setSpecifications(
      specifications.map((spec) =>
        spec.id === id ? { ...spec, [field]: value } : spec
      )
    );
  };

  // Handle save changes
  const handleSave = async () => {
    try {
      // Basic validation
      if (!mainDescription.trim()) {
        console.error("Main description is required");
        return;
      }

      // Validate specifications
      const validSpecifications = specifications.filter(
        (spec) => spec.name.trim() && spec.value.trim()
      );

      if (validSpecifications.length === 0) {
        console.error("At least one specification is required");
        return;
      }

      onSave({
        mainDescription: mainDescription.trim(),
        specifications: validSpecifications,
      });
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };
  const onSave = (saveData: ProductDescriptionFormData) => {
    console.log("saveData", saveData);
    router.push(
      appRoutes.dashboard.product.search.description.root(locale, id)
    );
  };
  const onCancel = () => {
    console.log("onCancel");
    router.push(
      appRoutes.dashboard.product.search.description.root(locale, id)
    );
  };

  return (
    <div className="space-y-8">
      {/* Content and Description Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column - Content */}
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-4">
              {dictionary.content.title}
            </h3>
            <p className="text-base text-foreground leading-relaxed">
              {dictionary.content.subtitle}
            </p>
          </div>

          <div className="space-y-2">
            <ul className="space-y-2 text-sm text-foreground leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-foreground mt-1">•</span>
                <span>{dictionary.content.guidelines.titleWithoutFiller}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground mt-1">•</span>
                <span>{dictionary.content.guidelines.titleWithKeywords}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground mt-1">•</span>
                <span>
                  {dictionary.content.guidelines.imagesWithoutBackground}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground mt-1">•</span>
                <span>{dictionary.content.guidelines.uniqueImages}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column - Description */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">
            {dictionary.description.title}
          </h3>

          <div className="space-y-2">
            <Label htmlFor="mainDescription" className="text-sm font-medium">
              Main Description
            </Label>
            <Textarea
              id="mainDescription"
              value={mainDescription}
              onChange={(e) => setMainDescription(e.target.value)}
              placeholder={dictionary.description.mainPlaceholder}
              className="min-h-[300px] resize-y"
              maxLength={5000}
            />
            <p className="text-xs text-muted-foreground">
              {mainDescription.length} / 5000 characters
            </p>
          </div>
        </div>
      </div>

      <Separator className="my-8" />

      {/* Specifications Section */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-foreground">
          {dictionary.specifications.title}
        </h3>

        <div className="space-y-4">
          {specifications.map((spec) => (
            <div
              key={spec.id}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end"
            >
              <div className="space-y-2">
                <Label
                  htmlFor={`specName_${spec.id}`}
                  className="text-sm font-medium"
                >
                  Name
                </Label>
                <Input
                  id={`specName_${spec.id}`}
                  value={spec.name}
                  onChange={(e) =>
                    handleSpecificationChange(spec.id, "name", e.target.value)
                  }
                  placeholder={dictionary.specifications.namePlaceholder}
                  maxLength={20}
                />
                <p className="text-xs text-muted-foreground">
                  {spec.name.length} / 20 characters
                </p>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor={`specValue_${spec.id}`}
                  className="text-sm font-medium"
                >
                  Value
                </Label>
                <div className="flex gap-2">
                  <Input
                    id={`specValue_${spec.id}`}
                    value={spec.value}
                    onChange={(e) =>
                      handleSpecificationChange(
                        spec.id,
                        "value",
                        e.target.value
                      )
                    }
                    placeholder={dictionary.specifications.valuePlaceholder}
                    maxLength={20}
                    className="flex-1"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveSpecification(spec.id)}
                    disabled={specifications.length === 1}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  {spec.value.length} / 20 characters
                </p>
              </div>
            </div>
          ))}
        </div>

        <Button
          variant="link"
          onClick={handleAddSpecification}
          className="text-primary hover:text-primary/90 p-0 h-auto text-sm"
        >
          <Plus className="h-4 w-4 mr-2" />
          {dictionary.specifications.addMore}
        </Button>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 pt-8 border-t border-border">
        <Button variant="outline" onClick={onCancel}>
          {dictionary.actions.cancel}
        </Button>
        <Button
          onClick={handleSave}
          className="bg-primary hover:bg-primary/90 text-white"
        >
          {dictionary.actions.save}
        </Button>
      </div>
    </div>
  );
};

export default ProductDescriptionForm;
