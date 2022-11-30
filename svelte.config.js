import adapter from "@sveltejs/adapter-static";
import { mdsvex } from "mdsvex";
import preprocess from "svelte-preprocess";
import mdsvexConfig from "./mdsvex.config.js";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: [".svelte", ...(mdsvexConfig.extensions ?? [])],

  kit: {
    adapter: adapter(),

    paths: {
      base: "/monaplie",
    },

    prerender: {
      entries: ["*", "/admin/config.yml"],
    },

    trailingSlash: "always",
  },

  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    preprocess({
      scss: {
        prependData: '@use "src/variables.scss" as *;',
      },
    }),
    mdsvex(mdsvexConfig),
  ],
};

export default config;
