import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export interface TemplateVariables {
  orgName: string;
  appName?: string;
  port?: number;
  packageManager?: 'npm' | 'pnpm';
  [key: string]: any;
}

export async function copyTemplate(
  templateName: string,
  destination: string,
  variables: TemplateVariables
): Promise<void> {
  const templatePath = path.join(__dirname, '../../templates', templateName);

  if (!await fs.pathExists(templatePath)) {
    throw new Error(`Template not found: ${templateName}`);
  }

  await fs.copy(templatePath, destination, {
    filter: (src) => {
      // Skip node_modules and other unnecessary files
      return !src.includes('node_modules') && !src.includes('.DS_Store');
    },
  });

  // Process files and replace variables
  await processTemplateFiles(destination, variables);
}

async function processTemplateFiles(
  directory: string,
  variables: TemplateVariables
): Promise<void> {
  const files = await fs.readdir(directory);

  for (const file of files) {
    const filePath = path.join(directory, file);
    const stat = await fs.stat(filePath);

    if (stat.isDirectory()) {
      await processTemplateFiles(filePath, variables);
    } else if (stat.isFile()) {
      // Process text files for variable replacement
      const ext = path.extname(file);
      const textExtensions = ['.json', '.ts', '.tsx', '.js', '.jsx', '.yaml', '.yml', '.md', '.sh', '.env', '.example'];

      if (textExtensions.includes(ext) || file.startsWith('.')) {
        let content = await fs.readFile(filePath, 'utf-8');

        // Replace template variables
        content = content.replace(/\{\{orgName\}\}/g, variables.orgName);
        content = content.replace(/\{\{appName\}\}/g, variables.appName || '');
        content = content.replace(/\{\{port\}\}/g, variables.port?.toString() || '');
        content = content.replace(/\{\{packageManager\}\}/g, variables.packageManager || 'pnpm');

        // Replace package manager commands
        if (variables.packageManager === 'npm') {
          content = content.replace(/pnpm/g, 'npm');
          content = content.replace(/npm@8\.15\.0/g, 'npm@latest');
        }

        await fs.writeFile(filePath, content);
      }
    }
  }
}

export async function ensureDirectory(dirPath: string): Promise<void> {
  await fs.ensureDir(dirPath);
}

export async function pathExists(filePath: string): Promise<boolean> {
  return fs.pathExists(filePath);
}

export async function writeJson(filePath: string, data: any): Promise<void> {
  await fs.writeJson(filePath, data, { spaces: 2 });
}

export async function readJson(filePath: string): Promise<any> {
  return fs.readJson(filePath);
}
