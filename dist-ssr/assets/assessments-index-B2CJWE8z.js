import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { H as Helmet } from "./vendor-BMz5C6pv.js";
import { Link } from "react-router-dom";
import { a as assessments } from "./iq-test-page-BIOHOohz.js";
import { s as styles } from "./assessment-info-Cp84TyZc.js";
import { u as useI18n } from "./home-Hplm1lpP.js";
function AssessmentsPage() {
  const { t } = useI18n();
  const title = t("routes.assessments.helmet.title");
  const description = t("routes.assessments.helmet.description");
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: title }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: description }),
      /* @__PURE__ */ jsx("meta", { name: "robots", content: "index, follow" }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: title }),
      /* @__PURE__ */ jsx("meta", { property: "og:description", content: description }),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: styles.wrapper, children: [
      /* @__PURE__ */ jsxs("div", { className: styles.header, children: [
        /* @__PURE__ */ jsx("h1", { className: styles.title, children: t("routes.assessments.ui.pageTitle") }),
        /* @__PURE__ */ jsx("p", { className: styles.subtitle, children: t("routes.assessments.ui.pageSubtitle") })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: styles.section, children: [
        /* @__PURE__ */ jsx("h2", { className: styles.sectionTitle, children: t("routes.assessments.ui.chooseTitle") }),
        /* @__PURE__ */ jsx("div", { className: styles.grid, children: assessments.map((a) => /* @__PURE__ */ jsxs(Link, { to: `/assessments/${a.id}`, className: styles.gridCard, children: [
          /* @__PURE__ */ jsxs("div", { className: styles.gridTitle, children: [
            /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: a.emoji }),
            " ",
            a.name
          ] }),
          /* @__PURE__ */ jsx("div", { className: styles.gridDesc, children: t("routes.assessments.ui.cardDesc") })
        ] }, a.id)) })
      ] })
    ] })
  ] });
}
export {
  AssessmentsPage as A
};
