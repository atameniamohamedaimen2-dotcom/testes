import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server.mjs";
import { H as Helmet, a as HelmetProvider } from "./assets/vendor-BMz5C6pv.js";
import { useLocation, Link, Outlet, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { a as assessments, T as TestPage } from "./assets/iq-test-page-BIOHOohz.js";
import { u as useI18n, H as HomePage, I as I18nProvider } from "./assets/home-Hplm1lpP.js";
import { A as AssessmentInfoPage } from "./assets/assessment-info-Cp84TyZc.js";
import { A as AssessmentTestPageRoute } from "./assets/assessment-test-D3-DGRXu.js";
import { A as AssessmentsPage } from "./assets/assessments-index-B2CJWE8z.js";
import "react-fast-compare";
import "invariant";
import "shallowequal";
const skipLink = "_skipLink_tktgv_32";
const container = "_container_tktgv_48";
const header = "_header_tktgv_55";
const topRow = "_topRow_tktgv_65";
const logo = "_logo_tktgv_73";
const logoIcon = "_logoIcon_tktgv_83";
const logoAccent = "_logoAccent_tktgv_87";
const nav = "_nav_tktgv_91";
const navBtn = "_navBtn_tktgv_99";
const themeBtn = "_themeBtn_tktgv_119";
const main = "_main_tktgv_129";
const footer = "_footer_tktgv_133";
const footerInner = "_footerInner_tktgv_141";
const footerNote = "_footerNote_tktgv_146";
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
  const { canonicalHref, origin } = useMemo(() => {
    const path = location.pathname === "/" ? "" : location.pathname;
    const configuredSiteUrl = "https://personacheck.pro".trim().replace(/\/+$/, "");
    const computedOrigin = configuredSiteUrl !== "" ? configuredSiteUrl : typeof window !== "undefined" ? window.location.origin : "";
    if (!computedOrigin) return { canonicalHref: null, origin: "" };
    return { canonicalHref: `${computedOrigin}${path}`, origin: computedOrigin };
  }, [location.pathname]);
  const ogImage = origin ? `${origin}/og-image.svg` : "/og-image.svg";
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
function render(url) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i;
  const env = ((_a = globalThis.process) == null ? void 0 : _a.env) ?? {};
  globalThis.__SITE_URL__ = String(env.SITE_URL ?? env.VITE_SITE_URL ?? env.PUBLIC_SITE_URL ?? "");
  const helmetContext = {};
  const appHtml = renderToString(
    /* @__PURE__ */ jsx(HelmetProvider, { context: helmetContext, children: /* @__PURE__ */ jsx(I18nProvider, { initialLocale: "en", children: /* @__PURE__ */ jsx(StaticRouter, { location: url, children: /* @__PURE__ */ jsx(App, {}) }) }) })
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
