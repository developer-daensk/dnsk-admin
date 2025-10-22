# Internationalization

To implement i18n, you need to create a fractal file i18n.ts in each module and define its content as follows, and define the desired values in the en and de objects.

In the component body, you can also get the dictionary by calling getDictionary and passing it the locale, and access its type by importing iDictionary, .e.g:

### in ~/Main/MyComponent/i18n.ts

Dictionary definition location:

```typescript
import { getDictionaryGenerator } from "@/Components/Entity/Locale/utils"

const en = {
    seo: {
        title: "Home page",
        description: "Description of the page"
    },
    title: "Original title"
}

const de: iDictionary = {
    seo: {
        title: "Startseite",
        description: "Beschreibung der Seite"
    },
    title: "Originaltitel"
}

export type iDictionary = typeof en
export const getDictionary = getDictionaryGenerator<iDictionary>({ en, de })
```

### in ~/app/page.ts

Where to define SEO meta tags:

```typescript
import { getDictionary } from "@/Main/MyComponent/i18n"

interface iProps {
    params: Promise<iLocaleParam>
}

export async function generateMetadata({ params }: iProps) {
    const { locale } = await params
    const dictionary = getDictionary(locale)
    return dictionary.seo
}

export default async function Page({ params }: iProps) {
    const { locale } = await params
    return <MyComponent locale={locale} />
}

```

### in ~/Main/MyComponent/MyComponent.ts

Using a dictionary in the final component:

```typescript
import { getDictionary } from "./i18n"
import { alertSeoTitle } from "./utils"

interface iProps {
  locale: iLocale
}

export default async function MyComponent({ locale }: iProps) {
  const dictionary = getDictionary(locale)

  function alertSeoTitleHandler(){
     alertSeoTitle(dictionary)
  }

  return <h1 onClick={alertSeoTitleHandler}>{dictionary.title}</h1>
}
```

### in ~/Main/MyComponent/utils.ts

Using dictionaries in utility functions:

```typescript
export function alertSeoTitle(dictionary: iDictionary) {
    alert(dictionary.seo.title)
}
```

&nbsp;

&nbsp;

&nbsp;

&nbsp;

## LanguageSwitcher Component

The `LanguageSwitcher` is a small client component that lets users change the active UI language (locale) by updating the route prefix and persisting the choice in a cookie. It is meant to be placed inside layouts, headers, or navigation bars that live under the dynamic `[locale]` segment (e.g. `app/[locale]/layout.tsx`).

### Location

`~/Components/Entity/Locale/LanguageSwitcher.tsx`

### Responsibilities

- Detect current locale from the route params (`useParams`) and keep it in component state.
- Read a previously chosen locale from a cookie (if present) and redirect to that locale-specific path if it differs from the URL.
- Persist newly selected locales to the cookie and push a new localized route using Next.js `router.push`.
- Provide either:
    - simple toggle buttons for all supported locales, or
    - a select dropdown using the design system's `Select` component,
      controlled via the `appearance` prop and options from `LOCALES` and `LOCALE_FULLNAME`.

### Public API (Props)

| Prop         | Type                   | Default    | Description                                                                                                                                                                                                             |
| ------------ | ---------------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `className`  | `string`               | `""`       | Optional extra Tailwind / utility classes applied to the outer wrapper.                                                                                                                                                 |
| `appearance` | `"button" \| "select"` | `"button"` | Choose the presentation. `button` renders inline locale toggles (EN/DE/etc). `select` renders a dropdown using Shadcn `Select`, with labels from `LOCALE_FULLNAME` and the placeholder from the component's dictionary. |

### Internals (Summary)

- Reads the current pathname via `usePathname()`.
- Uses `removeLocaleFromPathname` / `addLocaleToPathname` helpers to normalize and rebuild localized URLs.
- Syncs a `currentLocale` state value with the URL & cookie inside a `useEffect`.
- On user click: updates cookie, local state, and navigates to the new localized path.
- Preserves any existing query string parameters across navigations using `useSearchParams()`.
- In `select` mode, displays human-friendly locale names via `LOCALE_FULLNAME` and a localized placeholder from `getDictionary(locale)`.

### Usage Example (Layout)

Place it inside a layout or any client component rendered within the `[locale]` tree:

