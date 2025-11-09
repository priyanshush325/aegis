# {{orgName}} Monorepo

A monorepo built with [Aegis](https://github.com/yourusername/aegis) - featuring standardized architecture for multi-stack applications.

## Tech Stack

- **Package Manager**: {{packageManager}}
- **Build System**: Turbo
- **Languages**: TypeScript, Python
- **Frameworks**: Next.js, FastAPI, Vite
- **Database**: Drizzle ORM + PostgreSQL/Supabase

## Getting Started

1. Install dependencies:
```bash
{{packageManager}} install
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Start development servers:
```bash
{{packageManager}} dev
```

This will automatically start all apps and services with proper port management.

## Project Structure

```
.
├── apps/              # Application workspaces
├── packages/          # Shared libraries
│   ├── db/           # Database schema and client
│   └── ui/           # Shared UI components
├── scripts/          # Development scripts
└── turbo.json        # Build configuration
```

## Available Commands

- `{{packageManager}} dev` - Start all development servers
- `{{packageManager}} build` - Build all apps
- `{{packageManager}} lint` - Lint all packages
- `{{packageManager}} type-check` - Type check all packages
- `{{packageManager}} format` - Format code with Prettier
- `{{packageManager}} clean` - Clean all build artifacts

## Adding New Apps

Use the Aegis CLI to add new apps:

```bash
npx aegis add next      # Add Next.js app
npx aegis add fastapi   # Add FastAPI backend
npx aegis add vite      # Add Vite React app
```

## Learn More

- [Aegis Documentation](https://github.com/yourusername/aegis)
- [Turborepo](https://turbo.build)
- [Next.js](https://nextjs.org)
- [FastAPI](https://fastapi.tiangolo.com)
