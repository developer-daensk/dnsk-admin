import React from 'react';
import { Form, Input, Col, Row } from 'antd';
import { PRODUCT } from '@/resources/product/product';

interface PricingAndQuantityProps {
  product: {
    pricePerPackage: number;
    pricePerUnit: number;
    minimumOrderQuantity: number;
    maximumQuantityPerOrder: number;
  };
  handleChange: (field: string, value: number) => void;
}

const PricingAndQuantity: React.FC<PricingAndQuantityProps> = ({ product, handleChange }) => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={8}>
        <Form.Item
          name="pricePerPackage"
          label={PRODUCT.PRICING_AND_QUANTITY.PRICE_PER_PACKAGE}
          labelCol={{ span: 24 }}
          rules={[
            {
              validator: (_: unknown, value: number) =>
                value > 0
                  ? Promise.resolve()
                  : Promise.reject(PRODUCT.PRICING_AND_QUANTITY.POSITIVE_NUMBER),
            },
          ]}
        >
          <Input
            type="number"
            step="0.01"
            value={product.pricePerPackage}
            onChange={e => handleChange('pricePerPackage', Number(e.target.value))}
          />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item
          name="pricePerUnit"
          label={PRODUCT.PRICING_AND_QUANTITY.PRICE_PER_UNIT}
          labelCol={{ span: 24 }}
          rules={[
            {
              validator: (_: unknown, value: number) =>
                value > 0
                  ? Promise.resolve()
                  : Promise.reject(PRODUCT.PRICING_AND_QUANTITY.POSITIVE_NUMBER),
            },
          ]}
        >
          <Input
            type="number"
            step="0.01"
            value={product.pricePerUnit}
            onChange={e => handleChange('pricePerUnit', Number(e.target.value))}
          />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item
          name="minimumOrderQuantity"
          label={PRODUCT.PRICING_AND_QUANTITY.MINIMUM_ORDER_QUANTITY}
          labelCol={{ span: 24 }}
          rules={[
            {
              validator: (_: unknown, value: number) =>
                value > 0
                  ? Promise.resolve()
                  : Promise.reject(PRODUCT.PRICING_AND_QUANTITY.POSITIVE_NUMBER),
            },
          ]}
        >
          <Input
            type="number"
            step="1"
            value={product.minimumOrderQuantity}
            onChange={e => handleChange('minimumOrderQuantity', Number(e.target.value))}
          />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item
          name="maximumQuantityPerOrder"
          label={PRODUCT.PRICING_AND_QUANTITY.MAXIMUM_QUANTITY_PER_ORDER}
          labelCol={{ span: 24 }}
          rules={[
            {
              validator: (_: unknown, value: number) =>
                value > 0
                  ? Promise.resolve()
                  : Promise.reject(PRODUCT.PRICING_AND_QUANTITY.POSITIVE_NUMBER),
            },
          ]}
        >
          <Input
            type="number"
            step="1"
            value={product.maximumQuantityPerOrder}
            onChange={e => handleChange('maximumQuantityPerOrder', Number(e.target.value))}
          />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default PricingAndQuantity;
