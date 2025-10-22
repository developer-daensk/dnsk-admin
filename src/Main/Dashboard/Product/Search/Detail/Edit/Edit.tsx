"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
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
import { useParams, useRouter } from "next/navigation";
import FileUploader from "@/Components/Entity/FileUploader/FileUploader";
import { iMedia } from "@/Components/Entity/FileUploader/types";
import { getDictionary } from "./i18n";
import { IdentificationItem, ProductFormData } from "./types";
import { appRoutes } from "@/lib/routes/appRoutes";
import { iLocale } from "@/Components/Entity/Locale/types";
interface iProps {
  locale: iLocale;
  initialValues?: ProductFormData;
  isEditMode?: boolean;
}

const ProductForm: React.FC<iProps> = ({
  locale,
  initialValues,
  isEditMode = true,
}) => {
  const router = useRouter();
  const params = useParams();
  const id = params?.productId as string;
  const dictionary = getDictionary(locale);
  const [mounted, setMounted] = useState(false);
  const [fileList, setFileList] = useState<iMedia[]>([]);
  const [identifications, setIdentifications] = useState<IdentificationItem[]>(
    []
  );

  // Default values if no initial values provided
  const defaultValues: ProductFormData = {
    title: "Europalette 1200x800x144mm EPAL - 1500 kg; gebraucht - 1. Wahl",
    condition: "Gebraucht",
    ean: "4004950900249",
    idin: "842257340424211534",
    mediaCount: 1,
    maxMedia: 20,
    titleMaxLength: 100,
    eanMaxLength: 24,
  };

  // Memoize productData to prevent unnecessary re-renders
  const productData = React.useMemo(() => {
    return initialValues || defaultValues;
  }, [initialValues]);

  // Form state
  const [formData, setFormData] = useState<ProductFormData>(productData);

  // Initialize component after mount to prevent hydration issues
  useEffect(() => {
    setMounted(true);
    setIdentifications([
      { id: "1", type: "EAN", value: "4004950900249", isDeletable: false },
      {
        id: "2",
        type: "JAN",
        value: "842257340424211534",
        isDeletable: false,
      },
    ]);
  }, []);

  // Update form data when initial values change
  useEffect(() => {
    if (mounted && initialValues) {
      setFormData(initialValues);
    }
  }, [initialValues, mounted]);

  // Handle save changes
  const handleSave = async () => {
    try {
      // Basic validation
      if (!formData.title.trim()) {
        console.error("Title is required");
        return;
      }
      if (!formData.condition) {
        console.error("Condition is required");
        return;
      }

      console.log("Form values:", formData);

      // Include identification data in the save
      const saveData = {
        ...formData,
        identifications: identifications,
      };

      onSave(saveData);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };
  const onSave = (saveData: ProductFormData) => {
    console.log("saveData", saveData);
    router.push(appRoutes.dashboard.product.search.detail.root(locale, id));
  };

  // Handle edit toggle
  const handleEditToggle = () => {
    router.push(appRoutes.dashboard.product.search.detail.root(locale, id));
  };

  // Add new identification
  const addIdentification = () => {
    const usedTypes = identifications.map((item) => item.type);
    const availableTypes = ["EAN", "GTIN", "UPC", "JAN"].filter(
      (type) => !usedTypes.includes(type)
    );

    if (availableTypes.length > 0) {
      const newId = Date.now().toString();
      setIdentifications([
        ...identifications,
        { id: newId, type: availableTypes[0], value: "", isDeletable: true },
      ]);
    }
  };

  // Remove identification
  const removeIdentification = (id: string) => {
    setIdentifications(identifications.filter((item) => item.id !== id));
  };

  // Update identification type
  const updateIdentificationType = (id: string, newType: string) => {
    setIdentifications(
      identifications.map((item) =>
        item.id === id ? { ...item, type: newType } : item
      )
    );
  };

  // Get available identification types for dropdown
  const getAvailableIdentificationTypes = (currentId: string) => {
    const usedTypes = identifications
      .filter((item) => item.id !== currentId)
      .map((item) => item.type);
    return ["EAN", "GTIN", "UPC", "JAN"].filter(
      (type) => !usedTypes.includes(type)
    );
  };

  // Handle file upload
  const handleFileChange = async (imageData: iMedia) => {
    setFileList([...fileList, imageData]);
    return true;
  };

  const handleFileRemove = async () => {
    setFileList(fileList.slice(0, -1));
    return true;
  };

  // Don't render until mounted to prevent hydration issues
  if (!mounted) {
    return (
      <>
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {isEditMode
              ? dictionary.form.editProduct
              : dictionary.form.createProduct}
          </h2>
        </div>
        <div className="space-y-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground">
          {isEditMode
            ? dictionary.form.editProduct
            : dictionary.form.createProduct}
        </h2>
      </div>

      <div className="space-y-6">
        {/* Title Input */}
        <div className="space-y-2">
          <Label
            htmlFor="title"
            className="text-sm font-medium text-foreground"
          >
            {dictionary.form.title}
          </Label>
          <div className="relative">
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder={dictionary.form.enterName}
              maxLength={formData.titleMaxLength}
              className="w-full pr-16"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-foreground">
              {dictionary.form.maxLetters
                .replace("{current}", formData.title.length.toString())
                .replace("{max}", formData.titleMaxLength.toString())}
            </div>
          </div>
          <p className="text-xs text-foreground">
            {dictionary.form.maxLettersLabel}
          </p>
        </div>

        {/* EAN Input */}
        <div className="space-y-2">
          <Label htmlFor="ean" className="text-sm font-medium text-foreground">
            {dictionary.form.ean}
          </Label>
          <div className="relative">
            <Input
              id="ean"
              value={formData.ean}
              onChange={(e) =>
                setFormData({ ...formData, ean: e.target.value })
              }
              placeholder={dictionary.form.enterEanNumber}
              maxLength={formData.eanMaxLength}
              className="w-full pr-16"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-foreground">
              {dictionary.form.maxLetters
                .replace("{current}", formData.ean.length.toString())
                .replace("{max}", formData.eanMaxLength.toString())}
            </div>
          </div>
        </div>

        {/* Condition Input */}
        <div className="space-y-2">
          <Label
            htmlFor="condition"
            className="text-sm font-medium text-foreground"
          >
            {dictionary.form.condition}
          </Label>
          <Select
            value={formData.condition}
            onValueChange={(value) =>
              setFormData({ ...formData, condition: value })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={dictionary.form.selectCondition} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gebraucht">
                {dictionary.form.gebraucht}
              </SelectItem>
              <SelectItem value="new">{dictionary.form.new}</SelectItem>
              <SelectItem value="refurbished">
                {dictionary.form.refurbished}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Identification Inputs */}
        <div className="space-y-4">
          <Label className="text-sm font-medium text-foreground">
            {dictionary.form.identification}
          </Label>
          <div className="space-y-4">
            {identifications.map((item, index) => (
              <div
                key={item.id}
                className="p-4 border border-foreground rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <Select
                      value={item.type}
                      onValueChange={(value) =>
                        updateIdentificationType(item.id, value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {getAvailableIdentificationTypes(item.id).map(
                          (type) => (
                            <SelectItem key={type} value={type}>
                              {
                                dictionary.form.identificationTypes[
                                  type as keyof typeof dictionary.form.identificationTypes
                                ]
                              }
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex-1 relative">
                    <Input
                      placeholder={`${item.type} ${dictionary.form.number}`}
                      maxLength={
                        item.type === "EAN" ? formData.eanMaxLength : undefined
                      }
                      value={item.value}
                      onChange={(e) => {
                        const newIdentifications = [...identifications];
                        newIdentifications[index].value = e.target.value;
                        setIdentifications(newIdentifications);
                      }}
                      className={item.type === "EAN" ? "pr-16" : ""}
                    />
                    {item.type === "EAN" && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-foreground">
                        {dictionary.form.maxLetters
                          .replace("{current}", item.value.length.toString())
                          .replace("{max}", formData.eanMaxLength.toString())}
                      </div>
                    )}
                  </div>
                  {item.isDeletable && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeIdentification(item.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}

            <Button
              variant="outline"
              onClick={addIdentification}
              className="w-full border-dashed border-foreground hover:border-foreground"
            >
              <Plus className="h-4 w-4 mr-2" />
              {dictionary.form.addMoreIdentification}
            </Button>
          </div>
        </div>

        {/* IDIN Input */}
        <div className="space-y-2">
          <Label htmlFor="idin" className="text-sm font-medium text-foreground">
            {dictionary.form.idin}
          </Label>
          <Input
            id="idin"
            value={formData.idin}
            onChange={(e) => setFormData({ ...formData, idin: e.target.value })}
            placeholder={dictionary.form.enterIdin}
            disabled
            className="w-full "
          />
          <div className="text-xs text-destructive space-y-1">
            <div>{dictionary.form.idinExists}</div>
          </div>
        </div>
        {/* Media Upload */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">
            {dictionary.form.media}
          </Label>

          <div className="space-y-3">
            <FileUploader
              image={fileList.length > 0 ? fileList[0].absoluteUri : undefined}
              onChange={handleFileChange}
              onRemove={handleFileRemove}
            />

            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-foreground">
                  {dictionary.form.readyToUpload}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className=" px-2 py-1 rounded">
                  {dictionary.form.acceptedFormats}
                </span>
                <span className="text-foreground">
                  {dictionary.form.mediaCount
                    .replace("{current}", fileList.length.toString())
                    .replace("{max}", formData.maxMedia.toString())}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-6">
          <Button
            variant="outline"
            onClick={handleEditToggle}
            className="flex-1 bg-background border-foreground text-foreground hover:bg-background"
          >
            {dictionary.form.cancel}
          </Button>
          <Button
            onClick={handleSave}
            className="flex-1 bg-primary hover:bg-primary/90"
          >
            {isEditMode ? dictionary.form.change : dictionary.form.save}
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProductForm;
