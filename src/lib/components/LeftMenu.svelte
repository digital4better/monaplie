<script context="module">
  import Logo from "$lib/content/logo.md";
  import Description from "$lib/content/description.md";
  // import LePlie from "$lib/components/LePLIE.svelte";

  export let lePlie;
</script>

<section class="left-menu">
  <div class="logo">
    <Logo />
  </div>
  <div class="description">
    <Description />
  </div>
  <div class="plie">
    <!-- <LePlie {lePlie}/> -->
    <slot />
  </div>
</section>

<style lang="scss">
  @include md {
    .description {
      margin-top: 4em;
    }
  }
  .description {
    display: flex;
    align-self: center;
    border: solid;
    border-width: 1px;
    border-color: blue;
    border-radius: 15px;
    padding: 0 19px 0 19px;
    text-align: justify;
    margin: 2em 1em 4em 1em;
  }
  div :global {
    p {
      display: flex;
    }
    img {
      margin-right: 15px;
      display: flex;
      align-self: flex-start;
    }
  }
  .logo {
    display: flex;
    justify-content: center;
  }
  .left-menu {
    max-height: auto !important;
  }
  .plie {
    display: none;
  }
  @include md {
    .plie {
      display: flex;
    }
  }
</style>
