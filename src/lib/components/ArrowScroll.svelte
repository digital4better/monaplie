<script lang="ts">
  import arrow_back from "@material-design-icons/svg/filled/arrow_back.svg?raw";
  import arrow_forward from "@material-design-icons/svg/filled/arrow_forward.svg?raw";
  import SvgIcon from "./SvgIcon.svelte";

  let interval_: NodeJS.Timer;

  export let title: string;
  export let subtitle: string;
  export let icon: string;
  export let list: HTMLUListElement;
  const scroll = (value: number) => {
    list?.scrollBy(value, 0);
  };
</script>

<h2 class="links--title">
  <SvgIcon src={icon} />{title}
</h2>
<div class="button--container">
  <h3>{subtitle}</h3>
  <section class="buttons--container">
    <button
      class="scroll--button"
      aria-hidden="true"
      on:click={() => scroll(-10)}
      on:mousedown|preventDefault={() =>
        (interval_ = setInterval(() => scroll(-5), 20))}
      on:mouseup|preventDefault={() => clearInterval(interval_)}
      on:touchstart|preventDefault={() =>
        (interval_ = setInterval(() => scroll(-5), 20))}
      on:touchend|preventDefault={() => clearInterval(interval_)}
    >
      <SvgIcon src={arrow_back} />
    </button>

    <button
      class="scroll--button"
      aria-hidden="true"
      on:click={() => scroll(10)}
      on:mousedown={() => (interval_ = setInterval(() => scroll(5), 20))}
      on:mouseup={() => clearInterval(interval_)}
      on:touchstart={() => (interval_ = setInterval(() => scroll(5), 20))}
      on:touchend={() => clearInterval(interval_)}
    >
      <SvgIcon src={arrow_forward} />
    </button>
  </section>
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
