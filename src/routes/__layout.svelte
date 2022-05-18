<script>
  import LeftMenu from "$lib/components/LeftMenu.svelte";
  import LePlie from "$lib/components/LePLIE.svelte";
  import "../app.scss";
</script>

<div class="container">
  <aside class="left-menu">
    <LeftMenu>
      <LePlie />
    </LeftMenu>
  </aside>
  <main>
    <slot />
  </main>
  <footer class="plie">
    <LePlie />
  </footer>
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

  @include md {
    .plie {
      display: none;
    }
  }
</style>
