import inquirer from 'inquirer';

export interface InitOptions {
  orgName: string;
  packageManager: 'npm' | 'pnpm';
  database: 'supabase' | 'local' | 'none';
  starterApps: string[];
  includeUI: boolean;
}

export interface AddAppOptions {
  appName: string;
  appType: 'next' | 'fastapi' | 'vite';
  port?: number;
  includeAuth?: boolean;
}

export async function promptInit(): Promise<InitOptions> {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'orgName',
      message: 'What is your organization name? (used for package scopes)',
      default: 'myorg',
      validate: (input: string) => {
        if (/^[a-z0-9-]+$/.test(input)) return true;
        return 'Organization name must be lowercase alphanumeric with hyphens only';
      },
    },
    {
      type: 'list',
      name: 'packageManager',
      message: 'Which package manager do you want to use?',
      choices: [
        { name: 'pnpm (recommended for monorepos)', value: 'pnpm' },
        { name: 'npm', value: 'npm' },
      ],
      default: 'pnpm',
    },
    {
      type: 'list',
      name: 'database',
      message: 'Which database setup do you prefer?',
      choices: [
        { name: 'Supabase (hosted PostgreSQL + auth)', value: 'supabase' },
        { name: 'Local PostgreSQL', value: 'local' },
        { name: 'No database', value: 'none' },
      ],
      default: 'local',
    },
    {
      type: 'checkbox',
      name: 'starterApps',
      message: 'Which starter apps would you like to include?',
      choices: [
        { name: 'Next.js app', value: 'nextjs', checked: true },
        { name: 'FastAPI backend', value: 'fastapi' },
        { name: 'Vite React app', value: 'vite' },
      ],
    },
    {
      type: 'confirm',
      name: 'includeUI',
      message: 'Include shared UI package?',
      default: true,
    },
  ]);

  return answers as InitOptions;
}

export async function promptAddApp(
  appType: 'next' | 'fastapi' | 'vite',
  suggestedPort: number
): Promise<AddAppOptions> {
  const questions: any[] = [
    {
      type: 'input',
      name: 'appName',
      message: 'App name?',
      validate: (input: string) => {
        if (/^[a-z0-9-]+$/.test(input)) return true;
        return 'App name must be lowercase alphanumeric with hyphens only';
      },
    },
    {
      type: 'number',
      name: 'port',
      message: `Port (auto-assigned: ${suggestedPort})?`,
      default: suggestedPort,
    },
  ];

  if (appType === 'next') {
    questions.push({
      type: 'confirm',
      name: 'includeAuth',
      message: 'Include authentication (NextAuth)?',
      default: false,
    });
  }

  const answers = await inquirer.prompt(questions);

  return {
    ...answers,
    appType,
  } as AddAppOptions;
}
