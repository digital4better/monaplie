<script lang="ts">
  import { base } from "$app/paths";
  import type { ExternalTutorial, Tutorial } from "$lib/types";
  import account from "@material-design-icons/svg/outlined/account_box.svg?raw";
  import email from "@material-design-icons/svg/outlined/email.svg?raw";
  import download from "@material-design-icons/svg/outlined/file_download.svg?raw";
  import help_outline from "@material-design-icons/svg/outlined/help_outline.svg?raw";
  import insert_drive_file from "@material-design-icons/svg/outlined/insert_drive_file.svg?raw";
  import SectionTitle from "./SectionTitle.svelte";
  import SvgIcon from "./SvgIcon.svelte";

  export let tutorials: Tutorial[];

  // Get all services which are used in tutorials except "Générique"
  const services: string[] = tutorials.reduce(
    (list: string[], { service }) =>
      list.includes(service) || service === "Générique"
        ? list
        : [...list, service],
    []
  );

  const selectedFilters = Object.fromEntries(
    services.map((service) => [service, false])
  );

  let noFilterSelected = true;

  const onClickFilter = (service: string) => {
    selectedFilters[service] = !selectedFilters[service];
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

<section id="tutorials" class="tutorials--container">
  <SectionTitle
    title="Tutoriels"
    subtitle="Savoir utiliser les services publics"
    icon={insert_drive_file}
  />

  <div class="tutorials--filters">
    <span class="tutorials--filters-instruction"
      >Filtrer les tutoriels par service</span
    >
    <div>
      {#each services as service}
        <button
          class="tutorials--filter"
          class:tutorials--filter-selected={selectedFilters[service]}
          on:click={() => onClickFilter(service)}
        >
          {service}
        </button>
      {/each}
    </div>
  </div>
  <ul class="tutorials--list">
    {#each tutorials as tutorial}
      {#if selectedFilters[tutorial.service] || noFilterSelected}
        <li class="tutorial--container">
          <a
            href={isExternalTutorial(tutorial)
              ? tutorial.url
              : `${base}/tutorials/${tutorial.slug}`}
            rel="noopener noreferrer"
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
    gap: 1rem;
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
    background-color: var(--alt-bg-color);
    border-radius: 10px;
    align-items: center;
    display: inline-flex;
    min-height: 6rem;
    padding: 1rem;
    text-decoration: none;
    width: 13rem;
    @include lg {
      width: 17rem;
    }
  }

  :global(.tutorial--icon) {
    margin-right: 1rem;
  }
</style>
