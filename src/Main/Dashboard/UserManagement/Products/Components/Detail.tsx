import { getDictionary } from "../i18n";
import { iLocale } from "@/Components/Entity/Locale/types";
import { ProductsRow } from "../types";
import { Badge } from "@/Components/Shadcn/badge";
import { Switch } from "@/Components/Shadcn/switch";

interface DetailProps {
  product: ProductsRow;
  locale: iLocale;
}

export default function Detail({ product, locale }: DetailProps) {
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

  function getPicturesColor(pictures: number) {
    if (pictures === 0) return "text-red-600";
    if (pictures <= 2) return "text-orange-600";
    if (pictures <= 4) return "text-blue-600";
    return "text-green-600";
  }

  function getLocationColor(location: number) {
    if (location <= 5) return "text-orange-600";
    if (location <= 10) return "text-blue-600";
    return "text-green-600";
  }

  function getCrowdColor(crowd: number) {
    if (crowd <= 25) return "text-orange-600";
    if (crowd <= 100) return "text-blue-600";
    return "text-green-600";
  }

  function getSalesVolumeColor(salesVolume: number) {
    if (salesVolume <= 20000) return "text-orange-600";
    if (salesVolume <= 50000) return "text-blue-600";
    return "text-green-600";
  }

  return (
    <div className="space-y-4 p-4">
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="text-muted-foreground">{dictionary.table.artNr}</div>
        <div className="font-medium">{product.artNr}</div>

        <div className="text-muted-foreground">{dictionary.table.pictures}</div>
        <div className={`font-medium ${getPicturesColor(product.pictures)}`}>
          {product.pictures}
        </div>

        <div className="text-muted-foreground">{dictionary.table.title}</div>
        <div className="text-primary">{product.title}</div>

        <div className="text-muted-foreground">{dictionary.table.location}</div>
        <div className={`font-medium ${getLocationColor(product.location)}`}>
          {product.location}
        </div>

        <div className="text-muted-foreground">{dictionary.table.crowd}</div>
        <div className={`font-medium ${getCrowdColor(product.crowd)}`}>
          {product.crowd}
        </div>

        <div className="text-muted-foreground">
          {dictionary.table.salesVolume}
        </div>
        <div
          className={`font-medium ${getSalesVolumeColor(product.salesVolume)}`}
        >
          {formatCurrency(product.salesVolume)} €
        </div>

        <div className="text-muted-foreground">{dictionary.table.status}</div>
        <div className="flex items-center gap-2">
          <Switch checked={product.status === "active"} disabled />
          <span
            className={
              product.status === "active" ? "text-blue-600" : "text-gray-600"
            }
          >
            {dictionary.status[product.status]}
          </span>
        </div>
      </div>
    </div>
  );
}
