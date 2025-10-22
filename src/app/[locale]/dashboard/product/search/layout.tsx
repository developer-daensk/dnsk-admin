"use client";

import { iLocale } from "@/Components/Entity/Locale/types";
import "@/styles/globals.css";
import { Card, CardContent, CardHeader } from "@/Components/Shadcn/card";
import { Button } from "@/Components/Shadcn/button";
import { ChevronLeft, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { getDictionary } from "./i18n";
import { appRoutes } from "@/lib/routes/appRoutes";

interface iProps {
  children: React.ReactNode;
  locale: iLocale;
}

export default function Layout({ children, locale }: iProps) {
  const dictionary = getDictionary(locale);
  const router = useRouter();

  const handleSaveAndBack = () => {
    // TODO: Implement save functionality
    router.back();
  };

  const handleCreateNewProduct = () => {
    // TODO: Navigate to create new product page
    router.push(appRoutes.dashboard.product.new(locale));
  };
  return (
    <Card className="w-full max-w-[1960px]">
      <CardHeader className="flex justify-between items-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSaveAndBack}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          {dictionary.saveAndBack}
        </Button>

        <Button
          onClick={handleCreateNewProduct}
          size="lg"
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          {dictionary.createNewProduct}
        </Button>
      </CardHeader>
      <hr />
      <CardContent>{children}</CardContent>
    </Card>
  );
}
