<script lang="js">
  import { goto } from "$app/navigation";
  export let tutorials;
  export let links;

  let selectedFilters = new Object();
  links.map((link) => {
    selectedFilters[link.slug] = false;
  });

  let noFilterSelected = true;

  const onClickFilter = (slug) => {
    selectedFilters[slug] = !selectedFilters[slug] ?? true;
    noFilterSelected = !hasAnyFilterActive();
  };

  const hasAnyFilterActive = () => {
    for (const [, value] of Object.entries(selectedFilters)) {
      if (value) return true;
    }
    return false;
  };
</script>

<section class="tutorials">
  <h2>📄 Tutoriels</h2>
  <h3>Savoir utiliser les services publics</h3>

  <div class="filters">
    <div class="filters-instruction">Filtrer les tutoriels par service</div>
    {#each links as { title, slug }}
      <div
        class="filter"
        class:selected={selectedFilters[slug]}
        on:click={() => onClickFilter(slug)}
      >
        {title}
      </div>
    {/each}
  </div>

  <div class="container-list">
    <div class="list">
      {#each tutorials as { title, slug, icon, services }}
        {#if !!services.find((service) => selectedFilters[service]) || noFilterSelected}
          <div class="button" on:click={() => goto(`/tutorials/${slug}`)}>
            <input class="icon" type="image" {icon} aria-hidden />
            <div class="text-sm">{title}</div>
          </div>
        {/if}
      {/each}
    </div>
  </div>
</section>

<style>
  .tutorials {
    margin: 2em 1em 4em 1em;
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
    align-items: center;
  }
  .filter {
    display: inline-flex;
    align-self: center;
    border: solid;
    border-width: 1px;
    border-color: blue;
    border-radius: 15px;
    padding: 5px 12px 5px 12px;
    margin: 0 0.6em 0 0.6em;
    cursor: pointer;
  }
  .filters-instruction {
    color: blue;
    margin-right: 1em;
  }
  .selected {
    display: flex;
    align-self: center;
    border: solid;
    border-width: 1px;
    border-color: blue;
    border-radius: 15px;
    padding: 5px 12px 5px 12px;
    margin: 0 0.6em 0 0.6em;
    background-color: blue;
    color: white;
    cursor: pointer;
  }
</style>
