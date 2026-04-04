import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Analytics } from "@vercel/analytics/react";
import AppClient from "./AppClient";
import { I18nProvider } from "./i18n";
import "./styles/global.css";

const rootEl = document.getElementById("root");
if (!rootEl) {
  throw new Error('Root element "#root" not found');
}

const app = (
  <React.StrictMode>
    <HelmetProvider>
      <I18nProvider>
        <BrowserRouter
          basename={
            import.meta.env.BASE_URL.startsWith(".") || import.meta.env.BASE_URL === "/"
              ? undefined
              : import.meta.env.BASE_URL.replace(/\/+$/, "")
          }
        >
          <AppClient />
          <Analytics />
        </BrowserRouter>
      </I18nProvider>
    </HelmetProvider>
  </React.StrictMode>
);

if (rootEl.hasChildNodes()) {
  ReactDOM.hydrateRoot(rootEl, app);
} else {
  ReactDOM.createRoot(rootEl).render(app);
}
