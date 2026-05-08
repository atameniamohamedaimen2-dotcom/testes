import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

function normalizeViteBase(value: string) {
  const raw = String(value ?? "").trim();
  if (!raw || raw === "/") return "/";
  if (/^https?:\/\//i.test(raw)) return raw.endsWith("/") ? raw : `${raw}/`;

  if (raw.startsWith("./") || raw.startsWith("../")) return raw.endsWith("/") ? raw : `${raw}/`;

  const withLeadingSlash = raw.startsWith("/") ? raw : `/${raw}`;
  return withLeadingSlash.endsWith("/") ? withLeadingSlash : `${withLeadingSlash}/`;
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, "", "");
  const base = normalizeViteBase(env.VITE_BASE_PATH || "/");

  return {
    base,
    plugins: [react()],
    ssr: {
      noExternal: ["react-helmet-async"],
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            const cleanId = id.replace(/\\/g, "/");
            if (cleanId.includes("node_modules")) return "vendor";
            if (cleanId.includes("/src/pages/AssessmentTestPage")) return "assessment-test";
            if (cleanId.includes("/src/pages/AssessmentInfoPage")) return "assessment-info";
            if (cleanId.includes("/src/pages/TestPage")) return "iq-test-page";
            if (cleanId.includes("/src/pages/AssessmentsPage")) return "assessments-index";
            if (cleanId.includes("/src/pages/HomePage")) return "home";
            return undefined;
          },
        },
      },
    },
  };
});
