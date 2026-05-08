import fs from "node:fs";
import path from "node:path";

function normalizeSiteUrl(url) {
  const trimmed = String(url ?? "").trim();
  if (!trimmed) return null;
  return trimmed.endsWith("/") ? trimmed.slice(0, -1) : trimmed;
}

function normalizeViteBase(value) {
  const raw = String(value ?? "").trim();
  if (!raw || raw === "/") return "/";
  if (/^https?:\/\//i.test(raw)) return raw.endsWith("/") ? raw : `${raw}/`;
  if (raw.startsWith("./") || raw.startsWith("../")) return raw.endsWith("/") ? raw : `${raw}/`;
  const withLeadingSlash = raw.startsWith("/") ? raw : `/${raw}`;
  return withLeadingSlash.endsWith("/") ? withLeadingSlash : `${withLeadingSlash}/`;
}

function getSiteUrl() {
  return (
    normalizeSiteUrl(process.env.SITE_URL) ||
    normalizeSiteUrl(process.env.VITE_SITE_URL) ||
    normalizeSiteUrl(process.env.PUBLIC_SITE_URL) ||
    "https://personacheck.pro"
  );
}

function getBasePrefix() {
  const base = normalizeViteBase(process.env.VITE_BASE_PATH || "");
  if (base.startsWith(".") || base === "/") return "";
  return base.replace(/\/+$/, "");
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

function buildSitemapXml({ siteUrl, basePrefix, urls, lastmod }) {
  const lines = [];
  lines.push('<?xml version="1.0" encoding="UTF-8"?>');
  lines.push('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
  for (const u of urls) {
    lines.push("  <url>");
    lines.push(`    <loc>${siteUrl}${basePrefix}${u}</loc>`);
    lines.push(`    <lastmod>${lastmod}</lastmod>`);
    lines.push("  </url>");
  }
  lines.push("</urlset>");
  return `${lines.join("\n")}\n`;
}

function buildRobotsTxt({ siteUrl, basePrefix }) {
  return `User-agent: *
Allow: /

Sitemap: ${siteUrl}${basePrefix}/sitemap.xml
`;
}

function main() {
  const projectRoot = process.cwd();
  const distDir = path.join(projectRoot, "dist");
  if (!fs.existsSync(distDir)) {
    throw new Error(`dist directory not found at ${distDir}. Run build first.`);
  }
  const publicDir = path.join(projectRoot, "public");

  const siteUrl = getSiteUrl();
  const basePrefix = getBasePrefix();
  const ids = getAssessmentIds(projectRoot).filter((id) => id !== "iq");

  const urls = ["/", "/test", "/assessments", ...ids.map((id) => `/assessments/${id}`), ...ids.map((id) => `/assessments/${id}/test`)];

  const today = new Date();
  const lastmod = today.toISOString().slice(0, 10);

  const sitemapXml = buildSitemapXml({ siteUrl, basePrefix, urls, lastmod });
  const robotsTxt = buildRobotsTxt({ siteUrl, basePrefix });

  fs.writeFileSync(path.join(distDir, "sitemap.xml"), sitemapXml, "utf8");
  fs.writeFileSync(path.join(distDir, "robots.txt"), robotsTxt, "utf8");
  if (fs.existsSync(publicDir)) {
    fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemapXml, "utf8");
    fs.writeFileSync(path.join(publicDir, "robots.txt"), robotsTxt, "utf8");
  }
}

main();
