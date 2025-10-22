"use client";
import React from "react";
import { Button } from "@/Components/Shadcn/button";
import { Badge } from "@/Components/Shadcn/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/Components/Shadcn/tooltip";
import { Edit, CheckCircle, XCircle } from "lucide-react";
import { useProductStore } from "@/store/productStore";
import { ProductVariant } from "@/types/product.types";
import { PRODUCT_VARIANT_STATUS } from "@/lib/constants/product";
import { getDictionary } from "./i18n";
import { iLocale } from "@/Components/Entity/Locale/types";
import ResponsiveTable from "@/Components/Entity/ResponsiveTable/ResponsiveTable";
import { iResponsiveColumn } from "@/Components/Entity/ResponsiveTable/types";
import { appRoutes } from "@/lib/routes/appRoutes";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
interface ProductVariantsEditListProps {
  variants?: ProductVariant[];
  onEditVariant?: (variantId: string) => void;
  locale: iLocale;
}

const ProductVariantsEditList: React.FC<ProductVariantsEditListProps> = ({
  variants = [],
  onEditVariant,
  locale,
}) => {
  const dictionary = getDictionary(locale);
  const { productVariants, updateProductVariant } = useProductStore();
  const router = useRouter();
  const { productId } = useParams();

  // Use store variants if available, otherwise use props or mock data
  const dataSource =
    productVariants.length > 0
      ? productVariants
      : variants.length > 0
        ? variants
        : [];

  // Define responsive table columns
  const columns: iResponsiveColumn<ProductVariant>[] = [
    {
      label: "",
      cell: ({ row }) => (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  onEditVariant?.(row.id);
                }}
                className="transition-all duration-200 hover:scale-105 hover:border-blue-500"
              >
                <Edit className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{dictionary.editVariant}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ),
    },
    {
      label: dictionary.table.attribute,
      cell: ({ row }) => (
        <Badge variant="outline" className="font-medium">
          {row.attribute}
        </Badge>
      ),
    },
    {
      label: dictionary.table.option,
      cell: ({ row }) => (
        <Badge variant="outline" className="font-medium">
          {row.option}
        </Badge>
      ),
    },
    {
      label: "IDIN",
      cell: ({ row }) => row.idin || "-",
    },
    {
      label: dictionary.table.baseData,
      cell: ({ row }) =>
        getStatusBadge(
          row.baseDataStatus,
          row.baseDataStatus === PRODUCT_VARIANT_STATUS.COMPLETED
            ? dictionary.status.completed
            : dictionary.status.open,
          row.id,
          "baseDataStatus"
        ),
    },
    {
      label: dictionary.table.specifications,
      cell: ({ row }) =>
        getStatusBadge(
          row.specificationsStatus,
          row.specificationsStatus === PRODUCT_VARIANT_STATUS.COMPLETED
            ? dictionary.status.completed
            : dictionary.status.open,
          row.id,
          "specificationsStatus"
        ),
    },
    {
      label: dictionary.table.listings,
      cell: ({ row }) =>
        getStatusBadge(
          row.listingsStatus,
          row.listingsStatus === PRODUCT_VARIANT_STATUS.COMPLETED
            ? dictionary.status.completed
            : dictionary.status.open,
          row.id,
          "listingsStatus"
        ),
    },
  ];

  const handleStatusToggle = (
    variantId: string,
    field: "baseDataStatus" | "specificationsStatus" | "listingsStatus"
  ) => {
    const variant = dataSource.find((v: ProductVariant) => v.id === variantId);
    if (!variant) return;

    const newStatus =
      variant[field] === PRODUCT_VARIANT_STATUS.OPEN
        ? PRODUCT_VARIANT_STATUS.COMPLETED
        : PRODUCT_VARIANT_STATUS.OPEN;

    updateProductVariant(variantId, { [field]: newStatus });
  };

  const getStatusBadge = (
    status:
      | typeof PRODUCT_VARIANT_STATUS.OPEN
      | typeof PRODUCT_VARIANT_STATUS.COMPLETED,
    text: string,
    variantId: string,
    field: "baseDataStatus" | "specificationsStatus" | "listingsStatus"
  ) => {
    const isCompleted = status === PRODUCT_VARIANT_STATUS.COMPLETED;

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge
              variant={isCompleted ? "default" : "secondary"}
              className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                isCompleted
                  ? "bg-green-100 text-green-800 hover:bg-green-200"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
              onClick={() => handleStatusToggle(variantId, field)}
            >
              {isCompleted ? (
                <CheckCircle className="w-3 h-3 mr-1" />
              ) : (
                <XCircle className="w-3 h-3 mr-1" />
              )}
              {text}
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p>{dictionary.clickToToggle}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  // Show message if no variants are available
  if (dataSource.length === 0) {
    return (
      <div className="p-6 bg-white rounded-lg text-center">
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-1">
            {dictionary.title.editArticles}
          </h2>
          <p className="text-sm text-gray-600">
            {dictionary.subtitle.editArticles}
          </p>
        </div>
        <p className="text-sm text-gray-600">{dictionary.noVariants}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold">
            {dictionary.title.editArticles}
          </h2>
          <p className="text-sm text-gray-600">
            {dictionary.subtitle.editArticles}
          </p>
        </div>
        <Button
          onClick={() =>
            router.push(
              appRoutes.dashboard.product.search.variants.edit.information(
                locale,
                productId as string
              )
            )
          }
        >
          {dictionary.button.editArticles}
        </Button>
      </div>

      <div className="bg-white rounded-lg border">
        <ResponsiveTable
          data={dataSource}
          columns={columns}
          rowKey="id"
          breakpoint="lg"
          className="w-full"
          rowProps={({ row }) => ({
            className: "cursor-pointer hover:bg-gray-50 transition-colors",
            onClick: () => console.log("Row clicked:", row.id),
          })}
        />
      </div>
    </div>
  );
};

export default ProductVariantsEditList;
