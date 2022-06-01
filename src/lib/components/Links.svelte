<script lang="ts">
  import type { Category, Link } from "$lib/types";
  import circle from "@material-design-icons/svg/filled/circle.svg?raw";
  import favorite from "@material-design-icons/svg/filled/favorite.svg?raw";
  import favorite_border from "@material-design-icons/svg/filled/favorite_border.svg?raw";
  import launch from "@material-design-icons/svg/filled/launch.svg?raw";
  import navigate_next from "@material-design-icons/svg/filled/navigate_next.svg?raw";
  import Image from "./Image.svelte";
  import SvgIcon from "./SvgIcon.svelte";

  export let links: Link[] = [];
  export let categories: Category[] = [];

  export const circleColor = (category: string) => {
    return (
      categories.find((c) => {
        return c.title === category;
      })?.color || "red"
    );
  };

  // TODO: Use localStorage to get/set favorites
  export const isFavorite = (url: string) => {
    return false;
  };
</script>

<section class="links--container">
  <h2 class="links--title">
    <SvgIcon src={launch} />Liens
  </h2>
  <h3>Connexion vers les services publics</h3>
  <ul class="links--list">
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
          <span />
        </a>
        <div class="link--content">
          <!-- TODO: Use checkbox design pattern https://w3c.github.io/aria-practices/examples/checkbox/checkbox.html -->
          <div
            class="favorite--container"
            role="checkbox"
            aria-checked={isFavorite(url)}
            aria-label="Favoris"
            tabindex="0"
          >
            {@html isFavorite(url) ? favorite : favorite_border}
          </div>
          <Image class="link--image" alt={image.alt} src={image.src} />
          <div class="link--title">
            {title}<SvgIcon src={navigate_next} />
          </div>
          <div class="link--label">{label}</div>
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
        </div>
      </li>
    {/each}
  </ul>
</section>

<style>
  .links--title {
    align-items: center;
    display: inline-flex;
    gap: 1rem;
    white-space: nowrap;
  }

  .links--list {
    display: flex;
    gap: 1rem;
    list-style-type: none;
    overflow-x: scroll;
    overflow: auto;
    padding-left: 0;
  }

  .link--container {
    position: relative;
    margin: 1rem 1rem 0 0;
  }

  .link--anchor {
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    position: absolute;
    z-index: 1;
  }

  .link--content {
    align-items: flex-start;
    background-color: var(--alt-bg-color);
    border-radius: 10px;
    display: inline-flex;
    flex-direction: column;
    gap: 1rem;
    min-height: 14rem;
    padding: 2rem;
    position: static;
    text-decoration: none;
    width: 12rem;
  }

  :global(.link--image) {
    height: 4rem;
  }

  .link--title {
    align-items: center;
    display: inline-flex;
    margin-top: 0.125rem;
    font-size: large;
    font-weight: 800;
    color: var(--color-blue-dark);
  }

  .link--label {
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
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;

    height: 1.5rem;

    fill: currentColor;

    color: var(--color-grey-light);
  }

  .favorite--container [aria-checked="true"] {
    color: "var(--color-orange)";
  }
</style>
