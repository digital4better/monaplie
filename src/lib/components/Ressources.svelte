<script lang="ts">
  import SvgIcon from "./SvgIcon.svelte";
  import attach_file from "@material-design-icons/svg/outlined/attach_file.svg?raw";
  import navigate_next from "@material-design-icons/svg/filled/navigate_next.svg?raw";
  import type { Ressource } from "$lib/types";
  import Image from "./Image.svelte";
  import Markdown from "./Markdown.svelte";

  export let ressources: Ressource[];
  const categories = ressources.reduce((acc, ressource) => {
    if (acc.indexOf(ressource.category) >= 0) return acc;
    return [...acc, ressource.category];
  }, [] as string[]);
  console.log(categories);

  const selectedFilters: Record<string, boolean> = categories.reduce(
    (acc, link) => ({ ...acc, [link]: false }),
    {}
  );

  let noFilterSelected = true;

  const onClickFilter = (category: string) => {
    selectedFilters[category] = !selectedFilters[category];
    noFilterSelected = !hasAnyFilterActive();
  };

  const hasAnyFilterActive = () =>
    Object.values(selectedFilters).some((value) => value);
</script>

<secion class="section--container">
  <div class="ressource--container">
    <SvgIcon src={attach_file} />
    <h3 class="ressource--title">Ressources</h3>
  </div>
  <span class="ressource--title">Des ressources externes</span>
  <div>
    {#each categories as category}
      <div
        class="ressources--filter"
        class:ressources--filter-selected={selectedFilters[category]}
        on:click={() => onClickFilter(category)}
      >
        {category}
      </div>
    {/each}
  </div>

  <ul class="ressources--list">
    {#each ressources as { title, label, image, url, category }}
      {#if selectedFilters[category] || noFilterSelected}
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
  .ressource--container {
    box-sizing: border-box;
    display: flex;
    align-items: center;
  }
  .ressource--title {
    font-weight: bold;
  }
  .ressources--title {
    align-items: center;
    display: inline-flex;
    gap: 1rem;
    white-space: nowrap;
  }

  .ressources--list {
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

  .link--label {
    height: 100%;
    line-height: 1.25rem;
  }
  .ressources--filter {
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
  }
  .ressources--filter-selected {
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
