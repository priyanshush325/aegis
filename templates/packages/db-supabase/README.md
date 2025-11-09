# @{{orgName}}/db

Database package using Drizzle ORM with Supabase (PostgreSQL).

## Setup

1. Create a Supabase project at https://supabase.com

2. Get your connection details from Supabase project settings:
   - Go to Settings > Database
   - Copy the Connection String (URI mode)
   - Get your API keys from Settings > API

3. Configure `.env`:

```env
# Database connection (from Supabase Settings > Database)
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@[YOUR-PROJECT-REF].supabase.co:5432/postgres

# Supabase API keys (from Supabase Settings > API)
SUPABASE_URL=https://[YOUR-PROJECT-REF].supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

4. Push schema to Supabase:

```bash
{{packageManager}} --filter @{{orgName}}/db db:push
```

## Available Commands

- `db:generate` - Generate migrations from schema
- `db:push` - Push schema changes directly to database
- `db:studio` - Open Drizzle Studio (database GUI)

## Usage

### Using Drizzle ORM

```typescript
import { db, users, eq } from '@{{orgName}}/db';

// Query users
const allUsers = await db.select().from(users);

// Insert user
await db.insert(users).values({
  name: 'John Doe',
  email: 'john@example.com',
});
```

### Using Supabase Client

```typescript
import { supabase } from '@{{orgName}}/db/client';

// Supabase auth
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password',
});

// Supabase storage
const { data: uploadData } = await supabase.storage
  .from('bucket')
  .upload('file.png', file);
```

## Adding New Tables

1. Create a new schema file in `src/schema/` (e.g., `posts.ts`)
2. Export it from `src/schema/index.ts`
3. Push to Supabase:

```bash
{{packageManager}} --filter @{{orgName}}/db db:push
```
