import React, { useEffect, useState } from 'react';
import { Form, Select, Button, Row, Col, Space, Divider, Tooltip, message } from 'antd';
import { SaveOutlined, DeleteOutlined, PlusOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Order, OrderItem } from '@/types/order.types';
import dayjs from 'dayjs';
import { ShippingCalculationService } from '@/services/shippingCalculation.service';
import { useResourceHelpers } from '@/utils/i18nBridge';
import {
  StyledContainer,
  StyledHeader,
  StyledCard,
  OrderItemsEmpty,
  ItemRow,
  BottomActions,
  TotalDisplay,
  StyledFormItem,
  StyledInput,
  StyledSelect,
  StyledInputNumber,
  StyledTextArea,
  StyledText,
  StyledHeaderTitle,
} from './OrderForm.styled';

const { Option } = Select;

interface OrderFormValues {
  orderNumber: string;
  status: Order['status'];
  paymentStatus: Order['paymentStatus'];
  paymentMethod: Order['paymentMethod'];
  trackingNumber: string;
  notes: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  customerCity: string;
  customerState: string;
  customerZipCode: string;
  customerCountry: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}

interface OrderFormProps {
  order: Order;
  loading?: boolean;
  onSubmit: (values: OrderFormValues) => void;
  onCancel: () => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ order, loading = false, onSubmit, onCancel }) => {
  const [form] = Form.useForm();
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [shippingCalculating, setShippingCalculating] = useState(false);
  const [estimatedDeliveryTime, setEstimatedDeliveryTime] = useState<string>('');
  const [shippingCalculationMethod, setShippingCalculationMethod] = useState<
    'distance-based' | 'default'
  >('default');
  const shippingService = new ShippingCalculationService();

  // Get reactive translation helpers that update when language changes
  const resourceHelpers = useResourceHelpers();

  // Calculate totals based on items
  const calculateTotals = (items: OrderItem[]) => {
    const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
    const tax = form.getFieldValue('tax') || 0;
    const shipping = form.getFieldValue('shipping') || 0;
    const total = subtotal + tax + shipping;

    form.setFieldsValue({ subtotal, total });
    return { subtotal, tax, shipping, total };
  };

  // Calculate shipping based on customer address and truck location
  const calculateShippingCost = async () => {
    const customerData = {
      id: order?.customer.id || '',
      name: form.getFieldValue('customerName') || '',
      email: form.getFieldValue('customerEmail') || '',
      phone: form.getFieldValue('customerPhone') || '',
      address: form.getFieldValue('customerAddress') || '',
      city: form.getFieldValue('customerCity') || '',
      state: form.getFieldValue('customerState') || '',
      zipCode: form.getFieldValue('customerZipCode') || '',
      country: form.getFieldValue('customerCountry') || '',
    };

    // Only calculate if we have minimal address information
    if (!customerData.city || !customerData.state) {
      return;
    }

    setShippingCalculating(true);

    try {
      const subtotal = orderItems.reduce((sum, item) => sum + item.totalPrice, 0);
      const result = await shippingService.calculateShipping(customerData, subtotal);

      form.setFieldValue('shipping', result.cost);
      setEstimatedDeliveryTime(result.estimatedDeliveryTime);
      setShippingCalculationMethod(result.calculationMethod);

      // Recalculate totals with new shipping cost
      calculateTotals(orderItems);

      if (result.calculationMethod === 'distance-based') {
        message.success(
          `${resourceHelpers.getTruckText('SHIPPING.CALCULATION_MESSAGES.SUCCESS')} ${result.estimatedDistance} miles`
        );
      }
    } catch (error) {
      console.error('Error calculating shipping:', error);
      message.warning(resourceHelpers.getTruckText('SHIPPING.CALCULATION_MESSAGES.ERROR'));
    } finally {
      setShippingCalculating(false);
    }
  };

  // Handle customer address changes
  const handleCustomerAddressChange = () => {
    // Debounce shipping calculation
    setTimeout(() => {
      calculateShippingCost();
    }, 1000);
  };

  // Update item total price when quantity or unit price changes
  const updateItemTotalPrice = (index: number, quantity?: number, unitPrice?: number) => {
    const updatedItems = [...orderItems];
    const item = updatedItems[index];

    if (quantity !== undefined) item.quantity = quantity;
    if (unitPrice !== undefined) item.unitPrice = unitPrice;

    item.totalPrice = item.quantity * item.unitPrice;
    updatedItems[index] = item;

    setOrderItems(updatedItems);
    form.setFieldValue('items', updatedItems);
    calculateTotals(updatedItems);

    // Recalculate shipping for new order value
    setTimeout(() => calculateShippingCost(), 500);
  };

  // Remove an order item
  const removeItem = (index: number) => {
    const updatedItems = orderItems.filter((_, i) => i !== index);
    setOrderItems(updatedItems);
    form.setFieldValue('items', updatedItems);
    calculateTotals(updatedItems);

    // Recalculate shipping for new order value
    setTimeout(() => calculateShippingCost(), 500);
  };

  // Add a new order item
  const addItem = () => {
    const newItem: OrderItem = {
      id: `temp-${Date.now()}`,
      productId: '',
      productName: '',
      quantity: 1,
      unitPrice: 0,
      totalPrice: 0,
      variation: '',
    };

    const updatedItems = [...orderItems, newItem];
    setOrderItems(updatedItems);
    form.setFieldValue('items', updatedItems);
  };

  // Handle tax or shipping changes
  const handleFinancialFieldChange = () => {
    setTimeout(() => calculateTotals(orderItems), 0);
  };

  // Pre-populate form fields when order data changes
  useEffect(() => {
    if (order) {
      const initialItems = [...order.items];
      setOrderItems(initialItems);

      form.setFieldsValue({
        orderNumber: order.orderNumber,
        status: order.status,
        paymentStatus: order.paymentStatus,
        paymentMethod: order.paymentMethod,
        trackingNumber: order.trackingNumber || '',
        notes: order.notes || '',
        customerName: order.customer.name,
        customerEmail: order.customer.email,
        customerPhone: order.customer.phone,
        customerAddress: order.customer.address,
        customerCity: order.customer.city,
        customerState: order.customer.state,
        customerZipCode: order.customer.zipCode,
        customerCountry: order.customer.country,
        items: initialItems,
        subtotal: order.subtotal,
        tax: order.tax,
        shipping: order.shipping,
        total: order.total,
      });

      // Calculate shipping for existing order
      setTimeout(() => calculateShippingCost(), 1000);
    }
  }, [order, form]);

  return (
    <StyledContainer>
      {/* Header */}
      <StyledHeader>
        <Row justify="space-between" align="middle">
          <Col>
            <StyledHeaderTitle level={2}>
              {resourceHelpers.getOrderText('ORDER_FORM.HEADER.TITLE')} #{order.orderNumber}
            </StyledHeaderTitle>

            <div style={{ marginTop: '4px' }}>
              <StyledText type="secondary">
                {resourceHelpers.getOrderText('ORDER_FORM.HEADER.CREATED')}{' '}
                {dayjs(order.createdAt).format(
                  resourceHelpers.getOrderText('ORDER_FORM.DATE_FORMAT')
                )}
              </StyledText>
            </div>
          </Col>
        </Row>
      </StyledHeader>

      <Form id="order-form" form={form} layout="vertical" onFinish={onSubmit}>
        <Row gutter={[24, 24]}>
          {/* Order Information */}
          <Col span={24}>
            <StyledCard
              title={resourceHelpers.getOrderText('ORDER_FORM.SECTIONS.ORDER_INFORMATION')}
            >
              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <StyledFormItem
                    name="orderNumber"
                    label={resourceHelpers.getOrderText('ORDER_FORM.LABELS.ORDER_NUMBER')}
                    rules={[
                      {
                        required: true,
                        message: resourceHelpers.getOrderText(
                          'ORDER_FORM.VALIDATION_MESSAGES.ORDER_NUMBER_REQUIRED'
                        ),
                      },
                    ]}
                  >
                    <StyledInput
                      placeholder={resourceHelpers.getOrderText(
                        'ORDER_FORM.PLACEHOLDERS.ORDER_NUMBER'
                      )}
                    />
                  </StyledFormItem>
                </Col>
                <Col span={8}>
                  <StyledFormItem
                    name="status"
                    label={resourceHelpers.getOrderText('ORDER_FORM.LABELS.STATUS')}
                    rules={[
                      {
                        required: true,
                        message: resourceHelpers.getOrderText(
                          'ORDER_FORM.VALIDATION_MESSAGES.STATUS_REQUIRED'
                        ),
                      },
                    ]}
                  >
                    <StyledSelect>
                      <Option value="pending">
                        {resourceHelpers.getOrderText('ORDER_FORM.STATUS_OPTIONS.PENDING')}
                      </Option>
                      <Option value="processing">
                        {resourceHelpers.getOrderText('ORDER_FORM.STATUS_OPTIONS.PROCESSING')}
                      </Option>
                      <Option value="shipped">
                        {resourceHelpers.getOrderText('ORDER_FORM.STATUS_OPTIONS.SHIPPED')}
                      </Option>
                      <Option value="delivered">
                        {resourceHelpers.getOrderText('ORDER_FORM.STATUS_OPTIONS.DELIVERED')}
                      </Option>
                      <Option value="cancelled">
                        {resourceHelpers.getOrderText('ORDER_FORM.STATUS_OPTIONS.CANCELLED')}
                      </Option>
                      <Option value="refunded">
                        {resourceHelpers.getOrderText('ORDER_FORM.STATUS_OPTIONS.REFUNDED')}
                      </Option>
                    </StyledSelect>
                  </StyledFormItem>
                </Col>
                <Col span={8}>
                  <StyledFormItem
                    name="paymentStatus"
                    label={resourceHelpers.getOrderText('ORDER_FORM.LABELS.PAYMENT_STATUS')}
                    rules={[
                      {
                        required: true,
                        message: resourceHelpers.getOrderText(
                          'ORDER_FORM.VALIDATION_MESSAGES.PAYMENT_STATUS_REQUIRED'
                        ),
                      },
                    ]}
                  >
                    <StyledSelect>
                      <Option value="pending">
                        {resourceHelpers.getOrderText('ORDER_FORM.PAYMENT_STATUS_OPTIONS.PENDING')}
                      </Option>
                      <Option value="paid">
                        {resourceHelpers.getOrderText('ORDER_FORM.PAYMENT_STATUS_OPTIONS.PAID')}
                      </Option>
                      <Option value="failed">
                        {resourceHelpers.getOrderText('ORDER_FORM.PAYMENT_STATUS_OPTIONS.FAILED')}
                      </Option>
                      <Option value="refunded">
                        {resourceHelpers.getOrderText('ORDER_FORM.PAYMENT_STATUS_OPTIONS.REFUNDED')}
                      </Option>
                    </StyledSelect>
                  </StyledFormItem>
                </Col>
                <Col span={8}>
                  <StyledFormItem
                    name="paymentMethod"
                    label={resourceHelpers.getOrderText('ORDER_FORM.LABELS.PAYMENT_METHOD')}
                  >
                    <StyledSelect>
                      <Option value="credit_card">
                        {resourceHelpers.getOrderText(
                          'ORDER_FORM.PAYMENT_METHOD_OPTIONS.CREDIT_CARD'
                        )}
                      </Option>
                      <Option value="paypal">
                        {resourceHelpers.getOrderText('ORDER_FORM.PAYMENT_METHOD_OPTIONS.PAYPAL')}
                      </Option>
                      <Option value="bank_transfer">
                        {resourceHelpers.getOrderText(
                          'ORDER_FORM.PAYMENT_METHOD_OPTIONS.BANK_TRANSFER'
                        )}
                      </Option>
                      <Option value="cash_on_delivery">
                        {resourceHelpers.getOrderText(
                          'ORDER_FORM.PAYMENT_METHOD_OPTIONS.CASH_ON_DELIVERY'
                        )}
                      </Option>
                    </StyledSelect>
                  </StyledFormItem>
                </Col>
                <Col span={8}>
                  <StyledFormItem
                    name="trackingNumber"
                    label={resourceHelpers.getOrderText('ORDER_FORM.LABELS.TRACKING_NUMBER')}
                  >
                    <StyledInput
                      placeholder={resourceHelpers.getOrderText(
                        'ORDER_FORM.PLACEHOLDERS.TRACKING_NUMBER'
                      )}
                    />
                  </StyledFormItem>
                </Col>
              </Row>
            </StyledCard>
          </Col>

          {/* Customer Information */}
          <Col span={24}>
            <StyledCard
              title={resourceHelpers.getOrderText('ORDER_FORM.SECTIONS.CUSTOMER_INFORMATION')}
            >
              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <StyledFormItem
                    name="customerName"
                    label={resourceHelpers.getOrderText('ORDER_FORM.LABELS.CUSTOMER_NAME')}
                    rules={[
                      {
                        required: true,
                        message: resourceHelpers.getOrderText(
                          'ORDER_FORM.VALIDATION_MESSAGES.CUSTOMER_NAME_REQUIRED'
                        ),
                      },
                    ]}
                  >
                    <StyledInput />
                  </StyledFormItem>
                </Col>
                <Col span={8}>
                  <StyledFormItem
                    name="customerEmail"
                    label={resourceHelpers.getOrderText('ORDER_FORM.LABELS.CUSTOMER_EMAIL')}
                    rules={[
                      {
                        required: true,
                        message: resourceHelpers.getOrderText(
                          'ORDER_FORM.VALIDATION_MESSAGES.EMAIL_REQUIRED'
                        ),
                      },
                      {
                        type: 'email',
                        message: resourceHelpers.getOrderText(
                          'ORDER_FORM.VALIDATION_MESSAGES.EMAIL_INVALID'
                        ),
                      },
                    ]}
                  >
                    <StyledInput />
                  </StyledFormItem>
                </Col>
                <Col span={8}>
                  <StyledFormItem
                    name="customerPhone"
                    label={resourceHelpers.getOrderText('ORDER_FORM.LABELS.CUSTOMER_PHONE')}
                    rules={[
                      {
                        required: true,
                        message: resourceHelpers.getOrderText(
                          'ORDER_FORM.VALIDATION_MESSAGES.PHONE_REQUIRED'
                        ),
                      },
                    ]}
                  >
                    <StyledInput />
                  </StyledFormItem>
                </Col>
                <Col span={12}>
                  <StyledFormItem
                    name="customerAddress"
                    label={resourceHelpers.getOrderText('ORDER_FORM.LABELS.CUSTOMER_ADDRESS')}
                    rules={[
                      {
                        required: true,
                        message: resourceHelpers.getOrderText(
                          'ORDER_FORM.VALIDATION_MESSAGES.ADDRESS_REQUIRED'
                        ),
                      },
                    ]}
                  >
                    <StyledInput />
                  </StyledFormItem>
                </Col>
                <Col span={6}>
                  <StyledFormItem
                    name="customerCity"
                    label={resourceHelpers.getOrderText('ORDER_FORM.LABELS.CUSTOMER_CITY')}
                    rules={[
                      {
                        required: true,
                        message: resourceHelpers.getOrderText(
                          'ORDER_FORM.VALIDATION_MESSAGES.CITY_REQUIRED'
                        ),
                      },
                    ]}
                  >
                    <StyledInput onChange={handleCustomerAddressChange} />
                  </StyledFormItem>
                </Col>
                <Col span={3}>
                  <StyledFormItem
                    name="customerState"
                    label={resourceHelpers.getOrderText('ORDER_FORM.LABELS.CUSTOMER_STATE')}
                    rules={[
                      {
                        required: true,
                        message: resourceHelpers.getOrderText(
                          'ORDER_FORM.VALIDATION_MESSAGES.STATE_REQUIRED'
                        ),
                      },
                    ]}
                  >
                    <StyledInput onChange={handleCustomerAddressChange} />
                  </StyledFormItem>
                </Col>
                <Col span={3}>
                  <StyledFormItem
                    name="customerZipCode"
                    label={resourceHelpers.getOrderText('ORDER_FORM.LABELS.CUSTOMER_ZIP_CODE')}
                    rules={[
                      {
                        required: true,
                        message: resourceHelpers.getOrderText(
                          'ORDER_FORM.VALIDATION_MESSAGES.ZIP_CODE_REQUIRED'
                        ),
                      },
                    ]}
                  >
                    <StyledInput onChange={handleCustomerAddressChange} />
                  </StyledFormItem>
                </Col>
                <Col span={6}>
                  <StyledFormItem
                    name="customerCountry"
                    label={resourceHelpers.getOrderText('ORDER_FORM.LABELS.CUSTOMER_COUNTRY')}
                    rules={[
                      {
                        required: true,
                        message: resourceHelpers.getOrderText(
                          'ORDER_FORM.VALIDATION_MESSAGES.COUNTRY_REQUIRED'
                        ),
                      },
                    ]}
                  >
                    <StyledInput />
                  </StyledFormItem>
                </Col>
              </Row>
            </StyledCard>
          </Col>

          {/* Order Items */}
          <Col span={24}>
            <StyledCard
              title={resourceHelpers.getOrderText('ORDER_FORM.SECTIONS.ORDER_ITEMS')}
              extra={
                <Button type="dashed" icon={<PlusOutlined />} onClick={addItem}>
                  {resourceHelpers.getOrderText('ORDER_FORM.ACTIONS.ADD_ITEM')}
                </Button>
              }
            >
              {orderItems.length === 0 ? (
                <OrderItemsEmpty>
                  {resourceHelpers.getOrderText('ORDER_FORM.MESSAGES.NO_ITEMS')}
                </OrderItemsEmpty>
              ) : (
                <div>
                  {orderItems.map((item, index) => (
                    <ItemRow key={item.id || index}>
                      <Row gutter={[16, 8]} align="middle" style={{ padding: '12px 0' }}>
                        <Col span={6}>
                          <StyledInput
                            placeholder={resourceHelpers.getOrderText(
                              'ORDER_FORM.PLACEHOLDERS.PRODUCT_NAME'
                            )}
                            value={item.productName}
                            onChange={e => {
                              const updatedItems = [...orderItems];
                              updatedItems[index].productName = e.target.value;
                              setOrderItems(updatedItems);
                              form.setFieldValue('items', updatedItems);
                            }}
                          />
                        </Col>
                        <Col span={4}>
                          <StyledInput
                            placeholder={resourceHelpers.getOrderText(
                              'ORDER_FORM.PLACEHOLDERS.VARIATION'
                            )}
                            value={item.variation || ''}
                            onChange={e => {
                              const updatedItems = [...orderItems];
                              updatedItems[index].variation = e.target.value;
                              setOrderItems(updatedItems);
                              form.setFieldValue('items', updatedItems);
                            }}
                          />
                        </Col>
                        <Col span={3}>
                          <StyledInputNumber
                            placeholder={resourceHelpers.getOrderText(
                              'ORDER_FORM.PLACEHOLDERS.QUANTITY'
                            )}
                            min={1}
                            value={item.quantity}
                            onChange={value =>
                              updateItemTotalPrice(index, typeof value === 'number' ? value : 1)
                            }
                            style={{ width: '100%' }}
                          />
                        </Col>
                        <Col span={4}>
                          <StyledInputNumber
                            placeholder={resourceHelpers.getOrderText(
                              'ORDER_FORM.PLACEHOLDERS.UNIT_PRICE'
                            )}
                            min={0}
                            step={0.01}
                            value={item.unitPrice}
                            onChange={value =>
                              updateItemTotalPrice(
                                index,
                                undefined,
                                typeof value === 'number' ? value : 0
                              )
                            }
                            style={{ width: '100%' }}
                            formatter={value => `$ ${value}`}
                            parser={value => parseFloat(value!.replace(/\$\s?|(,*)/g, '')) || 0}
                          />
                        </Col>
                        <Col span={4}>
                          <StyledText strong>${item.totalPrice.toFixed(2)}</StyledText>
                        </Col>
                        <Col span={3} style={{ textAlign: 'right' }}>
                          <Tooltip
                            title={resourceHelpers.getOrderText('ORDER_FORM.ACTIONS.REMOVE_ITEM')}
                          >
                            <Button
                              type="text"
                              danger
                              icon={<DeleteOutlined />}
                              onClick={() => removeItem(index)}
                            />
                          </Tooltip>
                        </Col>
                      </Row>
                    </ItemRow>
                  ))}
                </div>
              )}

              {/* Order Summary */}
              <Divider />
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Row gutter={[16, 16]}>
                    <Col span={12}>
                      <StyledFormItem
                        name="subtotal"
                        label={resourceHelpers.getOrderText('ORDER_FORM.LABELS.SUBTOTAL')}
                      >
                        <StyledInputNumber
                          disabled
                          style={{ width: '100%' }}
                          formatter={value => `$ ${value}`}
                        />
                      </StyledFormItem>
                    </Col>
                    <Col span={12}>
                      <StyledFormItem
                        name="tax"
                        label={resourceHelpers.getOrderText('ORDER_FORM.LABELS.TAX')}
                      >
                        <StyledInputNumber
                          min={0}
                          step={0.01}
                          style={{ width: '100%' }}
                          placeholder={resourceHelpers.getOrderText(
                            'ORDER_FORM.PLACEHOLDERS.PRICE'
                          )}
                          onChange={handleFinancialFieldChange}
                          formatter={value => `$ ${value}`}
                        />
                      </StyledFormItem>
                    </Col>
                    <Col span={12}>
                      <StyledFormItem
                        name="shipping"
                        label={
                          <Space>
                            {resourceHelpers.getOrderText('ORDER_FORM.LABELS.SHIPPING')}
                            {shippingCalculationMethod === 'distance-based' &&
                              estimatedDeliveryTime && (
                                <Tooltip
                                  title={`${resourceHelpers.getTruckText('MODAL.TOOLTIPS.ESTIMATED_DELIVERY')}: ${estimatedDeliveryTime}`}
                                >
                                  <span style={{ color: '#52c41a', fontSize: '12px' }}>
                                    (
                                    {resourceHelpers.getTruckText('MODAL.TOOLTIPS.AUTO_CALCULATED')}
                                    )
                                  </span>
                                </Tooltip>
                              )}
                          </Space>
                        }
                      >
                        <StyledInputNumber
                          min={0}
                          step={0.01}
                          style={{ width: '100%' }}
                          placeholder={resourceHelpers.getOrderText(
                            'ORDER_FORM.PLACEHOLDERS.PRICE'
                          )}
                          onChange={handleFinancialFieldChange}
                          formatter={value => `$ ${value}`}
                          disabled={shippingCalculating}
                        />
                      </StyledFormItem>
                    </Col>
                    <Col span={12}>
                      <StyledFormItem
                        name="total"
                        label={resourceHelpers.getOrderText('ORDER_FORM.LABELS.TOTAL')}
                      >
                        <StyledInputNumber
                          disabled
                          style={{ width: '100%' }}
                          formatter={value => `$ ${value}`}
                        />
                      </StyledFormItem>
                    </Col>
                  </Row>
                </Col>
                <Col
                  span={12}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <TotalDisplay>
                    <StyledText className="total-label">
                      {resourceHelpers.getOrderText('ORDER_FORM.MESSAGES.ORDER_TOTAL')}
                    </StyledText>
                    <div className="total-amount">
                      ${form.getFieldValue('total')?.toFixed(2) || '0.00'}
                    </div>
                  </TotalDisplay>
                </Col>
              </Row>
            </StyledCard>
          </Col>

          {/* Notes */}
          <Col span={24}>
            <StyledCard
              title={resourceHelpers.getOrderText('ORDER_FORM.SECTIONS.ADDITIONAL_NOTES')}
            >
              <StyledFormItem name="notes">
                <StyledTextArea
                  rows={4}
                  placeholder={resourceHelpers.getOrderText('ORDER_FORM.PLACEHOLDERS.NOTES')}
                />
              </StyledFormItem>
            </StyledCard>
          </Col>

          {/* Bottom Actions */}
          <Col span={24}>
            <BottomActions>
              <Space>
                <Button icon={<ArrowLeftOutlined />} onClick={onCancel}>
                  {resourceHelpers.getOrderText('ORDER_FORM.ACTIONS.CANCEL')}
                </Button>
                <Button type="primary" htmlType="submit" loading={loading} icon={<SaveOutlined />}>
                  {resourceHelpers.getOrderText('ORDER_FORM.ACTIONS.SAVE_CHANGES')}
                </Button>
              </Space>
            </BottomActions>
          </Col>
        </Row>
      </Form>
    </StyledContainer>
  );
};

export default OrderForm;
export type { OrderFormValues };
