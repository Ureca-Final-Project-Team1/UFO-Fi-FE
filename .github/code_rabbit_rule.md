# UFO-Fi Frontend CodeRabbit Review Guide

## Basic Principles

All reviews must be provided in **Korean language**.

## Architecture Review

### FSD (Feature-Sliced Design) Architecture Compliance

- Check proper separation between `features/[domain]/components/` vs `shared/ui/`
- Ensure `src/api/services/[domain]/` structure compliance
- Verify barrel exports in `features/[domain]/index.ts`
- Only move to `shared/ui` when used by 3+ domains

### Folder Structure Standards

```
src/
├── api/                     # API related
│   ├── client/axios.ts     # axios instance
│   ├── services/[domain]/  # domain-specific API functions
│   └── types/[domain].ts   # API type definitions
├── features/[domain]/      # domain-specific features
│   ├── components/         # domain-exclusive components
│   ├── hooks/             # domain-exclusive hooks
│   └── types/             # domain types
├── shared/                 # common elements
│   ├── ui/                # reusable UI components
│   ├── layout/            # layout components
│   └── hooks/             # common hooks
└── types/                 # global types (Carrier enum, etc.)
```

## Naming Conventions

### File/Folder Rules

- **Files/Folders**: `kebab-case` (user-profile.ts, login-form/)
- **Components**: `PascalCase` (UserCard.tsx, MainLayout.tsx)
- **Functions/Variables**: `camelCase` (handleClick, userList)
- **Types/Interfaces**: `PascalCase` (UserProps, ButtonVariant)
- **Constants**: `UPPER_SNAKE_CASE` (DEFAULT_TIMEOUT, MAX_RETRY)
- **CSS Classes**: `kebab-case` (nav-container-bg, exploration-button)
- **Image Files**: `snake_case` (header_logo.svg, main_bg.png)
- **Custom Hooks**: `use + PascalCase` (useAuth, useFetchData)

## React Component Rules

### Props Management

- Props interface definition and destructuring assignment required
- Props types must be declared with `interface` (Props or ComponentNameProps)
- Prohibit explicit boolean props (`isOpen={true}` ❌, `isOpen` ✅)
- No array index as key prop
- Each component managed in independent folder
- Implementation in `index.tsx` to keep import paths concise

### Performance Optimization

- Use `useCallback` for component internal functions
- Use `useMemo` for complex calculations
- Avoid unnecessary re-renders

## API Structure Standards

### API Pattern: `{domain}API.{method}`

```typescript
// Good
import { notificationAPI } from '@/api';
await notificationAPI.getSettings();

// Bad
import { getNotificationSettings } from '@/api/notification';
```

### File Structure

- API functions: `src/api/services/[domain]/`
- Type definitions: `src/api/types/[domain].ts`
- Axios configuration: `src/api/client/axios.ts`

### Type Safety

- All API responses must have proper TypeScript types
- Use `SuccessApiResponse<T>` pattern for consistent API responses
- Implement proper error handling with `ApiError` class

## 🎨 CSS Styling Guidelines

### Folder Structure

```
src/styles/
├── globals.css              # Main entry point (imports only)
├── components/              # Component-specific styles
│   ├── background.css      # Background related
│   ├── typography.css      # Typography
│   ├── buttons.css         # Button styles
│   └── layout.css          # Layout components
└── utils/                   # Reusable utilities
    ├── layout.css          # Layout helpers
    └── mobile.css          # Mobile optimization
```

### Separation Criteria

**`components/` folder:**

- Component-specific styles
- 10+ lines or complex logic (pseudo-elements, media queries)
- 3+ related classes

**`utils/` folder:**

- Helper classes reused across multiple places
- Platform-specific optimization code

### Naming Rules

```css
.nav-container-bg     /* function-target-purpose */
.exploration-button   /* purpose-type */
.gradient-card-1      /* style-type-variant */
```

## 🔧 Next.js 15 Specific Rules

### App Router

- Use `'use client'` directive only where necessary
- Prefer Server Components over Client Components
- Use `next/dynamic` instead of `React.lazy()` for dynamic imports

### File Structure

- Follow App Router structure in `app/` folder
- Define API routes in `app/api/` folder

## State Management

### Zustand

- Naming: `useXxxStore`
- Action naming: `setXxx`, `resetXxx`, `toggleXxx`
- Structure: `/stores/[domain]/useXxxStore.ts`

### React Query

- Query keys as structured arrays `['users', userId]`
- Define useQuery, useMutation in `/queries/` folder

## Review Priority

1. **Bugs/Errors** - Critical issues that break functionality
2. **Type Safety** - TypeScript errors and type definitions
3. **FSD Architecture Violations** - Incorrect folder structure or separation
4. **Naming Convention Violations** - Inconsistent naming patterns
5. **Performance Optimization** - useCallback/useMemo usage, unnecessary re-renders
6. **Code Readability** - Clear and maintainable code structure

## Required Comments

Comment these code sections:

- Complex business logic (3+ line conditionals)
- External API integrations
- Performance optimization code (useMemo, useCallback reasoning)
- Workaround solutions
- Regular expressions or complex calculations

## Common Issues to Flag

- Using array index as key prop
- Missing Props interface or destructuring
- Incorrect folder placement (shared vs features)
- Inconsistent naming conventions
- Missing `'use client'` when using client-side hooks
- Hardcoded API URLs instead of using configured axios instance
- Missing error handling in API calls
- Overly complex components that should be split
