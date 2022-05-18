<script context="module">
  import Description from "./Description.svelte";
  import Logo from "./Logo.svelte";
</script>

<aside class="left-menu">
  <Logo />
  <Description />
  <slot class="plie" />
</aside>

<style lang="scss">
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
