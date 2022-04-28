<script>
  import { goto } from "$app/navigation";
  export let tutorials;
</script>

<section class="tutorials">
  <h2>📄 Tutoriels</h2>
  <h3>Savoir utiliser les services publiques</h3>
  <div class="list">
    {#each tutorials as { title, slug, icon }}
      <div class="button" on:click={() => goto(`/tutorials/${tutorial.slug}`)}>
        <input class="icon" type="image" {icon} aria-hidden />
        <div class="text-sm">{title}</div>
      </div>
    {/each}
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
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .list {
    display: flex;
    overflow: auto;
  }
</style>
