<script lang="ts">
  import type { Category, Link } from "$lib/types";
  import arrow_back from "@material-design-icons/svg/filled/arrow_back.svg?raw";
  import arrow_forward from "@material-design-icons/svg/filled/arrow_forward.svg?raw";
  import circle from "@material-design-icons/svg/filled/circle.svg?raw";
  import favorite from "@material-design-icons/svg/filled/favorite.svg?raw";
  import favorite_border from "@material-design-icons/svg/filled/favorite_border.svg?raw";
  import launch from "@material-design-icons/svg/filled/launch.svg?raw";
  import navigate_next from "@material-design-icons/svg/filled/navigate_next.svg?raw";
  import { getStoredItem, setStoredItem } from "../store";
  import Image from "./Image.svelte";
  import Markdown from "./Markdown.svelte";
  import SvgIcon from "./SvgIcon.svelte";

  export let links: Link[] = [];
  export let categories: Category[] = [];
  let interval_: NodeJS.Timer;

  export const circleColor = (category: string) => {
    return (
      categories.find((c) => {
        return c.title === category;
      })?.color || "red"
    );
  };

  let list: HTMLUListElement;
  const scroll = (value: number) => {
    list?.scrollBy(value, 0);
  };

  export const isFavorite = (url: string) => {
    const localStorageFavorite = getStoredItem("favorite");
    if (!localStorageFavorite) return false;
    const favorites: { links: string[] } = JSON.parse(localStorageFavorite);
    return !!favorites.links.find((link) => link == url);
  };

  export const setFavorite = (url: string) => {
    const localStorageFavorite = getStoredItem("favorite");
    if (!localStorageFavorite) {
      setStoredItem("favorite", { links: [url] });
    } else {
      const favorites: { links: string[] } = JSON.parse(localStorageFavorite);
      const indexFavorite = favorites.links.indexOf(url);
      if (indexFavorite >= 0) {
        favorites.links.splice(indexFavorite, 1);
        favorites.links = favorites.links;
      } else {
        favorites.links.push(url);
      }
      setStoredItem("favorite", favorites);
    }
  };
</script>

<section class="links--container">
  <div class="favorite-box--container">
    <div class="favorite-box--row">
      {@html favorite_border}
      <span class="favorite-box--title">Favoris</span>
    </div>
    <div class="favorite-box--row">
      <span>Les services et tutoriels que vous avez sauvegardés</span>
    </div>
    <ul class="favorite-box--list">
      {#each links.filter( (link) => isFavorite(link.url) ) as { title, url, image }}
        <li class="favorite-box--card">
          <a
            class="link--anchor"
            rel="noopener noreferrer"
            href={url}
            tabindex="0"
            target="_blank"
            {title}
          >
            <span />
          </a>
          <div class="favorite-link--card">
            <Image
              class="link-favorite--image"
              alt={image.alt}
              src={image.src}
            />
            <div class="favorite-link--title">
              {title}<SvgIcon src={navigate_next} />
            </div>
          </div>
        </li>
      {/each}
    </ul>
  </div>
  <h2 class="links--title">
    <SvgIcon src={launch} />Vos sites publics
  </h2>
  <h3>Connexion vers les services publics</h3>
  <button
    class="scroll--button"
    aria-hidden="true"
    on:click={() => scroll(-10)}
    on:mousedown={() => (interval_ = setInterval(() => scroll(-5), 20))}
    on:mouseup={() => clearInterval(interval_)}
  >
    <SvgIcon src={arrow_back} />
  </button>

  <button
    class="scroll--button"
    aria-hidden="true"
    on:click={() => scroll(10)}
    on:mousedown={() => (interval_ = setInterval(() => scroll(5), 20))}
    on:mouseup={() => clearInterval(interval_)}
  >
    <SvgIcon src={arrow_forward} />
  </button>
  <ul class="links--list" bind:this={list}>
    {#each links as { title, label, image, category, url }}
      <li class="link--container">
        <a
          class="link--anchor"
          href={url}
          rel="noopener noreferrer"
          tabindex="0"
          target="_blank"
          {title}
        >
          <!-- TODO: Use checkbox design pattern https://w3c.github.io/aria-practices/examples/checkbox/checkbox.html -->
          <div
            class="favorite--container"
            role="checkbox"
            aria-checked={isFavorite(url)}
            aria-label="Favoris"
            tabindex="0"
            on:click={() => setFavorite(url)}
          >
            {@html isFavorite(url) ? favorite : favorite_border}
          </div>
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
  .links--title {
    align-items: center;
    display: inline-flex;
    gap: 1rem;
    white-space: nowrap;
  }

  .links--list {
    display: flex;
    gap: 2rem;
    list-style-type: none;
    margin: 2rem auto;
    padding-left: 0;
    overflow-y: auto;
  }

  .link--container {
    position: relative;
  }

  .link--anchor {
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

  .scroll--button {
    background-color: white;
    border-radius: 100%;
    border-width: 0;
    cursor: pointer;
    height: 2rem;
  }
  .scroll--button:active {
    background-color: gray;
  }

  .favorite--container[aria-checked="true"] {
    color: var(--color-orange);
  }

  .favorite-box--container {
    display: flex;
    flex-direction: column;
    background-color: #f7dcb0;
    width: 80%;
    border-radius: 10px;
    padding: 1rem;
  }

  .favorite-box--row {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }

  .favorite-box--list {
    display: flex;
    align-items: center;
    list-style-type: none;
    gap: 1rem;
    padding-left: 0;
    margin: 0;
  }

  .favorite-box--title {
    margin-left: 0.5rem;
    font-size: 1.17em;
    font-weight: bold;
  }

  .favorite-link--card {
    display: flex;
    align-items: center;
    border-radius: 10px;
    padding: 0.4rem;
    gap: 0.5rem;
    background-color: white;
  }

  :global(.link-favorite--image) {
    height: 2.5rem;
  }

  .favorite-box--card {
    position: relative;
  }

  .favorite-link--title {
    display: flex;
    gap: 1.5rem;
    align-items: center;
    display: inline-flex;
    margin-top: 0.125rem;
    font-size: large;
    font-weight: 800;
    color: var(--color-blue-dark);
  }
</style>
