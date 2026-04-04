import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import { I18nProvider } from "./i18n";

function normalizeViteBase(value: string) {
  const raw = String(value ?? "").trim();
  if (!raw || raw === "/") return "/";
  if (/^https?:\/\//i.test(raw)) return raw.endsWith("/") ? raw : `${raw}/`;

  if (raw.startsWith("./") || raw.startsWith("../")) return raw.endsWith("/") ? raw : `${raw}/`;

  const withLeadingSlash = raw.startsWith("/") ? raw : `/${raw}`;
  return withLeadingSlash.endsWith("/") ? withLeadingSlash : `${withLeadingSlash}/`;
}

export function render(url: string) {
  const g = globalThis as typeof globalThis & {
    process?: { env?: Record<string, string | undefined> };
    __SITE_URL__?: string;
  };
  const env = g.process?.env ?? {};
  g.__SITE_URL__ = String(env.SITE_URL ?? env.VITE_SITE_URL ?? env.PUBLIC_SITE_URL ?? "");
  const base = normalizeViteBase(String(env.VITE_BASE_PATH ?? ""));
  const basename = base.startsWith(".") || base === "/" ? undefined : base.replace(/\/+$/, "");

  const helmetContext: Record<string, unknown> = {};
  const appHtml = renderToString(
    <HelmetProvider context={helmetContext}>
      <I18nProvider initialLocale="en">
        <StaticRouter location={url} basename={basename}>
          <App />
        </StaticRouter>
      </I18nProvider>
    </HelmetProvider>
  );

  const helmet = (helmetContext as { helmet?: Record<string, { toString?: () => string }> }).helmet;
  const head = [
    helmet?.title?.toString?.() ?? "",
    helmet?.meta?.toString?.() ?? "",
    helmet?.link?.toString?.() ?? "",
    helmet?.script?.toString?.() ?? "",
  ].join("");

  return { appHtml, head };
}