```tsx
// app/[locale]/layout.tsx
import { ReactNode } from "react"
import { LanguageSwitcher } from "@/Components/Entity/Locale/LanguageSwitcher"

export default function LocaleLayout({ children }: { children: ReactNode }) {
    return (
        <html suppressHydrationWarning>
            <body>
                <header className="flex items-center justify-between border-b px-4 py-2">
                    <h1 className="text-sm font-semibold">Dashboard</h1>
                    {/* Button toggle appearance (default) */}
                    <LanguageSwitcher className="ml-auto" />
                </header>
                {children}
            </body>
        </html>
    )
}
```

#### Select Variant

If you prefer a dropdown UI, pass `appearance="select"`:

```tsx
import { LanguageSwitcher } from "@/Components/Entity/Locale/LanguageSwitcher"

export function Toolbar() {
    return (
        <div className="flex items-center gap-2">
            <LanguageSwitcher appearance="select" />
        </div>
    )
}
```

### Adding a New Locale

1. Extend the `LOCALES` array in `~/Components/Entity/Locale/constants.ts`.
2. Add the locale key to every module's `i18n.ts` dictionaries.
3. Add a full, human-readable name for the locale in `LOCALE_FULLNAME` (used in the dropdown).
4. (If needed) Add font / direction settings (e.g. RTL) in global styles or layout logic.

Note: In `select` mode, the placeholder comes from the Locale module's dictionary (e.g., `dictionary.placeholder`). Ensure that key is defined.

### Accessibility Notes

- Button appearance: each locale toggle is a `button`; screen readers will read the visible text (the uppercase locale code). If you want more descriptive labels, wrap the code in an element with `aria-label` or add `aria-label` directly to the button.
- Select appearance: semantics are provided by the Shadcn `Select` (trigger + listbox options). Visible option labels come from `LOCALE_FULLNAME`; ensure they are descriptive.
- Ensure adequate contrast for the active vs inactive states (already aided by `bg-background` / `text-foreground`).

### Styling & Customization

- Override spacing / shape via the `className` prop or by adjusting the inner container classes.
- For many locales (wide set), use `appearance="select"` which is built-in and uses the design system's `Select` component.

### Edge Cases & Behavior

- If a cookie locale exists and differs from the current URL's locale, a silent `router.replace` updates the path without creating browser history noise.
- If no cookie exists, the current URL locale is stored immediately.
- Rapid clicking triggers sequential `router.push` calls; Next.js handles deduplication. Debouncing isn't typically required unless you notice UX issues.
- Existing query parameters are preserved on redirects and pushes, so filters and searches remain intact when switching locales.

### Minimal Inline Usage

```tsx
import { LanguageSwitcher } from "@/Components/Entity/Locale/LanguageSwitcher"

export function Toolbar() {
    return (
        <div className="flex items-center gap-2">
            {/* other actions */}
            <LanguageSwitcher />
        </div>
    )
}
```

### Troubleshooting

| Symptom                                                    | Likely Cause                                  | Fix                                                                                          |
| ---------------------------------------------------------- | --------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Locale buttons navigate but dictionary text doesn't change | Dictionary file missing new locale key        | Add translations to the `i18n.ts` file and regenerate build (if cached).                     |
| Redirect loop on first load                                | Cookie locale mismatches available LOCALES    | Clear cookie or validate cookie value before redirect (already handled if helpers sanitize). |
| Selected state not highlighted                             | CSS override or missing Tailwind theme tokens | Inspect classes; ensure `bg-background` & `text-foreground` tokens resolve.                  |

### When NOT to Use

- If you only need a one-off locale toggle inside a form (prefer a select inside that component).
- If localization is subpath-less (e.g. domain-based locale) — use domain logic instead.

&nbsp;

&nbsp;

&nbsp;

&nbsp;

## FUT - Find Unused Translations

FUT designed to help maintain clean and efficient internationalization (i18n). It automatically scans your codebase to identify translation keys that are defined but never used.

### Overview

The FUT tool analyzes your project's translation files and searches through your entire codebase to identify translation keys that are no longer being used. This helps you:

- Keep your translation files clean and maintainable
- Reduce bundle size by removing unused translations
- Identify potentially outdated or deprecated translation keys
- Maintain better code hygiene in multilingual applications

### How It Works

The FUT tool operates in several phases:

