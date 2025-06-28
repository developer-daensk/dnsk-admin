export const ORDERS = {
  TITLE: 'Orders Management',
  DESCRIPTION:
    'Manage all customer orders, track their status, process refunds, and export order data.',
  TRUCK_BUTTON: 'Your truck',

  SECTIONS: {
    OVERVIEW: 'Orders Overview',
    TABLE: 'Orders List',
    STATISTICS: 'Order Statistics',
  },

  STATISTICS: {
    TOTAL_ORDERS: 'Total Orders',
    PENDING_ORDERS: 'Pending Orders',
    PROCESSING_ORDERS: 'Processing',
    COMPLETED_ORDERS: 'Completed',
    TOTAL_REVENUE: 'Total Revenue',
    AVERAGE_ORDER_VALUE: 'Average Order Value',
  },

  TABLE: {
    COLUMNS: {
      ORDER_NUMBER: 'Order Number',
      DATE: 'Date',
      ADDRESS: 'Address',
      TOTAL: 'Total',
      QUANTITY: 'Quantity',
      STATUS: 'Status',
      ACTIONS: 'Actions',
      CUSTOMER: 'Customer',
      PAYMENT_STATUS: 'Payment',
      ITEMS: 'Items',
    },
    PLACEHOLDERS: {
      SEARCH:
        'Search within current tab by order number, customer info, products, dates, amounts, or tracking...',
    },
    ACTIONS: {
      VIEW: 'View Details',
      EDIT: 'Edit Order',
      UPDATE_STATUS: 'Update Status',
      PRINT: 'Print Invoice',
      TRACK: 'Track Shipment',
      CANCEL: 'Cancel Order',
      REFUND: 'Process Refund',
    },
    NO_RESULTS: 'No orders found',
    TOTAL_ITEMS: (total: number, range: [number, number]) =>
      `Showing ${range[0]}-${range[1]} of ${total} orders`,
    STATUS_UPDATED: 'Order status updated successfully',
    ERROR_UPDATE: 'Failed to update order status',
  },

  TABS: {
    OVERVIEW: 'Overview', // Shows all orders
    IN_PROGRESS: 'In Progress', // Shows pending + processing orders
    IN_DELIVERY: 'In Delivery', // Shows shipped orders
    REJECTED: 'Rejected', // Shows cancelled + refunded orders
  },

  BULK_ACTIONS: {
    LABEL: 'Bulk Actions',
    UPDATE_STATUS: 'Update Status',
    EXPORT: 'Export Selected',
    DELETE: 'Delete Selected',
    PRINT: 'Print Invoices',
  },

  QUICK_ACTIONS: {
    EXPORT_ALL: 'Export All',
    IMPORT: 'Import Orders',
    SETTINGS: 'Order Settings',
  },

  ERRORS: {
    FETCH_FAILED: 'Failed to fetch orders',
    UPDATE_FAILED: 'Failed to update order',
    DELETE_FAILED: 'Failed to delete order',
    EXPORT_FAILED: 'Failed to export orders',
  },

  PAGINATION: {
    PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
  },

  DETAILS_MODAL: {
    TITLE: 'Order Details',
    SUBTITLE: 'View comprehensive order information',
    ACTIONS: {
      COPY_ORDER_NUMBER: 'Copy Order Number',
      PRINT_ORDER: 'Print Order',
    },
    MESSAGES: {
      ORDER_NUMBER_COPIED: 'Order number copied to clipboard',
      PRINT_DIALOG_OPENED: 'Print dialog opened',
    },
    SECTIONS: {
      ORDER_PROGRESS: 'Order Progress',
      CUSTOMER_INFORMATION: 'Customer Information',
      ORDER_ITEMS: 'Order Items',
      PAYMENT_DETAILS: 'Payment Details',
      ORDER_SUMMARY: 'Order Summary',
      ORDER_NOTES: 'Order Notes',
    },
    LABELS: {
      CREATED: 'Created',
      CUSTOMER: 'Customer',
      EMAIL: 'Email',
      PHONE: 'Phone',
      SHIPPING_ADDRESS: 'Shipping Address',
      STATUS: 'Status',
      METHOD: 'Method',
      TRACKING: 'Tracking',
      SUBTOTAL: 'Subtotal:',
      TAX: 'Tax:',
      SHIPPING: 'Shipping:',
      TOTAL: 'Total:',
      VARIATION: 'Variation:',
      QUANTITY_SHORT: 'Qty:',
      ITEMS_COUNT: (count: number) => `${count} item${count !== 1 ? 's' : ''}`,
      ITEMS_SECTION_TITLE: (count: number) => `Order Items (${count} items)`,
    },
    STATUS_STEPS: {
      PENDING: {
        TITLE: 'Pending',
        DESCRIPTION: 'Order received',
      },
      PROCESSING: {
        TITLE: 'Processing',
        DESCRIPTION: 'Being prepared',
      },
      SHIPPED: {
        TITLE: 'Shipped',
        DESCRIPTION: 'On the way',
      },
      DELIVERED: {
        TITLE: 'Delivered',
        DESCRIPTION: 'Completed',
      },
    },
  },

  ORDER_FORM: {
    // Header
    HEADER: {
      TITLE: 'Edit Order',
      CREATED: 'Created',
    },

    // Form sections
    SECTIONS: {
      ORDER_INFORMATION: 'Order Information',
      CUSTOMER_INFORMATION: 'Customer Information',
      ORDER_ITEMS: 'Order Items',
      ADDITIONAL_NOTES: 'Additional Notes',
    },

    // Form labels
    LABELS: {
      ORDER_NUMBER: 'Order Number',
      STATUS: 'Status',
      PAYMENT_STATUS: 'Payment Status',
      PAYMENT_METHOD: 'Payment Method',
      TRACKING_NUMBER: 'Tracking Number',
      CUSTOMER_NAME: 'Name',
      CUSTOMER_EMAIL: 'Email',
      CUSTOMER_PHONE: 'Phone',
      CUSTOMER_ADDRESS: 'Address',
      CUSTOMER_CITY: 'City',
      CUSTOMER_STATE: 'State',
      CUSTOMER_ZIP_CODE: 'Zip Code',
      CUSTOMER_COUNTRY: 'Country',
      SUBTOTAL: 'Subtotal',
      TAX: 'Tax',
      SHIPPING: 'Shipping',
      TOTAL: 'Total',
      NOTES: 'Notes',
    },

    // Placeholders
    PLACEHOLDERS: {
      ORDER_NUMBER: 'Enter order number',
      TRACKING_NUMBER: 'Enter tracking number',
      PRODUCT_NAME: 'Product name',
      VARIATION: 'Variation',
      QUANTITY: 'Qty',
      UNIT_PRICE: 'Unit price',
      PRICE: '0.00',
      NOTES: 'Add any additional notes about this order...',
    },

    // Status options
    STATUS_OPTIONS: {
      PENDING: 'Pending',
      PROCESSING: 'Processing',
      SHIPPED: 'Shipped',
      DELIVERED: 'Delivered',
      CANCELLED: 'Cancelled',
      REFUNDED: 'Refunded',
    },

    // Payment status options
    PAYMENT_STATUS_OPTIONS: {
      PENDING: 'Pending',
      PAID: 'Paid',
      FAILED: 'Failed',
      REFUNDED: 'Refunded',
    },

    // Payment method options
    PAYMENT_METHOD_OPTIONS: {
      CREDIT_CARD: 'Credit Card',
      PAYPAL: 'PayPal',
      BANK_TRANSFER: 'Bank Transfer',
      CASH_ON_DELIVERY: 'Cash on Delivery',
    },

    // Validation messages
    VALIDATION_MESSAGES: {
      ORDER_NUMBER_REQUIRED: 'Please input order number!',
      STATUS_REQUIRED: 'Please select order status!',
      PAYMENT_STATUS_REQUIRED: 'Please select payment status!',
      CUSTOMER_NAME_REQUIRED: 'Please input customer name!',
      EMAIL_REQUIRED: 'Please input email!',
      EMAIL_INVALID: 'Please enter valid email!',
      PHONE_REQUIRED: 'Please input phone number!',
      ADDRESS_REQUIRED: 'Please input address!',
      CITY_REQUIRED: 'Please input city!',
      STATE_REQUIRED: 'Please input state!',
      ZIP_CODE_REQUIRED: 'Please input zip code!',
      COUNTRY_REQUIRED: 'Please input country!',
    },

    // Buttons and actions
    ACTIONS: {
      ADD_ITEM: 'Add Item',
      REMOVE_ITEM: 'Remove item',
      CANCEL: 'Cancel',
      SAVE_CHANGES: 'Save Changes',
    },

    // Messages
    MESSAGES: {
      NO_ITEMS: 'No items in this order',
      ORDER_TOTAL: 'Order Total',
    },

    // Date format
    DATE_FORMAT: 'MMM DD, YYYY HH:mm',
  },
};
