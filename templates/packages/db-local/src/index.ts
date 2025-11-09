import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// Use PG* environment variables if available (better for special characters in password)
const client = process.env.PGHOST ? postgres({
  host: process.env.PGHOST,
  user: process.env.PGUSER || process.env.DB_USER || 'postgres',
  password: process.env.PGPASSWORD || process.env.DB_PASSWORD,
  database: process.env.PGDATABASE || process.env.DB_NAME || 'postgres',
  port: parseInt(process.env.PGPORT || process.env.DB_PORT || '5432'),
}) : postgres(process.env.DATABASE_URL ||
  `postgresql://${process.env.DB_USER || 'postgres'}:${process.env.DB_PASSWORD || ''}@${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || '5432'}/${process.env.DB_NAME || 'postgres'}`);

export const db = drizzle(client, { schema });

export * from './schema';
export { eq, and, or, desc, asc } from 'drizzle-orm';
