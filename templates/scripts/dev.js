#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const appsDir = path.join(__dirname, '..', 'apps');
const packagesDir = path.join(__dirname, '..', 'packages');

// Discover all apps
const apps = fs
  .readdirSync(appsDir)
  .filter((file) => {
    const appPath = path.join(appsDir, file);
    const isDirectory = fs.statSync(appPath).isDirectory();
    const hasPackageJson = fs.existsSync(path.join(appPath, 'package.json'));
    return isDirectory && hasPackageJson && file !== '.gitkeep';
  });

if (apps.length === 0) {
  console.log('⚠️  No apps found in apps/ directory');
  console.log('💡 Create your first app with: npx aegis add next');
  process.exit(0);
}

console.log(`\n🚀 Starting ${apps.length} app(s): ${apps.join(', ')}\n`);

// Detect Next.js apps and assign sequential ports
let nextPort = 3000;
const appConfigs = apps.map((app) => {
  const appPath = path.join(appsDir, app);
  const packageJsonPath = path.join(appPath, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

  // Check if it's a Next.js app
  const isNextApp = packageJson.dependencies?.next || packageJson.devDependencies?.next;

  if (isNextApp) {
    const port = nextPort++;
    console.log(`📍 ${app} → http://localhost:${port}`);

    // Update the package.json to include the port
    packageJson.scripts.dev = `next dev --turbopack --port ${port}`;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');

    // Create/update .env.local with NEXTAUTH_URL
    const envLocalPath = path.join(appPath, '.env.local');
    const nextauthUrl = `NEXTAUTH_URL=http://localhost:${port}\nAUTH_URL=http://localhost:${port}\n`;

    if (fs.existsSync(envLocalPath)) {
      let envContent = fs.readFileSync(envLocalPath, 'utf-8');
      // Remove existing NEXTAUTH_URL and AUTH_URL lines
      envContent = envContent.split('\n').filter(line =>
        !line.startsWith('NEXTAUTH_URL=') && !line.startsWith('AUTH_URL=')
      ).join('\n');
      // Add new NEXTAUTH_URL and AUTH_URL at the top
      envContent = nextauthUrl + envContent;
      fs.writeFileSync(envLocalPath, envContent);
    } else {
      fs.writeFileSync(envLocalPath, nextauthUrl);
    }

    return {
      command: ['{{packageManager}}', '--filter', app, 'dev'],
      title: app,
    };
  }

  return {
    command: ['{{packageManager}}', '--filter', app, 'dev'],
    title: app,
  };
});

// Check if packages exist and add to run-pty config
const runPtyConfig = [];

// Add db package if it exists
if (fs.existsSync(path.join(packagesDir, 'db', 'package.json'))) {
  runPtyConfig.push({
    command: ['{{packageManager}}', '--filter', '@{{orgName}}/db', 'db:studio'],
    title: 'drizzle-studio',
  });
}

// Add ui package if it exists
if (fs.existsSync(path.join(packagesDir, 'ui', 'package.json'))) {
  runPtyConfig.push({
    command: ['{{packageManager}}', '--filter', '@{{orgName}}/ui', 'dev'],
    title: 'ui-package',
  });
}

// Add all apps
runPtyConfig.push(...appConfigs);

const configPath = path.join(__dirname, 'dev.json');
fs.writeFileSync(configPath, JSON.stringify(runPtyConfig, null, 2));

try {
  execSync('run-pty scripts/dev.json', { stdio: 'inherit', cwd: path.join(__dirname, '..') });
} catch (error) {
  process.exit(error.status || 1);
}
