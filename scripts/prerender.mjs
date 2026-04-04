import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

function normalizeSiteUrl(url) {
  const trimmed = String(url ?? "").trim();
  if (!trimmed) return null;
  return trimmed.endsWith("/") ? trimmed.slice(0, -1) : trimmed;
}

function getSiteUrl() {
  return (
    normalizeSiteUrl(process.env.SITE_URL) ||
    normalizeSiteUrl(process.env.VITE_SITE_URL) ||
    normalizeSiteUrl(process.env.PUBLIC_SITE_URL) ||
    "https://personacheck.pro"
  );
}

function getAssessmentIds(projectRoot) {
  const registryPath = path.join(projectRoot, "src", "assessments", "registry.ts");
  const text = fs.readFileSync(registryPath, "utf8");
  const ids = new Set();
  const re = /id:\s*"([^"]+)"/g;
  for (let m = re.exec(text); m; m = re.exec(text)) {
    ids.add(m[1]);
  }
  return [...ids];
}

function routeToOutFile(distDir, routePath) {
  const clean = routePath.replace(/\/+$/, "");
  if (clean === "") return path.join(distDir, "index.html");
  return path.join(distDir, clean.slice(1), "index.html");
}

function ensureDirForFile(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

async function loadSsrRenderer(ssrDir) {
  if (!fs.existsSync(ssrDir)) {
    throw new Error(`SSR build directory not found at ${ssrDir}. Run SSR build first.`);
  }

  const entries = fs.readdirSync(ssrDir);
  const entryFile =
    entries.find((f) => /^entry-server\.(mjs|js|cjs)$/.test(f)) ||
    entries.find((f) => f.includes("entry-server") && (f.endsWith(".mjs") || f.endsWith(".js") || f.endsWith(".cjs")));

  if (!entryFile) {
    throw new Error(`Could not find entry-server output in ${ssrDir}. Found: ${entries.join(", ")}`);
  }

  const mod = await import(pathToFileURL(path.join(ssrDir, entryFile)).href);
  if (typeof mod.render !== "function") {
    throw new Error(`SSR entry "${entryFile}" does not export a render(url) function.`);
  }
  return mod.render;
}

async function main() {
  const projectRoot = process.cwd();
  const distDir = path.join(projectRoot, "dist");
  const ssrDir = path.join(projectRoot, "dist-ssr");
  if (!fs.existsSync(distDir)) {
    throw new Error(`dist directory not found at ${distDir}. Run build first.`);
  }

  const render = await loadSsrRenderer(ssrDir);
  const template = fs.readFileSync(path.join(distDir, "index.html"), "utf8");

  const ids = getAssessmentIds(projectRoot).filter((id) => id !== "iq");
  const routes = ["/", "/test", "/assessments", ...ids.map((id) => `/assessments/${id}`), ...ids.map((id) => `/assessments/${id}/test`)];

  process.env.VITE_SITE_URL = getSiteUrl();

  for (const routePath of routes) {
    const { appHtml, head } = await render(routePath);
    const outFile = routeToOutFile(distDir, routePath);
    ensureDirForFile(outFile);

    const withApp = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
    const html = withApp.replace("</head>", `${head}</head>`);
    fs.writeFileSync(outFile, html, "utf8");
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
