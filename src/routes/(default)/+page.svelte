<script context="module" lang="ts">
  import Image from "$lib/components/Image.svelte";
  import Links from "$lib/components/Links.svelte";
  import Resources from "$lib/components/Resources.svelte";
  import Tutorials from "$lib/components/Tutorials.svelte";
  import { metadata } from "$lib/content/site.md";
  import type { Site } from "$lib/types";
  import type { PageData } from "./$types";
</script>

<script lang="ts">
  export let data: PageData;
  export let { title, homePicture } = metadata as Site;
</script>

<svelte:head>
  <title>PLIE de la métropole nantaise</title>
</svelte:head>

<section class="index--container">
  <div class="top--container">
    <div class="header-top--container">
      <h1>{title}</h1>
      <Image src={homePicture.src} alt={homePicture.alt} />
    </div>
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
    height: 100%;
    padding: 0;
    width: 75vw;
  }
  .top--container {
    display: flex;
    flex-direction: column;
    padding: 4rem 0 0 4rem;
    background: (#80b6e6);
  }
  .bottom--container {
    display: flex;
    flex-direction: column;
    padding: 4rem 0 0 4rem;
    background: (#d9ebf5);
  }
  .header-top--container {
    display: flex;
    justify-content: space-between;
  }
</style>
