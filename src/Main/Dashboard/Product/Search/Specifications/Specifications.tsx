"use client";
import React, { useState, useEffect } from "react";
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
import { Checkbox } from "@/Components/Shadcn/checkbox";
import { getDictionary } from "./i18n";
import { ProductSpecificationsData } from "./types";
import {
  dimensionUnitOptions,
  weightUnitOptions,
  labelNumberOptions,
  packagingGroupOptions,
} from "./constants";
import { appRoutes } from "@/lib/routes/appRoutes";
import { useParams } from "next/navigation";
import { iLocale } from "@/Components/Entity/Locale/types";
import { useRouter } from "next/navigation";

interface iProps {
  locale: iLocale;
}

const ProductSpecifications: React.FC<iProps> = ({ locale }) => {
  const dictionary = getDictionary(locale);
  const router = useRouter();
  const params = useParams();
  const productId = params?.productId as string;
  const [specifications, setSpecifications] =
    useState<ProductSpecificationsData>({
      dimensions: {
        unit: "CM",
        length: null,
        width: null,
        height: null,
        volume: 0,
      },
      weight: {
        weight: null,
        unit: "KG",
      },
      checkboxes: {
        stackable: false,
        fragile: false,
        hazardous: false,
      },
      regulatory: {
        specialRegulations: "",
        tunnelCode: "",
        unIdNumber: "",
        labelNumber: "",
        packagingGroup: "",
        euroWasteCode: "",
        nem: "",
        transportCategory: "",
        environmentallyHazardous: false,
      },
      temperature: {
        minTemperatureEnabled: false,
        minTemperature: null,
        coolingEnabled: false,
        maxTemperature: null,
      },
      delivery: {
        expressNecessary: false,
        maxTransportDuration: null,
      },
    });

  // Calculate volume when dimensions change
  useEffect(() => {
    const { length, width, height } = specifications.dimensions;
    if (length && width && height) {
      const volume = length * width * height;
      setSpecifications((prev) => ({
        ...prev,
        dimensions: {
          ...prev.dimensions,
          volume: Math.round(volume * 10000) / 10000,
        },
      }));
    }
  }, [
    specifications.dimensions.length,
    specifications.dimensions.width,
    specifications.dimensions.height,
    specifications.dimensions.unit,
  ]);

  const handleDimensionChange = (
    field: "unit" | "length" | "width" | "height",
    value: string | number
  ) => {
    setSpecifications((prev) => ({
      ...prev,
      dimensions: {
        ...prev.dimensions,
        [field]: field === "unit" ? value : Number(value) || null,
      },
    }));
  };

  const handleWeightChange = (
    field: "weight" | "unit",
    value: string | number
  ) => {
    setSpecifications((prev) => ({
      ...prev,
      weight: {
        ...prev.weight,
        [field]: field === "unit" ? value : Number(value) || null,
      },
    }));
  };

  const handleCheckboxChange = (
    field: keyof ProductSpecificationsData["checkboxes"],
    checked: boolean
  ) => {
    setSpecifications((prev) => ({
      ...prev,
      checkboxes: {
        ...prev.checkboxes,
        [field]: checked,
      },
    }));
  };

  const handleRegulatoryChange = (
    field: keyof ProductSpecificationsData["regulatory"],
    value: string | boolean
  ) => {
    setSpecifications((prev) => ({
      ...prev,
      regulatory: {
        ...prev.regulatory,
        [field]: value,
      },
    }));
  };

  const handleTemperatureChange = (
    field: keyof ProductSpecificationsData["temperature"],
    value: string | number | boolean
  ) => {
    setSpecifications((prev) => ({
      ...prev,
      temperature: {
        ...prev.temperature,
        [field]: typeof value === "boolean" ? value : Number(value) || null,
      },
    }));
  };

  const handleDeliveryChange = (
    field: keyof ProductSpecificationsData["delivery"],
    value: string | number | boolean
  ) => {
    setSpecifications((prev) => ({
      ...prev,
      delivery: {
        ...prev.delivery,
        [field]: typeof value === "boolean" ? value : Number(value) || null,
      },
    }));
  };

  // Notify parent of changes
  useEffect(() => {
    setSpecifications(specifications);
  }, [specifications]);

  const getVolumeUnit = (dimensionUnit: string) => {
    switch (dimensionUnit) {
      case "CM":
        return "cm³";
      case "MM":
        return "mm³";
      case "M":
        return "m³";
      case "INCH":
        return "in³";
      case "FT":
        return "ft³";
      default:
        return "m³";
    }
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="flex items-center gap-2 mb-6">
        <h2 className="text-2xl font-semibold">{dictionary.title}</h2>
      </div>

      {/* Dimensions Section */}
      <div className="space-y-6">
        <div className="flex justify-start items-center gap-4">
          <div className="flex flex-col ">
            <Label className="text-sm font-medium text-foreground">
              {dictionary.dimensions.unit.label}
            </Label>
            <Select
              value={specifications.dimensions.unit}
              onValueChange={(value) => handleDimensionChange("unit", value)}
            >
              <SelectTrigger className="mt-1">
                <SelectValue
                  placeholder={dictionary.dimensions.unit.placeholder}
                />
              </SelectTrigger>
              <SelectContent>
                {dimensionUnitOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {
                      dictionary.dimensions.unit.options[
                        option.value as keyof typeof dictionary.dimensions.unit.options
                      ]
                    }
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Volume Display */}
          <div className="flex flex-col justify-end">
            <span className="text-sm text-muted-foreground mb-1">
              {dictionary.dimensions.volume}
            </span>
            <div className="text-lg font-semibold">
              {specifications.dimensions.volume?.toFixed(4)}{" "}
              {getVolumeUnit(specifications.dimensions.unit)}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Length Input */}
          <div>
            <Label className="text-sm font-medium text-foreground">
              {dictionary.dimensions.length.label}
            </Label>
            <Input
              type="number"
              value={specifications.dimensions.length || ""}
              onChange={(e) => handleDimensionChange("length", e.target.value)}
              placeholder={dictionary.dimensions.length.placeholder}
              min={0}
              step={0.1}
              className="mt-1"
            />
          </div>

          {/* Width Input */}
          <div>
            <Label className="text-sm font-medium text-foreground">
              {dictionary.dimensions.width.label}
            </Label>
            <Input
              type="number"
              value={specifications.dimensions.width || ""}
              onChange={(e) => handleDimensionChange("width", e.target.value)}
              placeholder={dictionary.dimensions.width.placeholder}
              min={0}
              step={0.1}
              className="mt-1"
            />
          </div>

          {/* Height Input */}
          <div>
            <Label className="text-sm font-medium text-foreground">
              {dictionary.dimensions.height.label}
            </Label>
            <Input
              type="number"
              value={specifications.dimensions.height || ""}
              onChange={(e) => handleDimensionChange("height", e.target.value)}
              placeholder={dictionary.dimensions.height.placeholder}
              min={0}
              step={0.1}
              className="mt-1"
            />
          </div>
        </div>
      </div>

      {/* Weight Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="text-sm font-medium text-foreground">
            {dictionary.weight.weight.label}
          </Label>
          <Input
            type="number"
            value={specifications.weight.weight || ""}
            onChange={(e) => handleWeightChange("weight", e.target.value)}
            placeholder={dictionary.weight.weight.placeholder}
            min={0}
            step={0.1}
            className="mt-1"
          />
        </div>

        <div>
          <Label className="text-sm font-medium text-foreground">
            {dictionary.weight.unit.label}
          </Label>
          <Select
            value={specifications.weight.unit}
            onValueChange={(value) => handleWeightChange("unit", value)}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder={dictionary.weight.unit.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {weightUnitOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {
                    dictionary.weight.unit.options[
                      option.value as keyof typeof dictionary.weight.unit.options
                    ]
                  }
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Checkboxes Section */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="stackable"
            checked={specifications.checkboxes.stackable}
            onCheckedChange={(checked) =>
              handleCheckboxChange("stackable", checked as boolean)
            }
          />
          <Label htmlFor="stackable" className="text-base font-normal">
            {dictionary.checkboxes.stackable.label}
          </Label>
        </div>
        <p className="text-sm text-muted-foreground ml-6">
          {dictionary.checkboxes.stackable.description}
        </p>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="fragile"
            checked={specifications.checkboxes.fragile}
            onCheckedChange={(checked) =>
              handleCheckboxChange("fragile", checked as boolean)
            }
          />
          <Label htmlFor="fragile" className="text-base font-normal">
            {dictionary.checkboxes.fragile.label}
          </Label>
        </div>
        <p className="text-sm text-muted-foreground ml-6">
          {dictionary.checkboxes.fragile.description}
        </p>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="hazardous"
            checked={specifications.checkboxes.hazardous}
            onCheckedChange={(checked) =>
              handleCheckboxChange("hazardous", checked as boolean)
            }
          />
          <Label htmlFor="hazardous" className="text-base font-normal">
            {dictionary.checkboxes.hazardous.label}
          </Label>
        </div>
        <p className="text-sm text-muted-foreground ml-6">
          {dictionary.checkboxes.hazardous.description}
        </p>
      </div>

      {/* Regulatory Section - Only show if dangerous goods is selected */}
      {specifications.checkboxes.hazardous && (
        <div className="space-y-6 p-6 bg-muted/50 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Label className="text-sm font-medium text-foreground">
                {dictionary.regulatory.specialRegulations.label}
              </Label>
              <Input
                value={specifications.regulatory.specialRegulations}
                onChange={(e) =>
                  handleRegulatoryChange("specialRegulations", e.target.value)
                }
                placeholder={
                  dictionary.regulatory.specialRegulations.placeholder
                }
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-foreground">
                {dictionary.regulatory.tunnelCode.label}
              </Label>
              <Input
                value={specifications.regulatory.tunnelCode}
                onChange={(e) =>
                  handleRegulatoryChange("tunnelCode", e.target.value)
                }
                placeholder={dictionary.regulatory.tunnelCode.placeholder}
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-foreground">
                {dictionary.regulatory.unIdNumber.label}
              </Label>
              <Input
                value={specifications.regulatory.unIdNumber}
                onChange={(e) =>
                  handleRegulatoryChange("unIdNumber", e.target.value)
                }
                placeholder={dictionary.regulatory.unIdNumber.placeholder}
                maxLength={12}
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {specifications.regulatory.unIdNumber.length}/12
              </p>
            </div>

            <div>
              <Label className="text-sm font-medium text-foreground">
                {dictionary.regulatory.labelNumber.label}
              </Label>
              <Select
                value={specifications.regulatory.labelNumber}
                onValueChange={(value) =>
                  handleRegulatoryChange("labelNumber", value)
                }
              >
                <SelectTrigger className="mt-1 w-full">
                  <SelectValue
                    placeholder={dictionary.regulatory.labelNumber.placeholder}
                  />
                </SelectTrigger>
                <SelectContent>
                  {labelNumberOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium text-foreground">
                {dictionary.regulatory.packagingGroup.label}
              </Label>
              <Select
                value={specifications.regulatory.packagingGroup}
                onValueChange={(value) =>
                  handleRegulatoryChange("packagingGroup", value)
                }
              >
                <SelectTrigger className="mt-1 w-full">
                  <SelectValue
                    placeholder={
                      dictionary.regulatory.packagingGroup.placeholder
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {packagingGroupOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium text-foreground">
                {dictionary.regulatory.euroWasteCode.label}
              </Label>
              <Input
                value={specifications.regulatory.euroWasteCode}
                onChange={(e) =>
                  handleRegulatoryChange("euroWasteCode", e.target.value)
                }
                placeholder={dictionary.regulatory.euroWasteCode.placeholder}
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-foreground">
                {dictionary.regulatory.nem.label}
              </Label>
              <Input
                value={specifications.regulatory.nem}
                onChange={(e) => handleRegulatoryChange("nem", e.target.value)}
                placeholder={dictionary.regulatory.nem.placeholder}
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-foreground">
                {dictionary.regulatory.transportCategory.label}
              </Label>
              <Input
                value={specifications.regulatory.transportCategory}
                onChange={(e) =>
                  handleRegulatoryChange("transportCategory", e.target.value)
                }
                placeholder={
                  dictionary.regulatory.transportCategory.placeholder
                }
                className="mt-1"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="environmentallyHazardous"
                checked={specifications.regulatory.environmentallyHazardous}
                onCheckedChange={(checked) =>
                  handleRegulatoryChange(
                    "environmentallyHazardous",
                    checked as boolean
                  )
                }
              />
              <Label
                htmlFor="environmentallyHazardous"
                className="text-base font-normal"
              >
                {dictionary.regulatory.environmentallyHazardous.label}
              </Label>
            </div>
          </div>
        </div>
      )}

      {/* Temperature Section - Only show if dangerous goods is selected */}
      {specifications.checkboxes.hazardous && (
        <div className="space-y-4 p-6 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="minTemperatureEnabled"
                checked={specifications.temperature.minTemperatureEnabled}
                onCheckedChange={(checked) =>
                  handleTemperatureChange(
                    "minTemperatureEnabled",
                    checked as boolean
                  )
                }
              />
              <Label
                htmlFor="minTemperatureEnabled"
                className="text-base font-normal"
              >
                {dictionary.temperature.minTemperature.label}
              </Label>
            </div>
            <div className="w-32">
              <Input
                type="number"
                value={specifications.temperature.minTemperature || ""}
                onChange={(e) =>
                  handleTemperatureChange("minTemperature", e.target.value)
                }
                min={-273}
                max={1000}
                step={1}
                className="w-full"
                placeholder="°C"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="coolingEnabled"
                checked={specifications.temperature.coolingEnabled}
                onCheckedChange={(checked) =>
                  handleTemperatureChange("coolingEnabled", checked as boolean)
                }
              />
              <Label htmlFor="coolingEnabled" className="text-base font-normal">
                {dictionary.temperature.cooling.label}
              </Label>
            </div>
            <div className="w-32">
              <Input
                type="number"
                value={specifications.temperature.maxTemperature || ""}
                onChange={(e) =>
                  handleTemperatureChange("maxTemperature", e.target.value)
                }
                min={-273}
                max={1000}
                step={1}
                className="w-full"
                placeholder="°C"
              />
            </div>
          </div>
        </div>
      )}

      {/* Delivery Section - Only show if dangerous goods is selected */}
      {specifications.checkboxes.hazardous && (
        <div className="flex items-center gap-4 p-6 bg-muted/50 rounded-lg">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="expressNecessary"
              checked={specifications.delivery.expressNecessary}
              onCheckedChange={(checked) =>
                handleDeliveryChange("expressNecessary", checked as boolean)
              }
            />
            <Label htmlFor="expressNecessary" className="text-base font-normal">
              {dictionary.delivery.expressNecessary.label}
            </Label>
          </div>
          <div className="w-40">
            <Input
              type="number"
              value={specifications.delivery.maxTransportDuration || ""}
              onChange={(e) =>
                handleDeliveryChange("maxTransportDuration", e.target.value)
              }
              min={1}
              max={999}
              step={1}
              className="w-full"
              placeholder="Stunden"
            />
          </div>
        </div>
      )}

      {/* Continue Button */}
      <div className="flex justify-end">
        <Button
          onClick={() => {
            router.push(
              appRoutes.dashboard.product.search.listing.create(
                locale,
                productId
              )
            );
          }}
          className="px-8"
        >
          {dictionary.buttons.continue}
        </Button>
      </div>
    </div>
  );
};

export default ProductSpecifications;
