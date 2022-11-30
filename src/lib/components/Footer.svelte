<script lang="ts">
  import AccordionDetails from "$lib/components/AccordionDetails.svelte";
  import Link from "$lib/components/Link.svelte";
  import SvgIcon from "$lib/components/SvgIcon.svelte";
  import { metadata } from "$lib/content/site.md";
  import type { Site } from "$lib/types";
  import help_outline from "@material-design-icons/svg/outlined/help_outline.svg?raw";

  export let { details, links } = metadata as Site;
</script>

<div class="footer--container">
  <segment class="footer--about">
    <h2 class="footer--about-title">
      <SvgIcon src={help_outline} />
      <div>Le PLIE</div>
    </h2>
    <span>Plan Local d’Insertion pour l’Emploi</span>
    <div class="accordion--container">
      {#each details as entry}
        <AccordionDetails {entry} />
      {/each}
    </div>
  </segment>
  <segment class="footer--links">
    {#each links as { title, url }}
      <ul class="links--list">
        <li><Link href={url}>{title}</Link></li>
      </ul>
    {/each}
  </segment>
  <segment>
    Projet open-source sur
    <Link href="https://github.com/digital4better/monaplie">GitHub</Link>
  </segment>
</div>

<style>
  .footer--container {
    display: flex;
    flex-direction: column;
    gap: 4rem;
    padding-top: 4rem;
  }

  .footer--about-title {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin: 0;
    margin-bottom: 0.5rem;
  }

  .accordion--container {
    margin-top: 1.25rem;
  }

  .links--list {
    list-style-type: none;
    padding-left: 0;
  }
</style>
