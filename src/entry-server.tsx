import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import { I18nProvider } from "./i18n";

export function render(url: string) {
  const env = ((globalThis as any).process?.env ?? {}) as Record<string, unknown>;
  (globalThis as any).__SITE_URL__ = String(env.SITE_URL ?? env.VITE_SITE_URL ?? env.PUBLIC_SITE_URL ?? "");

  const helmetContext: Record<string, unknown> = {};
  const appHtml = renderToString(
    <HelmetProvider context={helmetContext}>
      <I18nProvider initialLocale="en">
        <StaticRouter location={url}>
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
