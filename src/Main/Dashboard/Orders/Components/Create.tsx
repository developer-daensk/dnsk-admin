"use client";
import React, { useState } from "react";
import { Truck } from "lucide-react";
import { Button } from "@/Components/Shadcn/button";
import { Input } from "@/Components/Shadcn/input";
import { Label } from "@/Components/Shadcn/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/Components/Shadcn/sheet";
import { iLocale } from "@/Components/Entity/Locale/types";
import { getDictionary } from "../i18n";

interface CreateProps {
  locale: iLocale;
}

export default function Create({ locale }: CreateProps) {
  const dictionary = getDictionary(locale);
  const [isOpen, setIsOpen] = useState(false);
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");

  const handleSave = () => {
    // Handle save logic here
    console.log("Saving truck location:", { postalCode, city });
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button className="flex items-center gap-2">
          <Truck className="h-4 w-4" />
          {dictionary.actions.yourTruck}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] p-6">
        <SheetHeader className="flex items-start justify-between">
          <SheetTitle className="flex items-start gap-2">
            <Truck className="h-5 w-5 text-primary" />
            {dictionary.actions.yourTruck}
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="postal-code">{dictionary.postalCode.label}</Label>
            <Input
              id="postal-code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              placeholder={dictionary.postalCode.placeholder}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">{dictionary.city.label}</Label>
            <Input
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder={dictionary.city.placeholder}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={handleClose}>
              {dictionary.actions.close}
            </Button>
            <Button onClick={handleSave}>{dictionary.actions.save}</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
