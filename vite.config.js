import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

console.log("✅ Vite sta leggendo vite.config.js");

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true, // Abilita modalità dev
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,svg,ico}"],
      },
      manifest: {
        filename: "manifest.json",
        name: "Habit Tracker",
        short_name: "Habit",
        description: "Track your good habits and earn rewards!",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        screenshots: [
          {
            src: "/screenshot-1.png",
            sizes: "1080x1920",
            type: "image/png",
            form_factor: "wide"
          },
          {
            "src": "/screenshot-2.png",
            "sizes": "1080x1920",
            "type": "image/png"
          }
        ]
      },
    }),
  ],
});
