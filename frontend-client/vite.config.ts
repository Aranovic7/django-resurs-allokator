// resursallokering/frontend-client/vite.config.ts

import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // Detta tvingar Vite att sätta rotkatalogen för sökning till
  // där denna fil ligger (dvs. frontend-client/)
  root: "./",

  // Denna är standard och ska vara där
  base: "",

  server: {
    fs: {
      strict: false,
    },
  },
})
