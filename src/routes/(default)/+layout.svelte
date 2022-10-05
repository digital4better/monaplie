<script>
  import "$lib/app.scss";
  import Footer from "$lib/components/Footer.svelte";
  import Header from "$lib/components/Header.svelte";
</script>

<div class="layout--container">
  <header class="layout--header"><Header /></header>
  <aside class="layout--aside">
    <Header />
    <Footer />
  </aside>
  <main class="layout--main">
    <slot />
  </main>
  <footer class="layout--footer"><Footer /></footer>
</div>

<style lang="scss">
  .layout--container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    padding: 0 1.25rem;

    @include md {
      flex-direction: row;
      padding: unset;
    }
  }

  .layout--header,
  .layout--footer {
    display: block;

    @include md {
      display: none;
    }
  }

  .layout--aside {
    border-right: 1px solid var(--color-blue);
    display: none;
    flex-direction: column;
    max-height: auto !important;
    max-width: 25rem;
    min-height: 100%;
    padding: 0 3.5rem;
    width: 25vw;

    @include md {
      display: flex;
    }
  }

  .layout--main {
    width: 100%;
    @include md {
      padding: 0 4rem;
    }
  }
</style>
