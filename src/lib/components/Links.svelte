<script lang="ts">
  import type { Category, Link } from "$lib/types";
  import circle from "@material-design-icons/svg/filled/circle.svg?raw";
  import favorite from "@material-design-icons/svg/filled/favorite.svg?raw";
  import favorite_border from "@material-design-icons/svg/filled/favorite_border.svg?raw";
  import launch from "@material-design-icons/svg/filled/launch.svg?raw";
  import navigate_next from "@material-design-icons/svg/filled/navigate_next.svg?raw";
  import { storedItems } from "../store";
  import ArrowScroll from "./ArrowScroll.svelte";
  import Image from "./Image.svelte";
  import Markdown from "./Markdown.svelte";
  import SvgIcon from "./SvgIcon.svelte";

  export let links: Link[] = [];
  export let favorites: Link[];
  export let categories: Category[] = [];

  export const circleColor = (category: string) => {
    return (
      categories.find((c) => {
        return c.title === category;
      })?.color || "red"
    );
  };

  let list: HTMLUListElement;

  export const setFavorite = (url: string) => {
    if (!$storedItems) {
      $storedItems = JSON.stringify({ links: [url] });
      favorites = links.filter((link) => url === link.url);
    } else {
      const favoritesTemp: { links: string[] } = JSON.parse($storedItems);
      console.log(favoritesTemp);
      const indexFavorite = favoritesTemp.links.indexOf(url);
      if (indexFavorite >= 0) {
        favoritesTemp.links.splice(indexFavorite, 1);
      } else {
        favoritesTemp.links.push(url);
      }
      $storedItems = JSON.stringify(favoritesTemp);
      favorites = links.filter(
        (link) => favoritesTemp.links.indexOf(link.url) >= 0
      );
    }
  };

  const isFavorite = (
    storedItems: string | false | null,
    url: string
  ): string =>
    JSON.parse(storedItems || "{}")?.links?.indexOf(url) >= 0
      ? favorite
      : favorite_border;
</script>

<section class="links--container">
  <h2 class="links--title">
    <SvgIcon src={launch} />Vos sites publics
  </h2>
  <div class="button--container">
    <h3>Connexion vers les services publics</h3>
    <ArrowScroll {list} />
  </div>

  <ul class="links--list" bind:this={list}>
    {#each links as { title, label, image, category, url }}
      <li class="link--container">
        <button
          aria-checked={isFavorite($storedItems, url) === favorite}
          aria-label="Favoris"
          class="favorite--container"
          role="checkbox"
          tabindex="0"
          on:click={() => setFavorite(url)}
        >
          {@html isFavorite($storedItems, url)}
        </button>
        <a
          class="link--content"
          href={url}
          rel="noopener noreferrer"
          tabindex="0"
          target="_blank"
          {title}
        >
          <Image class="link--image" alt={image.alt} src={image.src} />
          <span class="link--title">
            {title}<SvgIcon src={navigate_next} />
          </span>
          <Markdown class="link--label" content={label} />
          <div class="category--container">
            <div
              class="category--icon"
              aria-hidden
              style:color={circleColor(category)}
            >
              {@html circle}
            </div>
            <span class="category--label">{category}</span>
          </div>
        </a>
      </li>
    {/each}
  </ul>
</section>

<style lang="scss">
  .links--container {
    padding: 7rem 0 0 0;
    justify-content: space-between;
  }
  .links--title {
    align-items: center;
    display: inline-flex;
    gap: 1rem;
  }

  .button--container {
    align-items: center;
    display: flex;
    justify-content: space-between;
    gap: 1rem;
  }

  .links--list {
    display: flex;
    gap: 2rem;
    list-style-type: none;
    margin: 2rem auto;
    padding-left: 0;
    overflow-y: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .links--list::-webkit-scrollbar {
    display: none;
  }

  .link--container {
    position: relative;
  }

  .link--content {
    align-items: flex-start;
    background-color: var(--alt-bg-color);
    border-radius: 10px;
    box-sizing: border-box;
    display: inline-flex;
    flex-direction: column;
    gap: 1rem;
    height: 100%;
    min-height: 14rem;
    padding: 2rem;
    position: static;
    text-decoration: none;
    width: 17rem;
  }

  :global(.link--image) {
    max-width: 10rem;
    max-height: 4rem;
  }

  .link--title {
    align-items: center;
    color: var(--color-blue-dark);
    display: inline-flex;
    font-size: large;
    font-weight: 800;
    margin-top: 0.125rem;
  }

  :global(.link--label) {
    height: 100%;
    line-height: 1.25rem;
  }

  .category--container {
    align-items: baseline;
    display: flex;
    gap: 0.375rem;
    margin-top: auto;
  }

  .category--icon {
    fill: currentColor;
  }

  .category--icon :global(svg) {
    height: 0.667rem;
    width: 0.667rem;
  }

  .category--label {
    font-size: small;
    color: var(--alt-text-color);
  }

  .favorite--container {
    background-color: inherit;
    border-style: none;
    color: var(--color-grey-light);
    cursor: pointer;
    fill: currentColor;
    height: 1.5rem;
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
    z-index: 2;
  }

  .favorite--container[aria-checked="true"] {
    color: var(--color-orange);
  }

  .favorite--container:hover {
    color: #f7b34d;
  }
</style>
