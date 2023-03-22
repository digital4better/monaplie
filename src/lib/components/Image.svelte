<script lang="ts">
  let className: string | undefined | null = "image";
  export { className as class };
  export let src: string;
  export let alt: string | undefined = "";
  export let width: number | undefined = undefined;
  export let height: number | undefined = undefined;
</script>

<img class={className} {src} {alt} {width} {height} />
