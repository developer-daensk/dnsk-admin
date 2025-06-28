# Theme Toggle Components

This directory contains two theme toggle components for switching between light and dark modes.

## Components

### 1. ThemeToggle

A simple button with sun/moon icons that toggles the theme.

```tsx
import { ThemeToggle } from '@/components/ThemeToggle';

// Usage
<ThemeToggle />;
```

**Features:**

- Animated icon rotation on hover
- Pulse animation on click
- Tooltip showing current mode
- Responsive design

### 2. ThemeToggleSwitch

A switch component with sun and moon icons on both sides.

```tsx
import { ThemeToggleSwitch } from '@/components/ThemeToggle';

// Usage
<ThemeToggleSwitch />;
```

**Features:**

- Ant Design Switch component
- Icons on both sides that highlight based on theme
- Smooth transitions
- Mobile responsive (hides side icons on small screens)

## Theme Persistence

Both components automatically save the user's theme preference to localStorage and restore it on page reload.

## Customization

You can customize the appearance by modifying the CSS files:

- `ThemeToggle.css` - Styles for the button version
- `ThemeToggleSwitch.css` - Styles for the switch version
