<script lang="ts">
  import { base } from "$app/paths";
  import type { ExternalTutorial, Link, Tutorial } from "$lib/types";
  import account from "@material-design-icons/svg/outlined/account_box.svg?raw";
  import email from "@material-design-icons/svg/outlined/email.svg?raw";
  import download from "@material-design-icons/svg/outlined/file_download.svg?raw";
  import help_outline from "@material-design-icons/svg/outlined/help_outline.svg?raw";
  import insert_drive_file from "@material-design-icons/svg/outlined/insert_drive_file.svg?raw";
  import ArrowScroll from "./ArrowScroll.svelte";
  import SvgIcon from "./SvgIcon.svelte";

  export let tutorials: Tutorial[];
  export let links: Link[];

  let list: HTMLUListElement;

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

  const icons = [
    {
      key: "email",
      src: email,
    },
    {
      key: "fichier",
      src: insert_drive_file,
    },
    {
      key: "point d'interrogation",
      src: help_outline,
    },
    {
      key: "compte",
      src: account,
    },
    {
      key: "télécharger",
      src: download,
    },
  ];
  const findIconSrc = (iconKey: string) => {
    return icons.find((i) => i.key === iconKey)?.src || "";
  };

  const isExternalTutorial = (
    tutorial: Tutorial
  ): tutorial is ExternalTutorial => "url" in tutorial;
</script>

<section class="tutorials--container">
  <ArrowScroll
    title="Tutoriels"
    subtitle="Savoir utiliser les services publics"
    icon={insert_drive_file}
    {list}
  />

  <div class="tutorials--filters">
    <span class="tutorials--filters-instruction"
      >Filtrer les tutoriels par service</span
    >
    <div>
      {#each links as { title }}
        <button
          class="tutorials--filter"
          class:tutorials--filter-selected={selectedFilters[title]}
          on:click={() => onClickFilter(title)}
        >
          {title}
        </button>
      {/each}
    </div>
  </div>
  <ul class="tutorials--list" bind:this={list}>
    {#each tutorials as tutorial}
      {#if selectedFilters[tutorial.service] || noFilterSelected}
        <li class="tutorial--container">
          <a
            href={isExternalTutorial(tutorial)
              ? tutorial.url
              : `${base}/tutorials/${tutorial.slug}`}
            target={isExternalTutorial(tutorial) ? "_blank" : undefined}
            class="tutorial--link"
          >
            {#if tutorial.icon}
              <SvgIcon
                class="tutorial--icon"
                src={findIconSrc(tutorial.icon)}
              />
            {/if}
            <span class="tutorial--title">{tutorial.title}</span>
          </a>
        </li>
      {/if}
    {/each}
  </ul>
</section>

<style lang="scss">
  .tutorials--filters {
    align-items: flex-start;
    display: flex;
    flex-direction: column;
  }

  .tutorials--filters-instruction {
    color: var(--color-blue-dark);
    margin-right: 1em;
  }

  .tutorials--filter {
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

  .tutorials--filter-selected {
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

  .tutorials--list {
    display: flex;
    gap: 0.5rem;
    list-style-type: none;
    flex-direction: column;
    flex-wrap: wrap;
    max-height: 20rem;
    overflow-x: scroll;
    overflow: auto;
    padding-left: 0;
    scrollbar-width: thin;
  }

  .tutorial--container {
    position: relative;
  }

  .tutorial--link {
    align-items: center;
    align-self: stretch;
    background-color: var(--alt-bg-color);
    border-radius: 10px;
    display: inline-flex;
    justify-content: space-between;
    margin: 1em 1em 0 0;
    width: 13rem;
    min-height: 4.75rem;
    padding: 1em;
    text-decoration: none;
  }

  :global(.tutorial--icon) {
    margin-right: 1rem;
  }
</style>
