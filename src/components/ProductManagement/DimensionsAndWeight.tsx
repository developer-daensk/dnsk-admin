import React from 'react';
import { Form, Input, Col, Row, Select } from 'antd';
import { PRODUCT } from '@/resources/product/product';

const { Option } = Select;

interface DimensionsAndWeightProps {
  product: {
    weight: number;
    weightUnit: string;
    widthInMillimeter: number;
    heightInMillimeter: number;
    depthInMillimeter: number;
  };
  handleChange: (field: string, value: number | string) => void;
}

const DimensionsAndWeight: React.FC<DimensionsAndWeightProps> = ({ product, handleChange }) => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={8}>
        <Form.Item
          name="widthInMillimeter"
          label={PRODUCT.DIMENSIONS_AND_WEIGHT.WIDTH}
          labelCol={{ span: 24 }}
          rules={[
            {
              validator: (_: unknown, value: number) =>
                value > 0 ? Promise.resolve() : Promise.reject('Must be a positive number'),
            },
          ]}
        >
          <Input
            type="number"
            step="0.01"
            value={product.widthInMillimeter}
            onChange={e => handleChange('widthInMillimeter', Number(e.target.value))}
          />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item
          name="heightInMillimeter"
          label={PRODUCT.DIMENSIONS_AND_WEIGHT.HEIGHT}
          labelCol={{ span: 24 }}
          rules={[
            {
              validator: (_: unknown, value: number) =>
                value > 0 ? Promise.resolve() : Promise.reject('Must be a positive number'),
            },
          ]}
        >
          <Input
            type="number"
            step="0.01"
            value={product.heightInMillimeter}
            onChange={e => handleChange('heightInMillimeter', Number(e.target.value))}
          />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item
          name="depthInMillimeter"
          label={PRODUCT.DIMENSIONS_AND_WEIGHT.DEPTH}
          labelCol={{ span: 24 }}
          rules={[
            {
              validator: (_: unknown, value: number) =>
                value > 0 ? Promise.resolve() : Promise.reject('Must be a positive number'),
            },
          ]}
        >
          <Input
            type="number"
            step="0.01"
            value={product.depthInMillimeter}
            onChange={e => handleChange('depthInMillimeter', Number(e.target.value))}
          />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item
          name="weight"
          label={PRODUCT.DIMENSIONS_AND_WEIGHT.WEIGHT_AMOUNT}
          labelCol={{ span: 24 }}
          rules={[
            {
              validator: (_: unknown, value: number) =>
                value > 0 ? Promise.resolve() : Promise.reject('Must be a positive number'),
            },
          ]}
        >
          <Input
            type="number"
            step="0.01"
            value={product.weight}
            onChange={e => handleChange('weight', Number(e.target.value))}
          />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item
          name="weightUnit"
          label={PRODUCT.DIMENSIONS_AND_WEIGHT.WEIGHT_UNIT}
          labelCol={{ span: 24 }}
          rules={[{ required: true, message: PRODUCT.DIMENSIONS_AND_WEIGHT.SELECT_WEIGHT_UNIT }]}
        >
          <Select value={product.weightUnit} onChange={value => handleChange('weightUnit', value)}>
            <Option value="g">g</Option>
            <Option value="kg">kg</Option>
            <Option value="lb">lb</Option>
            <Option value="oz">oz</Option>
          </Select>
        </Form.Item>
      </Col>
    </Row>
  );
};

export default DimensionsAndWeight;
