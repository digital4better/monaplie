<script>
  export let links;
  export let categories;
  const getCategoryColor = (category) => {
    return (
      categories.find((c) => {
        return c.title === category;
      })?.color || "red"
    );
  };
</script>

<section class="links">
  <h2>🔗 Liens</h2>
  <h3>Connexion vers les services publics</h3>
  <div class="list">
    {#each links as { title, label, image, alt, serviceCategories, link }}
      <div class="button" on:click={() => window.open(link)}>
        <input class="logo" type="image" {image} aria-label={alt} {alt} />
        <div class="title">{title}</div>
        <div class="text-sm">{label}</div>
        {#each serviceCategories as category}
          <div class="category">
            <div
              class="circle"
              style={`--bg-color:${getCategoryColor(category)};`}
            />
            <span>{category}</span>
          </div>
        {/each}
      </div>
    {/each}
  </div>
</section>

<style>
  .circle {
    display: inline-flex;
    align-items: flex-end;
    height: 13px;
    width: 13px;
    border-radius: 50%;
    background-color: var(--bg-color, lightgray);
    margin-right: 0.5em;
  }
  .button {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 2em;
    margin: 1em 1em 0 0;
    background-color: #f1f5ff;
    border-radius: 10px;
    max-width: 20em;
    min-width: 12em;
    cursor: pointer;
  }
  .logo {
    height: 4em;
  }
  .title {
    margin: 0.5em 0 0.5em 0;
    font-size: large;
    font-weight: 800;
  }
  .category {
    display: flex;
    align-items: center;
    margin-top: 3em;
    font-size: small;
  }
  .list {
    display: flex;
    overflow: auto;
  }
  .links {
    margin: 2em 1em 4em 1em;
  }
</style>
