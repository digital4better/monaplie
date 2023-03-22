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
    padding: 0;
    @include lg {
      flex-direction: row;
      height: 100vh;
    }
  }

  .layout--header,
  .layout--footer {
    display: block;
    padding: 0 1.25rem 1rem 1.25rem;
    @include lg {
      display: none;
      padding: initial;
    }
  }

  .layout--aside {
    box-sizing: border-box;
    border-right: 1px solid var(--color-blue);
    display: none;
    flex-direction: column;
    max-height: auto !important;
    min-height: 100%;
    padding: 0 2rem 2rem 3.5rem;
    @include lg {
      display: flex;
      width: 25vw;
      overflow-x: hidden;
      overflow-y: scroll;
      scrollbar-width: thin;
    }
  }

  .layout--main {
    @include lg {
      width: 75vw;
      overflow-x: hidden;
      overflow-y: scroll;
    }
  }
</style>
