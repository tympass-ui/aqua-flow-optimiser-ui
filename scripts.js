
// This file is used to update package.json scripts
// You would typically run: node scripts.js
const fs = require('fs');
const path = require('path');

const packageJsonPath = path.join(__dirname, 'package.json');
const packageJson = require(packageJsonPath);

// Update scripts
packageJson.scripts = {
  ...packageJson.scripts,
  "dev": "webpack serve --mode development",
  "build": "webpack --mode production",
  "preview": "npx serve dist"
};

// Write back to package.json
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
console.log('Updated package.json scripts');
