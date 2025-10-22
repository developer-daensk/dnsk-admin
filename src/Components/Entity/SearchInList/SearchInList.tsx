"use client";

import { iLocale } from "../Locale/types";
import { Button } from "../../Shadcn/button";
import { Input } from "../../Shadcn/input";
import { X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useDebouncedCallback } from "use-debounce";
import { getDictionary } from "./i18n";

interface iProps {
  initialSearchTerm?: string;
  pageRoute: (term?: string) => string;
}

export function SearchInList({ initialSearchTerm = "", pageRoute }: iProps) {
  const router = useRouter();
  const { locale } = useParams<{ locale: iLocale }>();
  const dictionary = getDictionary(locale);
  const [isPending, startTransition] = useTransition();
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

  const debouncedSearch = useDebouncedCallback((term: string) => {
    startTransition(() => {
      router.push(pageRoute(term || undefined));
    });
  }, 300);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const handleReset = () => {
    setSearchTerm("");
    debouncedSearch("");
  };

  return (
    <div className="relative w-full sm:w-50">
      <Input
        type="text"
        value={searchTerm}
        placeholder={dictionary.placeholder}
        onChange={handleChange}
        className="w-full pr-14"
      />
      {searchTerm && (
        <Button
          variant="ghost"
          onClick={handleReset}
          className="absolute top-1/2 right-0 -translate-y-1/2 p-1 hover:opacity-70"
        >
          <X className="h-4 w-4 text-gray-500" />
        </Button>
      )}
      {isPending && (
        <div className="absolute top-1/2 right-8 -translate-y-1/2">
          <div className="border-t-primary h-4 w-4 animate-spin rounded-full border-2"></div>
        </div>
      )}
    </div>
  );
}
