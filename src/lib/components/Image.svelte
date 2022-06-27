<script lang="ts">
  let className: string | undefined | null = "image";
  export { className as class };
  export let src: string;
  export let alt = "";
  export let width: number | string | null | undefined = undefined;
  export let height: number | string | null | undefined = undefined;
</script>

<img class={className} {src} {alt} {width} {height} />
