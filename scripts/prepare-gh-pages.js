import fs from "node:fs";
import path from "node:path";

const clientDir = path.resolve(process.cwd(), "dist/client");
const assetsDir = path.join(clientDir, "assets");

if (!fs.existsSync(assetsDir)) {
  console.error("dist/client/assets does not exist. Run build first.");
  process.exit(1);
}

const files = fs.readdirSync(assetsDir);
const mainJs = files.find((f) => f.startsWith("index-") && f.endsWith(".js"));
const mainCss = files.find((f) => f.startsWith("styles-") && f.endsWith(".css"));

if (!mainJs || !mainCss) {
  console.error("Could not find main index.js or styles.css in assets.");
  process.exit(1);
}

const indexHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>The Sheesham Artisans — Luxury Solid Wood Furniture & Interiors, Pune</title>
    <meta name="description" content="Handcrafted sheesham wood furniture, modular kitchens and complete home interiors, made to order in Kharadi, Pune." />
    <script type="text/javascript">
      (function(l) {
        if (l.search[1] === 'p') {
          var decoded = l.search.slice(1).split('&').map(function(s) { 
            return s.replace(/~and~/g, '&')
          }).filter(function(s) {
            return s.slice(0, 2) === 'p='
          })[0].slice(2);
          if (decoded) {
            window.history.replaceState(null, null,
              l.pathname.slice(0, -1) + decoded + l.hash
            );
          }
        }
      }(window.location))
    </script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300&family=Jost:wght@200;300;400;500&display=swap" rel="stylesheet">
    <link rel="icon" type="image/svg+xml" href="./favicon.svg" />
    <link rel="stylesheet" href="./assets/${mainCss}" />
  </head>
  <body class="bg-[#241b14] text-[#f7f5f0]">
    <div id="root"></div>
    <script type="module" src="./assets/${mainJs}"></script>
  </body>
</html>`;

const page404Html = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>The Sheesham Artisans</title>
    <script type="text/javascript">
      var pathSegmentsToKeep = 1;
      var l = window.location;
      l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?p=' +
        l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
        (l.search ? '&q=' + l.search.slice(1).replace(/&/g, '~and~') : '') +
        l.hash
      );
    </script>
  </head>
  <body>
  </body>
</html>`;

fs.writeFileSync(path.join(clientDir, "index.html"), indexHtml, "utf-8");
fs.writeFileSync(path.join(clientDir, "404.html"), page404Html, "utf-8");
fs.writeFileSync(path.join(clientDir, ".nojekyll"), "", "utf-8");

console.log("Successfully generated index.html, 404.html redirect, and .nojekyll in dist/client for GitHub Pages!");
