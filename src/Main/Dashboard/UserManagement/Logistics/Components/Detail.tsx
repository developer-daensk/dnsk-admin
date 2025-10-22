import { getDictionary } from "../i18n";
import { iLocale } from "@/Components/Entity/Locale/types";
import { LogisticsRow } from "../types";

import { Truck, Bell, MapPin } from "lucide-react";

interface DetailProps {
  logistics: LogisticsRow;
  locale: iLocale;
}

export default function Detail({ logistics, locale }: DetailProps) {
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

  function getTypeIcon(type: string) {
    switch (type) {
      case "truck":
        return <Truck className="h-4 w-4 text-blue-600" />;
      case "alarm":
        return <Bell className="h-4 w-4 text-orange-600" />;
      case "location":
        return <MapPin className="h-4 w-4 text-green-600" />;
      default:
        return <MapPin className="h-4 w-4 text-gray-600" />;
    }
  }

  function getTypeText(type: string) {
    return dictionary.type[type as keyof typeof dictionary.type] || type;
  }

  return (
    <div className="space-y-4 p-4">
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="text-muted-foreground">
          {dictionary.table.logisticNr}
        </div>
        <div className="font-medium">{logistics.logisticNr}</div>

        <div className="text-muted-foreground">{dictionary.table.name}</div>
        <div className="text-primary">{logistics.name}</div>

        <div className="text-muted-foreground">{dictionary.table.type}</div>
        <div className="flex items-center gap-2">
          {getTypeIcon(logistics.type)}
          <span>{getTypeText(logistics.type)}</span>
        </div>

        <div className="text-muted-foreground">{dictionary.table.region}</div>
        <div className="text-blue-600 font-medium">{logistics.region}</div>

        <div className="text-muted-foreground">{dictionary.table.location}</div>
        <div className="text-blue-600 font-medium">{logistics.location}</div>

        <div className="text-muted-foreground">{dictionary.table.tours}</div>
        <div className="text-emerald-600 font-medium">
          {logistics.tours.toLocaleString()}
        </div>

        <div className="text-muted-foreground">
          {dictionary.table.salesVolume}
        </div>
        <div className="text-emerald-600 font-medium">
          {formatCurrency(logistics.salesVolume)} €
        </div>
      </div>
    </div>
  );
}
