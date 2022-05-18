<script context="module" lang="ts">
  import Links from "$lib/components/Links.svelte";
  import Tutorials from "$lib/components/Tutorials.svelte";
  import type { Category, Link, Tutorial } from "$lib/types";
  import type { Load } from "@sveltejs/kit";

  const items = (
    collection: Record<string, () => Promise<Record<string, any>>>
  ) =>
    Object.entries(collection).map(async ([slug, fetch]) => {
      const { metadata } = await fetch();
      return {
        slug: slug.replace(/^.*\/[^/]+\/([^/]+)\.md/, "$1"),
        ...metadata,
      };
    });

  const tutorials = items(import.meta.glob("$lib/content/tutorials/*.md"));
  const links = items(import.meta.glob("$lib/content/links/*.md"));
  const categories = items(import.meta.glob("$lib/content/categories/*.md"));

  export const load: Load = async () => {
    return {
      props: {
        tutorials: await Promise.all(tutorials),
        links: await Promise.all(links),
        categories: await Promise.all(categories),
      },
    };
  };
</script>

<script lang="ts">
  export let tutorials: Tutorial[];
  export let links: Link[];
  export let categories: Category[];
</script>

<svelte:head>
  <title>PLIE de la métropole nantaise</title>
</svelte:head>

<section class="content">
  <Links {links} {categories} />
  <Tutorials {tutorials} {links} />
</section>

<style lang="scss">
  .content {
    overflow: auto;
    @include md {
      padding-left: 5em;
    }
  }
</style>
