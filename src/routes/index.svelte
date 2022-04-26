<script context="module">
  import Links from "$lib/components/Links.svelte";
  import Tutorials from "$lib/components/Tutorials.svelte";

  const promises = Object.entries(
    import.meta.glob("$lib/content/tutorials/*.md")
  ).map(async ([slug, fetch]) => {
    const { metadata } = await fetch();
    return {
      slug: slug.replace(/^.*\/content\/tutorials\//, ""),
      ...metadata,
    };
  });

  export async function load() {
    const tutorials = await Promise.all(promises);
    return {
      props: { tutorials },
    };
  }
</script>

<script>
  /** @type { { slug: string, title: string  }[] } */
  export let tutorials;
</script>

<svelte:head>
  <title>PLIE de la métropole nantaise</title>
</svelte:head>

<Links />

<Tutorials {tutorials} />

<ul>
  {#each tutorials as { slug, title }}
    <li>{slug} - {title}</li>
  {/each}
</ul>
