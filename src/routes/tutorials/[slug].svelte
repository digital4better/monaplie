<script context="module" lang="ts">
  import Image from "$lib/components/Image.svelte";
  import type { Tutorial } from "$lib/types";
  import type { Load } from "@sveltejs/kit";

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
  <h1>{tutorial.title}</h1>
  <h2>Étape {step + 1}/{tutorial.steps.length}</h2>
  <div class="tutorial--content">
    {#if tutorial.steps[step]?.image != null}
      <Image
        src={tutorial.steps[step]?.image?.src || ''}
        alt={tutorial.steps[step]?.image?.alt || ''}
      />
    {/if}
    <p>
      {tutorial.steps[step]?.text}
    </p>
  </div>
</div>

<style>
  .tutorial--container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .tutorial--content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 4rem;
    margin: 0 4rem;
  }
</style>
