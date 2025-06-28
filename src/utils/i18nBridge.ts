import React from 'react';
import { useTranslation } from 'react-i18next';
import { SupportedLanguage } from '../contexts/LanguageContext';

// Import your existing English resources
import { textResources } from '../resources';
import { textResources as chartResources } from '../resources/chart.resource';
import { USER_MANAGEMENT } from '../resources/management/userManagement';
import { ORDERS } from '../resources/orders/orders.resources';
import { PRODUCT } from '../resources/product/product';
import { TRUCK } from '../resources/truck/truck.resources';
import { PRODUCT_VARIATION } from '../resources/product/productVariation';
import { PRODUCT_TAGS } from '../resources/product/productTags';
import { PRODUCT_ATTRIBUTES } from '../resources/product/productAttributes';
import { theme as themeEn } from '../resources/categories/theme';
import { MENU_ITEMS } from '../resources/layout/menuItems';

// Import German resources
import { common as commonDe } from '../resources/categories/common.de';
import { navigation as navigationDe } from '../resources/categories/navigation.de';
import { forms as formsDe } from '../resources/categories/forms.de';
import { messages as messagesDe } from '../resources/categories/messages.de';
import { errors as errorsDe } from '../resources/categories/errors.de';
import { authResources as authResourcesDe } from '../resources/auth.resources.de';
import { textResources as chartResourcesDe } from '../resources/chart.resource.de';
import { MENU_ITEMS as MENU_ITEMS_DE } from '../resources/layout/menuItems.de';
import { TRUCK as TRUCK_DE } from '../resources/truck/truck.resources.de';
import { USER_MANAGEMENT as USER_MANAGEMENT_DE } from '../resources/management/userManagement.de';
import { ORDERS as ORDERS_DE } from '../resources/orders/orders.resources.de';
import { PRODUCT as PRODUCT_DE } from '../resources/product/product.de';
import { PRODUCT_ATTRIBUTES as PRODUCT_ATTRIBUTES_DE } from '../resources/product/productAttributes.de';
import { PRODUCT_TAGS as PRODUCT_TAGS_DE } from '../resources/product/productTags.de';
import { PRODUCT_VARIATION as PRODUCT_VARIATION_DE } from '../resources/product/productVariation.de';
import { errorMessages as errorMessagesDe } from '../resources/errorMessages.de';
import { theme as themeDe } from '../resources/categories/theme.de';
import { footer as FOOTER } from '../resources/layout/footer';
import { footer as FOOTER_DE } from '../resources/layout/footer.de';
import { COMPANY_CONTACTS } from '../resources/company-contacts/company-contacts.resources';
import { COMPANY_CONTACTS as COMPANY_CONTACTS_DE } from '../resources/company-contacts/company-contacts.resources.de';

/**
 * Bridge utility to help migrate existing resources to i18n system
 * This allows you to use both systems during transition
 */
export class I18nBridge {
  private static instance: I18nBridge;
  private currentLanguage: SupportedLanguage = 'de'; // Default to German
  private version = 0; // Version counter to force re-renders

  static getInstance(): I18nBridge {
    if (!I18nBridge.instance) {
      I18nBridge.instance = new I18nBridge();
    }
    return I18nBridge.instance;
  }

  setCurrentLanguage(language: SupportedLanguage) {
    if (this.currentLanguage !== language) {
      this.currentLanguage = language;
      this.version++; // Increment version to force re-renders
    }
  }

  getCurrentLanguage(): SupportedLanguage {
    return this.currentLanguage;
  }

  getVersion(): number {
    return this.version;
  }

  /**
   * Get text from existing resources with language support
   * Now supports both English and German resources
   */
  getResourceText(key: string, values?: Record<string, string | number>): string {
    try {
      // Navigate through nested object using dot notation
      const keys = key.split('.');
      let current: unknown = this.getResourceObject();

      for (const k of keys) {
        if (current && typeof current === 'object' && current !== null && k in current) {
          current = (current as Record<string, unknown>)[k];
        } else {
          return key; // Return key if path doesn't exist
        }
      }

      if (typeof current === 'string') {
        const result = this.interpolateText(current, values);
        return result;
      } else if (typeof current === 'function') {
        const result = current(values);
        return result;
      }
      return key;
    } catch (error) {
      console.warn(`Resource error for key "${key}":`, error);
      return key;
    }
  }