1. **Discovery Phase**: Scans the project for all `*i18n.ts` files
2. **Extraction Phase**: Extracts all translation keys from the `en` object in each i18n file
3. **Usage Analysis Phase**: Searches through all TypeScript/TSX files to find references to these keys
4. **Reporting Phase**: Reports unused keys grouped by file

### Usage

Run the FUT tool using the following command:

```bash
pnpm run fut
```

If the 'fut' script is not present in the package.json file, add it.

```json
"scripts": {
    "fut": "pnpm tsx Components/Entity/Locale/findUnusedTranslations.ts"
},
```

### Search Patterns

FUT searches for translation key usage using multiple patterns:

- **Direct object access**: `dictionary.title`
- **Nested key access**: `dictionary.fields.street`
- **Array notation with double quotes**: `["title"]`
- **Array notation with single quotes**: `['title']`
- **Template literals**: `` `title` ``
- **Partial key matching**: Searches for the last part of nested keys (e.g., "street" for "fields.street")

### Output Format

The tool provides detailed output in the following format:

```
Analyzing translation files...

Found 15 keys in Components/Entity/AddressForm/i18n.ts
Found 8 keys in Components/Entity/FileUploader/i18n.ts

Found 23 total translation keys in 2 files.

Searching for unused keys...

Unused translation keys found:

File: Components/Entity/AddressForm/i18n.ts
Unused keys:
  - buttons.cancel
  - fields.zipCode

File: Components/Entity/FileUploader/i18n.ts
Unused keys:
  - messages.uploadFailed

Total unused keys: 3
```

### Configuration

#### Included Files

FUT scans the following file types:

- `**/*i18n.ts` - Translation definition files
- `**/*.{ts,tsx}` - TypeScript and React component files for usage analysis

#### Excluded Directories

The tool automatically excludes:

- `**/node_modules/**`
- `**/dist/**`
- `**/build/**`
- `**/*.d.ts` files (TypeScript declaration files)

### Best Practices

#### 1. Regular Maintenance

Run FUT regularly as part of your development workflow to keep translation files clean:

```bash
# Add to your CI/CD pipeline or run before releases
pnpm run fut
```

#### 2. Review Before Deletion

Always review the unused keys report before deleting translations:

- Some keys might be used in dynamic contexts not detected by the tool
- Keys might be reserved for future features
- Some keys might be used in external configuration or data files

#### 3. False Positives

Be aware that FUT might report false positives in these scenarios:

- Dynamic key construction: `dictionary[dynamicKey]`
- Keys used in external JSON configurations
- Keys referenced in string templates built at runtime
- Keys used in test files (if they follow different naming patterns)

### Troubleshooting

#### Common Issues

**Issue**: FUT reports "No keys found" for a valid i18n file
**Solution**: Ensure your file exports a `const en = { ... }` object with the expected format

**Issue**: FUT doesn't detect key usage in a specific file
**Solution**: Check if the file extension is included in the scan pattern (`*.ts` or `*.tsx`)

**Issue**: FUT reports false positives for dynamically constructed keys
**Solution**: This is expected behavior - manually verify these keys before removal

### Error Messages

- **"Evaluation error"**: The `en` object in an i18n file contains invalid JavaScript syntax
- **"Error processing file"**: The file couldn't be read or parsed (check file permissions and syntax)
- **"Error searching for key usage"**: File system access issues during the search phase

## Technical Details

### Implementation

FUT is implemented in TypeScript and uses:

- **glob**: For file system pattern matching
- **fs**: For file reading operations
- **path**: For cross-platform path handling
- **Dynamic evaluation**: For safely parsing translation objects

#### Performance

- Scans entire codebase for each translation key
- Uses string matching for fast key detection
- Memory-efficient processing of large codebases
- Typical execution time: 1-10 seconds for medium-sized projects

#### Security

FUT uses `new Function()` for safe evaluation of translation objects. This approach:

- Isolates evaluation from the global scope
- Prevents access to sensitive Node.js APIs
- Only evaluates object literals from trusted i18n files

### Contributing

When modifying the FUT tool, consider:

- Adding new search patterns for different usage styles
- Improving performance for large codebases
- Adding support for different i18n file formats
- Enhancing error reporting and debugging information

### Related Documentation

- [Internationalization Setup](../docs.md)

&nbsp;

&nbsp;
[< back](/README.md)
