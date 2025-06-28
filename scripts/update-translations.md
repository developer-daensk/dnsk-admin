# Translation Migration Guide

## Quick Test

1. Go to your I18nExample component (`/src/components/Examples/I18nExample.tsx`)
2. Look at the "🧪 Live ResourceHelpers Test (REACTIVE)" section
3. Switch between 🇩🇪 De and 🇺🇸 En
4. Verify that the text in the test section changes immediately

## IMPORTANT: Use Reactive Hooks!

❌ **DON'T use static ResourceHelpers** - these won't cause re-renders when language changes
✅ **DO use the reactive useResourceHelpers hook** - components will re-render automatically

## Components Status

### ✅ Updated (Working)

- `src/components/common/UserManagementTabs.tsx`
- `src/components/UserManagement/UsersTable.tsx`
- `src/components/Examples/I18nExample.tsx`

### ❌ Still Need Updates

- `src/components/UserManagement/LocationsTable.tsx`
- `src/components/UserManagement/LocationDetailsModal.tsx`
- `src/components/UserManagement/LogisticsTable.tsx`
- `src/components/UserManagement/LogisticsDetailsModal.tsx`

## NEW Migration Pattern (REACTIVE)

### BEFORE (❌ Wrong - Static, No Re-rendering):

```tsx
import { USER_MANAGEMENT } from '@/resources/management/userManagement';
// OR
import { ResourceHelpers } from '@/utils/i18nBridge';

// Usage:
title={USER_MANAGEMENT.USERS_TABLE.TITLE}
// OR
title={ResourceHelpers.getUserManagementText('USERS_TABLE.TITLE')}
```

### AFTER (✅ Correct - Reactive, Auto Re-rendering):

```tsx
import { useResourceHelpers } from '@/utils/i18nBridge';

const MyComponent = () => {
  const resourceHelpers = useResourceHelpers(); // REACTIVE HOOK

  return (
    <div>
      <h1>{resourceHelpers.getUserManagementText('USERS_TABLE.TITLE')}</h1>
    </div>
  );
};
```

## Resource Helper Functions

| Original Import           | Reactive Hook Function                       |
| ------------------------- | -------------------------------------------- |
| `USER_MANAGEMENT.*`       | `resourceHelpers.getUserManagementText('*')` |
| `ORDERS.*`                | `resourceHelpers.getOrderText('*')`          |
| `PRODUCT.*`               | `resourceHelpers.getProductText('*')`        |
| `TRUCK.*`                 | `resourceHelpers.getTruckText('*')`          |
| `MENU_ITEMS.*`            | `resourceHelpers.getMenuText('*')`           |
| `authResources.*`         | `resourceHelpers.getAuthText('*')`           |
| `textResources.*` (chart) | `resourceHelpers.getChartText('*')`          |

## Step-by-Step Update Process

### For each component:

1. **Add the reactive hook import:**

   ```tsx
   import { useResourceHelpers } from '@/utils/i18nBridge';
   ```

2. **Remove old imports:**

   ```tsx
   // Remove these:
   import { USER_MANAGEMENT } from '@/resources/management/userManagement';
   import { ResourceHelpers } from '@/utils/i18nBridge';
   ```

3. **Add the hook in your component:**

   ```tsx
   const MyComponent = () => {
     const resourceHelpers = useResourceHelpers(); // Add this line

     // ... rest of component
   };
   ```

4. **Update all usage:**

   ```tsx
   // Before:
   USER_MANAGEMENT.TITLE;
   ResourceHelpers.getUserManagementText('TITLE');

   // After:
   resourceHelpers.getUserManagementText('TITLE');
   ```

## Complete Example

```tsx
import React from 'react';
import { useResourceHelpers } from '@/utils/i18nBridge';

const UserManagementComponent = () => {
  const resourceHelpers = useResourceHelpers();

  const title = resourceHelpers.getUserManagementText('TITLE');
  const tabLabels = {
    users: resourceHelpers.getUserManagementText('TABS.USERS'),
    orders: resourceHelpers.getUserManagementText('TABS.ORDERS'),
    products: resourceHelpers.getUserManagementText('TABS.PRODUCTS'),
  };

  return (
    <div>
      <h1>{title}</h1>
      <button>{tabLabels.users}</button>
      <button>{tabLabels.orders}</button>
      <button>{tabLabels.products}</button>
    </div>
  );
};
```

## Testing After Updates

1. Start your development server
2. Navigate to the I18nExample component to verify reactive hooks work
3. Navigate to user management sections
4. Switch languages using the switcher (🇩🇪 De / 🇺🇸 En)
5. Verify that:
   - Page titles change immediately
   - Tab labels change immediately
   - Table headers change immediately
   - Button text changes immediately
   - Tooltips change immediately

## Why Reactive Hooks?

- **✅ Automatic re-rendering** when language changes
- **✅ React-aware** - components know when to update
- **✅ Performance optimized** with React.useMemo
- **✅ No manual refresh needed**
- **❌ Static helpers don't trigger re-renders**

## If Text Still Doesn't Change

1. Make sure you're using `useResourceHelpers()` hook, not static `ResourceHelpers`
2. Check that the hook is called inside the component function
3. Verify the resource key path is correct
4. Check browser console for errors
5. Ensure the German translation file has the key you're using

## Need Help?

Check the updated `I18nExample` component - it demonstrates working reactive translations!
