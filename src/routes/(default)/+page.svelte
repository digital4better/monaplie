<script context="module" lang="ts">
  import Favorites from "$lib/components/Favorites.svelte";
  import Image from "$lib/components/Image.svelte";
  import Links from "$lib/components/Links.svelte";
  import Resources from "$lib/components/Resources.svelte";
  import Tutorials from "$lib/components/Tutorials.svelte";
  import { metadata } from "$lib/content/site.md";
  import type { Link, Site } from "$lib/types";
  import { storedItems } from "../../lib/store";
  import type { PageData } from "./$types";
</script>

<script lang="ts">
  export let data: PageData;
  export let { title, home } = metadata as Site;
  export let favorites: Link[] = data.links.filter(
    (link) => JSON.parse($storedItems || "{}").links?.indexOf(link.url) >= 0
  );
</script>

<svelte:head>
  <title>PLIE de la métropole nantaise</title>
</svelte:head>

<section class="index--container">
  <div class="top--container">
    <div>
      <div class="header-top--container">
        <h1>{title}</h1>
        <Image src={home.src} alt={home.alt} />
      </div>
      <Favorites {favorites} />
    </div>
    <Links links={data.links} categories={data.categories} bind:favorites />
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
    @include lg {
      width: 75vw;
    }
  }
  .top--container {
    background: #80b6e6;
    display: flex;
    flex-direction: column;
    gap: 7rem;
    padding: 4rem 2rem 0 2rem;
  }
  .bottom--container {
    display: flex;
    flex-direction: column;
    padding: 4rem 2rem 0 2rem;
    background: #d9ebf5;
  }
  .header-top--container {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    @include lg {
      flex-direction: row;
    }
  }
</style>
