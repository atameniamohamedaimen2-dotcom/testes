import { useEffect, useMemo, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import styles from "./Layout.module.css";
import { assessments } from "../assessments/registry";
import { useI18n } from "../i18n";

type Theme = "dark" | "light";

function getInitialTheme(): Theme {
  try {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    return "dark";
  }
  return "dark";
}

export default function Layout() {
  const { t } = useI18n();
  const brandName = t("site.brandName");
  const location = useLocation();
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch {
      void 0;
    }
  }, [theme]);

  const { canonicalHref, origin, basePrefix } = useMemo(() => {
    const path = location.pathname === "/" ? "/" : location.pathname;
    const configuredSiteUrl = (import.meta.env.VITE_SITE_URL || (globalThis as any).__SITE_URL__ || "")
      .trim()
      .replace(/\/+$/, "");
    const computedOrigin =
      configuredSiteUrl !== "" ? configuredSiteUrl : typeof window !== "undefined" ? window.location.origin : "";

    const baseUrl = import.meta.env.BASE_URL;
    const computedBasePrefix = baseUrl.startsWith(".") || baseUrl === "/" ? "" : baseUrl.replace(/\/+$/, "");

    if (!computedOrigin) return { canonicalHref: null as string | null, origin: "", basePrefix: "" };
    return { canonicalHref: `${computedOrigin}${computedBasePrefix}${path}`, origin: computedOrigin, basePrefix: computedBasePrefix };
  }, [location.pathname]);

  const ogImage = origin ? `${origin}${basePrefix}/og-image.svg` : "/og-image.svg";

  return (
    <>
      <Helmet>
        {canonicalHref ? <link rel="canonical" href={canonicalHref} /> : null}
        <meta property="og:site_name" content={`${brandName}.pro`} />
        {canonicalHref ? <meta property="og:url" content={canonicalHref} /> : null}
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:alt" content={`${brandName}.pro`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={ogImage} />
      </Helmet>

      <a href="#main-content" className={styles.skipLink}>
        {t("layout.skipToMain")}
      </a>

      <div className={styles.container}>
        <header className={styles.header} role="banner">
          <div className={styles.topRow}>
            <Link to="/" className={styles.logo} aria-label={`${brandName} home`}>
              <span className={styles.logoIcon}>✅</span>
              <span>
                {brandName}
                <span className={styles.logoAccent}>.pro</span>
              </span>
            </Link>
            <button
              type="button"
              className={`${styles.navBtn} ${styles.themeBtn}`}
              onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
              aria-label={t("layout.theme.toggleAriaLabel")}
              aria-pressed={theme === "dark"}
            >
              {theme === "dark" ? <span>🌙</span> : <span>☀️</span>}{" "}
              {theme === "dark" ? t("layout.theme.lightMode") : t("layout.theme.darkMode")}
            </button>
          </div>

          <nav className={styles.nav} aria-label="Main navigation">
            {assessments.map((a) => (
              <Link key={a.id} to={a.id === "iq" ? "/" : `/assessments/${a.id}`} className={styles.navBtn}>
                <span aria-hidden="true">{a.emoji}</span> {a.name}
              </Link>
            ))}
          </nav>
        </header>

        <main id="main-content" role="main" className={styles.main}>
          <Outlet />
        </main>

        <footer className={styles.footer}>
          <div className={styles.footerInner}>
            <p>
              <strong>{t("layout.footer.disclaimerTitle")}</strong> {t("layout.footer.disclaimerText")}
            </p>
            <p className={styles.footerNote}>{t("layout.footer.footerNote")}</p>
          </div>
        </footer>
      </div>
    </>
  );
}
