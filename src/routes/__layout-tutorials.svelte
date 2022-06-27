<script lang="ts">
  import Footer from "$lib/components/Footer.svelte";
  import Header from "$lib/components/Header.svelte";
  import "../app.scss";
  import Image from "$lib/components/Image.svelte";
  import { metadata } from "$lib/content/sidebar.md";
  import type { Sidebar } from "$lib/types";

  export let { logo, description, details, links } = metadata as Sidebar;
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

  .header--container {
    display: flex;
    flex-direction: column;
    gap: 4rem;
    padding-top: 4rem;
  }

  .header--logo {
    align-self: center;
  }

  .header--motd {
    display: flex;
    align-items: flex-start;
    gap: 1.5rem;

    border: solid;
    border-width: 1px;
    border-color: var(--color-blue);
    border-radius: 15px;

    padding: 1.5rem 2.5rem;

    text-align: justify;
  }

  .header--motd :global(.icon) {
    padding-top: 1rem;
  }
</style>
