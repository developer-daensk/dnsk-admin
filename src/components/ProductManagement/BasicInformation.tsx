import React, { useEffect, useState } from 'react';
import { Form, Input, Col, Row, Tooltip, Select, message } from 'antd';
import { ProductTagsService } from '../../services/product-tags.service';
import { ProductTag } from '@/types/product-tags.types';
import { PRODUCT_TAGS } from '@/resources/product/productTags';
import { ProductVariationsService } from '../../services/product-variations.service';
import { ProductVariationType } from '@/types/product-variation.type';
import { ProductAttributesService } from '../../services/product-attributes.service';
import { ProductAttributeType } from '../../types/product.types';
import { ProductType } from '@/types/product.types';
import ImageUploader from '@/components/common/ImageUploader';
import { PRODUCT } from '@/resources/product/product';
import { useDispatch } from 'react-redux';
import { updateProduct } from '../../store/slices/productSlice';

const { Option } = Select;

const productTagsService = new ProductTagsService();
const productVariationsService = new ProductVariationsService();
const productAttributesService = new ProductAttributesService();

interface BasicInformationProps {
  product: ProductType;
  handleChange: (
    field: string,
    value:
      | string
      | number
      | boolean
      | string[]
      | { title: string; value: string; description: string; rank: number }[]
  ) => void;
}

