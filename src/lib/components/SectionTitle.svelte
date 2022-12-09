<script lang="ts">
  import SvgIcon from "./SvgIcon.svelte";

  export let title: string;
  export let subtitle: string;
  export let icon: string;
</script>

<h2 class="section-title--container">
  <SvgIcon src={icon} />{title}
</h2>
<h3>{subtitle}</h3>

<style lang="scss">
  .section-title--container {
    align-items: center;
    display: inline-flex;
    gap: 1rem;
  }
</style>
