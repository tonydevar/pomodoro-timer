#!/usr/bin/env node
/**
 * Minimal build script — copies public/index.html to dist/index.html.
 * Will be replaced by Vite when the React frontend is implemented.
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const distDir = path.join(root, 'dist');
const src = path.join(root, 'public', 'index.html');
const dest = path.join(distDir, 'index.html');

fs.mkdirSync(distDir, { recursive: true });
fs.copyFileSync(src, dest);

process.stdout.write(`Build complete: ${dest}\n`);
