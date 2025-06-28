# 🌍 Internationalization (i18n) Implementation Guide

This guide explains how to implement and use the internationalization system in your Marketplace Admin application.

## 🚀 Quick Start

The i18n system is now fully integrated into your application. Users can switch languages using the language switcher in the top navigation bar.

### Supported Languages

- **German (de)** - Default language 🇩🇪
- **English (en)** - Secondary language 🇺🇸

## 📁 File Structure

```
src/
├── i18n/
│   ├── index.ts                    # i18n configuration
│   └── locales/
│       ├── en/index.ts            # English translations
│       └── de/index.ts            # German translations
├── contexts/
│   └── LanguageContext.tsx        # Language context provider
├── components/
│   └── LanguageSwitcher/          # Language switcher component
├── hooks/
│   └── useTranslatedText.ts       # Custom translation hook
└── utils/
    └── i18nBridge.ts              # Bridge for existing resources
```

## 🔧 Usage Methods

### Method 1: Direct i18n Usage (Recommended for new code)

```tsx
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('common.loading')}</h1>
      <p>{t('messages.welcome')}</p>
      <span>{t('messages.resendOtpTimer', { seconds: 30 })}</span>
    </div>
  );
};
```

### Method 2: Custom Hook with Fallback

```tsx
import { useTranslatedText } from '../hooks/useTranslatedText';

const MyComponent = () => {
  const { getText } = useTranslatedText();

  return (
    <div>
      <h1>{getText('common.loading', undefined, 'Loading...')}</h1>
      <p>{getText('some.key', { name: 'John' }, 'Hello John')}</p>
    </div>
  );
};
```

### Method 3: Hybrid Approach (For migrating existing code)

```tsx
import { useHybridTranslation } from '../utils/i18nBridge';

const MyComponent = () => {
  const { t } = useHybridTranslation();

  return (
    <div>
      {/* Will use i18n if available, fallback to existing resources */}
      <h1>{t('common.loading')}</h1>
      <p>{t('userManagement.TITLE')}</p>
    </div>
  );
};
```

### Method 4: Resource Helpers (For existing resource patterns)

```tsx
import { ResourceHelpers } from '../utils/i18nBridge';

const MyComponent = () => {
  return (
    <div>
      <h1>{ResourceHelpers.getText('common.error')}</h1>
      <h2>{ResourceHelpers.getUserManagementText('TITLE')}</h2>
      <h3>{ResourceHelpers.getOrderText('TITLE')}</h3>
      <h4>{ResourceHelpers.getProductText('TITLE')}</h4>
    </div>
  );
};
```

## 🔄 Language Switching

### Using the Language Switcher Component

The language switcher is already integrated into your navbar and shows flags with abbreviations:

```tsx
import LanguageSwitcher from '@/components/LanguageSwitcher';

// In your component
<LanguageSwitcher showLabel={false} size="small" />;
```

### Programmatic Language Change

```tsx
import { useLanguage } from '../contexts/LanguageContext';

const MyComponent = () => {
  const { currentLanguage, changeLanguage, isLoading } = useLanguage();

  const handleLanguageChange = () => {
    changeLanguage('en'); // Switch to English
  };

  return (
    <div>
      <p>Current: {currentLanguage}</p>
      <button onClick={handleLanguageChange} disabled={isLoading}>
        Switch to English
      </button>
    </div>
  );
};
```

## 📝 Translation Keys Structure

### Current Translation Structure

```javascript
{
  common: {
    loading: 'Loading...',
    save: 'Save',
    cancel: 'Cancel',
    // ... more common terms
  },
  navigation: {
    dashboard: 'Dashboard',
    orders: 'Orders',
    products: 'Products',
    // ... navigation items
  },
  forms: {
    email: 'Email',
    password: 'Password',
    // ... form fields
  },
  messages: {
    welcome: 'Welcome to Marketplace Admin',
    loginSuccess: 'Successfully logged in',
    // ... user messages
  },
  errors: {
    network: 'Network error. Please check your internet connection.',
    // ... error messages
  },
  language: {
    title: 'Language',
    english: 'English',
    german: 'Deutsch',
    switchLanguage: 'Switch Language',
  },
  // ... more sections
}
```

## 🔄 Migration Strategy

### Phase 1: Start with New Components

For all new components, use the direct i18n approach:

```tsx
// ✅ Good - New component using i18n
const NewComponent = () => {
  const { t } = useTranslation();
  return <h1>{t('common.loading')}</h1>;
};
```

### Phase 2: Migrate Existing Components Gradually

Use the hybrid approach for existing components:

