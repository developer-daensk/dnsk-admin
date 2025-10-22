import { Button } from "@/Components/Shadcn/button";
import { ChevronLeft } from "lucide-react";
import { Plus } from "lucide-react";
import { iLocale } from "@/Components/Entity/Locale/types";
import { getDictionary } from "../i18n";

interface iProps {
  locale: iLocale;
}

export default function SearchHeader({ locale }: iProps) {
  const dictionary = getDictionary(locale);

  const handleSaveAndBack = () => {
    console.log("save and back");
  };

  const handleCreateNewProduct = () => {
    console.log("create new product");
  };
  return (
    <div className="flex justify-between items-center">
      <Button variant="ghost" size="sm" onClick={handleSaveAndBack}>
        <ChevronLeft className="h-4 w-4" />
        {dictionary.saveAndBack}
      </Button>

      <Button onClick={handleCreateNewProduct} size="lg">
        <Plus className="h-4 w-4" />
        {dictionary.createNewProduct}
      </Button>
    </div>
  );
}
