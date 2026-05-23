// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import fs from "fs";
import path from "path";

// Hot-reload hook to copy generated Durga face image to public/durga.png
try {
  const src = "C:/Users/dewan/.gemini/antigravity/brain/43c0093d-681d-4e9a-88cb-1813bbe2b68d/durga_face_1779005978174.png";
  const dest = path.resolve("public/durga.png");
  
  // Create public directory if it doesn't exist
  const publicDir = path.dirname(dest);
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log("==========================================");
    console.log("SUCCESS: Copied Durga face to public/durga.png!");
    console.log("==========================================");
  }
} catch (e) {
  console.error("Failed to copy Durga face:", e);
}

// Hot-reload hook to copy couple illustration to public/couple.png
try {
  const src = "c:/Users/dewan/Downloads/download.png";
  const dest = path.resolve("public/couple.png");
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log("==========================================");
    console.log("SUCCESS: Copied Couple illustration to public/couple.png!");
    console.log("==========================================");
  }
} catch (e) {
  console.error("Failed to copy couple illustration:", e);
}

// Hot-reload hook to copy royal border to public/border.png
try {
  const src = "c:/Users/dewan/Downloads/download1.png";
  const dest = path.resolve("public/border.png");
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log("==========================================");
    console.log("SUCCESS: Copied Royal Border to public/border.png!");
    console.log("==========================================");
  }
} catch (e) {
  console.error("Failed to copy royal border:", e);
}

// Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
// @cloudflare/vite-plugin builds from this — wrangler.jsonc main alone is insufficient.
export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
});
