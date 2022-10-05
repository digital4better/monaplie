import { sveltekit } from "@sveltejs/kit/vite";

/** @type {import('vite').UserConfig} */
const config = {
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "src/variables.scss" as *;',
      },
    },
  },
  plugins: [sveltekit()],
};

export default config;
