<script lang="ts">
  import { goto } from "$app/navigation";
  import { base } from "$app/paths";
  import type { Link, Tutorial } from "$lib/types";
  import insert_drive_file from "@material-design-icons/svg/outlined/insert_drive_file.svg?raw";
  import Image from "./Image.svelte";
  import SvgIcon from "./SvgIcon.svelte";

  export let tutorials: Tutorial[];
  export let links: Link[];

  const selectedFilters: Record<string, boolean> = links.reduce(
    (acc, link) => ({ ...acc, [link.slug]: false }),
    {}
  );

  let noFilterSelected = true;

  const onClickFilter = (slug: string) => {
    selectedFilters[slug] = !selectedFilters[slug];
    noFilterSelected = !hasAnyFilterActive();
  };

  const hasAnyFilterActive = () =>
    Object.values(selectedFilters).some((value) => value);
</script>

<section class="tutorials--container">
  <h2 class="tutorials--title">
    <SvgIcon src={insert_drive_file} />Tutoriels
  </h2>
  <h3>Savoir utiliser les services publics</h3>

  <div class="tutorials--filters">
    <span class="tutorials--filters-instruction"
      >Filtrer les tutoriels par service</span
    >
    <div>
      {#each links as { title }}
        <div
          class="tutorials--filter"
          class:tutorials--filter-selected={selectedFilters[title]}
          on:click={() => onClickFilter(title)}
        >
          {title}
        </div>
      {/each}
    </div>
  </div>

  <div class="tutorials--list-container">
    <div class="tutorials--list">
      {#each tutorials as { title, slug, icon, service }}
        {#if selectedFilters[service] || noFilterSelected}
          <!-- TODO: Use a link -->
          <div
            class="tutorial--button"
            on:click={() => goto(`${base}/tutorials/${slug}`)}
          >
            <Image class="tutorial--icon" src={icon} alt="" />
            <div class="tutorial--title">{title}</div>
          </div>
        {/if}
      {/each}
    </div>
  </div>
</section>

<style>
  .tutorials--title {
    display: inline-flex;
    align-items: center;
    gap: 1rem;
  }

  .tutorials--filters {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .tutorials--filters-instruction {
    color: var(--color-blue-dark);
    margin-right: 1em;
  }

  .tutorials--filter {
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

  .tutorials--filter-selected {
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

  .tutorials--list {
    white-space: nowrap;
    display: flex;
    flex-wrap: wrap;
    overflow: auto;
  }

  .tutorial--button {
    padding: 1em;
    margin: 1em 1em 0 0;
    background-color: var(--alt-bg-color);
    border-radius: 10px;
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    max-width: fit-content;
    cursor: pointer;
  }

  :global(.tutorial--icon) {
    width: 2em;
    margin-right: 1em;
  }
</style>
