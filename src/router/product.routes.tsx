import ProductManagement from '@/pages/product/ProductManagement';
import ProductTag from '@/pages/product/ProductTag';
import ProductVariation from '@/pages/product/ProductVariation';

import ProductAttributes from '@/pages/product/product-attributes';
import ProductForm from '@/components/ProductManagement/ProductForm';

const ProductRoutes = {
  path: 'products',
  meta: {
    title: 'Products',
    description: 'Product management',
  },
  children: [
    {
      path: 'management',
      element: <ProductManagement />,
      meta: {
        title: 'Product Management',
        description: 'View all products',
      },
    },
    {
      path: 'tags',
      element: <ProductTag />,
      meta: {
        title: 'Product Tags',
        description: 'Add Tags to products',
      },
    },
    {
      path: 'attributes',
      element: <ProductAttributes />,
      meta: {
        title: 'Product Attributes',
        description: 'Add attributes to products',
      },
    },
    {
      path: 'variations',
      element: <ProductVariation />,
      meta: {
        title: 'Product Variations',
        description: 'Manage product variations',
      },
    },
    {
      path: 'create',
      element: <ProductForm />,
      meta: {
        title: 'Create Product',
        description: 'Create a new product',
      },
    },
    {
      path: 'edit/:id',
      element: <ProductForm />,
      meta: {
        title: 'Edit Product',
        description: 'Edit product by ID',
      },
    },
  ],
};

export default ProductRoutes;
