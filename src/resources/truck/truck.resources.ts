export const TRUCK = {
  MODAL: {
    TITLE: 'Your Truck',
    DESCRIPTION:
      'Availability, delivery times and prices are calculated based on the information you enter here. All information can be adjusted at any time.',

    LABELS: {
      POSTAL_CODE: 'Postal Code',
      CITY: 'City',
    },

    PLACEHOLDERS: {
      POSTAL_CODE: 'Enter postal code',
      CITY: 'Enter city',
    },

    BUTTONS: {
      CLOSE: 'Close',
      SAVE: 'Save',
    },

    VALIDATION_MESSAGES: {
      POSTAL_CODE: {
        REQUIRED: 'Postal code is required',
        MIN_LENGTH: 'Postal code must be at least 3 characters',
        MAX_LENGTH: 'Postal code cannot exceed 10 characters',
        INVALID_FORMAT: 'Please enter a valid postal code (e.g., 12345, K1A 0A6, SW1A 1AA)',
      },
      CITY: {
        REQUIRED: 'City is required',
        MIN_LENGTH: 'City name must be at least 2 characters',
        MAX_LENGTH: 'City name cannot exceed 50 characters',
        INVALID_FORMAT:
          'City name can only contain letters, spaces, hyphens, apostrophes, and periods',
        CONSECUTIVE_CHARS: 'City name cannot have consecutive special characters',
        INVALID_START_END: 'City name cannot start or end with special characters',
      },
      FORM_INVALID: 'Please enter valid postal code and city information.',
    },

    SUCCESS_MESSAGES: {
      SAVED: 'Truck location information saved successfully!',
    },

    ERROR_MESSAGES: {
      SAVE_FAILED: 'Failed to save truck location information. Please try again.',
      LOAD_FAILED: 'Error loading existing truck location',
    },

    TOOLTIPS: {
      AUTO_CALCULATED: 'Auto-calculated',
      ESTIMATED_DELIVERY: 'Estimated delivery',
    },
  },

  SHIPPING: {
    CALCULATION_MESSAGES: {
      SUCCESS: (distance: number) =>
        `Shipping calculated based on distance (~${distance.toFixed(1)} miles)`,
      ERROR: 'Unable to calculate shipping automatically. Please enter manually.',
    },

    DELIVERY_TIMES: {
      SAME_DAY: 'Same day delivery',
      TWO_TO_FOUR_HOURS: '2-4 hours',
      FOUR_TO_EIGHT_HOURS: '4-8 hours',
      NEXT_DAY: 'Next day delivery',
      BUSINESS_DAYS: (days: number) => `${days}-${days + 1} business days`,
      DEFAULT: '2-3 business days',
    },
  },
} as const;