```tsx
// ✅ Good - Existing component during migration
const ExistingComponent = () => {
  const { t } = useHybridTranslation();
  return <h1>{t('userManagement.TITLE')}</h1>;
};
```

### Phase 3: Full Migration

Eventually migrate all components to use direct i18n:

```tsx
// ✅ Goal - Fully migrated component
const MigratedComponent = () => {
  const { t } = useTranslation();
  return <h1>{t('users.title')}</h1>;
};
```

## 🛠 Adding New Languages

### 1. Create Translation File

Create a new file `src/i18n/locales/[lang]/index.ts`:

```typescript
// src/i18n/locales/fr/index.ts
export default {
  common: {
    loading: 'Chargement...',
    save: 'Enregistrer',
    // ... other translations
  },
  // ... rest of the structure
};
```

### 2. Update i18n Configuration

Add the new language to `src/i18n/index.ts`:

```typescript
import frTranslations from './locales/fr';

const resources = {
  en: { translation: enTranslations },
  de: { translation: deTranslations },
  fr: { translation: frTranslations }, // Add new language
};
```

### 3. Update Language Context

Add the new language to `src/contexts/LanguageContext.tsx`:

```typescript
export type SupportedLanguage = 'en' | 'de' | 'fr';

const antdLocales = {
  en: enUS,
  de: deDE,
  fr: frFR, // Add Ant Design locale
};
```

### 4. Update Language Switcher

Add the new language option to `src/components/LanguageSwitcher/LanguageSwitcher.tsx`:

```typescript
const languages = [
  { code: 'en', name: 'En', flag: '🇺🇸' },
  { code: 'de', name: 'De', flag: '🇩🇪' },
  { code: 'fr', name: 'Fr', flag: '🇫🇷' },
];
```

## 🎯 Best Practices

### 1. Consistent Key Naming

Use consistent naming conventions for translation keys:

```typescript
// ✅ Good
t('common.save');
t('forms.email');
t('errors.network');

// ❌ Avoid
t('saveButton');
t('EmailField');
t('NetworkError');
```

### 2. Use Interpolation for Dynamic Content

```typescript
// ✅ Good
t('messages.welcome', { name: userName });
t('pagination.showing', {
  start: 1,
  end: 10,
  total: 100,
}) // ❌ Avoid
`Welcome ${userName}``Showing 1-10 of 100 items`;
```

### 3. Provide Meaningful Fallbacks

```typescript
// ✅ Good
getText('some.key', undefined, 'Default text');

// ❌ Avoid
getText('some.key');
```

### 4. Keep Translations Context-Aware

```typescript
// ✅ Good - Context is clear
t('orders.status.pending');
t('users.status.active');

// ❌ Avoid - Ambiguous context
t('status.pending');
t('active');
```

## 🔧 Development Tools

### Testing Translations

You can test the I18nExample component by adding it to one of your pages:

```tsx
import I18nExample from '../components/Examples/I18nExample';

// Add to any page for testing
<I18nExample />;
```

### Browser Language Detection

The system automatically detects the user's browser language and sets it as the default if supported, otherwise defaults to German.

### Local Storage Persistence

Language preferences are automatically saved to localStorage and restored on page reload.

## 🐛 Troubleshooting

### Translation Not Showing

1. Check if the key exists in the translation files
2. Verify the key path is correct (e.g., `common.loading` not `common/loading`)
3. Make sure the translation file is properly imported

### Ant Design Components Not Translated

1. Verify the correct Ant Design locale is imported
2. Check that the LanguageProvider is wrapping your components
3. Ensure the locale mapping is correct in LanguageContext

### Interpolation Not Working

1. Check the interpolation syntax: `{key}` or `{{key}}`
2. Verify the values object is passed correctly
3. Make sure the key exists in the translation

## 📚 Resources

- [react-i18next Documentation](https://react.i18next.com/)
- [i18next Documentation](https://www.i18next.com/)
- [Ant Design Internationalization](https://ant.design/docs/react/i18n)

---

## 🎉 Summary

Your application now has a complete internationalization system that:

- ✅ Supports German (default) and English languages
- ✅ Shows flags with language abbreviations (🇩🇪 De, 🇺🇸 En)
- ✅ Defaults to German language
- ✅ Integrates with your existing resource system
- ✅ Provides multiple usage patterns for gradual migration
- ✅ Includes a user-friendly language switcher
- ✅ Automatically detects and persists language preferences
- ✅ Works seamlessly with Ant Design components
- ✅ Translates all content when language is changed

Users can now switch between German and English using the dropdown in the top navigation bar, and the entire application interface will be translated accordingly.
