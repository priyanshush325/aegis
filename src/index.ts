#!/usr/bin/env node

import { Command } from 'commander';
import { initCommand } from './commands/init.js';
import { addCommand } from './commands/add.js';
import chalk from 'chalk';

const program = new Command();

program
  .name('aegis')
  .description('CLI tool for initializing and managing monorepos with standardized architecture')
  .version('1.0.0');

program
  .command('init [directory]')
  .description('Initialize a new monorepo')
  .action(async (directory?: string) => {
    await initCommand(directory);
  });

program
  .command('add <type>')
  .description('Add a new app to the monorepo')
  .addHelpText('after', `
Examples:
  $ aegis add next      Add a Next.js app
  $ aegis add fastapi   Add a FastAPI backend
  $ aegis add vite      Add a Vite React app
  `)
  .action(async (type: string) => {
    const validTypes = ['next', 'fastapi', 'vite'];

    if (!validTypes.includes(type)) {
      console.error(chalk.red(`Error: Invalid app type "${type}"`));
      console.log(chalk.dim(`Valid types: ${validTypes.join(', ')}`));
      process.exit(1);
    }

    await addCommand(type as 'next' | 'fastapi' | 'vite');
  });

program.parse();
