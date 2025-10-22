"use client";
import React, { useState } from "react";
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
import { Badge } from "@/Components/Shadcn/badge";
import { Plus, X } from "lucide-react";
import { iLocale } from "@/Components/Entity/Locale/types";
import { getDictionary } from "./i18n";
// import { appRoutes } from "@/lib/routes/appRoutes";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import FileUploader from "@/Components/Entity/FileUploader/FileUploader";
import { iMedia } from "@/Components/Entity/FileUploader/types";
import { appRoutes } from "@/lib/routes/appRoutes";

interface Specification {
  id: string;
  name: string;
  value: string;
}

interface Identification {
  id: string;
  value: string;
}

interface iProps {
  locale: iLocale;
}

const ProductVariantsInformation: React.FC<iProps> = ({ locale }) => {
  const dictionary = getDictionary(locale);
  const router = useRouter();
  const params = useParams();
  const variantId = params?.id as string;
  const productId = params?.productId as string;

  // Form state
  const [formData, setFormData] = useState({
    idin: "1984848479684",
    variantDescription:
      "Europalette 800 x 1200 UIC/EPAL | Gebraucht 1. Wahl\nGebrauchte zertifizierte EUR/UIC-Palette der Klasse I, Abmessungen 1200 x 800 x 144 mm",
    condition: "used",
  });

  const [fileList, setFileList] = useState<iMedia[]>([]);
  const [specifications, setSpecifications] = useState<Specification[]>([
    { id: "1", name: "Material", value: "Holz" },
    { id: "2", name: "Entspricht", value: "ISPM15" },
  ]);
  const [identifications, setIdentifications] = useState<Identification[]>([
    { id: "1", value: "4004950900249" },
  ]);
  const [tags, setTags] = useState<string[]>([
    "Paletten",
    "Ladungsträger",
    "EPAL zertifiziert",
    "ISPM zertifiziert",
  ]);
  const [newTag, setNewTag] = useState<string>("Europalette");

  const handleAddSpecification = () => {
    const newSpec: Specification = {
      id: Date.now().toString(),
      name: "",
      value: "",
    };
    setSpecifications([...specifications, newSpec]);
  };

  const handleRemoveSpecification = (id: string) => {
    setSpecifications(specifications.filter((spec) => spec.id !== id));
  };

  const handleSpecificationChange = (
    id: string,
    field: "name" | "value",
    value: string
  ) => {
    setSpecifications((specs) =>
      specs.map((spec) => (spec.id === id ? { ...spec, [field]: value } : spec))
    );
  };

  const handleAddIdentification = () => {
    const newId: Identification = {
      id: Date.now().toString(),
      value: "",
    };
    setIdentifications([...identifications, newId]);
  };

  const handleIdentificationChange = (id: string, value: string) => {
    setIdentifications((idents) =>
      idents.map((ident) => (ident.id === id ? { ...ident, value } : ident))
    );
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = () => {
    console.log("Form values:", {
      ...formData,
      specifications,
      identifications,
      tags,
      fileList,
      variantId,
    });
    // Navigate to specifications page
    router.push(
      appRoutes.dashboard.product.search.specifications(locale, productId)
    );
  };

  return (
    <div className="w-full mx-auto p-6">
      <div className="p-6">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-foreground mb-2">
            {dictionary.title}
          </h3>
          <p className="text-sm text-muted-foreground">{dictionary.subtitle}</p>
        </div>

        <div className="space-y-8">
          {/* IDIN Section */}
          <div className="space-y-4">
            <div>
              <Label
                htmlFor="idin"
                className="text-sm font-medium text-foreground"
              >
                {dictionary.idin.label}
              </Label>
              <Input
                id="idin"
                value={formData.idin}
                onChange={(e) =>
                  setFormData({ ...formData, idin: e.target.value })
                }
                maxLength={24}
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {formData.idin.length}/24 characters
              </p>
            </div>
            <div className="text-sm text-destructive">
              {dictionary.idin.existsMessage}
            </div>
          </div>

          {/* Variant Description Section */}
          <div className="space-y-4">
            <div>
              <Label
                htmlFor="variantDescription"
                className="text-sm font-medium text-foreground"
              >
                {dictionary.variantDescription.label}
              </Label>
              <Textarea
                id="variantDescription"
                value={formData.variantDescription}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    variantDescription: e.target.value,
                  })
                }
                placeholder={dictionary.variantDescription.placeholder}
                maxLength={2000}
                rows={4}
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {formData.variantDescription.length}/2000 characters
              </p>
            </div>
          </div>

          {/* Media Section */}
          <div className="space-y-4">
            <Label className="text-sm font-medium text-foreground">
              {dictionary.media.label}
            </Label>
            <FileUploader
              image={fileList.length > 0 ? fileList[0].absoluteUri : undefined}
              onChange={async (image_data) => {
                setFileList([image_data]);
                return true;
              }}
              onRemove={async () => {
                setFileList([]);
                return true;
              }}
            />
          </div>

          {/* Condition Section */}
          <div className="space-y-4">
            <div>
              <Label
                htmlFor="condition"
                className="text-sm font-medium text-foreground"
              >
                {dictionary.condition.label}
              </Label>
              <Select
                value={formData.condition}
                onValueChange={(value) =>
                  setFormData({ ...formData, condition: value })
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder={dictionary.condition.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">
                    {dictionary.condition.options.new}
                  </SelectItem>
                  <SelectItem value="refurbished">
                    {dictionary.condition.options.refurbished}
                  </SelectItem>
                  <SelectItem value="used">
                    {dictionary.condition.options.used}
                  </SelectItem>
                  <SelectItem value="damaged">
                    {dictionary.condition.options.damaged}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Specifications Section */}
          <div className="space-y-4">
            <Label className="text-sm font-medium text-foreground">
              {dictionary.specifications.label}
            </Label>

            {/* Column Headers */}
            <div className="grid grid-cols-12 gap-4 mb-3">
              <div className="col-span-5">
                <span className="text-xs text-muted-foreground">
                  {dictionary.specifications.nameLabel}
                </span>
              </div>
              <div className="col-span-5">
                <span className="text-xs text-muted-foreground">
                  {dictionary.specifications.valueLabel}
                </span>
              </div>
              <div className="col-span-2"></div>
            </div>

            {/* Specification Rows */}
            <div className="space-y-4">
              {specifications.map((spec) => (
                <div
                  key={spec.id}
                  className="grid grid-cols-12 gap-4 items-center"
                >
                  <div className="col-span-5">
                    <Input
                      value={spec.name}
                      onChange={(e) =>
                        handleSpecificationChange(
                          spec.id,
                          "name",
                          e.target.value
                        )
                      }
                      maxLength={20}
                      className="h-10"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {spec.name.length}/20 characters
                    </p>
                  </div>
                  <div className="col-span-5">
                    <Input
                      value={spec.value}
                      onChange={(e) =>
                        handleSpecificationChange(
                          spec.id,
                          "value",
                          e.target.value
                        )
                      }
                      maxLength={20}
                      className="h-10"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {spec.value.length}/20 characters
                    </p>
                  </div>
                  <div className="col-span-2 flex justify-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveSpecification(spec.id)}
                      className="w-8 h-8 rounded-full bg-muted hover:bg-muted/80 text-muted-foreground"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <Button
              variant="link"
              onClick={handleAddSpecification}
              className="text-primary hover:text-primary/80 font-medium p-0 h-auto"
            >
              <Plus className="h-4 w-4 mr-2" />
              {dictionary.specifications.addMore}
            </Button>
          </div>

          {/* Identification Section */}
          <div className="space-y-4">
            <Label className="text-sm font-medium text-foreground">
              {dictionary.identification.label}
            </Label>

            <div className="space-y-4">
              {identifications.map((ident) => (
                <div key={ident.id} className="space-y-3">
                  <Input
                    value={ident.value}
                    onChange={(e) =>
                      handleIdentificationChange(ident.id, e.target.value)
                    }
                    maxLength={24}
                    className="h-10"
                  />
                  <p className="text-xs text-muted-foreground">
                    {ident.value.length}/24 characters
                  </p>
                </div>
              ))}
            </div>

            <Button
              variant="link"
              onClick={handleAddIdentification}
              className="text-primary hover:text-primary/80 p-0 h-auto"
            >
              <Plus className="h-4 w-4 mr-2" />
              {dictionary.identification.addMore}
            </Button>
          </div>

          {/* Tags Section */}
          <div className="space-y-4">
            <Label className="text-sm font-medium text-foreground">
              {dictionary.tags.label}
            </Label>

            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="rounded-full px-3 py-1 bg-muted border-border text-foreground group hover:bg-muted/80"
                  >
                    <span className="mr-2">{tag}</span>
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  {dictionary.tags.addTag}
                </p>
                <div className="flex gap-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    maxLength={40}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleAddTag();
                      }
                    }}
                    className="flex-1"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  {newTag.length}/40 characters
                </p>
              </div>
              <Button
                variant="link"
                onClick={handleAddTag}
                className="text-primary hover:text-primary/80 p-0 h-auto"
              >
                <Plus className="h-4 w-4 mr-2" />
                {dictionary.tags.addButton}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <div className="flex justify-end mt-8">
        <Button onClick={handleSubmit} className="px-8">
          {dictionary.button.next}
        </Button>
      </div>
    </div>
  );
};

export default ProductVariantsInformation;
