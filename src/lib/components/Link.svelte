<script lang="ts">
  import launch from "@material-design-icons/svg/filled/launch.svg?raw";
  import SvgIcon from "./SvgIcon.svelte";

  export let href: string;
  export let icon: boolean = true;
</script>

<span class="link--container">
  <a {href} class="link--anchor" rel="noopener noreferrer" target="_blank">
    <slot />
  </a>
  {#if icon}
    <SvgIcon src={launch} size="small" />
  {/if}
</span>

<style lang="scss">
  .link--container {
    display: inline-flex;
    white-space: nowrap;
  }
  .link--anchor {
    white-space: normal;
    margin-right: 0.5rem;
  }
</style>
