import { common } from './categories/common';
import { navigation } from './categories/navigation';
import { forms } from './categories/forms';
import { messages } from './categories/messages';
import { errors } from './categories/errors';

export const textResources = {
  common,
  navigation,
  forms,
  messages,
  errors,
} as const;

export * from './types';
export * from './utils/textUtils';
