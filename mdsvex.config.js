import { defineMDSveXConfig as defineConfig } from "mdsvex";

const config = defineConfig({
  extensions: [".svelte.md", ".md", ".svx"],

  rehypePlugins: [],

  remarkPlugins: [],

  smartypants: {
    dashes: "oldschool",
  },
});

export default config;
