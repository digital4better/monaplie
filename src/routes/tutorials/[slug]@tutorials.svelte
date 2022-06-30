<script context="module" lang="ts">
  import Image from "$lib/components/Image.svelte";
  import type { Tutorial } from "$lib/types";
  import type { Load } from "@sveltejs/kit";
  import SvgIcon from "$lib/components/SvgIcon.svelte";
  import arrow_rigth from "@material-design-icons/svg/filled/arrow_right.svg?raw";
  import arrow_left from "@material-design-icons/svg/filled/arrow_left.svg?raw";

  const tutorials = import.meta.glob("$lib/content/tutorials/*.md");

  export const load: Load<{ slug: string }> = async ({ params: { slug } }) => {
    const { metadata } =
      (await tutorials[`../../lib/content/tutorials/${slug}.md`]?.()) || {};
    return {
      props: {
        tutorial: metadata,
      },
    };
  };
</script>

<script lang="ts">
  export let tutorial: Tutorial;
  export let step = 0;
</script>

<div class="tutorial--container">
  <div class="tutorial--home-link">
    <SvgIcon src={arrow_left} color="var(--color-blue-dark)" />
    <a href={"/laplie"} rel="noopener noreferrer">Accueil</a>
  </div>
  <h1>{tutorial.title}</h1>
  <h2>Étape {step + 1}/{tutorial.steps.length}</h2>
  <div class="tutorial--content">
    {#if tutorial.steps[step]?.image != null}
      <Image
        src={tutorial.steps[step]?.image?.src || ""}
        alt={tutorial.steps[step]?.image?.alt || ""}
      />
    {/if}
    <p>
      {tutorial.steps[step]?.text}
    </p>
  </div>
  <div class="tutorial--step-buttons">
    {#if step != 0}
      <button class="tutorial--button" on:click={() => step--}>
        <SvgIcon src={arrow_left} color="var(--color-blue-dark)" />
        Précédent
      </button>
    {:else}
      <br />
    {/if}
    {#if step < tutorial.steps.length - 1}
      <button class="tutorial--button" on:click={() => step++}>
        Suivant
        <SvgIcon src={arrow_rigth} color="var(--color-blue)-dark" />
      </button>
    {/if}
  </div>
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
