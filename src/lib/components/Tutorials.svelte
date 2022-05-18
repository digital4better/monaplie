<script lang="ts">
  import { goto } from "$app/navigation";
  import type { Link, Tutorial } from "$lib/types";
  import insert_drive_file from "@material-design-icons/svg/outlined/insert_drive_file.svg";

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

<section class="tutorials">
  <h2 class="title"><img src={insert_drive_file} alt="" />Tutoriels</h2>
  <h3>Savoir utiliser les services publics</h3>

  <div class="filters">
    <div class="filters-instruction">Filtrer les tutoriels par service</div>
    <div>
      {#each links as { title }}
        <div
          class="filter"
          class:selected={selectedFilters[title]}
          on:click={() => onClickFilter(title)}
        >
          {title}
        </div>
      {/each}
    </div>
  </div>

  <div class="container-list">
    <div class="list">
      {#each tutorials as { title, slug, icon, service }}
        {#if selectedFilters[service] || noFilterSelected}
          <div class="button" on:click={() => goto(`/tutorials/${slug}`)}>
            <img class="icon" src={icon} aria-hidden alt="" />
            <div class="text-sm">{title}</div>
          </div>
        {/if}
      {/each}
    </div>
  </div>
</section>

<style lang="scss">
  .tutorials {
    margin: 2em 1em 4em 1em;

    .title {
      display: inline-flex;
      align-items: center;
      gap: 1rem;
    }
  }
  .icon {
    width: 2em;
    margin-right: 1em;
  }
  .button {
    padding: 1em;
    margin: 1em 1em 0 0;
    background-color: #f1f5ff;
    border-radius: 10px;
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    max-width: fit-content;
    cursor: pointer;
  }
  .list {
    white-space: nowrap;
    display: flex;
    flex-wrap: wrap;
    overflow: auto;
  }
  .filters {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    @include xl {
      flex-direction: row;
      align-items: center;
    }
  }
  .filter {
    display: inline-flex;
    align-self: center;
    border: solid;
    border-width: 1px;
    border-color: #007cbf;
    border-radius: 15px;
    padding: 5px 12px 5px 12px;
    margin-right: 1.2em;
    margin-top: 1em;
    cursor: pointer;
    @include xl {
      margin-top: 0;
    }
  }
  .filters-instruction {
    color: #13235b;
    margin-right: 1em;
  }
  .selected {
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
