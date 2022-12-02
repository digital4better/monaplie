<script lang="ts">
  import type { Resource } from "$lib/types";
  import navigate_next from "@material-design-icons/svg/filled/navigate_next.svg?raw";
  import attach_file from "@material-design-icons/svg/outlined/attach_file.svg?raw";
  import Image from "./Image.svelte";
  import Markdown from "./Markdown.svelte";
  import SvgIcon from "./SvgIcon.svelte";

  export let resources: Resource[];
  const categories = Array.from(
    new Set(resources.map(({ category }) => category))
  );

  const orderedResources: Resource[] = resources.sort((a, b) =>
    a.order > b.order ? 1 : -1
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
    {#each orderedResources as { title, label, image, url, category }}
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
            <Image class="link--image" alt={image.alt} src={image.src} />
            <span class="link--title">
              {title}<SvgIcon src={navigate_next} />
            </span>
            <Markdown class="link--label" content={label} />
          </a>
        </li>
      {/if}
    {/each}
  </ul>
</secion>

<style>
  .section--container {
    padding-top: 4rem;
  }
  .resource--container {
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
    align-items: flex-start;
    background-color: var(--alt-bg-color);
    border-radius: 10px;
    box-sizing: border-box;
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
    color: var(--color-blue-dark);
    display: inline-flex;
    font-size: large;
    font-weight: 800;
    margin-top: 0.125rem;
  }

  .resources--filter {
    align-self: center;
    background-color: inherit;
    border-color: var(--color-blue);
    border-radius: 15px;
    border-style: solid;
    border-width: 1px;
    cursor: pointer;
    display: inline-flex;
    margin-right: 1.2em;
    margin-top: 1em;
    padding: 5px 12px 5px 12px;
  }
  .resources--filter-selected {
    align-self: center;
    background-color: blue;
    border-color: blue;
    border-radius: 15px;
    border-style: solid;
    border-width: 1px;
    color: white;
    cursor: pointer;
    display: inline-flex;
    margin-right: 1.2em;
    padding: 5px 12px 5px 12px;
  }
</style>
