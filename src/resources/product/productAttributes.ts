export const PRODUCT_ATTRIBUTES = {
  TITLE: 'Product Attributes',
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
      DELETE_CONFIRM_TITLE: 'Delete Product Attribute',
      DELETE_CONFIRM_CONTENT:
        'Are you sure you want to delete this product attribute? This action cannot be undone.',
      DELETE_SUCCESS: 'Product attribute deleted successfully',
    },
  },
  PAGINATION: {
    PAGE_SIZE_OPTIONS: ['10', '20', '50', '100'] as (string | number)[],
  },
  ERRORS: {
    FETCH_FAILED: 'Failed to fetch product attributes',
    CREATE_FAILED: 'Failed to create product attribute',
    UPDATE_FAILED: 'Failed to update product attribute',
    DELETE_FAILED: 'Failed to delete product attribute',
  },
  TOAST: {
    ADD_SUCCESS: 'Product attribute added successfully!',
    ADD_FAILED: 'Failed to add Product attribute.',
    EDIT_SUCCESS: 'Product attribute updated successfully!',
    EDIT_FAILED: 'Failed to update Product attribute.',
    DELETE_SUCCESS: 'Product attribute deleted successfully',
  },
  MODAL: {
    TITLE: 'Product Attribute',
    ACTIONS: {
      SAVE: 'Save',
      CANCEL: 'Cancel',
    },
    FIELDS: {
      NAME: {
        LABEL: 'Attribute Name',
        PLACEHOLDER: 'Enter attribute name',
        REQUIRED: 'Please enter attribute name',
      },
      DESCRIPTION: {
        LABEL: 'Attribute Description',
        PLACEHOLDER: 'e.g. Product color',
      },
    },
  },
} as const;
