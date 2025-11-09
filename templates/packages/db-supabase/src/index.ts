import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is required. Get it from your Supabase project settings.');
}

const client = postgres(process.env.DATABASE_URL);

export const db = drizzle(client, { schema });

export * from './schema';
export * from './client';
export { eq, and, or, desc, asc } from 'drizzle-orm';
