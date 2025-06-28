export const PRODUCT_VARIATION = {
  TITLE: 'Product Variation',
  TABLE: {
    COLUMNS: {
      NAME: 'Name',
      DESCRIPTION: 'Description',
    },
    NO_RESULTS: 'No results.',
    TOTAL_ITEMS: (total: number) => `Total ${total} items`,
    ACTIONS: {
      ADD: 'Add new',
      EDIT: 'Edit',
      DELETE: 'Delete',
      CANCEL: 'Cancel',
      DELETE_CONFIRM_TITLE: 'Delete Product Variation',
      DELETE_CONFIRM_CONTENT:
        'Are you sure you want to delete this product variation? This action cannot be undone.',
      DELETE_SUCCESS: 'Product variation deleted successfully',
    },
  },
  PAGINATION: {
    PAGE_SIZE_OPTIONS: ['10', '20', '50', '100'] as (string | number)[],
  },
  ERRORS: {
    FETCH_FAILED: 'Failed to fetch product variation',
    CREATE_FAILED: 'Failed to create product variation',
    UPDATE_FAILED: 'Failed to update product variation',
    DELETE_FAILED: 'Failed to delete product variation',
  },
  MODAL: {
    TITLE: 'Add Product Variation',
    EDIT_TITLE: 'Edit Product Variation',
    SUCCESS: 'Product variation created successfully',
    EDIT_SUCCESS: 'Product variation updated successfully',
    FIELDS: {
      NAME: {
        LABEL: 'Variation Name',
        PLACEHOLDER: 'Enter variation name',
        REQUIRED: 'Please enter variation name',
      },
      DESCRIPTION: {
        LABEL: 'Variation Description',
        PLACEHOLDER: 'Enter variation description (optional)',
      },
      UI_TYPE: {
        LABEL: 'UI Type',
        REQUIRED: 'Please select the UI type',
        OPTIONS: {
          BUTTON: 'Button',
          IMAGE_BUTTON: 'Image Button',
          CAPTIONED_BUTTON: 'Captioned Button',
          DROPDOWN: 'Dropdown',
        },
      },
      ITEMS: {
        NAME: {
          REQUIRED: 'Missing item name',
          PLACEHOLDER: 'Item Name',
        },
        VALUE: {
          REQUIRED: 'Missing item value',
          PLACEHOLDER: 'Item Value',
        },
        ADD_BUTTON: 'Add Item',
      },
    },
  },
} as const;
