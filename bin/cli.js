#!/usr/bin/env node

import('../dist/index.js').catch((err) => {
  console.error('Failed to load aegis CLI:', err);
  process.exit(1);
});
