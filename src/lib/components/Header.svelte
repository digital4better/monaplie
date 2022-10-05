<script lang="ts">
  import Image from "$lib/components/Image.svelte";
  import SvgIcon from "$lib/components/SvgIcon.svelte";
  import { metadata } from "$lib/content/site.md";
  import type { Site } from "$lib/types";
  import help_outline from "@material-design-icons/svg/outlined/help_outline.svg?raw";

  export let { logo, description, details, links } = metadata as Site;
</script>

<div class="header--container">
  <segment class="header--logo">
    <Image src={logo.src} alt={logo.alt} />
  </segment>
  <segment class="header--motd">
    <SvgIcon src={help_outline} color="var(--color-blue)" />
    {description}
  </segment>
</div>

<style>
  .header--container {
    display: flex;
    flex-direction: column;
    gap: 4rem;
    padding-top: 4rem;
  }

  .header--logo {
    align-self: center;
  }

  .header--motd {
    display: flex;
    align-items: flex-start;
    gap: 1.5rem;

    border: solid;
    border-width: 1px;
    border-color: var(--color-blue);
    border-radius: 15px;

    padding: 1.5rem 2.5rem;

    text-align: justify;
  }

  .header--motd :global(.icon) {
    padding-top: 1rem;
  }
</style>
