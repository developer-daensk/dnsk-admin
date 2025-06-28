import React from 'react';
import { Form, Radio, Row, Col, Input } from 'antd';
import { PRODUCT } from '@/resources/product/product';

interface AdditionalOptionsProps {
  product: {
    hasPallet: boolean;
    palletType: string;
    hasExchangeablePallet: boolean;
    isDangerousGood: boolean;
    isFragile: boolean;
    stackable: boolean;
    neutralPackaging: boolean;
    isTemperatureSensitive: boolean;
    maxTemperature: number;
    minTemperature: number;
    isDeliverySensitive: boolean;
    maxDeliveryTimeInHours: number;
  };
  handleChange: (field: string, value: boolean | number | string) => void;
}

const AdditionalOptions: React.FC<AdditionalOptionsProps> = ({ product, handleChange }) => {
  return (
    <>
      <Form.Item label={PRODUCT.ADDITIONAL_OPTIONS.PALLET} labelCol={{ span: 24 }}>
        <Radio.Group
          onChange={e => handleChange('hasPallet', e.target.value)}
          value={product.hasPallet}
        >
          <Radio value={true}>Have</Radio>
          <Radio value={false}>Have Not</Radio>
        </Radio.Group>
      </Form.Item>
      {product.hasPallet && (
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Form.Item
              name="palletType"
              label={PRODUCT.ADDITIONAL_OPTIONS.PALLET_TYPE}
              labelCol={{ span: 24 }}
              rules={[{ required: true, message: 'Please select or enter a pallet type' }]}
            >
              <Input
                value={product.palletType}
                onChange={e => handleChange('palletType', e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label={PRODUCT.ADDITIONAL_OPTIONS.EXCHANGEABLE_PALLET}
              labelCol={{ span: 24 }}
            >
              <Radio.Group
                onChange={e => handleChange('hasExchangeablePallet', e.target.value)}
                value={product.hasExchangeablePallet}
              >
                <Radio value={true}>Yes</Radio>
                <Radio value={false}>No</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
      )}
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Form.Item label={PRODUCT.ADDITIONAL_OPTIONS.DANGEROUS} labelCol={{ span: 24 }}>
            <Radio.Group
              onChange={e => handleChange('isDangerousGood', e.target.value)}
              value={product.isDangerousGood}
            >
              <Radio value={true}>Yes</Radio>
              <Radio value={false}>No</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label={PRODUCT.ADDITIONAL_OPTIONS.FRAGILE} labelCol={{ span: 24 }}>
            <Radio.Group
              onChange={e => handleChange('isFragile', e.target.value)}
              value={product.isFragile}
            >
              <Radio value={true}>Yes</Radio>
              <Radio value={false}>No</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label={PRODUCT.ADDITIONAL_OPTIONS.STACKABLE} labelCol={{ span: 24 }}>
            <Radio.Group
              onChange={e => handleChange('stackable', e.target.value)}
              value={product.stackable}
            >
              <Radio value={true}>Yes</Radio>
              <Radio value={false}>No</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label={PRODUCT.ADDITIONAL_OPTIONS.NEUTRAL_PACKAGING} labelCol={{ span: 24 }}>
            <Radio.Group
              onChange={e => handleChange('neutralPackaging', e.target.value)}
              value={product.neutralPackaging}
            >
              <Radio value={true}>Yes</Radio>
              <Radio value={false}>No</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>
      <Form.Item label={PRODUCT.ADDITIONAL_OPTIONS.TEMPERATURE_SENSITIVITY} labelCol={{ span: 24 }}>
        <Radio.Group
          onChange={e => handleChange('isTemperatureSensitive', e.target.value)}
          value={product.isTemperatureSensitive}
        >
          <Radio value={true}>Yes</Radio>
          <Radio value={false}>No</Radio>
        </Radio.Group>
      </Form.Item>
      {product.isTemperatureSensitive && (
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Form.Item
              name="maxTemperature"
              label={PRODUCT.ADDITIONAL_OPTIONS.MAX_TEMPERATURE}
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
                step="0.1"
                value={product.maxTemperature}
                onChange={e => handleChange('maxTemperature', Number(e.target.value))}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="minTemperature"
              label={PRODUCT.ADDITIONAL_OPTIONS.MIN_TEMPERATURE}
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
                step="0.1"
                value={product.minTemperature}
                onChange={e => handleChange('minTemperature', Number(e.target.value))}
              />
            </Form.Item>
          </Col>
        </Row>
      )}
      <Form.Item label={PRODUCT.ADDITIONAL_OPTIONS.DELIVERY_SENSITIVITY} labelCol={{ span: 24 }}>
        <Radio.Group
          onChange={e => handleChange('isDeliverySensitive', e.target.value)}
          value={product.isDeliverySensitive}
        >
          <Radio value={true}>Yes</Radio>
          <Radio value={false}>No</Radio>
        </Radio.Group>
      </Form.Item>
      {product.isDeliverySensitive && (
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Form.Item
              name="maxDeliveryTimeInHours"
              label={PRODUCT.ADDITIONAL_OPTIONS.MAX_DELIVERY_TIME_IN_HOURS}
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
                step="0.1"
                value={product.maxDeliveryTimeInHours}
                onChange={e => handleChange('maxDeliveryTimeInHours', Number(e.target.value))}
              />
            </Form.Item>
          </Col>
        </Row>
      )}
    </>
  );
};

export default AdditionalOptions;
