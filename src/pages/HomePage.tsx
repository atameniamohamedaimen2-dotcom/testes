import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import styles from "./HomePage.module.css";
import { useI18n } from "../i18n";

type HomeMethod = { icon: string; title: string; desc: string; benefits: string };
type HomeCard = { title: string; text: string };

export default function HomePage() {
  const { t, get } = useI18n();
  const brandName = t("site.brandName");
  const title = t("routes.home.helmet.title");
  const description = t("routes.home.helmet.description");

  const configuredSiteUrl = (import.meta.env.VITE_SITE_URL || (globalThis as any).__SITE_URL__ || "")
    .trim()
    .replace(/\/+$/, "");
  const origin = configuredSiteUrl !== "" ? configuredSiteUrl : typeof window !== "undefined" ? window.location.origin : "";
  const baseUrl = import.meta.env.BASE_URL;
  const basePrefix = baseUrl.startsWith(".") || baseUrl === "/" ? "" : baseUrl.replace(/\/+$/, "");
  const canonical = origin ? `${origin}${basePrefix}/` : "/";

  const methods = (get("routes.home.ui.methods") as HomeMethod[] | undefined) ?? [];
  const badges = (get("routes.home.ui.badges") as string[] | undefined) ?? [];
  const cards = (get("routes.home.ui.improveCards") as HomeCard[] | undefined) ?? [];
  const checklistItems = (get("routes.home.ui.checklistItems") as string[] | undefined) ?? [];
  const faq = (get("routes.home.structuredData.faq") as Array<{ q: string; a: string }> | undefined) ?? [];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: t("routes.home.structuredData.articleHeadline"),
        description,
        author: { "@type": "Organization", name: brandName },
        mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
        articleSection: t("routes.home.structuredData.articleSection"),
        keywords: t("routes.home.structuredData.articleKeywords"),
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map((it) => ({
          "@type": "Question",
          name: it.q,
          acceptedAnswer: { "@type": "Answer", text: it.a },
        })),
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={t("routes.home.helmet.keywords")} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <section className={styles.hero}>
        <h1 className={styles.title}>{t("routes.home.ui.heroTitle")}</h1>
        <p className={styles.subtitle}>{t("routes.home.ui.heroSubtitle")}</p>

        <div className={styles.badges} aria-label="Highlights">
          {badges.map((b) => (
            <span key={b} className={styles.badge}>
              {b}
            </span>
          ))}
        </div>

        <div className={styles.cta}>
          <h2 className={styles.ctaTitle}>{t("routes.home.ui.ctaTitle")}</h2>
          <p className={styles.ctaText}>{t("routes.home.ui.ctaText")}</p>
          <Link to="/test" className={styles.ctaButton}>
            {t("routes.home.ui.ctaButton")}
          </Link>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t("routes.home.ui.improveSectionTitle")}</h2>
        <div className={styles.snippet} role="note" aria-label="Key takeaway">
          {t("routes.home.ui.improveSnippet")}
        </div>

        <div className={styles.cards}>
          {cards.map((c) => (
            <div key={c.title} className={styles.card}>
              <div className={styles.cardTitle}>{c.title}</div>
              <div className={styles.cardText}>{c.text}</div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t("routes.home.ui.methodsSectionTitle")}</h2>
        <div className={styles.grid} aria-label="Methods list">
          {methods.map((m, idx) => (
            <article key={m.title} className={styles.methodCard}>
              <div className={styles.methodIcon} aria-hidden="true">
                {m.icon}
              </div>
              <div className={styles.methodTitle}>
                {idx + 1}. {m.title}
              </div>
              <div className={styles.methodDesc}>{m.desc}</div>
              <div className={styles.methodBenefits}>
                <strong>{t("routes.home.ui.benefitsLabel")}</strong> {m.benefits}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t("routes.home.ui.checklistTitle")}</h2>
        <div className={styles.listCard}>
          <ul className={styles.list}>
            {checklistItems.map((it) => (
              <li key={it}>{it}</li>
            ))}
          </ul>
          <Link to="/test" className={styles.secondaryButton}>
            {t("routes.home.ui.checklistCta")}
          </Link>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t("routes.home.ui.moreAssessmentsTitle")}</h2>
        <div className={styles.listCard}>
          <p className={styles.cardText}>{t("routes.home.ui.moreAssessmentsText")}</p>
          <Link to="/assessments" className={styles.secondaryButton}>
            {t("routes.home.ui.moreAssessmentsCta")}
          </Link>
        </div>
      </section>
    </>
  );
}
