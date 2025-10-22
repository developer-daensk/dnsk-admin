"use client";
import { iLocale } from "@/Components/Entity/Locale/types";
import { Button } from "@/Components/Shadcn/button";
import { Blocks } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { getDictionary } from "./i18n";

interface iProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function DashboardError({ error, reset }: iProps) {
  const { locale } = useParams<{ locale: iLocale }>();
  const dictionary = getDictionary(locale);

  useEffect(() => {
    console.log(error);
  }, [error]);

  // Server error has a digest , we reload the page to reset the state
  // Otherwise, we just call the reset function to retry in client
  const resetHandler = () => {
    if (error.digest) window.location.reload();
    else reset();
  };

  return (
    <div className="flex w-full grow-1 flex-col items-center justify-center rounded-2xl border border-b border-dashed p-8">
      <div className="mb-6">
        <Blocks size={40} />
      </div>
      <h2 className="mb-2 text-center text-2xl font-semibold">
        {dictionary.title}
      </h2>
      <Button
        className="w-sm max-w-full bg-neutral-900 text-white hover:bg-neutral-800"
        onClick={resetHandler}
      >
        Try again
      </Button>
    </div>
  );
}
