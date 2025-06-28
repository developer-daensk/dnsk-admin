import { useTranslation } from 'react-i18next';

/**
 * Custom hook that provides translated text with fallback support
 * This allows gradual migration from existing resource system to i18n
 */
export const useTranslatedText = () => {
  const { t, i18n } = useTranslation();

  /**
   * Get translated text with interpolation support
   * @param key - Translation key (e.g., 'common.loading' or 'orders.title')
   * @param values - Values for interpolation (e.g., { count: 5 })
   * @param fallback - Fallback text if translation key doesn't exist
   */
  const getText = (
    key: string,
    values?: Record<string, string | number>,
    fallback?: string
  ): string => {
    try {
      const translation = t(key, values);
      // If translation returns the key itself, it means the key doesn't exist
      if (translation === key && fallback) {
        return fallback;
      }
      return translation;
    } catch (error) {
      console.warn(`Translation error for key "${key}":`, error);
      return fallback || key;
    }
  };

  /**
   * Check if a translation key exists
   * @param key - Translation key to check
   */
  const hasTranslation = (key: string): boolean => {
    return i18n.exists(key);
  };

  /**
   * Get current language code
   */
  const getCurrentLanguage = (): string => {
    return i18n.language;
  };

  /**
   * Format text with interpolation (for existing resource strings)
   * @param text - Text template with placeholders like {count}, {name}, etc.
   * @param values - Values to replace placeholders
   */
  const formatText = (text: string, values: Record<string, string | number>): string => {
    return Object.entries(values).reduce(
      (result, [key, value]) => result.replace(new RegExp(`\\{${key}\\}`, 'g'), String(value)),
      text
    );
  };

  return {
    getText,
    hasTranslation,
    getCurrentLanguage,
    formatText,
    t, // Direct access to react-i18next's t function
  };
};

export default useTranslatedText;
