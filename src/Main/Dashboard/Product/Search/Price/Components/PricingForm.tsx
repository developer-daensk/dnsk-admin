"use client";

import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/Components/Shadcn/button";
import { Input } from "@/Components/Shadcn/input";
import { Label } from "@/Components/Shadcn/label";
import { Checkbox } from "@/Components/Shadcn/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/Shadcn/select";
import { Separator } from "@/Components/Shadcn/separator";
import { getDictionary } from "./i18n";
import {
  PricingFormData,
  VAT_RATES,
  DIMENSION_UNITS,
  TIME_UNITS,
  PACKAGING_UNITS,
  LOADING_EQUIPMENT,
  CONTAINER_TYPES,
} from "./types";
import { iLocale } from "@/Components/Entity/Locale/types";

interface PricingFormProps {
  locale: iLocale;
  onSubmit?: (data: PricingFormData) => void;
  initialData?: Partial<PricingFormData>;
}

const PricingForm: React.FC<PricingFormProps> = ({
  locale,
  onSubmit,
  initialData,
}) => {
  const dictionary = getDictionary(locale);

  const { control, handleSubmit, watch, setValue } = useForm<PricingFormData>({
    defaultValues: {
      // Pricing Section
      nettopreis: null,
      enthaltUst: null,
      bruttopreis: null,
      ust: "19",
      additionalPrice: null,
      additionalPriceUnit: "Ifdm",
      gesamtmaß: null,
      gesamtmaßUnit: "Ifdm",
      basismaß: null,
      basismaßUnit: "Ifdm",

      // Inventory Section
      standort: "",
      verfügbareMenge: null,
      verfügbareMengeUnit: "Ifdm",
      sku: "",
      lagerId: "",

      // Lead Time Section
      dauer: null,
      dauerUnit: "Tage",
      backorderErlauben: false,
      zusätzlicherVorlauf: null,
      zusätzlicherVorlaufUnit: "Tage",

      // Minimum Quantities Section
      mindestverkaufsmenge: null,
      mindestverkaufsmengeUnit: "Stück",

      // Packaging Unit Section
      ve: null,
      veUnit: "Stück",
      enthaltenIm: "Karton",

      // Loading Equipment Section
      loseWare: false,
      zweiMannHandling: false,
      palettiert: false,
      verwendeteLademittel: "Keine",
      lademitteltausch: false,
      stückpreisOhneTausch: null,

      // Neutral Packaging Section
      neutralverpackung: false,

      ...initialData,
    },
  });

  // Watch specific form values for calculations
  const nettopreis = watch("nettopreis");
  const ust = watch("ust");
  const watchedValues = watch();

  // Auto-calculate pricing when values change
  useEffect(() => {
    if (nettopreis && ust) {
      const vatRate = parseFloat(ust) / 100;
      const netPrice = nettopreis;
      const vatAmount = netPrice * vatRate;
      const grossPrice = netPrice + vatAmount;

      // Update calculated fields
      setValue("enthaltUst", vatAmount, { shouldDirty: false });
      setValue("bruttopreis", grossPrice, { shouldDirty: false });
    }
  }, [nettopreis, ust, setValue]);

  const handleFormSubmit = (data: PricingFormData) => {
    onSubmit?.(data);
    console.log("Pricing form data:", data);
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
        {/* Pricing Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">{dictionary.preise.title}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Nettopreis */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                {dictionary.preise.nettopreis.label}
              </Label>
              <p className="text-xs text-muted-foreground italic">
                {dictionary.preise.nettopreis.labelTranslation}
              </p>
              <div className="relative">
                <Controller
                  name="nettopreis"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      placeholder={dictionary.preise.nettopreis.placeholder}
                      min={0}
                      step={0.01}
                      className="pr-8"
                      value={field.value ?? ""}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? parseFloat(e.target.value) : null
                        )
                      }
                    />
                  )}
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground text-sm">
                  €
                </span>
              </div>
            </div>

            {/* Enth. USt. */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                {dictionary.preise.enthaltUst.label}
              </Label>
              <p className="text-xs text-muted-foreground italic">
                {dictionary.preise.enthaltUst.labelTranslation}
              </p>
              <div className="relative">
                <Controller
                  name="enthaltUst"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      placeholder={dictionary.preise.enthaltUst.placeholder}
                      min={0}
                      step={0.01}
                      className="pr-8"
                      value={field.value ?? ""}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? parseFloat(e.target.value) : null
                        )
                      }
                    />
                  )}
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground text-sm">
                  €
                </span>
              </div>
            </div>

            {/* Bruttopreis */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                {dictionary.preise.bruttopreis.label}
              </Label>
              <p className="text-xs text-muted-foreground italic">
                {dictionary.preise.bruttopreis.labelTranslation}
              </p>
              <div className="relative">
                <Controller
                  name="bruttopreis"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      placeholder={dictionary.preise.bruttopreis.placeholder}
                      min={0}
                      step={0.01}
                      className="pr-8"
                      value={field.value ?? ""}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? parseFloat(e.target.value) : null
                        )
                      }
                    />
                  )}
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground text-sm">
                  €
                </span>
              </div>
            </div>

            {/* USt. */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                {dictionary.preise.ust.label}
              </Label>
              <p className="text-xs text-muted-foreground italic">
                {dictionary.preise.ust.labelTranslation}
              </p>
              <p className="text-xs text-muted-foreground italic">
                {dictionary.preise.ust.dropdownNote}
              </p>
              <Controller
                name="ust"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue
                        placeholder={dictionary.preise.ust.placeholder}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {VAT_RATES.map((rate) => (
                        <SelectItem key={rate.value} value={rate.value}>
                          {rate.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          {/* Additional Price and Dimensions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Additional Price */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                {dictionary.preise.additionalPrice.label}
              </Label>
              <p className="text-xs text-muted-foreground italic">
                {dictionary.preise.additionalPrice.labelTranslation}
              </p>
              <div className="flex gap-2">
                <Controller
                  name="additionalPrice"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      placeholder={
                        dictionary.preise.additionalPrice.placeholder
                      }
                      min={0}
                      step={0.01}
                      className="flex-1"
                      value={field.value ?? ""}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? parseFloat(e.target.value) : null
                        )
                      }
                    />
                  )}
                />
                <Controller
                  name="additionalPriceUnit"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {DIMENSION_UNITS.map((unit) => (
                          <SelectItem key={unit.value} value={unit.value}>
                            {unit.value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>

            {/* Gesamtmaß */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                {dictionary.preise.gesamtmaß.label}
              </Label>
              <p className="text-xs text-muted-foreground italic">
                {dictionary.preise.gesamtmaß.labelTranslation}
              </p>
              <div className="flex gap-2">
                <Controller
                  name="gesamtmaß"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      placeholder={dictionary.preise.gesamtmaß.placeholder}
                      min={0}
                      step={0.01}
                      className="flex-1"
                      value={field.value ?? ""}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? parseFloat(e.target.value) : null
                        )
                      }
                    />
                  )}
                />
                <Controller
                  name="gesamtmaßUnit"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {DIMENSION_UNITS.map((unit) => (
                          <SelectItem key={unit.value} value={unit.value}>
                            {unit.value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>

            {/* Basismaß */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                {dictionary.preise.basismaß.label}
              </Label>
              <p className="text-xs text-muted-foreground italic">
                {dictionary.preise.basismaß.labelTranslation}
              </p>
              <div className="flex gap-2">
                <Controller
                  name="basismaß"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      placeholder={dictionary.preise.basismaß.placeholder}
                      min={0}
                      step={0.01}
                      className="flex-1"
                      value={field.value ?? ""}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? parseFloat(e.target.value) : null
                        )
                      }
                    />
                  )}
                />
                <Controller
                  name="basismaßUnit"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {DIMENSION_UNITS.map((unit) => (
                          <SelectItem key={unit.value} value={unit.value}>
                            {unit.value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Example text */}
          <p className="text-xs text-muted-foreground italic">
            {dictionary.preise.example}
          </p>
        </div>

        <Separator />

        {/* Inventory Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">{dictionary.inventar.title}</h3>
          <p className="text-sm text-muted-foreground italic">
            {dictionary.inventar.titleTranslation}
          </p>

          {/* Standort */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">
              {dictionary.inventar.standort.label}
            </Label>
            <p className="text-xs text-muted-foreground italic">
              {dictionary.inventar.standort.labelTranslation}
            </p>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <span className="text-sm">{watchedValues.standort}</span>
              <Button type="button" variant="link" size="sm">
                {dictionary.inventar.standort.change}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Verfügbare Menge */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                {dictionary.inventar.verfügbareMenge.label}
              </Label>
              <p className="text-xs text-muted-foreground italic">
                {dictionary.inventar.verfügbareMenge.labelTranslation}
              </p>
              <div className="flex gap-2">
                <Controller
                  name="verfügbareMenge"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      placeholder={
                        dictionary.inventar.verfügbareMenge.placeholder
                      }
                      min={0}
                      step={1}
                      className="flex-1"
                      value={field.value ?? ""}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? parseInt(e.target.value) : null
                        )
                      }
                    />
                  )}
                />
                <Controller
                  name="verfügbareMengeUnit"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {DIMENSION_UNITS.map((unit) => (
                          <SelectItem key={unit.value} value={unit.value}>
                            {unit.value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>

            {/* SKU */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                {dictionary.inventar.sku.label}
              </Label>
              <p className="text-xs text-muted-foreground italic">
                {dictionary.inventar.sku.labelTranslation}
              </p>
              <Controller
                name="sku"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder={dictionary.inventar.sku.placeholder}
                  />
                )}
              />
              <p className="text-xs text-muted-foreground">
                {dictionary.inventar.sku.optional}
              </p>
            </div>

            {/* Lager-ID */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                {dictionary.inventar.lagerId.label}
              </Label>
              <Controller
                name="lagerId"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder={dictionary.inventar.lagerId.placeholder}
                  />
                )}
              />
              <p className="text-xs text-muted-foreground">
                {dictionary.inventar.lagerId.optional}
              </p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Lead Time and Preparation Duration Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">{dictionary.vorlauf.title}</h3>
          <p className="text-sm text-muted-foreground">
            {dictionary.vorlauf.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Dauer */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                {dictionary.vorlauf.dauer.label}
              </Label>
              <div className="flex gap-2">
                <Controller
                  name="dauer"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      placeholder={dictionary.vorlauf.dauer.placeholder}
                      min={0}
                      step={1}
                      className="flex-1"
                      value={field.value ?? ""}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? parseInt(e.target.value) : null
                        )
                      }
                    />
                  )}
                />
                <div className="w-32">
                  <Label className="text-xs text-muted-foreground">
                    {dictionary.vorlauf.dauerUnit.label}
                  </Label>
                  <Controller
                    name="dauerUnit"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {TIME_UNITS.map((unit) => (
                            <SelectItem key={unit.value} value={unit.value}>
                              {unit.value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Zusätzlicher Vorlauf */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                {dictionary.vorlauf.zusätzlicherVorlauf.label}
              </Label>
              <div className="flex gap-2">
                <Controller
                  name="zusätzlicherVorlauf"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      placeholder={
                        dictionary.vorlauf.zusätzlicherVorlauf.placeholder
                      }
                      min={0}
                      step={1}
                      className="flex-1"
                      value={field.value ?? ""}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? parseInt(e.target.value) : null
                        )
                      }
                    />
                  )}
                />
                <Controller
                  name="zusätzlicherVorlaufUnit"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {TIME_UNITS.map((unit) => (
                          <SelectItem key={unit.value} value={unit.value}>
                            {unit.value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Backorder erlauben */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Controller
                name="backorderErlauben"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    id="backorderErlauben"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Label
                htmlFor="backorderErlauben"
                className="text-sm font-medium"
              >
                {dictionary.vorlauf.backorderErlauben.label}
              </Label>
            </div>
            <p className="text-xs text-muted-foreground ml-6">
              {dictionary.vorlauf.backorderErlauben.description}
            </p>
          </div>
        </div>

        <Separator />

        {/* Minimum Quantities Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            {dictionary.mindestmengen.title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {dictionary.mindestmengen.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Mindestverkaufsmenge */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                {dictionary.mindestmengen.mindestverkaufsmenge.label}
              </Label>
              <div className="flex gap-2">
                <Controller
                  name="mindestverkaufsmenge"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      placeholder={
                        dictionary.mindestmengen.mindestverkaufsmenge
                          .placeholder
                      }
                      min={0}
                      step={1}
                      className="flex-1"
                      value={field.value ?? ""}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? parseInt(e.target.value) : null
                        )
                      }
                    />
                  )}
                />
                <Controller
                  name="mindestverkaufsmengeUnit"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {PACKAGING_UNITS.map((unit) => (
                          <SelectItem key={unit.value} value={unit.value}>
                            {unit.value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Packaging Unit Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            {dictionary.verpackungseinheit.title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {dictionary.verpackungseinheit.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* VE */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                {dictionary.verpackungseinheit.ve.label}
              </Label>
              <div className="flex gap-2">
                <Controller
                  name="ve"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      placeholder={dictionary.verpackungseinheit.ve.placeholder}
                      min={0}
                      step={1}
                      className="flex-1"
                      value={field.value ?? ""}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? parseInt(e.target.value) : null
                        )
                      }
                    />
                  )}
                />
                <Controller
                  name="veUnit"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {PACKAGING_UNITS.map((unit) => (
                          <SelectItem key={unit.value} value={unit.value}>
                            {unit.value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>

            {/* enthalten im */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                {dictionary.verpackungseinheit.enthaltenIm.label}
              </Label>
              <Controller
                name="enthaltenIm"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          dictionary.verpackungseinheit.enthaltenIm.placeholder
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {CONTAINER_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Loading Equipment Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            {dictionary.lademittel.title}
          </h3>

          {/* Checkboxes */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Controller
                name="loseWare"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    id="loseWare"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Label htmlFor="loseWare" className="text-sm">
                {dictionary.lademittel.loseWare.label}
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Controller
                name="zweiMannHandling"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    id="zweiMannHandling"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Label htmlFor="zweiMannHandling" className="text-sm">
                {dictionary.lademittel.zweiMannHandling.label}
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Controller
                name="palettiert"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    id="palettiert"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Label htmlFor="palettiert" className="text-sm">
                {dictionary.lademittel.palettiert.label}
              </Label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Verwendete Lademittel */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                {dictionary.lademittel.verwendeteLademittel.label}
              </Label>
              <Controller
                name="verwendeteLademittel"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue
                        placeholder={
                          dictionary.lademittel.verwendeteLademittel.placeholder
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {LOADING_EQUIPMENT.map((equipment) => (
                        <SelectItem
                          key={equipment.value}
                          value={equipment.value}
                        >
                          {equipment.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {/* Stückpreis ohne Tausch */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                {dictionary.lademittel.stückpreisOhneTausch.label}
              </Label>
              <div className="relative">
                <Controller
                  name="stückpreisOhneTausch"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      placeholder={
                        dictionary.lademittel.stückpreisOhneTausch.placeholder
                      }
                      min={0}
                      step={0.01}
                      className="pr-12"
                      value={field.value ?? ""}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? parseFloat(e.target.value) : null
                        )
                      }
                    />
                  )}
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground text-sm">
                  EUR
                </span>
              </div>
            </div>
          </div>

          {/* Lademitteltausch */}
          <div className="flex items-center space-x-2">
            <Controller
              name="lademitteltausch"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id="lademitteltausch"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <Label htmlFor="lademitteltausch" className="text-sm">
              {dictionary.lademittel.lademitteltausch.label}
            </Label>
          </div>
        </div>

        <Separator />

        {/* Neutral Packaging Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            {dictionary.neutralverpackung.title}
          </h3>

          <div className="flex items-center space-x-2">
            <Controller
              name="neutralverpackung"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id="neutralverpackung"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <Label htmlFor="neutralverpackung" className="text-sm font-medium">
              {dictionary.neutralverpackung.label}
            </Label>
          </div>
          <p className="text-xs text-muted-foreground ml-6">
            {dictionary.neutralverpackung.description}
          </p>
        </div>
      </form>
    </div>
  );
};

export default PricingForm;
