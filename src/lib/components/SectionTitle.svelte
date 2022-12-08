<script lang="ts">
  import SvgIcon from "./SvgIcon.svelte";

  export let title: string;
  export let subtitle: string;
  export let icon: string;
</script>

<h2 class="links--title">
  <SvgIcon src={icon} />{title}
</h2>
<div class="button--container">
  <h3>{subtitle}</h3>
</div>

<style lang="scss">
  .links--title {
    align-items: center;
    display: inline-flex;
    gap: 1rem;
  }

  .button--container {
    align-items: center;
    display: flex;
    justify-content: space-between;
    gap: 1rem;
  }
</style>
