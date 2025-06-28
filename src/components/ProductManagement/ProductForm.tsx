import React, { useState } from 'react';
import { ProductType } from '../../types/product.types';
import { Form, Button, Spin, message, Steps } from 'antd';
import BasicInformation from './BasicInformation';
import DimensionsAndWeight from './DimensionsAndWeight';
import PricingAndQuantity from './PricingAndQuantity';
import AdditionalOptions from './AdditionalOptions';
import { ProductService } from '../../services/product.service';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../lib/constants';
import { PRODUCT } from '@/resources/product/product';

const productService = new ProductService();

const { Step } = Steps;

const defaultProduct: ProductType = {
  name: '',
  description: '',
  extraInformation: '',
  excerpt: '',
  condition: '',
  idin: '',
  attributes: [],
  variationItemIds: [],
  images: [],
  tags: [],
  preparationTimeInHours: 0,
  reservableSpanInHours: 0,
  weight: 0,
  weightUnit: '',
  defaultDischargeType: '',
  widthInMillimeter: 0,
  heightInMillimeter: 0,
  depthInMillimeter: 0,
  epalInCent: 0,
  ewpInCent: 0,
  ldm: '',
  hasPallet: false,
  palletType: '',
  hasExchangeablePallet: false,
  palletCost: 0,
  isDangerousGood: false,
  isFragile: false,
  stackable: false,
  neutralPackaging: false,
  minimumOrderQuantity: 0,
  maximumQuantityPerOrder: 0,
  maximumQuantityPerPallet: 0,
  minimumQuantityPerOrder: 0,
  maxStackableItemUnits: 0,
  pricePerPackage: 0,
  pricePerUnit: 0,
  package: '',
  unit: '',
  isStackable: false,
  maxStackableUnits: 0,
  productGroupId: '',
  productGroupSlug: '',
  ean: '',
  upc: '',
  quantityStepUnit: 0,
  isTemperatureSensitive: false,
  maxTemperature: 0,
  minTemperature: 0,
  isDeliverySensitive: false,
  maxDeliveryTimeInHours: 0,
  itemUnitQuantity: 0,
  itemUnitPerPackage: 0,
  batchId: '',
};

const ProductForm = () => {
  const [product, setProduct] = useState<ProductType>(defaultProduct);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await productService.create(product);
      message.success('Product submitted successfully!');
      form.resetFields();
      setProduct(defaultProduct);
      navigate(ROUTES.PRODUCT_MANAGEMENT);
    } catch {
      message.error('Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    field: string,
    value:
      | string
      | number
      | boolean
      | string[]
      | { title: string; value: string; description: string; rank: number }[]
  ) => {
    setProduct(prev => {
      const updatedProduct = { ...prev, [field]: value };
      if (field === 'isTemperatureSensitive' && !value) {
        updatedProduct.maxTemperature = 0;
        updatedProduct.minTemperature = 0;
      }
      return updatedProduct;
    });
  };

  const handleCancel = () => {
    form.resetFields();
    navigate(ROUTES.PRODUCT_MANAGEMENT);
  };

  const steps = [
    {
      title: PRODUCT.FORM_STEPS.BASIC_INFORMATION,
      content: <BasicInformation product={product} handleChange={handleChange} />,
    },
    {
      title: PRODUCT.FORM_STEPS.DIMENSIONS_AND_WEIGHT,
      content: <DimensionsAndWeight product={product} handleChange={handleChange} />,
    },
    {
      title: PRODUCT.FORM_STEPS.PRICING_AND_QUANTITY,
      content: <PricingAndQuantity product={product} handleChange={handleChange} />,
    },
    {
      title: PRODUCT.FORM_STEPS.ADDITIONAL_OPTIONS,
      content: <AdditionalOptions product={product} handleChange={handleChange} />,
    },
  ];

  const next = () => {
    setCurrentStep(currentStep + 1);
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <Spin spinning={loading} tip="Submitting...">
      <Form form={form} onFinish={handleSubmit} initialValues={product}>
        <h2 style={{ marginBottom: '20px' }}>Product Form</h2>
        <Steps current={currentStep}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div style={{ marginTop: '20px' }}>{steps[currentStep].content}</div>
        <div style={{ marginTop: '20px' }}>
          {currentStep === steps.length - 1 && (
            <Button type="primary" htmlType="submit" style={{ marginTop: '20px' }}>
              Save
            </Button>
          )}

          {currentStep < steps.length - 1 && (
            <Button type="primary" style={{ margin: '0 4px' }} onClick={next}>
              Next
            </Button>
          )}
          {currentStep > 0 && (
            <Button style={{ margin: '0 4px' }} onClick={prev}>
              Previous
            </Button>
          )}
          <Button style={{ margin: '0 4px' }} onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </Form>
    </Spin>
  );
};

export default ProductForm;
