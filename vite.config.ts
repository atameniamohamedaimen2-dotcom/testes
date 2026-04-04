import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
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
});
