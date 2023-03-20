<script context="module" lang="ts">
  import Favorites from "$lib/components/Favorites.svelte";
  import Image from "$lib/components/Image.svelte";
  import Links from "$lib/components/Links.svelte";
  import Resources from "$lib/components/Resources.svelte";
  import SvgIcon from "$lib/components/SvgIcon.svelte";
  import Tutorials from "$lib/components/Tutorials.svelte";
  import { metadata } from "$lib/content/site.md";
  import type { Link, Site } from "$lib/types";
  import launch from "@material-design-icons/svg/filled/launch.svg?raw";
  import attach_file from "@material-design-icons/svg/outlined/attach_file.svg?raw";
  import insert_drive_file from "@material-design-icons/svg/outlined/insert_drive_file.svg?raw";
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
  <meta name="Content-Security-Policy" content="default-src 'self'" />
</svelte:head>

<section class="index--container">
  <div class="container top--container">
    <div>
      <div class="header-top--container">
        <h1>{title}</h1>
        <Image class="header--image" src={home.src} alt={home.alt} />
      </div>
      <Favorites {favorites} />
    </div>
    <Links links={data.links} categories={data.categories} bind:favorites />
  </div>
  <div class="container tutorials--container">
    <Tutorials tutorials={data.tutorials} />
  </div>
  <div class="container ressources--container">
    <Resources resources={data.resources} />
  </div>
</section>
<segment class="menu--container">
  <a class="menu--link" href="#links"
    ><SvgIcon src={launch} />
    <div>Publics</div></a
  >
  <a class="menu--link" href="#tutorials"
    ><SvgIcon src={insert_drive_file} />
    <div>Tutoriels</div></a
  >
  <a class="menu--link" href="#resources"
    ><SvgIcon src={attach_file} />
    <div>Ressources</div></a
  >
</segment>

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
  .container {
    display: flex;
    flex-direction: column;
    padding: 2rem 2rem 0 2rem;
    @include lg {
      padding-top: 4rem;
    }
  }
  .top--container {
    background: #80b6e6;
    gap: 5rem;
  }
  .tutorials--container {
    background: #d9ebf5;
  }
  .ressources--container {
    background: #fef5e6;
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
  .menu--container {
    background-color: var(--alt-bg-color);
    position: fixed;
    bottom: 0;
    display: flex;
    width: 100%;
    z-index: 2;
    border-top: 1px solid var(--color-blue);
    justify-content: space-around;
    @include lg {
      display: none;
    }
  }
  .menu--link {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    margin: 0.5rem;
  }
  :global(.header--image) {
    height: 6rem;
    @include lg {
      height: initial;
    }
  }
</style>
