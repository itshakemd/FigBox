const fs = require("fs");
const path = require("path");

const distDir = "D:/FigSpace/dist";
const assetsDir = path.join(distDir, "assets");
const htmlPath = path.join(distDir, "index.html");

const jsFile = fs.readdirSync(assetsDir).filter(f => f.endsWith(".js"))[0];
const cssFile = fs.readdirSync(assetsDir).filter(f => f.endsWith(".css"))[0];

const jsContent = fs.readFileSync(path.join(assetsDir, jsFile), "utf8");
const cssContent = fs.readFileSync(path.join(assetsDir, cssFile), "utf8");


const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Figma Extension Bar</title>
    <style>${cssContent}</style>
  </head>
  <body>
    <div id="root"></div>
    <script>${jsContent}</script>
  </body>
</html>`;

const outPath = "D:/FigSpace/src/ui-content.ts";
const content = `export const uiHtml = ${JSON.stringify(html)};`;
fs.writeFileSync(outPath, content, "utf8");
console.log("Generated ui-content.ts with", html.length, "chars");

fs.writeFileSync(htmlPath, html, "utf8");
console.log("Combined index.html to", html.length, "chars");

if (fs.existsSync(assetsDir)) fs.rmSync(assetsDir, { recursive: true });
console.log("Removed assets directory");
