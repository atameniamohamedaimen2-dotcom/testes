import fs from "node:fs";
import path from "node:path";

const PROJECT_ROOT = process.cwd();
const SRC_DIR = path.join(PROJECT_ROOT, "src");
const EN_JSON_PATH = path.join(SRC_DIR, "i18n", "en.json");

function isTsLike(filePath) {
  return filePath.endsWith(".ts") || filePath.endsWith(".tsx") || filePath.endsWith(".js") || filePath.endsWith(".jsx");
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const out = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      out.push(...walk(full));
      continue;
    }
    if (e.isFile() && isTsLike(full)) out.push(full);
  }
  return out;
}

function normalizeText(s) {
  return String(s).replace(/\s+/g, " ").trim();
}

function looksMeaningful(s) {
  if (!s) return false;
  if (s.length < 2) return false;
  if (/^[_\-\d\s]+$/.test(s)) return false;
  if (/^(true|false|null|undefined)$/.test(s)) return false;
  return /[A-Za-z\u00C0-\u024F\u0600-\u06FF]/.test(s);
}

function extractStringLiterals(source) {
  const out = [];
  const re = /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)/g;
  for (let m = re.exec(source); m; m = re.exec(source)) {
    const raw = m[1];
    if (!raw) continue;
    if (raw.startsWith("`") && raw.includes("${")) continue;
    const unquoted = raw.slice(1, -1);
    const text = normalizeText(unquoted);
    if (looksMeaningful(text)) out.push(text);
  }
  return out;
}

function extractJsxTextNodes(source) {
  const out = [];
  const re = />[^<{][^<]*</g;
  for (let m = re.exec(source); m; m = re.exec(source)) {
    const chunk = m[0].slice(1, -1);
    if (chunk.includes("{")) continue;
    const text = normalizeText(chunk);
    if (looksMeaningful(text)) out.push(text);
  }
  return out;
}

function uniq(arr) {
  return [...new Set(arr)];
}

function rel(p) {
  return p.slice(PROJECT_ROOT.length + 1).replace(/\\/g, "/");
}

function loadEnJson() {
  const raw = fs.readFileSync(EN_JSON_PATH, "utf8");
  return JSON.parse(raw);
}

function writeEnJson(obj) {
  fs.writeFileSync(EN_JSON_PATH, `${JSON.stringify(obj, null, 2)}\n`, "utf8");
}

function main() {
  if (!fs.existsSync(EN_JSON_PATH)) {
    throw new Error(`Missing ${EN_JSON_PATH}`);
  }

  const files = walk(SRC_DIR);
  const byFile = {};
  let totalStrings = 0;

  for (const filePath of files) {
    const text = fs.readFileSync(filePath, "utf8");
    const strings = uniq([...extractStringLiterals(text), ...extractJsxTextNodes(text)]);
    if (strings.length === 0) continue;
    byFile[rel(filePath)] = strings.sort((a, b) => a.localeCompare(b));
    totalStrings += strings.length;
  }

  const en = loadEnJson();
  en.inventory = en.inventory ?? {};
  en.inventory.extracted = {
    generatedAt: new Date().toISOString(),
    filesScanned: files.length,
    filesWithStrings: Object.keys(byFile).length,
    totalStrings,
    byFile,
  };

  writeEnJson(en);
}

main();
