import { TextResourceCategory, TextResourceKeyType } from '../types';
import { common } from '../categories/common';
import { navigation } from '../categories/navigation';
import { forms } from '../categories/forms';
import { messages } from '../categories/messages';
import { errors } from '../categories/errors';

const textResources = {
  common,
  navigation,
  forms,
  messages,
  errors,
} as const;

// Utility function for string interpolation
export const interpolateText = (text: string, values: Record<string, string | number>): string => {
  return Object.entries(values).reduce(
    (result, [key, value]) => result.replace(`{${key}}`, String(value)),
    text
  );
};

// Helper function to get text resource with type safety
export const getTextResource = <T extends TextResourceCategory>(
  category: T,
  key: TextResourceKeyType<T>
): string => {
  const categoryResources = textResources[category];
  const value = categoryResources[key as unknown as keyof typeof categoryResources];
  if (value === undefined) {
    console.warn(`Text resource not found for category: ${String(category)}, key: ${String(key)}`);
    return String(key);
  }
  return String(value);
};

// Helper function to get text with interpolation
export const getInterpolatedText = <T extends TextResourceCategory>(
  category: T,
  key: TextResourceKeyType<T>,
  values: Record<string, string | number>
): string => {
  const text = getTextResource(category, key);
  return interpolateText(text, values);
};
