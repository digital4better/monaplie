<script context="module" lang="ts">
  import Resources from "$lib/components/Resources.svelte";
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
  <div class="top--container">
    <h1>{title}</h1>
    <Links links={data.links} categories={data.categories} />
  </div>
  <div class="bottom--container">
    <Tutorials tutorials={data.tutorials} links={data.links} />
    <Resources resources={data.resources} />
  </div>
</section>

<style lang="scss">
  .index--container {
    display: flex;
    flex-direction: column;
    padding: 0;
  }
  .top--container {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding: 4rem 0rem 4rem 2rem;
    @include md {
      padding: 4rem 0rem 4rem 4rem;
    }
    background: (#80b6e6);
  }
  .bottom--container {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding: 4rem 0rem 4rem 2rem;
    @include md {
      padding: 4rem 0rem 4rem 4rem;
    }
    background: (#d9ebf5);
  }
</style>
