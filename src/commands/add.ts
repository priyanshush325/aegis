import path from 'path';
import chalk from 'chalk';
import ora from 'ora';
import fs from 'fs-extra';
import { promptAddApp } from '../utils/prompts.js';
import { copyTemplate, readJson, pathExists } from '../utils/file-utils.js';
import { getNextAvailablePort } from '../utils/port-manager.js';

export async function addCommand(appType: 'next' | 'fastapi' | 'vite'): Promise<void> {
  console.log(chalk.bold.cyan(`\n🛡️  Adding ${appType} app to monorepo\n`));

  const projectDir = process.cwd();

  // Verify we're in a monorepo
  const packageJsonPath = path.join(projectDir, 'package.json');

  if (!await pathExists(packageJsonPath)) {
    console.error(chalk.red('Error: Not in a monorepo directory'));
    console.log(chalk.dim('Run this command from the root of your monorepo'));
    process.exit(1);
  }

  const rootPackageJson = await readJson(packageJsonPath);

  // Verify it's a monorepo (has workspaces)
  if (!rootPackageJson.workspaces && !await pathExists(path.join(projectDir, 'pnpm-workspace.yaml'))) {
    console.error(chalk.red('Error: Not a valid monorepo'));
    console.log(chalk.dim('This directory does not appear to be a monorepo'));
    process.exit(1);
  }

  // Get organization name from existing packages
  const packagesDir = path.join(projectDir, 'packages');
  let orgName = 'myorg';

  if (await pathExists(packagesDir)) {
    const packages = await fs.readdir(packagesDir);

    for (const pkg of packages) {
      const pkgJsonPath = path.join(packagesDir, pkg, 'package.json');

      if (await pathExists(pkgJsonPath)) {
        const pkgJson = await readJson(pkgJsonPath);
        const match = pkgJson.name?.match(/^@([^/]+)\//);

        if (match) {
          orgName = match[1];
          break;
        }
      }
    }
  }

  // Determine package manager
  const packageManager = await pathExists(path.join(projectDir, 'pnpm-lock.yaml'))
    ? 'pnpm'
    : 'npm';

  // Get next available port
  const suggestedPort = await getNextAvailablePort(projectDir);

  // Prompt for app details
  const options = await promptAddApp(appType, suggestedPort);

  const spinner = ora(`Creating ${appType} app: ${options.appName}...`).start();

  try {
    const appPath = path.join(projectDir, 'apps', options.appName);

    // Check if app already exists
    if (await pathExists(appPath)) {
      spinner.fail(chalk.red(`App already exists: ${options.appName}`));
      process.exit(1);
    }

    // Map appType to template name
    const templateName = appType === 'next' ? 'nextjs' : appType;

    // Copy app template
    await copyTemplate(`apps/${templateName}`, appPath, {
      orgName,
      appName: options.appName,
      port: options.port,
      packageManager,
      includeAuth: options.includeAuth,
    });

    spinner.succeed(chalk.green(`App created successfully: ${options.appName}`));

    // Print next steps
    console.log(chalk.bold('\n📦 Next steps:\n'));
    console.log(chalk.dim(`  ${packageManager} install`));
    console.log(chalk.dim(`  ${packageManager} --filter ${options.appName} dev`));

    if (appType === 'next' && options.includeAuth) {
      console.log(chalk.yellow('\n⚠️  Authentication setup required:'));
      console.log(chalk.dim('  Add NEXTAUTH_SECRET to your .env file'));
      console.log(chalk.dim('  Configure OAuth providers in src/auth.ts'));
    }

    console.log(chalk.bold.green('\n✨ Done!\n'));
  } catch (error) {
    spinner.fail(chalk.red('Failed to create app'));
    console.error(chalk.red((error as Error).message));
    process.exit(1);
  }
}
