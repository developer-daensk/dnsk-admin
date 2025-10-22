"use client";

import React, { useState } from "react";
import { Button } from "@/Components/Shadcn/button";
import { Input } from "@/Components/Shadcn/input";
import { Label } from "@/Components/Shadcn/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/Shadcn/select";
import { Textarea } from "@/Components/Shadcn/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/Components/Shadcn/card";
import { Separator } from "@/Components/Shadcn/separator";

import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { getDictionary } from "./i18n";
import { EditOrderData, EditOrderItem, OrdersEditProps } from "./types";
import { appRoutes } from "@/lib/routes/appRoutes";

const OrdersEdit: React.FC<OrdersEditProps> = ({ locale }) => {
  const router = useRouter();
  const dictionary = getDictionary(locale);

  // Mock order data - in real app this would come from props or API
  const mockOrder: EditOrderData = {
    orderNumber: "ORD-2024-001",
    status: "pending",
    paymentStatus: "pending",
    paymentMethod: "credit_card",
    trackingNumber: "",
    notes: "",
    customerName: "John Doe",
    customerEmail: "john@example.com",
    customerPhone: "+1-555-0123",
    customerAddress: "123 Main St",
    customerCity: "New York",
    customerState: "NY",
    customerZipCode: "10001",
    customerCountry: "USA",
    items: [
      {
        id: "1",
        productId: "prod-1",
        productName: "Product 1",
        variation: "Red",
        quantity: 2,
        unitPrice: 25.0,
        totalPrice: 50.0,
      },
      {
        id: "2",
        productId: "prod-2",
        productName: "Product 2",
        variation: "Blue",
        quantity: 1,
        unitPrice: 30.0,
        totalPrice: 30.0,
      },
    ],
    subtotal: 80.0,
    tax: 8.0,
    shipping: 12.0,
    total: 100.0,
  };

  const [formData, setFormData] = useState<EditOrderData>(mockOrder);
  const [loading, setLoading] = useState(false);

  // Calculate totals when items change
  const calculateTotals = (items: EditOrderItem[]) => {
    const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
    const tax = formData.tax;
    const shipping = formData.shipping;
    const total = subtotal + tax + shipping;

    setFormData((prev) => ({
      ...prev,
      subtotal,
      total,
      items,
    }));
  };

  // Update item total price when quantity or unit price changes
  const updateItemTotalPrice = (
    index: number,
    quantity?: number,
    unitPrice?: number
  ) => {
    const updatedItems = [...formData.items];
    const item = updatedItems[index];

    if (quantity !== undefined) item.quantity = quantity;
    if (unitPrice !== undefined) item.unitPrice = unitPrice;

    item.totalPrice = item.quantity * item.unitPrice;
    updatedItems[index] = item;

    calculateTotals(updatedItems);
  };

  // Remove an order item
  const removeItem = (index: number) => {
    const updatedItems = formData.items.filter((_, i) => i !== index);
    calculateTotals(updatedItems);
  };

  // Add a new order item
  const addItem = () => {
    const newItem: EditOrderItem = {
      id: `temp-${Date.now()}`,
      productId: "",
      productName: "",
      quantity: 1,
      unitPrice: 0,
      totalPrice: 0,
    };

    const updatedItems = [...formData.items, newItem];
    calculateTotals(updatedItems);
  };

  // Handle form field changes
  const handleFieldChange = (
    field: keyof EditOrderData,
    value: string | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Handle customer address changes
  const handleCustomerAddressChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Order updated:", formData);

      // Redirect back to orders list
      router.push(appRoutes.dashboard.orders.root(locale));
    } catch (error) {
      console.error("Error updating order:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    router.push(appRoutes.dashboard.orders.root(locale));
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {dictionary.title} #{formData.orderNumber}
          </h1>
          <p className="text-muted-foreground mt-2">
            Order created on {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Order Information */}
        <Card>
          <CardHeader>
            <CardTitle>{dictionary.sections.orderInformation}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="orderNumber">
                  {dictionary.labels.orderNumber}
                </Label>
                <Input
                  id="orderNumber"
                  value={formData.orderNumber}
                  onChange={(e) =>
                    handleFieldChange("orderNumber", e.target.value)
                  }
                  placeholder={dictionary.placeholders.orderNumber}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">{dictionary.labels.status}</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleFieldChange("status", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(dictionary.statusOptions).map(
                      ([key, value]) => (
                        <SelectItem key={key} value={key}>
                          {value}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="paymentStatus">
                  {dictionary.labels.paymentStatus}
                </Label>
                <Select
                  value={formData.paymentStatus}
                  onValueChange={(value) =>
                    handleFieldChange("paymentStatus", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(dictionary.paymentStatusOptions).map(
                      ([key, value]) => (
                        <SelectItem key={key} value={key}>
                          {value}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="paymentMethod">
                  {dictionary.labels.paymentMethod}
                </Label>
                <Select
                  value={formData.paymentMethod}
                  onValueChange={(value) =>
                    handleFieldChange("paymentMethod", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(dictionary.paymentMethodOptions).map(
                      ([key, value]) => (
                        <SelectItem key={key} value={key}>
                          {value}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="trackingNumber">
                  {dictionary.labels.trackingNumber}
                </Label>
                <Input
                  id="trackingNumber"
                  value={formData.trackingNumber}
                  onChange={(e) =>
                    handleFieldChange("trackingNumber", e.target.value)
                  }
                  placeholder={dictionary.placeholders.trackingNumber}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customer Information */}
        <Card>
          <CardHeader>
            <CardTitle>{dictionary.sections.customerInformation}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="customerName">
                  {dictionary.labels.customerName}
                </Label>
                <Input
                  id="customerName"
                  value={formData.customerName}
                  onChange={(e) =>
                    handleCustomerAddressChange("customerName", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="customerEmail">
                  {dictionary.labels.customerEmail}
                </Label>
                <Input
                  id="customerEmail"
                  type="email"
                  value={formData.customerEmail}
                  onChange={(e) =>
                    handleCustomerAddressChange("customerEmail", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="customerPhone">
                  {dictionary.labels.customerPhone}
                </Label>
                <Input
                  id="customerPhone"
                  value={formData.customerPhone}
                  onChange={(e) =>
                    handleCustomerAddressChange("customerPhone", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="customerAddress">
                  {dictionary.labels.customerAddress}
                </Label>
                <Input
                  id="customerAddress"
                  value={formData.customerAddress}
                  onChange={(e) =>
                    handleCustomerAddressChange(
                      "customerAddress",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="customerCity">
                  {dictionary.labels.customerCity}
                </Label>
                <Input
                  id="customerCity"
                  value={formData.customerCity}
                  onChange={(e) =>
                    handleCustomerAddressChange("customerCity", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="customerState">
                  {dictionary.labels.customerState}
                </Label>
                <Input
                  id="customerState"
                  value={formData.customerState}
                  onChange={(e) =>
                    handleCustomerAddressChange("customerState", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="customerZipCode">
                  {dictionary.labels.customerZipCode}
                </Label>
                <Input
                  id="customerZipCode"
                  value={formData.customerZipCode}
                  onChange={(e) =>
                    handleCustomerAddressChange(
                      "customerZipCode",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="customerCountry">
                  {dictionary.labels.customerCountry}
                </Label>
                <Input
                  id="customerCountry"
                  value={formData.customerCountry}
                  onChange={(e) =>
                    handleCustomerAddressChange(
                      "customerCountry",
                      e.target.value
                    )
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Items */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{dictionary.sections.orderItems}</CardTitle>
            <Button type="button" variant="outline" onClick={addItem}>
              <Plus className="h-4 w-4 mr-2" />
              {dictionary.actions.addItem}
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.items.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                {dictionary.messages.noItems}
              </div>
            ) : (
              <div className="space-y-4">
                {formData.items.map((item, index) => (
                  <div
                    key={item.id}
                    className="border rounded-lg p-4 space-y-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                      <div className="space-y-2">
                        <Label>{dictionary.labels.productName}</Label>
                        <Input
                          value={item.productName}
                          onChange={(e) => {
                            const updatedItems = [...formData.items];
                            updatedItems[index].productName = e.target.value;
                            calculateTotals(updatedItems);
                          }}
                          placeholder={dictionary.placeholders.productName}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>{dictionary.labels.variation}</Label>
                        <Input
                          value={item.variation || ""}
                          onChange={(e) => {
                            const updatedItems = [...formData.items];
                            updatedItems[index].variation = e.target.value;
                            calculateTotals(updatedItems);
                          }}
                          placeholder={dictionary.placeholders.variation}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>{dictionary.labels.quantity}</Label>
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            updateItemTotalPrice(
                              index,
                              parseInt(e.target.value) || 1
                            )
                          }
                          placeholder={dictionary.placeholders.quantity}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>{dictionary.labels.unitPrice}</Label>
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.unitPrice}
                          onChange={(e) =>
                            updateItemTotalPrice(
                              index,
                              undefined,
                              parseFloat(e.target.value) || 0
                            )
                          }
                          placeholder={dictionary.placeholders.unitPrice}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>{dictionary.labels.total}</Label>
                        <div className="text-lg font-semibold">
                          ${item.totalPrice.toFixed(2)}
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(index)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Order Summary */}
            <Separator />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{dictionary.labels.subtotal}</Label>
                    <Input
                      value={formData.subtotal.toFixed(2)}
                      disabled
                      className="text-right"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>{dictionary.labels.tax}</Label>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.tax}
                      onChange={(e) => {
                        const tax = parseFloat(e.target.value) || 0;
                        setFormData((prev) => ({
                          ...prev,
                          tax,
                          total: prev.subtotal + tax + prev.shipping,
                        }));
                      }}
                      placeholder={dictionary.placeholders.price}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>{dictionary.labels.shipping}</Label>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.shipping}
                      onChange={(e) => {
                        const shipping = parseFloat(e.target.value) || 0;
                        setFormData((prev) => ({
                          ...prev,
                          shipping,
                          total: prev.subtotal + prev.tax + shipping,
                        }));
                      }}
                      placeholder={dictionary.placeholders.price}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>{dictionary.labels.total}</Label>
                    <Input
                      value={formData.total.toFixed(2)}
                      disabled
                      className="text-right font-semibold"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-2">
                    {dictionary.messages.orderTotal}
                  </div>
                  <div className="text-4xl font-bold">
                    ${formData.total.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Notes */}
        <Card>
          <CardHeader>
            <CardTitle>{dictionary.sections.additionalNotes}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="notes">{dictionary.labels.notes}</Label>
              <Textarea
                id="notes"
                rows={4}
                value={formData.notes}
                onChange={(e) => handleFieldChange("notes", e.target.value)}
                placeholder={dictionary.placeholders.notes}
              />
            </div>
          </CardContent>
        </Card>

        {/* Bottom Actions */}
        <div className="flex items-center justify-end space-x-4">
          <Button type="button" variant="outline" onClick={handleCancel}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            {dictionary.actions.cancel}
          </Button>
          <Button type="submit" disabled={loading}>
            <Save className="h-4 w-4 mr-2" />
            {loading ? "Saving..." : dictionary.actions.saveChanges}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default OrdersEdit;
