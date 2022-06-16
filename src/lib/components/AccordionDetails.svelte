<script lang="ts">
  import type { SidebarDetail } from "$lib/types";
  import navigate_next from "@material-design-icons/svg/filled/navigate_next.svg?raw";
  import { slide } from "svelte/transition";
  import SvgIcon from "./SvgIcon.svelte";

  export let entry: SidebarDetail;

  let isOpen = false;
  const toggle = () => (isOpen = !isOpen);
</script>

<h3>
  <button
    class="accordion--button"
    on:click={toggle}
    aria-expanded={isOpen}
    aria-controls="sect"
    id="accordionId"
  >
    {entry.title}<SvgIcon class="accordion--button-icon" src={navigate_next} />
  </button>
</h3>
{#if isOpen}
  <div
    class="accordion--container"
    aria-labelledby="accordionId"
    transition:slide={{ duration: 300 }}
    style:display={isOpen ? "block" : "none"}
  >
    <div id="sect" class="accordion--content">{entry.content}</div>
  </div>
{/if}

<style>
  .accordion--button {
    border: none;
    background-color: var(--alt-bg-color);
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
  :global(.accordion--button-icon) {
    transition: transform 0.2s ease-in;
  }
  [aria-expanded="true"] :global(.accordion--button-icon) {
    transform: rotate(0.25turn);
  }
  .accordion--content {
    margin: 1em 0 1em 2em;
    text-align: justify;
  }
</style>
