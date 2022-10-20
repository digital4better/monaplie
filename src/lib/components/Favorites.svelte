<script lang="ts">
  import type { Link } from "$lib/types";
  import favorite_border from "@material-design-icons/svg/filled/favorite_border.svg?raw";
  import navigate_next from "@material-design-icons/svg/filled/navigate_next.svg?raw";
  import Image from "./Image.svelte";
  import SvgIcon from "./SvgIcon.svelte";

  export let currentFavorites: Link[];
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
      {#each currentFavorites || [] as { image, title, url }}
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
</section>

<style>
  .link--anchor {
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    position: absolute;
    z-index: 1;
  }
  .favorite-box--container {
    display: flex;
    flex-direction: column;
    background-color: #f7dcb0;
    width: 90%;
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
