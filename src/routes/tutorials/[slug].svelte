<script context="module" lang="ts">
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
  export let step = 1;
</script>

<section class="tutorial">
  <h1>{tutorial.title}</h1>
  <h2>Étape {step}/{tutorial.steps.length}</h2>
  {#if tutorial.steps[step]?.image}
    <img src={tutorial.steps[step]?.image} alt="" />
  {/if}
  <span>{tutorial.steps[step]?.text}</span>
</section>

<style lang="scss">
  .tutorial {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
