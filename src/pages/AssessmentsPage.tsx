import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { assessments } from "../assessments/registry";
import styles from "./AssessmentPages.module.css";
import { useI18n } from "../i18n";

export default function AssessmentsPage() {
  const { t } = useI18n();
  const title = t("routes.assessments.helmet.title");
  const description = t("routes.assessments.helmet.description");

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
      </Helmet>

      <section className={styles.wrapper}>
        <div className={styles.header}>
          <h1 className={styles.title}>{t("routes.assessments.ui.pageTitle")}</h1>
          <p className={styles.subtitle}>{t("routes.assessments.ui.pageSubtitle")}</p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>{t("routes.assessments.ui.chooseTitle")}</h2>
          <div className={styles.grid}>
            {assessments.map((a) => (
              <Link key={a.id} to={a.id === "iq" ? "/" : `/assessments/${a.id}`} className={styles.gridCard}>
                <div className={styles.gridTitle}>
                  <span aria-hidden="true">{a.emoji}</span> {a.name}
                </div>
                <div className={styles.gridDesc}>{t("routes.assessments.ui.cardDesc")}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