const BasicInformation: React.FC<BasicInformationProps> = ({ product, handleChange }) => {
  const [tags, setTags] = useState<ProductTag[]>([]);
  const [variations, setVariations] = useState<ProductVariationType[]>([]);
  const [attributes, setAttributes] = useState<ProductAttributeType[]>([]);
  const dispatch = useDispatch();

  const fetchProductTags = async () => {
    try {
      const response = await productTagsService.getAll();
      if (response.data) {
        setTags(response.data);
      } else {
        message.error(PRODUCT_TAGS.ERRORS.FETCH_FAILED);
        console.error('Failed to fetch product tags:', response);
      }
    } catch (error) {
      message.error(PRODUCT_TAGS.ERRORS.FETCH_FAILED);
      console.error('Error fetching product tags:', error);
    }
  };

  const fetchProductVariations = async () => {
    try {
      const response = await productVariationsService.getAll();
      if (response.data) {
        setVariations(response.data);
      } else {
        message.error('Failed to fetch product variations');
        console.error('Failed to fetch product variations:', response);
      }
    } catch (error) {
      message.error('Failed to fetch product variations');
      console.error('Error fetching product variations:', error);
    }
  };

  const fetchProductAttributes = async () => {
    try {
      const response = await productAttributesService.getAll();
      if (response.data) {
        setAttributes(response.data);
      } else {
        message.error('Failed to fetch product attributes');
        console.error('Failed to fetch product attributes:', response);
      }
    } catch (error) {
      message.error('Failed to fetch product attributes');
      console.error('Error fetching product attributes:', error);
    }
  };

  useEffect(() => {
    fetchProductTags();
    fetchProductVariations();
    fetchProductAttributes();
  }, []);

  return (
    <Row gutter={[16, 16]}>
      <Col span={12}>
        <Form.Item
          name="name"
          label={PRODUCT.BASIC_INFORMATION.NAME}
          labelCol={{ span: 24 }}
          rules={[{ required: true, message: PRODUCT.BASIC_INFORMATION.ENTER_NAME }]}
        >
          <Tooltip title="Enter the full name of the product">
            <Input
              style={{ height: '40px', borderRadius: '4px' }}
              value={product.name}
              onChange={e => handleChange('name', e.target.value)}
            />
          </Tooltip>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="idin"
          label={PRODUCT.BASIC_INFORMATION.IDIN}
          labelCol={{ span: 24 }}
          rules={[{ required: true, message: PRODUCT.BASIC_INFORMATION.ENTER_IDIN }]}
        >
          <Tooltip title="Enter the unique IDIN for the product">
            <Input
              style={{ height: '40px', borderRadius: '4px' }}
              value={product.idin}
              onChange={e => handleChange('idin', e.target.value)}
            />
          </Tooltip>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="condition"
          label={PRODUCT.BASIC_INFORMATION.CONDITION}
          labelCol={{ span: 24 }}
          rules={[{ required: true, message: PRODUCT.BASIC_INFORMATION.SELECT_CONDITION }]}
        >
          <Tooltip title="Specify the condition of the product">
            <Select
              style={{ height: '40px', borderRadius: '4px' }}
              value={product.condition}
              onChange={value => handleChange('condition', value)}
            >
              <Option value="new">New</Option>
              <Option value="used">Used</Option>
              <Option value="refurbished">Refurbished</Option>
            </Select>
          </Tooltip>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="tags"
          label={PRODUCT.BASIC_INFORMATION.PRODUCT_TAGS}
          labelCol={{ span: 24 }}
          rules={[{ required: true, message: PRODUCT.BASIC_INFORMATION.SELECT_TAGS }]}
        >
          <Tooltip title="Select tags relevant to the product">
            <Select
              mode="multiple"
              placeholder="Select tags"
              showSearch={false}
              style={{ height: '40px', borderRadius: '4px' }}
              value={product.tags}
              onChange={value => handleChange('tags', value)}
            >
              {tags.map(tag => (
                <Option key={tag.id} value={tag.id}>
                  {tag.title}
                </Option>
              ))}
            </Select>
          </Tooltip>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="variations"
          label={PRODUCT.BASIC_INFORMATION.PRODUCT_VARIATIONS}
          labelCol={{ span: 24 }}
          rules={[{ required: true, message: PRODUCT.BASIC_INFORMATION.SELECT_VARIATIONS }]}
        >
          <Tooltip title="Select variations relevant to the product">
            <Select
              mode="multiple"
              placeholder="Select variations"
              showSearch={false}
              style={{ height: '40px', borderRadius: '4px' }}
              value={product.variationItemIds}
              onChange={value => handleChange('variationItemIds', value)}
            >
              {variations.map(variation => (
                <Option key={variation.id} value={variation.id}>
                  {variation.name}
                </Option>
              ))}
            </Select>
          </Tooltip>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="attributes"
          label={PRODUCT.BASIC_INFORMATION.PRODUCT_ATTRIBUTES}
          labelCol={{ span: 24 }}
          rules={[{ required: true, message: PRODUCT.BASIC_INFORMATION.SELECT_ATTRIBUTES }]}
        >
          <Tooltip title="Select attributes relevant to the product">
            <Select
              mode="multiple"
              placeholder="Select attributes"
              showSearch={false}
              style={{ height: '40px', borderRadius: '4px' }}
              value={product.attributes.map(attr => attr.title)}
              onChange={value =>
                handleChange(
                  'attributes',
                  value.map(title => ({ title, value: '', description: '', rank: 0 }))
                )
              }
            >
              {attributes.map(attribute => (
                <Option key={attribute.title} value={attribute.title}>
                  {attribute.title}
                </Option>
              ))}
            </Select>
          </Tooltip>
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item name="excerpt" label={PRODUCT.BASIC_INFORMATION.EXCERPT} labelCol={{ span: 24 }}>
          <Tooltip title="A short excerpt for quick reference">
            <Input.TextArea
              style={{ borderRadius: '4px' }}
              value={product.excerpt}
              onChange={e => handleChange('excerpt', e.target.value)}
            />
          </Tooltip>
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item
          name="description"
          label={PRODUCT.BASIC_INFORMATION.DESCRIPTION}
          labelCol={{ span: 24 }}
        >
          <Tooltip title="Provide a detailed description of the product">
            <Input.TextArea
              style={{ borderRadius: '4px' }}
              value={product.description}
              onChange={e => handleChange('description', e.target.value)}
            />
          </Tooltip>
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item
          name="extraInformation"
          label={PRODUCT.BASIC_INFORMATION.EXTRA_INFORMATION}
          labelCol={{ span: 24 }}
        >
          <Tooltip title="Any additional information about the product">
            <Input.TextArea
              style={{ borderRadius: '4px' }}
              value={product.extraInformation}
              onChange={e => handleChange('extraInformation', e.target.value)}
            />
          </Tooltip>
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item
          name="images"
          label={PRODUCT.BASIC_INFORMATION.PRODUCT_IMAGES}
          labelCol={{ span: 24 }}
        >
          <ImageUploader
            onChange={(files: FileList) => {
              const imageUrls = Array.from(files).map(file => URL.createObjectURL(file as Blob));
              dispatch(updateProduct({ images: imageUrls }));
              handleChange('images', imageUrls);
            }}
            multiple={true}
            tooltip="Upload images of the product"
          />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default BasicInformation;
