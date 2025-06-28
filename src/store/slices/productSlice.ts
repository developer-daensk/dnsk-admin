import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductType } from '@/types/product.types';

interface ProductState {
  product: ProductType;
}

const initialState: ProductState = {
  product: {
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
  },
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    updateProduct(state, action: PayloadAction<Partial<ProductType>>) {
      state.product = { ...state.product, ...action.payload };
    },
    resetProduct(state) {
      state.product = initialState.product;
    },
  },
});

export const { updateProduct, resetProduct } = productSlice.actions;
export default productSlice.reducer;
