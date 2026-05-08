import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server.mjs";
import { H as Helmet, a as HelmetProvider } from "./assets/vendor-BMz5C6pv.js";
import { useLocation, Link, Outlet, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { a as assessments, T as TestPage } from "./assets/iq-test-page-BlpRRthJ.js";
import { u as useI18n, H as HomePage, I as I18nProvider } from "./assets/home-CRIP7go1.js";
import { A as AssessmentInfoPage } from "./assets/assessment-info-KTtZO9--.js";
import { A as AssessmentTestPageRoute } from "./assets/assessment-test-QenNEerQ.js";
import { A as AssessmentsPage } from "./assets/assessments-index-DcgmBY55.js";
import "react-fast-compare";
import "invariant";
import "shallowequal";
const skipLink = "_skipLink_1l38l_63";
const container = "_container_1l38l_95";
const header = "_header_1l38l_109";
const topRow = "_topRow_1l38l_129";
const logo = "_logo_1l38l_145";
const logoIcon = "_logoIcon_1l38l_165";
const logoAccent = "_logoAccent_1l38l_173";
const nav = "_nav_1l38l_181";
const navBtn = "_navBtn_1l38l_197";
const themeBtn = "_themeBtn_1l38l_237";
const main = "_main_1l38l_257";
const footer = "_footer_1l38l_265";
const footerInner = "_footerInner_1l38l_281";
const footerNote = "_footerNote_1l38l_291";
const styles = {
  skipLink,
  container,
  header,
  topRow,
  logo,
  logoIcon,
  logoAccent,
  nav,
  navBtn,
  themeBtn,
  main,
  footer,
  footerInner,
  footerNote
};
function getInitialTheme() {
  try {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    return "dark";
  }
  return "dark";
}
function Layout() {
  const { t } = useI18n();
  const brandName = t("site.brandName");
  const location = useLocation();
  const [theme, setTheme] = useState(() => getInitialTheme());
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch {
    }
  }, [theme]);
  const { canonicalHref, origin, basePrefix } = useMemo(() => {
    const path = location.pathname === "/" ? "/" : location.pathname;
    const configuredSiteUrl = "https://personacheck.pro".trim().replace(/\/+$/, "");
    const computedOrigin = configuredSiteUrl !== "" ? configuredSiteUrl : typeof window !== "undefined" ? window.location.origin : "";
    const baseUrl = "/";
    const computedBasePrefix = baseUrl.startsWith(".") || baseUrl === "/" ? "" : baseUrl.replace(/\/+$/, "");
    if (!computedOrigin) return { canonicalHref: null, origin: "", basePrefix: "" };
    return { canonicalHref: `${computedOrigin}${computedBasePrefix}${path}`, origin: computedOrigin, basePrefix: computedBasePrefix };
  }, [location.pathname]);
  const ogImage = origin ? `${origin}${basePrefix}/og-image.svg` : "/og-image.svg";
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      canonicalHref ? /* @__PURE__ */ jsx("link", { rel: "canonical", href: canonicalHref }) : null,
      /* @__PURE__ */ jsx("meta", { property: "og:site_name", content: `${brandName}.pro` }),
      canonicalHref ? /* @__PURE__ */ jsx("meta", { property: "og:url", content: canonicalHref }) : null,
      /* @__PURE__ */ jsx("meta", { property: "og:image", content: ogImage }),
      /* @__PURE__ */ jsx("meta", { property: "og:image:alt", content: `${brandName}.pro` }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:image", content: ogImage })
    ] }),
    /* @__PURE__ */ jsx("a", { href: "#main-content", className: styles.skipLink, children: t("layout.skipToMain") }),
    /* @__PURE__ */ jsxs("div", { className: styles.container, children: [
      /* @__PURE__ */ jsxs("header", { className: styles.header, role: "banner", children: [
        /* @__PURE__ */ jsxs("div", { className: styles.topRow, children: [
          /* @__PURE__ */ jsxs(Link, { to: "/", className: styles.logo, "aria-label": `${brandName} home`, children: [
            /* @__PURE__ */ jsx("span", { className: styles.logoIcon, children: "✅" }),
            /* @__PURE__ */ jsxs("span", { children: [
              brandName,
              /* @__PURE__ */ jsx("span", { className: styles.logoAccent, children: ".pro" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              className: `${styles.navBtn} ${styles.themeBtn}`,
              onClick: () => setTheme((t2) => t2 === "dark" ? "light" : "dark"),
              "aria-label": t("layout.theme.toggleAriaLabel"),
              "aria-pressed": theme === "dark",
              children: [
                theme === "dark" ? /* @__PURE__ */ jsx("span", { children: "🌙" }) : /* @__PURE__ */ jsx("span", { children: "☀️" }),
                " ",
                theme === "dark" ? t("layout.theme.lightMode") : t("layout.theme.darkMode")
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("nav", { className: styles.nav, "aria-label": "Main navigation", children: assessments.map((a) => /* @__PURE__ */ jsxs(Link, { to: a.id === "iq" ? "/" : `/assessments/${a.id}`, className: styles.navBtn, children: [
          /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: a.emoji }),
          " ",
          a.name
        ] }, a.id)) })
      ] }),
      /* @__PURE__ */ jsx("main", { id: "main-content", role: "main", className: styles.main, children: /* @__PURE__ */ jsx(Outlet, {}) }),
      /* @__PURE__ */ jsx("footer", { className: styles.footer, children: /* @__PURE__ */ jsxs("div", { className: styles.footerInner, children: [
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { children: t("layout.footer.disclaimerTitle") }),
          " ",
          t("layout.footer.disclaimerText")
        ] }),
        /* @__PURE__ */ jsx("p", { className: styles.footerNote, children: t("layout.footer.footerNote") })
      ] }) })
    ] })
  ] });
}
function App() {
  return /* @__PURE__ */ jsx(Routes, { children: /* @__PURE__ */ jsxs(Route, { element: /* @__PURE__ */ jsx(Layout, {}), children: [
    /* @__PURE__ */ jsx(Route, { index: true, element: /* @__PURE__ */ jsx(HomePage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "test", element: /* @__PURE__ */ jsx(TestPage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "assessments", element: /* @__PURE__ */ jsx(AssessmentsPage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "assessments/iq", element: /* @__PURE__ */ jsx(Navigate, { to: "/", replace: true }) }),
    /* @__PURE__ */ jsx(Route, { path: "assessments/iq/test", element: /* @__PURE__ */ jsx(Navigate, { to: "/test", replace: true }) }),
    /* @__PURE__ */ jsx(Route, { path: "assessments/:assessmentId", element: /* @__PURE__ */ jsx(AssessmentInfoPage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "assessments/:assessmentId/test", element: /* @__PURE__ */ jsx(AssessmentTestPageRoute, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "iq", element: /* @__PURE__ */ jsx(Navigate, { to: "/", replace: true }) }),
    /* @__PURE__ */ jsx(Route, { path: "iq/test", element: /* @__PURE__ */ jsx(Navigate, { to: "/test", replace: true }) }),
    /* @__PURE__ */ jsx(Route, { path: "mbti", element: /* @__PURE__ */ jsx(Navigate, { to: "/assessments/mbti", replace: true }) }),
    /* @__PURE__ */ jsx(Route, { path: "mbti/test", element: /* @__PURE__ */ jsx(Navigate, { to: "/assessments/mbti/test", replace: true }) }),
    /* @__PURE__ */ jsx(Route, { path: "big-five", element: /* @__PURE__ */ jsx(Navigate, { to: "/assessments/big-five", replace: true }) }),
    /* @__PURE__ */ jsx(Route, { path: "big-five/test", element: /* @__PURE__ */ jsx(Navigate, { to: "/assessments/big-five/test", replace: true }) }),
    /* @__PURE__ */ jsx(Route, { path: "disc", element: /* @__PURE__ */ jsx(Navigate, { to: "/assessments/disc", replace: true }) }),
    /* @__PURE__ */ jsx(Route, { path: "disc/test", element: /* @__PURE__ */ jsx(Navigate, { to: "/assessments/disc/test", replace: true }) }),
    /* @__PURE__ */ jsx(Route, { path: "enneagram", element: /* @__PURE__ */ jsx(Navigate, { to: "/assessments/enneagram", replace: true }) }),
    /* @__PURE__ */ jsx(Route, { path: "enneagram/test", element: /* @__PURE__ */ jsx(Navigate, { to: "/assessments/enneagram/test", replace: true }) }),
    /* @__PURE__ */ jsx(Route, { path: "holland", element: /* @__PURE__ */ jsx(Navigate, { to: "/assessments/holland", replace: true }) }),
    /* @__PURE__ */ jsx(Route, { path: "holland/test", element: /* @__PURE__ */ jsx(Navigate, { to: "/assessments/holland/test", replace: true }) }),
    /* @__PURE__ */ jsx(Route, { path: "home", element: /* @__PURE__ */ jsx(Navigate, { to: "/", replace: true }) }),
    /* @__PURE__ */ jsx(Route, { path: "*", element: /* @__PURE__ */ jsx(Navigate, { to: "/", replace: true }) })
  ] }) });
}
function normalizeViteBase(value) {
  const raw = String(value ?? "").trim();
  if (!raw || raw === "/") return "/";
  if (/^https?:\/\//i.test(raw)) return raw.endsWith("/") ? raw : `${raw}/`;
  if (raw.startsWith("./") || raw.startsWith("../")) return raw.endsWith("/") ? raw : `${raw}/`;
  const withLeadingSlash = raw.startsWith("/") ? raw : `/${raw}`;
  return withLeadingSlash.endsWith("/") ? withLeadingSlash : `${withLeadingSlash}/`;
}
function render(url) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i;
  const g = globalThis;
  const env = ((_a = g.process) == null ? void 0 : _a.env) ?? {};
  g.__SITE_URL__ = String(env.SITE_URL ?? env.VITE_SITE_URL ?? env.PUBLIC_SITE_URL ?? "");
  const base = normalizeViteBase(String(env.VITE_BASE_PATH ?? ""));
  const basename = base.startsWith(".") || base === "/" ? void 0 : base.replace(/\/+$/, "");
  const helmetContext = {};
  const appHtml = renderToString(
    /* @__PURE__ */ jsx(HelmetProvider, { context: helmetContext, children: /* @__PURE__ */ jsx(I18nProvider, { initialLocale: "en", children: /* @__PURE__ */ jsx(StaticRouter, { location: url, basename, children: /* @__PURE__ */ jsx(App, {}) }) }) })
  );
  const helmet = helmetContext.helmet;
  const head = [
    ((_c = (_b = helmet == null ? void 0 : helmet.title) == null ? void 0 : _b.toString) == null ? void 0 : _c.call(_b)) ?? "",
    ((_e = (_d = helmet == null ? void 0 : helmet.meta) == null ? void 0 : _d.toString) == null ? void 0 : _e.call(_d)) ?? "",
    ((_g = (_f = helmet == null ? void 0 : helmet.link) == null ? void 0 : _f.toString) == null ? void 0 : _g.call(_f)) ?? "",
    ((_i = (_h = helmet == null ? void 0 : helmet.script) == null ? void 0 : _h.toString) == null ? void 0 : _i.call(_h)) ?? ""
  ].join("");
  return { appHtml, head };
}
export {
  render
};
