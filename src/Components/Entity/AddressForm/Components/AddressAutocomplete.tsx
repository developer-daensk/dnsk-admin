"use client";

import { Button } from "../../../Shadcn/button";
import { Input } from "../../../Shadcn/input";
import { Skeleton } from "../../../Shadcn/skeleton";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { fetchAddresses } from "../api";
import { iDictionary } from "../i18n";
import { iAddress } from "../types";
import { getAddressLabel } from "../utils";

interface iProps {
  onChange: (address: iAddress | undefined) => void;
  dictionary: iDictionary;
}

export default function AddressAutocomplete({ onChange, dictionary }: iProps) {
  const [input, setInput] = useState("");
  const [options, setOptions] = useState<iAddress[]>([]);
  const [isLoading, setisLoading] = useState(false);

  const debouncedFetch = useDebouncedCallback(async (value) => {
    if (!value.trim()) {
      setOptions([]);
      setisLoading(false);
      return;
    }
    setisLoading(true);
    try {
      const results = await fetchAddresses(value);
      setOptions(results);
    } finally {
      setisLoading(false);
    }
  }, 300);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    debouncedFetch(value);
  };

  const handleSelect = (addr: iAddress) => {
    setInput("");
    setOptions([]);
    setisLoading(false);
    onChange(addr);
  };

  return (
    <div className="rounded-lg border">
      <div className="relative">
        <SearchIcon className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <Input
          value={input}
          onChange={handleInput}
          placeholder={dictionary.search.placeholder}
          className="border-none pl-9 shadow-none focus-visible:ring-0"
        />
      </div>
      {(!!input || isLoading) && (
        <div className="flex flex-col gap-1 border-t p-2">
          {isLoading ? (
            <>
              <Skeleton className="h-8 w-sm max-w-full" />
              <Skeleton className="h-8 w-md max-w-full" />
            </>
          ) : options.length ? (
            options.map((addr, index) => {
              const label = getAddressLabel(addr);
              return (
                <Button
                  key={index}
                  variant={"ghost"}
                  type="button"
                  onClick={() => handleSelect(addr)}
                  className="max-w-full justify-start text-left whitespace-normal"
                >
                  {label}
                </Button>
              );
            })
          ) : (
            <p className="text-center">{dictionary.search.noResults}</p>
          )}
        </div>
      )}
    </div>
  );
}
