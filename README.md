# Aegis

A powerful CLI tool for initializing and managing monorepos with standardized architecture.

## Features

- 🚀 **Quick Setup**: Initialize a production-ready monorepo in seconds
- 🎯 **Multi-Stack Support**: Next.js, FastAPI, Vite - all in one monorepo
- 📦 **Shared Packages**: Built-in UI components and database packages
- ⚡ **Smart Port Management**: Automatic port assignment for dev servers
- 🗄️ **Database Options**: Choose between Supabase, local PostgreSQL, or none
- 🔧 **Package Manager Choice**: Works with both npm and pnpm
- 🏗️ **Modern Stack**: Built with TypeScript, Turbo, Tailwind CSS v4, React 19, Next.js 15

## Installation

```bash
npm install -g aegis-monorepo
```

Or use with npx (no installation required):

```bash
npx aegis-monorepo init my-monorepo
```

## Quick Start

### Initialize a New Monorepo

**With npx (no installation):**
```bash
npx aegis-monorepo init my-monorepo
```

**Or install globally first:**
```bash
npm install -g aegis-monorepo
aegis init my-monorepo
```

This will:
1. Prompt you for your organization name
2. Ask about package manager preference (npm or pnpm)
3. Let you choose database setup (Supabase, local PostgreSQL, or none)
4. Select starter apps (Next.js, FastAPI, Vite)
5. Optionally include a shared UI package
6. Create a complete monorepo structure

Then:

```bash
cd my-monorepo
pnpm install  # or npm install
pnpm dev      # Start all apps
```

### Add a New App

**With npx:**
```bash
npx aegis-monorepo add next      # Add Next.js app
npx aegis-monorepo add fastapi   # Add FastAPI backend
npx aegis-monorepo add vite      # Add Vite React app
```

**With global install:**
```bash
aegis add next      # Add Next.js app
aegis add fastapi   # Add FastAPI backend
aegis add vite      # Add Vite React app
```

## Monorepo Structure

```
my-monorepo/
├── apps/                      # Application workspaces
│   ├── myorg-nextjs/         # Next.js starter (port 3000)
│   ├── myorg-fastapi/        # FastAPI backend (port 8000)
│   └── myorg-vite/           # Vite React app
├── packages/                  # Shared libraries
│   ├── db/                   # Database package (Drizzle ORM)
│   └── ui/                   # Shared UI components
├── scripts/                   # Development scripts
│   ├── dev.js                # Auto-start all apps
│   └── create-app.js         # App scaffolding
├── .husky/                    # Git hooks
├── package.json              # Root workspace config
├── pnpm-workspace.yaml       # Workspace definition
├── turbo.json                # Build orchestration
└── .env.example              # Environment template
```

## Commands

### `aegis init [directory]` or `npx aegis-monorepo init [directory]`

Initialize a new monorepo with interactive prompts.

**Options:**
- `directory` - Target directory (default: current directory)

**Examples:**
```bash
# With global install
aegis init my-app

# With npx
npx aegis-monorepo init my-app
```

### `aegis add <type>` or `npx aegis-monorepo add <type>`

Add a new app to your existing monorepo.

**Types:**
- `next` - Next.js 15 app with TypeScript and Tailwind
- `fastapi` - FastAPI backend with Python
- `vite` - Vite + React 19 app with TypeScript

**Examples:**
```bash
# With global install
aegis add next
aegis add fastapi
aegis add vite

# With npx
npx aegis-monorepo add next
npx aegis-monorepo add fastapi
npx aegis-monorepo add vite
```

## Features in Detail

### Automatic Port Management

The dev script automatically assigns sequential ports to Next.js apps:
- First app: `http://localhost:3000`
- Second app: `http://localhost:3001`
- And so on...

FastAPI apps default to `http://localhost:8000`.

### Database Packages

#### Local PostgreSQL
- Uses Drizzle ORM with PostgreSQL
- Includes NextAuth tables for authentication
- Commands: `db:push`, `db:studio`, `db:migrate`

#### Supabase
- Drizzle ORM + Supabase client
- Built-in auth and storage helpers
- Hosted PostgreSQL - no local setup needed

### Shared UI Package

- React 19 components
- Tailwind CSS v4
- Button component with variants
- Interactive animations
- Auto-watch mode for development

### Development Workflow

```bash
# Start all apps and packages in parallel
pnpm dev

# Build all apps
pnpm build

# Format code
pnpm format

# Type check
pnpm type-check

# Lint
pnpm lint
```

### Pre-commit Hooks

Automatically runs builds before commits to catch errors early:
```bash
# Installed via Husky
pnpm prepare
```

## Tech Stack

- **Package Management**: pnpm workspaces or npm workspaces
- **Build System**: Turborepo
- **Frontend**: Next.js 15, React 19, Vite
- **Backend**: FastAPI, Python
- **Database**: Drizzle ORM, PostgreSQL/Supabase
- **UI**: Tailwind CSS v4
- **TypeScript**: v5
- **Dev Tools**: run-pty, dotenvx, husky

## Environment Variables

### Database (Local PostgreSQL)
```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/mydb
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=mydb
```

### Database (Supabase)
```env
DATABASE_URL=postgresql://postgres:[PASSWORD]@[PROJECT].supabase.co:5432/postgres
SUPABASE_URL=https://[PROJECT].supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### Authentication (Optional)
```env
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## Package Manager Support

Aegis works with both npm and pnpm. During initialization, you can choose your preferred package manager, and all generated scripts will use that choice.

### pnpm (Recommended)
- Faster installations
- Better disk efficiency
- Stricter dependency resolution
- Native monorepo support

### npm
- Built into Node.js
- Familiar workflow
- Wide compatibility

## Advanced Usage

### Adding Custom Packages

Create a new package in `packages/`:

```bash
mkdir packages/my-package
cd packages/my-package
pnpm init
```

Add to `pnpm-workspace.yaml` if not already covered by `packages/*`.

### Customizing Templates

All templates are in `node_modules/aegis-monorepo/templates/`. You can copy and modify them for your needs.

### Deploying Apps

Each Next.js app includes a Dockerfile template. FastAPI apps can be containerized similarly.

## Troubleshooting

### Port already in use

The dev script assigns ports automatically. If a port is in use, kill the process or modify the port in `apps/<app-name>/package.json`.

### Database connection errors

Ensure PostgreSQL is running (for local setup) or check your Supabase credentials.

### Build errors

Run `pnpm clean` to remove all build artifacts and `node_modules`, then `pnpm install` to reinstall.

## Contributing

This package is based on the airplai-monorepo architecture. Contributions welcome!

## License

MIT

## Author

Priyanshu Sharma (X @peeanshu, GitHub @priyanshush325)
