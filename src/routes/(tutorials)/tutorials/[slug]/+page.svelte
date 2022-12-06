<script context="module" lang="ts">
  import { base } from "$app/paths";
  import Image from "$lib/components/Image.svelte";
  import SvgIcon from "$lib/components/SvgIcon.svelte";
  import type { TutorialStep } from "$lib/types";
  import arrow_left from "@material-design-icons/svg/filled/arrow_left.svg?raw";
  import arrow_rigth from "@material-design-icons/svg/filled/arrow_right.svg?raw";
  import type { PageData } from "./$types";
</script>

<script lang="ts">
  import Markdown from "$lib/components/Markdown.svelte";

  export let data: PageData;

  let current = 0;
  let step: TutorialStep | undefined;

  $: step = data.tutorial?.steps ? data.tutorial.steps[current] : undefined;
</script>

<svelte:head>
  <title>{data.tutorial?.title} | PLIE</title>
  <meta name="X-Content-Type-Options" content="nosniff" />
  <meta name="Content-Security-Policy" content="default-src 'self'" />
</svelte:head>

<div class="tutorial--container">
  <div class="tutorial--home-link">
    <SvgIcon src={arrow_left} color="var(--color-blue-dark)" />
    <a href={`${base}/`} rel="noopener noreferrer">Accueil</a>
  </div>
  <h1>{data.tutorial?.title}</h1>
  {#if data.tutorial?.steps}
    <h2>Étape {current + 1}/{data.tutorial?.steps.length}</h2>
    <div class="tutorial--content">
      {#if step?.image}
        <Image src={step.image.src} alt={step.image.alt} />
      {/if}
      <p>
        <Markdown content={step?.text} />
      </p>
    </div>
    <div class="tutorial--step-buttons">
      {#if current > 0}
        <button class="tutorial--button" on:click={() => current--}>
          <SvgIcon src={arrow_left} color="var(--color-blue-dark)" />
          Précédent
        </button>
      {:else}
        <br />
      {/if}
      {#if current < data.tutorial?.steps.length - 1}
        <button class="tutorial--button" on:click={() => current++}>
          Suivant
          <SvgIcon src={arrow_rigth} color="var(--color-blue)-dark" />
        </button>
      {/if}
    </div>
  {/if}
</div>

<style lang="scss">
  .tutorial--container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1rem 0;
  }
  .tutorial--home-link {
    display: flex;
    align-self: flex-start;
    align-items: center;
  }

  .tutorial--content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 4rem;
    margin: 0 4rem;
    @include md {
      flex-direction: row;
    }
  }

  .tutorial--step-buttons {
    display: flex;
    justify-content: space-between;
    gap: 4rem;
    margin: 2rem 4rem;
    width: 100%;
  }

  .tutorial--button {
    display: flex;
    align-items: center;
    font-size: 15px;
    padding: 0.1rem 0.5rem;
    color: "var(--color-blue)-dark";
    border-radius: 1.5rem;
    background-color: white;
    justify-content: flex-end !important;
  }
</style>
