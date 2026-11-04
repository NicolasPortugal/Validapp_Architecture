import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/Validapp_Architecture/",
  plugins: [react(), tailwindcss()],
});
