#!/usr/bin/env node
/**
 * Dev server stub — will be replaced by Vite when React frontend is implemented.
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 5173;
const publicDir = path.join(__dirname, '..', 'public');

const server = http.createServer((req, res) => {
  const file = path.join(publicDir, 'index.html');
  res.writeHead(200, { 'Content-Type': 'text/html' });
  fs.createReadStream(file).pipe(res);
});

server.listen(PORT, () => {
  process.stdout.write(`Dev server running at http://localhost:${PORT}\n`);
});
