import fs from 'fs';

// Undo changes to package.json to build the WebSocket server.

// Load the package definition JSON file.
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

// Override the bin & main properties to target the Websocket server.
pkg.bin = 'dist/src/server.js';

// Write the package definition JSON file.
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
