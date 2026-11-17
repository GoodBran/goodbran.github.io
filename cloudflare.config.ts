import { defineConfig } from "cf/config";

// Assets-only Worker serving the Jekyll build (_site) on goodbran.com.
// Deployed from .github/workflows/pages.yml with `cf deploy _site`.
export default defineConfig({
  worker: {
    name: "goodbran",
    compatibilityDate: "2026-11-13",
    assets: {
      htmlHandling: "auto-trailing-slash",
      notFoundHandling: "404-page",
    },
    domains: ["goodbran.com", "www.goodbran.com"],
  },
});
