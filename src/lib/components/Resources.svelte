<script lang="ts">
  import type { Resource } from "$lib/types";
  import navigate_next from "@material-design-icons/svg/filled/navigate_next.svg?raw";
  import attach_file from "@material-design-icons/svg/outlined/attach_file.svg?raw";
  import Image from "./Image.svelte";
  import Markdown from "./Markdown.svelte";
  import SectionTitle from "./SectionTitle.svelte";
  import SvgIcon from "./SvgIcon.svelte";

  export let resources: Resource[];
  const categories = Array.from(
    new Set(resources.map(({ category }) => category))
  );

  let selectedFilters: string[] = [];

  const onClickFilter = (category: string) => {
    const index = selectedFilters.indexOf(category);
    if (index < 0) selectedFilters = [...selectedFilters, category];
    else selectedFilters = selectedFilters.filter((_, i) => i !== index);
  };
</script>

<section id="resources">
  <SectionTitle
    title="Ressources"
    subtitle="Des resources externes"
    icon={attach_file}
  />

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
</section>

<style lang="scss">
  .resources--list {
    display: flex;
    gap: 1rem;
    list-style-type: none;
    margin: 2rem auto;
    padding-left: 0;
    overflow-y: auto;
    scrollbar-width: thin;
  }

  .link--container {
    position: relative;
  }

  .link--anchor {
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
    text-decoration: none;
    width: 15rem;
    @include lg {
      width: 18rem;
    }
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
