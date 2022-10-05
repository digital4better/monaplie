<script context="module" lang="ts">
  import Links from "$lib/components/Links.svelte";
  import Tutorials from "$lib/components/Tutorials.svelte";
  import { metadata } from "$lib/content/site.md";
  import type { Site } from "$lib/types";
  import type { PageData } from "./$types";
</script>

<script lang="ts">
  export let data: PageData;
  export let { title } = metadata as Site;
</script>

<svelte:head>
  <title>PLIE de la métropole nantaise</title>
</svelte:head>

<section class="index--container">
  <h1>{title}</h1>
  <Links links={data.links} categories={data.categories} />
  <Tutorials tutorials={data.tutorials} links={data.links} />
</section>

<style lang="scss">
  .index--container {
    display: flex;
    flex-direction: column;
    gap: 4rem;
    padding-top: 4rem;
  }
</style>
