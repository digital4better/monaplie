<script lang="ts">
  import "$lib/app.scss";
  import Footer from "$lib/components/Footer.svelte";
  import Header from "$lib/components/Header.svelte";
  import Image from "$lib/components/Image.svelte";
  import { metadata } from "$lib/content/site.md";
  import type { Site } from "$lib/types";

  export let { logo } = metadata as Site;
</script>

<div class="layout--container">
  <header class="layout--header">
    <div class="header--container">
      <segment class="header--logo">
        <Image src={logo.src} alt={logo.alt} />
      </segment>
    </div>
  </header>
  <aside class="layout--aside">
    <Header />
    <Footer />
  </aside>
  <main class="layout--main">
    <slot />
  </main>
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

  .layout--header {
    display: block;
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
    padding: 0 2rem 0 3.5rem;
    @include lg {
      display: flex;
      width: 25vw;
      overflow-x: hidden;
      overflow-y: scroll;
      scrollbar-width: thin;
    }
  }

  .layout--main {
    width: 100%;
    @include md {
      padding: 0 4rem;
    }
  }

  .header--container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 2rem 0;
    @include lg {
      gap: 4rem;
      padding-top: 4rem;
    }
  }

  .header--logo {
    align-self: center;
  }
</style>
