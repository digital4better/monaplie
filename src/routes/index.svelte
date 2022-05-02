<script context="module">
  import Links from "$lib/components/Links.svelte";
  import Tutorials from "$lib/components/Tutorials.svelte";
  import LeftMenu from "$lib/components/LeftMenu.svelte";
  import LePlie from "$lib/components/LePLIE.svelte";

  const tutorialsPromises = Object.entries(
    import.meta.glob("$lib/content/tutorials/*.md")
  ).map(async ([slug, fetch]) => {
    const { metadata } = await fetch();
    return {
      slug: slug.replace(/^.*\/content\/tutorials\//, ""),
      ...metadata,
    };
  });

  const linksPromises = Object.entries(
    import.meta.glob("$lib/content/links/*.md")
  ).map(async ([slug, fetch]) => {
    const { metadata } = await fetch();
    return {
      slug: slug.replace(/^.*\/content\/links\//, ""),
      ...metadata,
    };
  });

  const categoriesPromises = Object.entries(
    import.meta.glob("$lib/content/categories/*.md")
  ).map(async ([slug, fetch]) => {
    const { metadata } = await fetch();
    return {
      slug: slug.replace(/^.*\/content\/categories\//, ""),
      ...metadata,
    };
  });

  const lePliePromises = Object.entries(
    import.meta.glob("$lib/content/le-plie.md")
  ).map(async ([slug, fetch]) => {
    const { metadata } = await fetch();
    return {
      slug: slug.replace(/^.*\/content\//, ""),
      ...metadata,
    };
  });

  export async function load() {
    const tutorials = await Promise.all(tutorialsPromises);
    const links = await Promise.all(linksPromises);
    const categories = await Promise.all(categoriesPromises);
    const lePlie = await Promise.all(lePliePromises);
    return {
      props: { tutorials, links, categories, lePlie },
    };
  }
</script>

<script>
  /** @type { { slug: string, title: string  }[] } */
  export let tutorials;
  /** @type { { slug: string, title: string  }[] } */
  export let links;
  /** @type { { slug: string, title: string  }[] } */
  export let categories;
  /** @type { { slug: string, title: string  }[] } */
  export let lePlie;
</script>

<svelte:head>
  <title>PLIE de la métropole nantaise</title>
</svelte:head>

<div class="container">
  <div class="left-menu">
    <LeftMenu>
      <LePlie lePlie={lePlie[0]}/>
    </LeftMenu>
  </div>
  <div class="content">
    <Links {links} {categories} />
    <Tutorials {tutorials} {links} />
    <div class="plie">
      <LePlie lePlie={lePlie[0]} />
    </div>
  </div>
</div>

<style lang="scss">
  .container {
    @include md {
      display: grid;
      grid-template-columns: 20em 2fr;
      min-height: 100vh;
    }
    @include xl {
      grid-template-columns: 33em 2fr;
    }
  }
  .left-menu {
    @include md {
      padding: 0 2em 0 2em;
      border-right: 1px solid blue;
    }
  }
  .content {
    overflow: auto;
    @include md {
      padding-left: 5em;
    }
  }

  @include md {
    .plie {
      display: none
    }
  }
</style>