  private getResourceObject() {
    // Return German or English resources based on current language
    if (this.currentLanguage === 'en') {
      // Return English resources
      return {
        common: textResources.common,
        navigation: textResources.navigation,
        forms: textResources.forms,
        messages: textResources.messages,
        errors: textResources.errors,
        theme: themeEn,
        chart: chartResources,
        userManagement: USER_MANAGEMENT,
        orders: ORDERS,
        product: PRODUCT,
        truck: TRUCK,
        productVariation: PRODUCT_VARIATION,
        productTags: PRODUCT_TAGS,
        productAttributes: PRODUCT_ATTRIBUTES,
        menuItems: MENU_ITEMS,
        footer: FOOTER,
        companyContacts: COMPANY_CONTACTS,
      };
    } else {
      // Default to German resources
      return {
        common: commonDe,
        navigation: navigationDe,
        forms: formsDe,
        messages: messagesDe,
        errors: errorsDe,
        theme: themeDe,
        auth: authResourcesDe,
        chart: chartResourcesDe,
        menuItems: MENU_ITEMS_DE,
        truck: TRUCK_DE,
        userManagement: USER_MANAGEMENT_DE,
        orders: ORDERS_DE,
        product: PRODUCT_DE,
        productAttributes: PRODUCT_ATTRIBUTES_DE,
        productTags: PRODUCT_TAGS_DE,
        productVariation: PRODUCT_VARIATION_DE,
        errorMessages: errorMessagesDe,
        footer: FOOTER_DE,
        companyContacts: COMPANY_CONTACTS_DE,
      };
    }
  }

  private interpolateText(text: string, values?: Record<string, string | number>): string {
    if (!values) return text;

    return Object.entries(values).reduce((result, [key, value]) => {
      // Support both {key} and {{key}} formats
      return result
        .replace(new RegExp(`\\{${key}\\}`, 'g'), String(value))
        .replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), String(value));
    }, text);
  }
}

/**
 * React hook to use both i18n and existing resources
 */
export const useHybridTranslation = () => {
  const { t, i18n } = useTranslation();
  const bridge = I18nBridge.getInstance();

  // Get current language
  const currentLanguage = i18n.language.slice(0, 2) as SupportedLanguage;

  // Get bridge version to force re-renders
  const [bridgeVersion, setBridgeVersion] = React.useState(bridge.getVersion());

  // Update bridge language when i18n language changes
  React.useEffect(() => {
    const oldVersion = bridge.getVersion();
    bridge.setCurrentLanguage(currentLanguage);
    const newVersion = bridge.getVersion();

    // If version changed, update state to trigger re-render
    if (newVersion !== oldVersion) {
      setBridgeVersion(newVersion);
    }
  }, [currentLanguage, bridge]);

  /**
   * Try i18n first, fallback to existing resources
   */
  const getText = React.useCallback(
    (key: string, values?: Record<string, string | number>): string => {
      // First try i18n
      if (i18n.exists(key)) {
        return t(key, values);
      }

      // Fallback to existing resources (now language-aware)
      return bridge.getResourceText(key, values);
    },
    [t, i18n, bridge, currentLanguage, bridgeVersion]
  );

  return {
    t: getText,
    i18n,
    // Legacy methods for existing code
    getResourceText: bridge.getResourceText.bind(bridge),
  };
};

/**
 * REACTIVE Resource Helpers - these cause components to re-render when language changes
 */
