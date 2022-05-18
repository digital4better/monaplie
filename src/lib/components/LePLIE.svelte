<script lang="ts">
  // TODO: Should be a mdsvex template/layout
  import AccordionDetails from "$lib/components/AccordionDetails.svelte";
  import { metadata } from "$lib/content/le-plie.md";
  import help_outline from "@material-design-icons/svg/outlined/help_outline.svg";
</script>

<div class="plie">
  <h2 class="title">
    <img src={help_outline} alt="" />
    <div>Le PLIE</div>
  </h2>
  <h3>Plan Local d’Insertion pour l’Emploi</h3>
  {#each metadata?.accordeon as elem}
    <AccordionDetails bind:entry={elem} />
  {/each}
  <div class="list">
    <img class="image" src={metadata?.icon} aria-hidden alt="" />
    <a href={metadata?.link}>{metadata?.label}</a>
  </div>
</div>

<style lang="scss">
  .plie {
    margin: 2em 1em 4em 1em;

    .title {
      display: flex;
      align-items: center;
      gap: 1rem;

      img {
        display: inline-block;
      }
    }

    .list {
      margin-top: 3em;

      .image {
        display: flex;
        align-items: center;
        margin-top: 1em;
      }
    }
  }
</style>
