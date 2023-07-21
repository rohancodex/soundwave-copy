import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), viteTsconfigPaths()],
});

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import path from 'path'
// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, './src'),
//     }
//   },
// })