"use client";

import React from "react";
import { Button } from "@/Components/Shadcn/button";
import { Separator } from "@/Components/Shadcn/separator";
import { Edit } from "lucide-react";
import { iLocale } from "@/Components/Entity/Locale/types";
import { getDictionary } from "./i18n";
import { appRoutes } from "@/lib/routes/appRoutes";
import { useParams, useRouter } from "next/navigation";

interface iProps {
  locale: iLocale;
}

const ProductDescriptionOverview: React.FC<iProps> = ({ locale }) => {
  const dictionary = getDictionary(locale);
  const router = useRouter();
  const params = useParams();
  const id = params?.productId as string;
  const specifications = [
    {
      name: "Material",
      title: "Material",
      description: "Holz",
    },
    {
      name: "Compliance",
      title: "Entspricht",
      description: "ISPM15",
    },
  ];
  const description = `Europalette 800 x 1200 UIC/EPAL - Gebraucht 1. Wahl

Diese hochwertige Europalette entspricht den internationalen UIC/EPAL Standards und ist ideal für den professionellen Einsatz. Die Palette verfügt über fünf Oberbretter und präzise gefräste Unterbretter für optimale Stabilität und Belastbarkeit.

Grundlegende Produkteigenschaften:
• Klasse: 1. Wahl (sehr guter Zustand)
• Tragfähigkeit: bis zu ca. 1500 kg
• Maße: 1200 x 800 x 144 mm

Diese Europalette wird weltweit im Handel, der Logistik und der Industrie eingesetzt und bietet eine zuverlässige Lösung für den sicheren Transport und die Lagerung von Waren.`;

  const handleEdit = () => {
    router.push(
      appRoutes.dashboard.product.search.description.edit(locale, id)
    );
  };

  const onContinue = () => {
    router.push(appRoutes.dashboard.product.search.tags.root(locale, id));
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
            <p className="text-base text-foreground  leading-relaxed">
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
        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-foreground">
              {dictionary.description.title}
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleEdit()}
              className="text-primary hover:text-primary/90"
            >
              <Edit className="h-4 w-4 mr-2" />
              {dictionary.description.edit}
            </Button>
          </div>

          <div className="bg-background rounded-lg p-6 border border-border shadow-sm min-h-[300px]">
            <div className="text-sm leading-relaxed whitespace-pre-line text-foreground">
              {description}
            </div>
          </div>
        </div>
      </div>

      <Separator className="my-8" />

      {/* Specifications Section - Read-only */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-foreground">
          {dictionary.specifications.title}
        </h3>

        <div className="bg-background rounded-lg p-6 border border-border shadow-sm">
          <div className="space-y-0">
            {specifications.map((spec, index) => (
              <div
                key={spec.name}
                className={`flex items-start py-3 ${
                  index % 2 === 0 ? "bg-background" : "bg-background"
                } ${index !== specifications.length - 1 ? "border-b border-border" : ""}`}
              >
                <div className="w-2/5 pr-4">
                  <span className="text-sm font-medium text-foreground">
                    {spec.title}
                  </span>
                </div>
                <div className="w-3/5">
                  <span className="text-sm text-foreground">
                    {spec.description}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Continue Button - only show in overview mode */}
      <div className="flex justify-end pt-8">
        <Button onClick={() => onContinue()} className="px-8 py-2 text-base ">
          {dictionary.actions.continue}
        </Button>
      </div>
    </div>
  );
};

export default ProductDescriptionOverview;
