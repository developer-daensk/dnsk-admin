# Theme System (`Components/Entity/Theme`)

This directory implements a robust, SSR/CSR-compatible theme management system for your Next.js app, supporting light, dark, and system themes. It ensures a seamless user experience by handling theme persistence, initialization, and switching, both on the server and client.

---

## Features

- **SSR/CSR Theme Sync:** Ensures the correct theme is applied instantly on first paint, avoiding flashes of incorrect theme.
- **User Preference Persistence:** Remembers user theme choice via cookies and localStorage.
- **System Theme Support:** Can follow the user's OS-level dark/light preference.
- **Animated Visibility:** Uses a special class to hide content until the theme is set, preventing unwanted flashes.
- **Easy Theme Switching:** Includes a UI switcher for users to toggle themes.

---

## Directory Structure

- `constants.ts` – Theme-related constants (cookie/localStorage names, invisible class).
- `stores.ts` – Zustand store for theme state and logic (client-side).
- `types.ts` – TypeScript types for theme values and store.
- `utils.ts` – Utilities for theme validation and SSR theme extraction.
- `styles.css` – CSS for the invisible-until-theme-is-set class and fade-in animation.
- `Components/ThemeInit.tsx` – Client component to initialize and sync theme on mount.
- `Components/ThemeSwitcher/` – UI components for switching themes (button, switcher).

---

## How It Works

### 1. Server-Side (SSR)

- On initial page load, the SSR layout (`app/[locale]/layout.tsx`) calls `getLayoutTheme(cookieStore)` to determine the theme from cookies.
- The theme ("light", "dark", or a special invisible class) is set as a class on the `<html>` element.
- If the theme is not yet determined, the `invisible-until-the-theme-is-set` class is used to hide content until the client sets the theme.

### 2. Client-Side (CSR)

- The `<ThemeInit />` component runs on the client, initializing the theme using the Zustand store.
- It reads the user's preference from cookies/localStorage, or falls back to system preference.
- The invisible class is removed and the correct theme class is applied to `<html>`.
- The theme can be changed interactively using the `<ThemeSwitcher />` component, which updates the store and persists the new preference.

---

## Usage

### 1. SSR Integration

In your root layout (e.g., `app/[locale]/layout.tsx`):

```tsx
import { ThemeInit } from "@/Components/Entity/Theme/Components/ThemeInit"
import { getLayoutTheme } from "@/Components/Entity/Theme/utils"
import { cookies } from "next/headers"

export default async function LocaleLayout({ children, params }) {
    const cookieStore = await cookies()
    const theme = getLayoutTheme(cookieStore)

    return (
        <html className={theme}>
            <body>
                <ThemeInit />
                {/* ... */}
            </body>
        </html>
    )
}
```

### 2. Client-Side Theme Switching

Use the `ThemeSwitcher` component anywhere in your UI:

```tsx
import { ThemeSwitcher } from "@/Components/Entity/Theme/Components/ThemeSwitcher/ThemeSwitcher"

export function MyComponent() {
    return (
        <div>
            <ThemeSwitcher />
            ....
        </div>
    )
}
```

### 3. Customizing Themes

- To add new themes, update the `themes` array in `utils.ts` and extend CSS as needed.
- Update type definitions in `types.ts` if you add new theme values.

---

## Extending

- **Add new themes:** Update `themes` in `utils.ts`, add CSS, and update types.
- **Change animation:** Edit `styles.css`.
- **Change persistence:** Adjust logic in `stores.ts` and `utils/cookieStorage.ts`.

---

## Notes

- The invisible class ensures no flash of incorrect theme, but make sure your theme CSS is loaded early.
- The system is designed for Next.js App Router and SSR/CSR hybrid rendering.

---

## Credits

- Inspired by best practices for SSR/CSR theme management in Next.js.