export const useResourceHelpers = () => {
  const { i18n } = useTranslation();
  const bridge = I18nBridge.getInstance();

  // Get current language
  const currentLanguage = i18n.language.slice(0, 2) as SupportedLanguage;

  // Get bridge version to force re-renders
  const [bridgeVersion, setBridgeVersion] = React.useState(bridge.getVersion());

  // Update bridge language when i18n language changes and force re-render
  React.useEffect(() => {
    const oldVersion = bridge.getVersion();
    bridge.setCurrentLanguage(currentLanguage);
    const newVersion = bridge.getVersion();

    // If version changed, update state to trigger re-render
    if (newVersion !== oldVersion) {
      setBridgeVersion(newVersion);
    }
  }, [currentLanguage, bridge]);

  return React.useMemo(() => {
    return {
      /**
       * For simple text resources
       */
      getText: (key: string, values?: Record<string, string | number>) => {
        return bridge.getResourceText(key, values);
      },

      /**
       * For user management resources
       */
      getUserManagementText: (
        key: keyof typeof USER_MANAGEMENT | string,
        values?: Record<string, string | number>
      ) => {
        return bridge.getResourceText(`userManagement.${key}`, values);
      },

      /**
       * For order resources
       */
      getOrderText: (key: string, values?: Record<string, string | number>) => {
        return bridge.getResourceText(`orders.${key}`, values);
      },

      /**
       * For product resources
       */
      getProductText: (key: string, values?: Record<string, string | number>) => {
        return bridge.getResourceText(`product.${key}`, values);
      },

      /**
       * For auth resources
       */
      getAuthText: (key: string, values?: Record<string, string | number>) => {
        return bridge.getResourceText(`auth.${key}`, values);
      },

      /**
       * For truck resources
       */
      getTruckText: (key: string, values?: Record<string, string | number>) => {
        return bridge.getResourceText(`truck.${key}`, values);
      },

      /**
       * For menu items
       */
      getMenuText: (key: string, values?: Record<string, string | number>) => {
        return bridge.getResourceText(`menuItems.${key}`, values);
      },

      /**
       * For chart resources
       */
      getChartText: (key: string, values?: Record<string, string | number>) => {
        return bridge.getResourceText(`chart.${key}`, values);
      },

      /**
       * For product variation resources
       */
      getProductVariationText: (key: string, values?: Record<string, string | number>) => {
        return bridge.getResourceText(`productVariation.${key}`, values);
      },

      /**
       * For product tags resources
       */
      getProductTagText: (key: string, values?: Record<string, string | number>) => {
        return bridge.getResourceText(`productTags.${key}`, values);
      },

      /**
       * For product attributes resources
       */
      getProductAttributeText: (key: string, values?: Record<string, string | number>) => {
        return bridge.getResourceText(`productAttributes.${key}`, values);
      },

      /**
       * For company contacts resources
       */
      getCompanyContactsText: (key: string, values?: Record<string, string | number>) => {
        return bridge.getResourceText(`companyContacts.${key}`, values);
      },
    };
  }, [currentLanguage, bridge, bridgeVersion]); // Include bridgeVersion to force re-render
};

// Legacy static ResourceHelpers for backward compatibility (non-reactive)
export const ResourceHelpers = {
  /**
   * For simple text resources
   */
  getText: (key: string, values?: Record<string, string | number>) => {
    const bridge = I18nBridge.getInstance();
    return bridge.getResourceText(key, values);
  },

  /**
   * For user management resources
   */
  getUserManagementText: (
    key: keyof typeof USER_MANAGEMENT | string,
    values?: Record<string, string | number>
  ) => {
    const bridge = I18nBridge.getInstance();
    return bridge.getResourceText(`userManagement.${key}`, values);
  },

  /**
   * For order resources
   */
  getOrderText: (key: string, values?: Record<string, string | number>) => {
    const bridge = I18nBridge.getInstance();
    return bridge.getResourceText(`orders.${key}`, values);
  },

  /**
   * For product resources
   */
  getProductText: (key: string, values?: Record<string, string | number>) => {
    const bridge = I18nBridge.getInstance();
    return bridge.getResourceText(`product.${key}`, values);
  },

  /**
   * For auth resources
   */
  getAuthText: (key: string, values?: Record<string, string | number>) => {
    const bridge = I18nBridge.getInstance();
    return bridge.getResourceText(`auth.${key}`, values);
  },

  /**
   * For truck resources
   */
  getTruckText: (key: string, values?: Record<string, string | number>) => {
    const bridge = I18nBridge.getInstance();
    return bridge.getResourceText(`truck.${key}`, values);
  },

  /**
   * For menu items
   */
  getMenuText: (key: string, values?: Record<string, string | number>) => {
    const bridge = I18nBridge.getInstance();
    return bridge.getResourceText(`menuItems.${key}`, values);
  },

  /**
   * For chart resources
   */
  getChartText: (key: string, values?: Record<string, string | number>) => {
    const bridge = I18nBridge.getInstance();
    return bridge.getResourceText(`chart.${key}`, values);
  },
};
