<script lang="ts">
  import arrow_back from "@material-design-icons/svg/filled/arrow_back.svg?raw";
  import arrow_forward from "@material-design-icons/svg/filled/arrow_forward.svg?raw";
  import SvgIcon from "./SvgIcon.svelte";

  let interval_: NodeJS.Timer;

  export let list: HTMLUListElement;
  const scroll = (value: number) => {
    list?.scrollBy(value, 0);
  };
</script>

<section class="buttons--container">
  <button
    class="scroll--button"
    aria-hidden="true"
    on:click={() => scroll(-10)}
    on:mousedown={() => (interval_ = setInterval(() => scroll(-5), 20))}
    on:mouseup={() => clearInterval(interval_)}
    on:touchstart={() => (interval_ = setInterval(() => scroll(-5), 20))}
    on:touchend={() => clearInterval(interval_)}
  >
    <SvgIcon src={arrow_back} />
  </button>

  <button
    class="scroll--button"
    aria-hidden="true"
    tabindex="-1"
    on:click={() => scroll(10)}
    on:mousedown={() => (interval_ = setInterval(() => scroll(5), 20))}
    on:mouseup={() => clearInterval(interval_)}
    on:touchstart={() => (interval_ = setInterval(() => scroll(5), 20))}
    on:touchend={() => clearInterval(interval_)}
  >
    <SvgIcon src={arrow_forward} />
  </button>
</section>

<style lang="scss">
  .buttons--container {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
  }
  .scroll--button {
    background-color: white;
    border-radius: 100%;
    border-width: 0;
    cursor: pointer;
    height: 2rem;
  }
  .scroll--button:active {
    background-color: gray;
  }
</style>
