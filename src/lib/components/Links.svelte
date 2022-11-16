<script lang="ts">
  import type { Category, Link } from "$lib/types";
  import circle from "@material-design-icons/svg/filled/circle.svg?raw";
  // TODO: Uncomment when used
  // import favorite from "@material-design-icons/svg/filled/favorite.svg?raw";
  // import favorite_border from "@material-design-icons/svg/filled/favorite_border.svg?raw";
  import launch from "@material-design-icons/svg/filled/launch.svg?raw";
  import arrow_back from "@material-design-icons/svg/filled/arrow_back.svg?raw";
  import arrow_forward from "@material-design-icons/svg/filled/arrow_forward.svg?raw";
  import navigate_next from "@material-design-icons/svg/filled/navigate_next.svg?raw";
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

  // TODO: Use localStorage to get/set favorites
  // export const isFavorite = (url: string) => {
  //   return false;
  // };

  const scroll = (value: number) => {
    const ul = document.querySelector("#linkList-ul");
    ul?.scrollBy(value, 0);
  };
</script>

<section class="links--container">
  <h2 class="links--title">
    <SvgIcon src={launch} />Vos sites publics
  </h2>
  <h3>Connexion vers les services publics</h3>
  <button
    class="scroll--button"
    aria-hidden="true"
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
  <ul class="links--list" id="linkList-ul">
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
          <!-- TODO: Uncomment when used
          <div
            class="favorite--container"
            role="checkbox"
            aria-checked={isFavorite(url)}
            aria-label="Favoris"
            tabindex="0"
          >
            {@html isFavorite(url) ? favorite : favorite_border}
          </div> -->
          <Image class="link--image" alt={image.alt} src={image.src} />
          <div class="link--title">
            {title}<SvgIcon src={navigate_next} />
          </div>
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
        </div>
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
    gap: 1rem;
    list-style-type: none;
    overflow: hidden;
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

  /* 
  // TODO: Uncomment when used
  .favorite--container {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;

    height: 1.5rem;

    fill: currentColor;

    color: var(--color-grey-light);
  } */

  /*
  // TODO: Uncomment when used
  .favorite--container [aria-checked="true"] {
    color: "var(--color-orange)";
  }
  */
  .scroll--button {
    background-color: white;
    border-radius: 100%;
    height: 2rem;
    border: 0;
  }
  .scroll--button:hover {
    cursor: pointer;
  }
  .scroll--button:active {
    background-color: gray;
  }
</style>
