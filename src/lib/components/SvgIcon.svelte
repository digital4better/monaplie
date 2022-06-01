<script lang="ts">
  let className: string | undefined | null = "icon";
  export { className as class };
  export let src: string;
  export let size:
    | "inherit"
    | "small"
    | "medium"
    | "large"
    | string
    | null
    | undefined = "medium";
  export let color: string = "var(--main-text-color)";
</script>

<div
  class={`icon--container ${className}`}
  role="presentation"
  style:color
  style:font-size={size}
>
  {@html src}
</div>

<style>
  .icon--container {
    display: inline;
    fill: currentColor;
    vertical-align: text-bottom;
  }

  div :global(svg) {
    display: inline;
    height: 1.5em;
    vertical-align: text-bottom;
    width: 1.5em;
  }
</style>
