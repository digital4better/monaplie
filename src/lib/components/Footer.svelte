<script lang="ts">
  import AccordionDetails from "$lib/components/AccordionDetails.svelte";
  import Link from "$lib/components/Link.svelte";
  import SvgIcon from "$lib/components/SvgIcon.svelte";
  import { metadata } from "$lib/content/site.md";
  import type { Site } from "$lib/types";
  import help_outline from "@material-design-icons/svg/outlined/help_outline.svg?raw";
  import Carbonara from "./Carbonara.svelte";
  import Image from "./Image.svelte";

  export let { details, links, certificate } = metadata as Site;
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
    <ul class="footer--links-list">
      {#each links as { title, url }}
        <li><Link href={url}>{title}</Link></li>
      {/each}
    </ul>
  </segment>
  <segment class="footer--links">
    <ul class="footer--links-list">
      <li>
        <Link href="https://www.fruggr.io/" icon={false}>
          <Image
            class="footer--certificate"
            src={certificate.src}
            alt={certificate.alt}
          />
        </Link>
      </li>
      <li>
        Made with ♥︎ by
        <Link href="https://digital4better.com/">Digital4Better</Link>
      </li>
      <li>
        Projet open-source sur
        <Link href="https://github.com/digital4better/monaplie">GitHub</Link>
      </li>
    </ul>
  </segment>
  <segment class="footer--carbonara">
    <Carbonara />
  </segment>
</div>

<style lang="scss">
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

  .footer--links-list {
    list-style-type: none;
    padding-left: 0;

    li {
      margin-bottom: 1rem;
    }
  }

  :global(.footer--certificate) {
    max-width: 18rem;
  }

  .footer--carbonara {
    text-align: center;
    color: #888899;
    font-size: 0.7rem;
    margin-bottom: 4rem;
    @include sm {
      margin-bottom: 0;
    }
  }
</style>
