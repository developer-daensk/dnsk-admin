"use client";

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/Components/Shadcn/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getDictionary } from "./i18n";
import { iLocale } from "@/Components/Entity/Locale/types";
import { appRoutes } from "@/lib/routes/appRoutes";
import PricingForm from "./Components/PricingForm";
import { PricingFormData } from "./Components/types";

interface iProps {
  locale: iLocale;
}

const Price: React.FC<iProps> = ({ locale }) => {
  const dictionary = getDictionary(locale);
  const router = useRouter();
  const params = useParams();
  const productId = params?.productId as string;

  const [pricingData, setPricingData] = useState<PricingFormData | null>(null);

  const handlePricingSubmit = (data: PricingFormData) => {
    setPricingData(data);
    console.log("Pricing data saved:", data);

    // Navigate to the final listing page after form submission
    router.push(
      appRoutes.dashboard.product.search.listing.final(locale, productId)
    );
  };

  const handleContinueClick = () => {
    // Navigate to final listing page (form data will be handled by PricingForm's submit)
    router.push(
      appRoutes.dashboard.product.search.listing.final(locale, productId)
    );
  };

  const handleBack = () => {
    router.push(
      appRoutes.dashboard.product.search.listing.root(locale, productId)
    );
  };

  return (
    <div className="space-y-8">
      {/* Title and Description */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-left">{dictionary.title}</h2>
        <p className="text-muted-foreground text-base">
          {dictionary.description}
        </p>
      </div>

      {/* Comprehensive Pricing Form */}
      <PricingForm
        locale={locale}
        onSubmit={handlePricingSubmit}
        initialData={pricingData || undefined}
      />

      {/* Back Button */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          {dictionary.buttons.back}
        </Button>
        <Button
          variant="outline"
          onClick={handleContinueClick}
          className="flex items-center gap-2"
        >
          <ArrowRight className="h-4 w-4" />
          {dictionary.buttons.continue}
        </Button>
      </div>
    </div>
  );
};

export default Price;
