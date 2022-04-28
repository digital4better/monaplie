<script>
  export let handleClick;
  export /**
   * @type {string | null | undefined}
   */
  let src;
  export /**
   * @type {string | null | undefined}
   */
  let alt;
  export /**
   * @type {any}
   */
  let title;
</script>

<div class="button" on:click={handleClick}>
  <input class="icon" type="image" {src} aria-hidden {alt} />
  <div class="text-sm">{title}</div>
</div>

<style>
  .icon {
    width: 2em;
    margin-right: 1em;
  }
  .button {
    padding: 1em;
    margin: 1em 1em 0 0;
    background-color: #f1f5ff;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>
