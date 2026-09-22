import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import compression from "vite-plugin-compression";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    // Brotli pre-compression: writes <file>.br alongside every JS/CSS/HTML
    // during build. Hostinger Apache (with mod_brotli) will serve these
    // directly when the browser advertises "Accept-Encoding: br", which
    // means zero server CPU spent compressing on every request. Falls back
    // to gzip below if mod_brotli isn't loaded.
    compression({
      algorithm: "brotliCompress",
      ext: ".br",
      threshold: 1024, // skip tiny files where compression adds overhead
      deleteOriginFile: false,
      filter: /\.(js|mjs|json|css|html|svg|xml|txt|webmanifest)$/i,
    }),
    // gzip pre-compression: same idea, written as <file>.gz. Universal
    // fallback for any server that supports mod_deflate but not mod_brotli.
    compression({
      algorithm: "gzip",
      ext: ".gz",
      threshold: 1024,
      deleteOriginFile: false,
      filter: /\.(js|mjs|json|css|html|svg|xml|txt|webmanifest)$/i,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Quiet the chunk-size warning for the legitimate large 3D chunks.
    // Real fix is splitting them out, which we do via manualChunks below.
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Manual chunking strategy:
        //   - react-vendor:   React + ReactDOM (rarely changes, long-cache)
        //   - router-vendor:  react-router-dom (rarely changes)
        //   - motion-vendor:  framer-motion (used widely; stable)
        //   - three-vendor:   three.js (only loaded when LightPillar is)
        //   - ogl-vendor:     ogl (only loaded by LightRays / GradientBlinds)
        //   - gsap-vendor:    gsap (only loaded by CardSwap)
        //
        // Why this matters:
        //   - Cache stability: when the app code changes the vendor
        //     chunks stay the same, so returning users don't re-download
        //     React/Router/Motion every deploy. Cuts repeat-visit LCP
        //     dramatically.
        //   - Parallel download: browsers fetch up to 6 chunks at once,
        //     so smaller vendor chunks parallelise instead of one
        //     monolithic ~870 KB blob.
        //   - Tree-shaking pressure: makes it visible if a heavy lib
        //     is being loaded somewhere it shouldn't be.
        manualChunks(id: string) {
          if (id.includes("node_modules")) {
            if (id.includes("react-dom") || id.includes("/react/")) {
              return "react-vendor";
            }
            if (id.includes("react-router")) return "router-vendor";
            if (id.includes("framer-motion")) return "motion-vendor";
            if (id.includes("/three/")) return "three-vendor";
            if (id.includes("/ogl/")) return "ogl-vendor";
            if (id.includes("/gsap/")) return "gsap-vendor";
          }
          return undefined;
        },
      },
    },
  },
});
