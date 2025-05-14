// check-env-vars.js
// Usage: pnpm run check-env-vars
// Checks that all env vars used in code are present in .env.example files and vice versa

import fs from 'fs';
import path from 'path';

// Utility to extract env vars from code
function extractEnvVarsFromCode(dir, regex, prefix = '') {
  let results = new Set();
  function walk(currentDir) {
    fs.readdirSync(currentDir).forEach(file => {
      const fullPath = path.join(currentDir, file);
      if (fs.statSync(fullPath).isDirectory()) {
        walk(fullPath);
      } else if (file.endsWith('.js') || file.endsWith('.ts') || file.endsWith('.tsx')) {
        const content = fs.readFileSync(fullPath, 'utf8');
        let match;
        while ((match = regex.exec(content)) !== null) {
          if (match[1].startsWith(prefix)) results.add(match[1]);
        }
      }
    });
  }
  walk(dir);
  return results;
}

// Utility to extract env vars from .env.example
function extractEnvVarsFromEnvFile(envPath, prefix = '') {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const lines = envContent.split(/\r?\n/);
  return new Set(
    lines
      .map(line => line.trim())
      .filter(line => line && !line.startsWith('#'))
      .map(line => line.split('=')[0].trim())
      .filter(key => key.startsWith(prefix))
  );
}

function compareVars(used, documented, context) {
  const missing = [...used].filter(x => !documented.has(x));
  const unused = [...documented].filter(x => !used.has(x));
  if (missing.length === 0 && unused.length === 0) {
    console.log(`✅ All ${context} env vars are documented and used.`);
  } else {
    if (missing.length > 0) {
      console.warn(`\n❌ ${context} env vars used in code but missing in .env.example:`);
      missing.forEach(v => console.warn('  - ' + v));
    }
    if (unused.length > 0) {
      console.warn(`\n⚠️  ${context} env vars in .env.example but not used in code:`);
      unused.forEach(v => console.warn('  - ' + v));
    }
  }
}

// --- CLIENT ---
const clientDir = path.join(__dirname, '../src');
const clientEnvPath = path.join(__dirname, '../.env.example');
const viteRegex = /import\.meta\.env\.([A-Z0-9_]+)/g;
const vitePrefix = 'VITE_';
const clientUsed = extractEnvVarsFromCode(clientDir, viteRegex, vitePrefix);
const clientDocumented = extractEnvVarsFromEnvFile(clientEnvPath, vitePrefix);
compareVars(clientUsed, clientDocumented, 'CLIENT');

// --- SERVER ---
const serverDir = path.join(__dirname, '../server');
const serverEnvPath = path.join(__dirname, 'https://api.keshevplus.co.il/.env.example');
const nodeRegex = /process\.env\.([A-Z0-9_]+)/g;
const serverUsed = extractEnvVarsFromCode(serverDir, nodeRegex);
const serverDocumented = extractEnvVarsFromEnvFile(serverEnvPath);
compareVars(serverUsed, serverDocumented, 'SERVER');

// Exit with code 1 if any missing vars
if (
  [...clientUsed].some(x => !clientDocumented.has(x)) ||
  [...serverUsed].some(x => !serverDocumented.has(x))
) {
  process.exit(1);
}
