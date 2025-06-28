export const PRODUCT_TAGS = {
  TITLE: 'Product Tags',
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
      DELETE_CONFIRM_TITLE: 'Delete Product Tag',
      DELETE_CONFIRM_CONTENT:
        'Are you sure you want to delete this product tag? This action cannot be undone.',
      DELETE_SUCCESS: 'Product tag deleted successfully',
    },
  },
  PAGINATION: {
    PAGE_SIZE_OPTIONS: ['10', '20', '50', '100'] as (string | number)[],
  },
  ERRORS: {
    FETCH_FAILED: 'Failed to fetch product tags',
    CREATE_FAILED: 'Failed to create product tag',
    UPDATE_FAILED: 'Failed to update product tag',
    DELETE_FAILED: 'Failed to delete product tag',
  },
  MODAL: {
    TITLE: 'Add Product Tag',
    EDIT_TITLE: 'Edit Product Tag',
    SUCCESS: 'Product tag created successfully',
    EDIT_SUCCESS: 'Product tag updated successfully',
    FIELDS: {
      NAME: {
        LABEL: 'Tag Name',
        PLACEHOLDER: 'Enter tag name',
        REQUIRED: 'Please enter tag name',
      },
      DESCRIPTION: {
        LABEL: 'Tag Description',
        PLACEHOLDER: 'Enter tag description (optional)',
      },
    },
  },
} as const;
