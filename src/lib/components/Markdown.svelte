<script lang="ts">
  import stringify from "rehype-stringify";
  import parse from "remark-parse";
  import rehype from "remark-rehype";
  import { unified } from "unified";

  const parser = unified().use(parse).use(rehype).use(stringify);

  let className: string | undefined | null = "markdown";
  export { className as class };
  export let content: string | undefined;
</script>

<div class={className}>
  {#if content}
    {#await parser.process(content) then value}
      {@html value}
    {/await}
  {/if}
</div>
