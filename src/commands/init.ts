import path from 'path';
import chalk from 'chalk';
import ora from 'ora';
import { promptInit } from '../utils/prompts.js';
import { copyTemplate, ensureDirectory, writeJson } from '../utils/file-utils.js';

export async function initCommand(directory?: string): Promise<void> {
  console.log(chalk.bold.cyan('\n🛡️  Aegis Monorepo Initializer\n'));

  const options = await promptInit();
  const targetDir = path.resolve(process.cwd(), directory || '.');

  console.log(chalk.dim(`\nInitializing monorepo in: ${targetDir}\n`));

  const spinner = ora('Creating monorepo structure...').start();

  try {
    // Ensure target directory exists
    await ensureDirectory(targetDir);

    // Create directory structure
    await ensureDirectory(path.join(targetDir, 'apps'));
    await ensureDirectory(path.join(targetDir, 'packages'));
    await ensureDirectory(path.join(targetDir, 'scripts'));

    spinner.text = 'Copying root configuration files...';

    // Copy root template files
    await copyTemplate('root', targetDir, {
      orgName: options.orgName,
      packageManager: options.packageManager,
    });

    spinner.text = 'Copying development scripts...';

    // Copy scripts
    await copyTemplate('scripts', path.join(targetDir, 'scripts'), {
      orgName: options.orgName,
      packageManager: options.packageManager,
    });

    // Copy database package if needed
    if (options.database !== 'none') {
      spinner.text = `Setting up ${options.database} database package...`;

      const dbTemplate = options.database === 'supabase' ? 'packages/db-supabase' : 'packages/db-local';
      await copyTemplate(dbTemplate, path.join(targetDir, 'packages', 'db'), {
        orgName: options.orgName,
        packageManager: options.packageManager,
      });
    }

    // Copy UI package if needed
    if (options.includeUI) {
      spinner.text = 'Setting up UI package...';

      await copyTemplate('packages/ui', path.join(targetDir, 'packages', 'ui'), {
        orgName: options.orgName,
        packageManager: options.packageManager,
      });
    }

    // Copy starter apps
    let portCounter = 3000;

    for (const appType of options.starterApps) {
      spinner.text = `Creating ${appType} starter app...`;

      const appName = `${options.orgName}-${appType}`;
      const appPath = path.join(targetDir, 'apps', appName);

      await copyTemplate(`apps/${appType}`, appPath, {
        orgName: options.orgName,
        appName,
        port: portCounter,
        packageManager: options.packageManager,
      });

      if (appType === 'nextjs') {
        portCounter++;
      }
    }

    spinner.succeed(chalk.green('Monorepo structure created successfully!'));

    // Print next steps
    console.log(chalk.bold('\n📦 Next steps:\n'));
    console.log(chalk.dim(`  cd ${path.relative(process.cwd(), targetDir) || '.'}`));
    console.log(chalk.dim(`  ${options.packageManager} install`));
    console.log(chalk.dim(`  ${options.packageManager} dev`));

    if (options.database === 'local') {
      console.log(chalk.yellow('\n⚠️  Don\'t forget to set up your PostgreSQL database!'));
      console.log(chalk.dim('  Update .env with your database credentials'));
      console.log(chalk.dim(`  ${options.packageManager} --filter @${options.orgName}/db db:push`));
    } else if (options.database === 'supabase') {
      console.log(chalk.yellow('\n⚠️  Don\'t forget to set up your Supabase project!'));
      console.log(chalk.dim('  Update .env with your Supabase credentials'));
      console.log(chalk.dim('  Visit: https://supabase.com'));
    }

    console.log(chalk.bold.green('\n✨ Happy coding!\n'));
  } catch (error) {
    spinner.fail(chalk.red('Failed to initialize monorepo'));
    console.error(chalk.red((error as Error).message));
    process.exit(1);
  }
}
