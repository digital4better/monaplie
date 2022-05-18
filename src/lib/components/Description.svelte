<script context="module">
  import Description from "$lib/content/description.md";
  import help_outline from "@material-design-icons/svg/outlined/help_outline.svg?raw";
</script>

<section>
  <div class="description">
    <div class="icon">
      {@html help_outline}
    </div>
    <Description />
  </div>
</section>

<style lang="scss">
  .description {
    display: flex;
    align-items: flex-start;
    gap: 1.5rem;

    border: solid;
    border-width: 1px;
    border-color: #007cbf;
    border-radius: 15px;

    padding: 0 1.1875rem 0 1.1875rem;
    margin: 2rem 1rem 4rem 1rem;

    text-align: justify;

    @include md {
      margin-top: 4em;
    }

    .icon {
      padding-top: 2rem;

      color: #007cbf;
      fill: currentColor;
    }
  }
</style>
