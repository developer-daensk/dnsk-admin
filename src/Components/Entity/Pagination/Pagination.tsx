import { iLocale } from "../Locale/types";
import { cn } from "../../Shadcn/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useParams } from "next/navigation";
import { Button } from "../../Shadcn/button";
import { getDictionary } from "./i18n";

interface iProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination(props: iProps) {
  const { currentPage, totalItems, pageSize, onPageChange, className } = props;
  const { locale } = useParams<{ locale: iLocale }>();
  const dictionary = getDictionary(locale);
  const totalPages = Math.ceil(totalItems / pageSize);
  const from = (currentPage - 1) * pageSize + 1;
  const to = Math.min(currentPage * pageSize, totalItems);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div
      className={cn(
        "text-muted-foreground flex items-center justify-between text-sm",
        className
      )}
    >
      <span>
        {dictionary.details
          .replace("{from}", String(from))
          .replace("{to}", String(to))
          .replace("{total}", String(totalItems))}
      </span>
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          <span className="hidden sm:inline">{dictionary.previous}</span>
          <ChevronLeft size={16} className="block sm:hidden" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          <span className="hidden sm:inline">{dictionary.next}</span>
          <ChevronRight size={16} className="block sm:hidden" />
        </Button>
      </div>
    </div>
  );
}
