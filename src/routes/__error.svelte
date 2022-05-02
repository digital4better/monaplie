<script context="module">
  import { goto } from "$app/navigation";
  import LeftMenu from "$lib/components/LeftMenu.svelte";
  import LePlie from "$lib/components/LePLIE.svelte";

  const lePliePromises = Object.entries(
    import.meta.glob("$lib/content/le-plie.md")
  ).map(async ([slug, fetch]) => {
    const { metadata } = await fetch();
    return {
      slug: slug.replace(/^.*\/content\//, ""),
      ...metadata,
    };
  });

  export async function load({ status }) {
    const lePlie = await Promise.all(lePliePromises);

    return {
      props: {
        status,
        lePlie,
      },
    };
  }
</script>

<script>
  export let status;
  /** @type { { slug: string, title: string  }[] } */
  export let lePlie;
</script>

<div class="container">
  <div class="left-menu">
    <LeftMenu>
      <LePlie lePlie={lePlie[0]} />
    </LeftMenu>
  </div>
  <div class="message">
    <p class="status">{status}</p>
    <p style="text-align: center; margin: 1em;">
      Oups ! Cette page n’a pas été trouvée. Vous pouvez reprendre votre
      navigation depuis la page d’accueil.
    </p>
    <button on:click={() => goto("/")}> Revenir à la page d’accueil </button>
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
  .status {
    font-weight: 700;
    font-size: 96px;
    line-height: 129.8%;
    color: #f29400;
    margin: 0;
  }
  .message {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  button {
    background-color: #13235b;
    color: white;
    border-radius: 15px;
    padding: 0.6em;
  }
</style>
