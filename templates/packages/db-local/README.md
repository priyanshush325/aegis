# @{{orgName}}/db

Database package using Drizzle ORM with PostgreSQL.

## Setup

1. Ensure PostgreSQL is running locally or configure connection in `.env`:

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/mydb
```

2. Push schema to database:

```bash
{{packageManager}} --filter @{{orgName}}/db db:push
```

## Available Commands

- `db:generate` - Generate migrations from schema
- `db:migrate` - Run pending migrations
- `db:push` - Push schema changes directly to database
- `db:studio` - Open Drizzle Studio (database GUI)
- `db:introspect` - Generate schema from existing database

## Usage

```typescript
import { db, users, eq } from '@{{orgName}}/db';

// Query users
const allUsers = await db.select().from(users);

// Insert user
await db.insert(users).values({
  name: 'John Doe',
  email: 'john@example.com',
});

// Update user
await db.update(users)
  .set({ name: 'Jane Doe' })
  .where(eq(users.email, 'john@example.com'));
```

## Adding New Tables

1. Create a new schema file in `src/schema/` (e.g., `posts.ts`)
2. Export it from `src/schema/index.ts`
3. Generate and push migrations:

```bash
{{packageManager}} --filter @{{orgName}}/db db:push
```
