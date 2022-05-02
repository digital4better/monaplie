<script context="module">
  import Description from "$lib/content/description.md";
</script>

<section>
  <div class="description">
    <Description />
  </div>
</section>

<style lang="scss">
  div :global {
    p {
      display: flex;
    }
    img {
      margin-right: 15px;
      display: flex;
      align-self: flex-start;
    }
  }

  .description {
    display: flex;
    align-self: center;
    border: solid;
    border-width: 1px;
    border-color: blue;
    border-radius: 15px;
    padding: 0 19px 0 19px;
    text-align: justify;
    margin: 2em 1em 4em 1em;
    @include md {
      margin-top: 4em;
    }
  }
</style>
