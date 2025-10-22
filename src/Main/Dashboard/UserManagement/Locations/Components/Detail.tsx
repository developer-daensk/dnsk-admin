import { getDictionary } from "../i18n";
import { iLocale } from "@/Components/Entity/Locale/types";
import { LocationRow } from "../types";
import { Badge } from "@/Components/Shadcn/badge";

interface DetailProps {
  location: LocationRow;
  locale: iLocale;
}

export default function Detail({ location, locale }: DetailProps) {
  const dictionary = getDictionary(locale);

  function formatCurrency(value: number) {
    try {
      return value.toLocaleString(locale, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    } catch {
      return value.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }
  }

  return (
    <div className="space-y-4 p-4">
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="text-muted-foreground">{dictionary.table.code}</div>
        <div className="font-medium">{location.code}</div>

        <div className="text-muted-foreground">{dictionary.table.user}</div>
        <div className="text-primary">{location.user}</div>

        <div className="text-muted-foreground">{dictionary.table.area}</div>
        <div>
          <Badge variant="outline">{location.area}</Badge>
        </div>

        <div className="text-muted-foreground">{dictionary.table.cover}</div>
        <div>
          <Badge
            variant={location.cover === "JA" ? "secondary" : "destructive"}
          >
            {location.cover}
          </Badge>
        </div>

        <div className="text-muted-foreground">{dictionary.table.articles}</div>
        <div className="text-emerald-600 font-medium">{location.articles}</div>

        <div className="text-muted-foreground">{dictionary.table.logistic}</div>
        <div>
          <Badge variant="outline">{location.logistic}</Badge>
        </div>

        <div className="text-muted-foreground">
          {dictionary.table.salesVolume}
        </div>
        <div className="text-emerald-600 font-medium">
          {formatCurrency(location.salesVolume)} €
        </div>

        <div className="text-muted-foreground">
          {dictionary.table.createdAt}
        </div>
        <div className="text-orange-500">{location.createdAt}</div>
      </div>
    </div>
  );
}
