import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite'

// 👉 Passe "base" an deinen GitHub-Repo an (ohne .git)
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/my-portal-app/",
});
