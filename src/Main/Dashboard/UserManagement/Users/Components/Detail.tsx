import { getDictionary } from "../i18n";
import { iLocale } from "@/Components/Entity/Locale/types";
import { UsersRow } from "../types";
import { Badge } from "@/Components/Shadcn/badge";
import { ShoppingCart, Building, Truck } from "lucide-react";

interface DetailProps {
  user: UsersRow;
  locale: iLocale;
}

export default function Detail({ user, locale }: DetailProps) {
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
      case "shopping":
        return <ShoppingCart className="h-4 w-4 text-blue-600" />;
      case "business":
        return <Building className="h-4 w-4 text-green-600" />;
      case "logistics":
        return <Truck className="h-4 w-4 text-orange-600" />;
      default:
        return null;
    }
  }

  function getTypeText(type: string) {
    return dictionary.type[type as keyof typeof dictionary.type] || type;
  }

  function getStatusVariant(status: string) {
    switch (status) {
      case "active":
        return "secondary" as const;
      case "inactive":
        return "outline" as const;
      case "pending":
        return "default" as const;
      default:
        return "secondary" as const;
    }
  }

  function getOrdersColor(orders: number) {
    if (orders <= 50) return "text-orange-600";
    if (orders <= 150) return "text-blue-600";
    return "text-green-600";
  }

  function getAmountColor(amount: number) {
    if (amount <= 15000) return "text-orange-600";
    if (amount <= 35000) return "text-blue-600";
    return "text-green-600";
  }

  function getArticlesColor(articles: number) {
    if (articles === 0) return "text-red-600";
    if (articles <= 50) return "text-orange-600";
    if (articles <= 100) return "text-blue-600";
    return "text-green-600";
  }

  function getSalesColor(sales: number) {
    if (sales === 0) return "text-red-600";
    if (sales <= 100) return "text-orange-600";
    if (sales <= 150) return "text-blue-600";
    return "text-green-600";
  }

  return (
    <div className="space-y-4 p-4">
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="text-muted-foreground">{dictionary.table.userId}</div>
        <div className="font-medium">{user.userId}</div>

        <div className="text-muted-foreground">
          {dictionary.table.profileName}
        </div>
        <div className="text-primary">{user.profileName}</div>

        <div className="text-muted-foreground">{dictionary.table.type}</div>
        <div className="flex items-center gap-2">
          {user.type.map((type, index) => (
            <div key={index} className="flex items-center gap-1">
              {getTypeIcon(type)}
              <span className="text-xs">{getTypeText(type)}</span>
            </div>
          ))}
        </div>

        <div className="text-muted-foreground">
          {dictionary.table.activeLocations}
        </div>
        <div className="font-medium">{user.activeLocations}</div>

        <div className="text-muted-foreground">{dictionary.table.orders}</div>
        <div className={`font-medium ${getOrdersColor(user.orders)}`}>
          {user.orders.toLocaleString()}
        </div>

        <div className="text-muted-foreground">
          {dictionary.table.totalPurchaseAmount}
        </div>
        <div
          className={`font-medium ${getAmountColor(user.totalPurchaseAmount)}`}
        >
          {formatCurrency(user.totalPurchaseAmount)} €
        </div>

        <div className="text-muted-foreground">
          {dictionary.table.listedArticles}
        </div>
        <div className={`font-medium ${getArticlesColor(user.listedArticles)}`}>
          {user.listedArticles.toLocaleString()}
        </div>

        <div className="text-muted-foreground">{dictionary.table.sales}</div>
        <div className={`font-medium ${getSalesColor(user.sales)}`}>
          {user.sales.toLocaleString()}
        </div>

        <div className="text-muted-foreground">
          {dictionary.table.totalSalesAmount}
        </div>
        <div className={`font-medium ${getAmountColor(user.totalSalesAmount)}`}>
          {formatCurrency(user.totalSalesAmount)} €
        </div>

        <div className="text-muted-foreground">{dictionary.table.joinDate}</div>
        <div className="text-orange-500">{user.joinDate}</div>

        <div className="text-muted-foreground">{dictionary.table.status}</div>
        <div>
          <Badge variant={getStatusVariant(user.status)}>
            {dictionary.status[user.status]}
          </Badge>
        </div>
      </div>
    </div>
  );
}
