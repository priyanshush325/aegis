import fs from 'fs-extra';
import path from 'path';

export async function getNextAvailablePort(projectDir: string): Promise<number> {
  const appsDir = path.join(projectDir, 'apps');

  if (!await fs.pathExists(appsDir)) {
    return 3000; // Default starting port
  }

  const apps = await fs.readdir(appsDir);
  const ports: number[] = [];

  for (const app of apps) {
    const packageJsonPath = path.join(appsDir, app, 'package.json');

    if (await fs.pathExists(packageJsonPath)) {
      const packageJson = await fs.readJson(packageJsonPath);

      // Check if it's a Next.js app
      const isNextApp = packageJson.dependencies?.next || packageJson.devDependencies?.next;

      if (isNextApp && packageJson.scripts?.dev) {
        // Extract port from dev script
        const devScript = packageJson.scripts.dev;
        const portMatch = devScript.match(/--port (\d+)/);

        if (portMatch) {
          ports.push(parseInt(portMatch[1], 10));
        }
      }
    }
  }

  if (ports.length === 0) {
    return 3000;
  }

  // Return the next port after the highest existing port
  return Math.max(...ports) + 1;
}

export async function getAppsByType(
  projectDir: string,
  type: 'next' | 'fastapi' | 'vite'
): Promise<string[]> {
  const appsDir = path.join(projectDir, 'apps');

  if (!await fs.pathExists(appsDir)) {
    return [];
  }

  const apps = await fs.readdir(appsDir);
  const matchingApps: string[] = [];

  for (const app of apps) {
    const packageJsonPath = path.join(appsDir, app, 'package.json');

    if (await fs.pathExists(packageJsonPath)) {
      const packageJson = await fs.readJson(packageJsonPath);

      let matches = false;

      switch (type) {
        case 'next':
          matches = !!(packageJson.dependencies?.next || packageJson.devDependencies?.next);
          break;
        case 'fastapi':
          // FastAPI apps have a requirements.txt instead
          const requirementsPath = path.join(appsDir, app, 'requirements.txt');
          matches = await fs.pathExists(requirementsPath);
          break;
        case 'vite':
          matches = !!(packageJson.dependencies?.vite || packageJson.devDependencies?.vite);
          break;
      }

      if (matches) {
        matchingApps.push(app);
      }
    }
  }

  return matchingApps;
}
