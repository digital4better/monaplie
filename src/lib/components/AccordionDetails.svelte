<script>
  import { slide } from "svelte/transition";
  export let entry;
  let isOpen = false;
  const toggle = () => (isOpen = !isOpen);
</script>

<button on:click={toggle} aria-expanded={isOpen}>
  {entry.title}<svg
    style="tran"
    width="20"
    height="20"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="2"
    viewBox="0 0 24 24"
    stroke="currentColor"><path d="M9 5l7 7-7 7" /></svg
  >
</button>
{#if isOpen}
  <div transition:slide={{ duration: 300 }}>
    <div class="content">{entry.content}</div>
  </div>
{/if}

<style>
  button {
    border: none;
    background-color: #f1f5ff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: inherit;
    font-weight: 800;
    cursor: pointer;
    margin: 0;
    padding: 0.8em;
    border-radius: 9px;
    margin-top: 0.8em;
    width: 100%;
  }
  svg {
    transition: transform 0.2s ease-in;
  }
  [aria-expanded="true"] svg {
    transform: rotate(0.25turn);
  }
  .content {
    margin: 1em 0 1em 2em;
    text-align: justify;
  }
</style>
