<script lang="ts">
  import type { Category, Link } from "$lib/types";
  import circle from "@material-design-icons/svg/filled/circle.svg?raw";
  import favorite from "@material-design-icons/svg/filled/favorite.svg?raw";
  import favorite_border from "@material-design-icons/svg/filled/favorite_border.svg?raw";
  import launch from "@material-design-icons/svg/filled/launch.svg?raw";
  import navigate_next from "@material-design-icons/svg/filled/navigate_next.svg?raw";
  import { storedItems } from "../store";
  import Image from "./Image.svelte";
  import Markdown from "./Markdown.svelte";
  import SectionTitle from "./SectionTitle.svelte";
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
  <SectionTitle
    title="Vos sites publics"
    subtitle="Connexion vers les services publics"
    icon={launch}
  />
  <ul class="links--list">
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
        <div class="category--container">
          <div
            class="category--icon"
            aria-hidden="true"
            style:color={circleColor(category)}
          >
            {@html circle}
          </div>
          <span class="category--label">{category}</span>
        </div>
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
        </a>
      </li>
    {/each}
  </ul>
</section>

<style lang="scss">
  .links--list {
    display: flex;
    gap: 2rem;
    list-style-type: none;
    margin: 2rem auto;
    padding-left: 0;
    overflow-y: auto;
    scrollbar-width: thin;
  }

  .link--container {
    position: relative;
  }

  .link--content {
    background-color: var(--alt-bg-color);
    border-radius: 10px;
    align-items: flex-start;
    box-sizing: border-box;
    display: inline-flex;
    flex-direction: column;
    gap: 1rem;
    height: 100%;
    min-height: 14rem;
    padding: 3rem 2rem 2rem 2rem;
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
    position: absolute;
    left: 1rem;
    top: 1rem;
    align-items: baseline;
    display: inline-flex;
    gap: 0.5rem;
    z-index: 2;
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
    color: var(--color-grey);
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
