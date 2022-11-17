<script lang="ts">
  import SvgIcon from "./SvgIcon.svelte";
  import attach_file from "@material-design-icons/svg/outlined/attach_file.svg?raw";
  import navigate_next from "@material-design-icons/svg/filled/navigate_next.svg?raw";
  import type { Resource } from "$lib/types";
  import Image from "./Image.svelte";
  import Markdown from "./Markdown.svelte";

  export let resources: Resource[];
  const categories = Array.from(
    new Set(resources.map(({ category }) => category))
  );

  let selectedFilters: string[] = [];

  const onClickFilter = (category: string) => {
    console.log("befor", selectedFilters);
    const index = selectedFilters.indexOf(category);
    if (index < 0) selectedFilters = [...selectedFilters, category];
    else selectedFilters = selectedFilters.filter((_, i) => i !== index);
  };
</script>

<secion class="section--container">
  <div class="resource--container">
    <SvgIcon src={attach_file} />
    <h2>Ressources</h2>
  </div>
  <h3>Des resources externes</h3>
  <div>
    {#each categories as category}
      <button
        class="resources--filter"
        class:resources--filter-selected={selectedFilters.includes(category)}
        on:click={() => onClickFilter(category)}
      >
        {category}
      </button>
    {/each}
  </div>

  <ul class="resources--list">
    {#each resources as { title, label, image, url, category }}
      {#if selectedFilters.length == 0 ? true : selectedFilters.includes(category)}
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
            <Image class="link--image" alt={image.alt} src={image.src} />
            <div class="link--title">
              {title}<SvgIcon src={navigate_next} />
            </div>
            <Markdown class="link--label" content={label} />
          </div>
        </li>
      {/if}
    {/each}
  </ul>
</secion>

<style>
  .section--container {
    padding-top: 7rem;
  }
  .resource--container {
    box-sizing: border-box;
    display: flex;
    align-items: center;
  }

  .resources--list {
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
    box-sizing: border-box;
    align-items: flex-start;
    background-color: var(--alt-bg-color);
    border-radius: 10px;
    display: inline-flex;
    flex-direction: column;
    height: 100%;
    gap: 1rem;
    padding: 2rem;
    position: static;
    text-decoration: none;
    width: 15rem;
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

  .resources--filter {
    box-sizing: border-box;
    display: inline-flex;
    align-self: center;
    border: solid;
    border-width: 1px;
    border-color: var(--color-blue);
    border-radius: 15px;
    padding: 5px 12px 5px 12px;
    margin-right: 1.2em;
    margin-top: 1em;
    cursor: pointer;
    background-color: inherit;
  }
  .resources--filter-selected {
    display: inline-flex;
    align-self: center;
    border: solid;
    border-width: 1px;
    border-color: blue;
    border-radius: 15px;
    padding: 5px 12px 5px 12px;
    margin-right: 1.2em;
    background-color: blue;
    color: white;
    cursor: pointer;
  }
</style>
