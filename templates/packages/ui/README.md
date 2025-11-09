# @{{orgName}}/ui

Shared UI component library built with React 19 and Tailwind CSS v4.

## Usage

### Import styles in your app

In your Next.js app's root layout or main CSS file:

```typescript
import '@{{orgName}}/ui/styles.css';
```

### Use components

```typescript
import { Button } from '@{{orgName}}/ui/components/button';

export default function Page() {
  return (
    <div>
      <Button variant="default">Click me</Button>
      <Button variant="secondary" size="lg">Large Button</Button>
      <Button variant="outline">Outline</Button>
    </div>
  );
}
```

## Available Components

### Button

A versatile button component with multiple variants and sizes.

**Variants:**
- `default` - Black background
- `secondary` - Gray background
- `outline` - White background with border
- `ghost` - Transparent with hover effect
- `destructive` - Red background for danger actions

**Sizes:**
- `sm` - Small (32px height)
- `default` - Medium (40px height)
- `lg` - Large (48px height)

## Adding New Components

1. Create a new component file in `src/components/`
2. Export it with proper TypeScript types
3. Components are automatically available via the package exports

Example:

```typescript
// src/components/card.tsx
import * as React from "react"

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  // ... props
}

export function Card({ className = "", ...props }: CardProps) {
  return <div className={`rounded-lg border p-4 ${className}`} {...props} />
}
```

Then use it:

```typescript
import { Card } from '@{{orgName}}/ui/components/card';
```
