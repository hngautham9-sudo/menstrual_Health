const fs = require('fs');
const path = require('path');
const indexPath = path.join(__dirname, 'dist', 'index.html');
if (fs.existsSync(indexPath)) {
  let html = fs.readFileSync(indexPath, 'utf8');
  html = html.replace(/crossorigin/g, 'crossorigin="use-credentials"');
  fs.writeFileSync(indexPath, html);
  console.log('Fixed crossorigin in dist/index.html');
}
